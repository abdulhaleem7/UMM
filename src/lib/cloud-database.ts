import { createClient } from '@libsql/client';
import Database from 'better-sqlite3';
import path from 'path';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export interface Client {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  patronageCount: number;
  dateAdded: string;
  notes?: string;
}

export interface PatronageRecord {
  id?: number;
  clientId: number;
  date: string;
  notes?: string;
}

export interface AdminUser {
  id?: number | string;
  username: string;
  email: string;
  password_hash: string;
  role: 'super_admin' | 'admin';
  created_at: string;
  updated_at: string;
  last_login?: string;
  is_active: boolean;
}

class CloudDatabase {
  private client: any;
  private isCloud: boolean;

  constructor() {
    this.isCloud = !!(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN);
    
    if (this.isCloud) {
      // Use Turso (cloud SQLite)
      console.log('🌥️ Using Turso cloud SQLite database');
      this.client = createClient({
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      });
    } else {
      // Use local SQLite for development
      console.log('🔧 Using local SQLite database for development');
      const dbPath = path.join(process.cwd(), 'clients.db');
      this.client = new Database(dbPath);
    }
    
    this.initTables();
  }

  private async initTables() {
    const createClientsTable = `
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        patronageCount INTEGER DEFAULT 0,
        dateAdded TEXT NOT NULL,
        notes TEXT
      )
    `;

    const createPatronageTable = `
      CREATE TABLE IF NOT EXISTS patronage_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clientId INTEGER NOT NULL,
        date TEXT NOT NULL,
        notes TEXT,
        FOREIGN KEY (clientId) REFERENCES clients (id) ON DELETE CASCADE
      )
    `;

    const createAdminUsersTable = `
      CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin')) DEFAULT 'admin',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        last_login TEXT,
        is_active BOOLEAN DEFAULT 1
      )
    `;

    if (this.isCloud) {
      // Cloud database
      await this.client.execute(createClientsTable);
      await this.client.execute(createPatronageTable);
      await this.client.execute(createAdminUsersTable);
      await this.seedDefaultSuperAdmin();
    } else {
      // Local database
      this.client.exec(createClientsTable);
      this.client.exec(createPatronageTable);
      this.client.exec(createAdminUsersTable);
      this.seedDefaultSuperAdmin();
    }
  }

  private async seedDefaultSuperAdmin() {
    const checkQuery = 'SELECT COUNT(*) as count FROM admin_users';
    let existingAdmins: any;

    if (this.isCloud) {
      const result = await this.client.execute(checkQuery);
      existingAdmins = { count: result.rows[0]?.count || 0 };
    } else {
      existingAdmins = this.client.prepare(checkQuery).get() as { count: number };
    }
    
    if (existingAdmins.count === 0) {
      console.log('Creating default super admin user');
      const defaultPassword = 'admin123';
      const hashedPassword = bcrypt.hashSync(defaultPassword, 12);
      const adminId = uuidv4();
      const now = new Date().toISOString();
      
      const insertQuery = `
        INSERT INTO admin_users (id, username, email, password_hash, role, created_at, updated_at, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [
        adminId,
        'superadmin',
        'admin@unifiedmovingmaster.ca',
        hashedPassword,
        'super_admin',
        now,
        now,
        1
      ];

      if (this.isCloud) {
        await this.client.execute({
          sql: insertQuery,
          args: values
        });
      } else {
        this.client.prepare(insertQuery).run(...values);
      }
      
      console.log('Default super admin created with ID:', adminId);
    }
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    const query = `
      SELECT id, username, email, role, created_at, updated_at, last_login, is_active 
      FROM admin_users 
      ORDER BY created_at ASC
    `;

    if (this.isCloud) {
      const result = await this.client.execute(query);
      return result.rows.map((row: any) => ({
        id: row.id,
        username: row.username,
        email: row.email,
        role: row.role,
        created_at: row.created_at,
        updated_at: row.updated_at,
        last_login: row.last_login,
        is_active: !!row.is_active,
        password_hash: '' // Don't return password hash
      }));
    } else {
      const stmt = this.client.prepare(query);
      return stmt.all() as AdminUser[];
    }
  }

  async getAdminUserById(id: number | string): Promise<AdminUser | null> {
    const query = `
      SELECT id, username, email, role, created_at, updated_at, last_login, is_active 
      FROM admin_users 
      WHERE id = ?
    `;

    if (this.isCloud) {
      const result = await this.client.execute({
        sql: query,
        args: [id]
      });
      return result.rows[0] ? {
        id: result.rows[0].id,
        username: result.rows[0].username,
        email: result.rows[0].email,
        role: result.rows[0].role,
        created_at: result.rows[0].created_at,
        updated_at: result.rows[0].updated_at,
        last_login: result.rows[0].last_login,
        is_active: !!result.rows[0].is_active,
        password_hash: '' // Don't return password hash
      } : null;
    } else {
      const stmt = this.client.prepare(query);
      return stmt.get(id) as AdminUser | null;
    }
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | null> {
    const query = `SELECT * FROM admin_users WHERE username = ? AND is_active = 1`;

    if (this.isCloud) {
      const result = await this.client.execute({
        sql: query,
        args: [username]
      });
      return result.rows[0] ? {
        id: result.rows[0].id,
        username: result.rows[0].username,
        email: result.rows[0].email,
        password_hash: result.rows[0].password_hash,
        role: result.rows[0].role,
        created_at: result.rows[0].created_at,
        updated_at: result.rows[0].updated_at,
        last_login: result.rows[0].last_login,
        is_active: !!result.rows[0].is_active
      } : null;
    } else {
      const stmt = this.client.prepare(query);
      return stmt.get(username) as AdminUser | null;
    }
  }

  async createAdminUser(adminData: Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>): Promise<AdminUser> {
    const now = new Date().toISOString();
    const userId = uuidv4();
    
    const query = `
      INSERT INTO admin_users (id, username, email, password_hash, role, created_at, updated_at, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      userId,
      adminData.username,
      adminData.email,
      adminData.password_hash,
      adminData.role,
      now,
      now,
      adminData.is_active ? 1 : 0
    ];

    if (this.isCloud) {
      await this.client.execute({
        sql: query,
        args: values
      });
    } else {
      this.client.prepare(query).run(...values);
    }

    return {
      ...adminData,
      id: userId,
      created_at: now,
      updated_at: now
    };
  }

  // Add other methods as needed...
  // (You can add the rest of your CRUD operations following the same pattern)
}

// Singleton instance
let dbInstance: CloudDatabase | null = null;

export function getCloudDatabase(): CloudDatabase {
  if (!dbInstance) {
    dbInstance = new CloudDatabase();
  }
  return dbInstance;
}

export default CloudDatabase;