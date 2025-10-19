import Database from 'better-sqlite3';
import path from 'path';

export interface Client {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  patronageCount: number;
  dateAdded: string;
  lastPatronageDate?: string;
  notes?: string;
}

export interface PatronageRecord {
  id?: number;
  clientId: number;
  date: string;
  notes?: string;
}

export interface AdminUser {
  id?: number;
  username: string;
  email: string;
  password_hash: string;
  role: 'super_admin' | 'admin';
  created_at: string;
  updated_at: string;
  last_login?: string;
  is_active: boolean;
}

class ClientDatabase {
  private db: Database.Database;

  constructor() {
    // For Vercel deployment, use in-memory database if file system is read-only
    let dbPath;
    
    if (process.env.VERCEL) {
      // In Vercel, use in-memory database
      dbPath = ':memory:';
      console.log('Using in-memory SQLite database for Vercel deployment');
    } else {
      // Local development or other platforms with persistent storage
      dbPath = path.join(process.cwd(), 'clients.db');
      console.log('Using file-based SQLite database:', dbPath);
    }
    
    this.db = new Database(dbPath);
    this.initTables();
    
    // For in-memory database, seed with some initial data if needed
    if (process.env.VERCEL) {
      this.seedInitialData();
    }
  }

  private initTables() {
    // Create clients table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        patronageCount INTEGER DEFAULT 0,
        dateAdded TEXT NOT NULL,
        lastPatronageDate TEXT,
        notes TEXT
      )
    `);

    // Create patronage records table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS patronage_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clientId INTEGER NOT NULL,
        date TEXT NOT NULL,
        notes TEXT,
        FOREIGN KEY (clientId) REFERENCES clients (id) ON DELETE CASCADE
      )
    `);

    // Create admin users table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin')) DEFAULT 'admin',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        last_login TEXT,
        is_active BOOLEAN DEFAULT 1
      )
    `);

    // Seed default super admin if no admin users exist
    this.seedDefaultSuperAdmin();
  }

  private seedInitialData() {
    // Check if we already have data
    const existingClients = this.db.prepare('SELECT COUNT(*) as count FROM clients').get() as { count: number };
    
    if (existingClients.count === 0) {
      console.log('Seeding initial data for in-memory database');
      
      // Add some sample data for demonstration
      const sampleClient: Omit<Client, 'id'> = {
        name: 'Sample Client',
        email: 'sample@example.com',
        phone: '+1234567890',
        patronageCount: 0,
        dateAdded: new Date().toISOString(),
        notes: 'This is sample data for Vercel deployment'
      };

      this.addClient(sampleClient);
    }
  }

  // Client CRUD operations
  addClient(client: Omit<Client, 'id'>): Client {
    const stmt = this.db.prepare(`
      INSERT INTO clients (name, email, phone, patronageCount, dateAdded, lastPatronageDate, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      client.name,
      client.email,
      client.phone || null,
      client.patronageCount,
      client.dateAdded,
      client.lastPatronageDate || null,
      client.notes || null
    );

    return { ...client, id: result.lastInsertRowid as number };
  }

  getAllClients(): Client[] {
    const stmt = this.db.prepare('SELECT * FROM clients ORDER BY dateAdded DESC');
    return stmt.all() as Client[];
  }

  getClientById(id: number): Client | null {
    const stmt = this.db.prepare('SELECT * FROM clients WHERE id = ?');
    return stmt.get(id) as Client | null;
  }

  getClientByEmail(email: string): Client | null {
    const stmt = this.db.prepare('SELECT * FROM clients WHERE email = ?');
    return stmt.get(email) as Client | null;
  }

  updateClient(id: number, updates: Partial<Client>): boolean {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    const stmt = this.db.prepare(`UPDATE clients SET ${fields} WHERE id = ?`);
    const result = stmt.run(...values, id);
    
    return result.changes > 0;
  }

  deleteClient(id: number): boolean {
    const stmt = this.db.prepare('DELETE FROM clients WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  // Patronage operations
  addPatronageRecord(clientId: number, date: string, notes?: string): PatronageRecord {
    // Add patronage record
    const stmt = this.db.prepare(`
      INSERT INTO patronage_records (clientId, date, notes)
      VALUES (?, ?, ?)
    `);
    
    const result = stmt.run(clientId, date, notes || null);

    // Update client's patronage count and last patronage date
    const updateStmt = this.db.prepare(`
      UPDATE clients 
      SET patronageCount = patronageCount + 1, lastPatronageDate = ?
      WHERE id = ?
    `);
    updateStmt.run(date, clientId);

    return {
      id: result.lastInsertRowid as number,
      clientId,
      date,
      notes
    };
  }

  getPatronageRecords(clientId: number): PatronageRecord[] {
    const stmt = this.db.prepare(`
      SELECT * FROM patronage_records 
      WHERE clientId = ? 
      ORDER BY date DESC
    `);
    return stmt.all(clientId) as PatronageRecord[];
  }

  // Get clients for email campaigns
  getClientsForEmailCampaign(): Client[] {
    const stmt = this.db.prepare(`
      SELECT * FROM clients 
      WHERE email IS NOT NULL AND email != ''
      ORDER BY name
    `);
    return stmt.all() as Client[];
  }

  // Admin method to get all patronage records
  getAllPatronageRecords(): PatronageRecord[] {
    const stmt = this.db.prepare(`
      SELECT * FROM patronage_records 
      ORDER BY date DESC
    `);
    return stmt.all() as PatronageRecord[];
  }

  // Get database stats for admin
  getDatabaseStats() {
    const clientCount = this.db.prepare('SELECT COUNT(*) as count FROM clients').get() as { count: number };
    const patronageCount = this.db.prepare('SELECT COUNT(*) as count FROM patronage_records').get() as { count: number };
    
    return {
      totalClients: clientCount.count,
      totalPatronageRecords: patronageCount.count,
      databaseFile: 'clients.db'
    };
  }

  // Get paginated clients with search and filter
  getPaginatedClients(page: number = 1, limit: number = 10, search: string = '', filter: string = 'all') {
    const offset = (page - 1) * limit;
    
    // Build WHERE clause based on search and filter
    let whereClause = '';
    const params: any[] = [];
    
    if (search) {
      whereClause = 'WHERE (name LIKE ? OR email LIKE ? OR phone LIKE ?)';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }
    
    // Add filter conditions
    if (filter !== 'all') {
      const filterClause = whereClause ? ' AND ' : ' WHERE ';
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      switch (filter) {
        case 'recent':
          whereClause += `${filterClause}lastPatronageDate >= ?`;
          params.push(thirtyDaysAgo);
          break;
        case 'frequent':
          whereClause += `${filterClause}patronageCount >= ?`;
          params.push(5);
          break;
        case 'inactive':
          whereClause += `${filterClause}(lastPatronageDate IS NULL OR lastPatronageDate < ?)`;
          params.push(thirtyDaysAgo);
          break;
      }
    }
    
    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM clients ${whereClause}`;
    const totalCount = (this.db.prepare(countQuery).get(params) as { count: number }).count;
    
    // Get paginated results
    const dataQuery = `
      SELECT * FROM clients 
      ${whereClause} 
      ORDER BY dateAdded DESC 
      LIMIT ? OFFSET ?
    `;
    const clients = this.db.prepare(dataQuery).all([...params, limit, offset]) as Client[];
    
    const totalPages = Math.ceil(totalCount / limit);
    
    return {
      clients,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }

  // Admin method to execute raw SQL queries (use with caution)
  executeQuery(query: string, params?: any[]): any {
    const stmt = this.db.prepare(query);
    if (params) {
      return stmt.all(...params);
    }
    return stmt.all();
  }

  // Seed default super admin
  private seedDefaultSuperAdmin() {
    const existingAdmins = this.db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number };
    
    if (existingAdmins.count === 0) {
      console.log('Creating default super admin user');
      const bcrypt = require('bcryptjs');
      const defaultPassword = 'admin123'; // Default password
      const hashedPassword = bcrypt.hashSync(defaultPassword, 12);
      
      const now = new Date().toISOString();
      const stmt = this.db.prepare(`
        INSERT INTO admin_users (username, email, password_hash, role, created_at, updated_at, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        'superadmin',
        'admin@unifiedmovingmaster.ca',
        hashedPassword,
        'super_admin',
        now,
        now,
        1
      );
      
      console.log('Default super admin created: username: superadmin, password: admin123');
    }
  }

  // Admin User Management Methods
  getAllAdminUsers(): AdminUser[] {
    const stmt = this.db.prepare(`
      SELECT id, username, email, role, created_at, updated_at, last_login, is_active 
      FROM admin_users 
      ORDER BY created_at ASC
    `);
    return stmt.all() as AdminUser[];
  }

  getAdminUserById(id: number): AdminUser | null {
    const stmt = this.db.prepare(`
      SELECT id, username, email, role, created_at, updated_at, last_login, is_active 
      FROM admin_users 
      WHERE id = ?
    `);
    return stmt.get(id) as AdminUser | null;
  }

  getAdminUserWithPassword(id: number): AdminUser | null {
    const stmt = this.db.prepare(`
      SELECT * FROM admin_users WHERE id = ? AND is_active = 1
    `);
    return stmt.get(id) as AdminUser | null;
  }

  getAdminUserByUsername(username: string): AdminUser | null {
    const stmt = this.db.prepare(`
      SELECT * FROM admin_users WHERE username = ? AND is_active = 1
    `);
    return stmt.get(username) as AdminUser | null;
  }

  getAdminUserByEmail(email: string): AdminUser | null {
    const stmt = this.db.prepare(`
      SELECT * FROM admin_users WHERE email = ? AND is_active = 1
    `);
    return stmt.get(email) as AdminUser | null;
  }

  createAdminUser(adminData: Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>): AdminUser {
    const now = new Date().toISOString();
    const stmt = this.db.prepare(`
      INSERT INTO admin_users (username, email, password_hash, role, created_at, updated_at, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      adminData.username,
      adminData.email,
      adminData.password_hash,
      adminData.role,
      now,
      now,
      adminData.is_active ? 1 : 0
    );

    return {
      ...adminData,
      id: result.lastInsertRowid as number,
      created_at: now,
      updated_at: now
    };
  }

  updateAdminUser(id: number, updates: Partial<AdminUser>): boolean {
    const now = new Date().toISOString();
    const updateData = { ...updates, updated_at: now };
    
    const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updateData);
    
    const stmt = this.db.prepare(`UPDATE admin_users SET ${fields} WHERE id = ?`);
    const result = stmt.run(...values, id);
    
    return result.changes > 0;
  }

  deleteAdminUser(id: number): boolean {
    // Prevent deletion of the last super admin
    const superAdminCount = this.db.prepare('SELECT COUNT(*) as count FROM admin_users WHERE role = ? AND is_active = 1').get('super_admin') as { count: number };
    const userToDelete = this.getAdminUserById(id);
    
    if (userToDelete?.role === 'super_admin' && superAdminCount.count <= 1) {
      throw new Error('Cannot delete the last super admin');
    }
    
    const stmt = this.db.prepare('DELETE FROM admin_users WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  updateLastLogin(userId: number): boolean {
    const now = new Date().toISOString();
    const stmt = this.db.prepare('UPDATE admin_users SET last_login = ? WHERE id = ?');
    const result = stmt.run(now, userId);
    return result.changes > 0;
  }

  changePassword(userId: number, newPasswordHash: string): boolean {
    const now = new Date().toISOString();
    const stmt = this.db.prepare('UPDATE admin_users SET password_hash = ?, updated_at = ? WHERE id = ?');
    const result = stmt.run(newPasswordHash, now, userId);
    return result.changes > 0;
  }

  close() {
    this.db.close();
  }
}

// Singleton instance
let dbInstance: ClientDatabase | null = null;

export function getDatabase(): ClientDatabase {
  if (!dbInstance) {
    dbInstance = new ClientDatabase();
  }
  return dbInstance;
}

export default ClientDatabase;