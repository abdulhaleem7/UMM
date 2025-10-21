import { createClient } from '@libsql/client';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

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
  id?: number | string; // Support both number (legacy) and string (UUID)
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
  private db: any; // Turso client

  constructor() {
    // Always use Turso cloud database
    if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
      throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables are required');
    }
    
    this.db = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });
    
    // Initialize tables
    this.initTables().catch(console.error);
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
        lastPatronageDate TEXT,
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

    // Create tables using cloud database
    await this.db.execute(createClientsTable);
    await this.db.execute(createPatronageTable);
    await this.db.execute(createAdminUsersTable);
    await this.seedDefaultSuperAdmin();
  }

  private async seedInitialData() {
    try {
      // Check if we already have data
      const result = await this.db.execute('SELECT COUNT(*) as count FROM clients');
      const existingClients = { count: result.rows[0]?.count || 0 };
      
      if (existingClients.count === 0) {
        // Add some sample data for demonstration
        const sampleClient: Omit<Client, 'id'> = {
          name: 'Sample Client',
          email: 'sample@example.com',
          phone: '+1234567890',
          patronageCount: 0,
          dateAdded: new Date().toISOString(),
          notes: 'This is sample data for Vercel deployment'
        };

        await this.addClient(sampleClient);
      }
    } catch (error) {
      console.error('Error seeding initial data:', error);
    }
  }

  // Client CRUD operations
  async addClient(client: Omit<Client, 'id'>): Promise<Client> {
    try {
      const result = await this.db.execute({
        sql: `INSERT INTO clients (name, email, phone, patronageCount, dateAdded, lastPatronageDate, notes)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          client.name,
          client.email,
          client.phone || null,
          client.patronageCount,
          client.dateAdded,
          client.lastPatronageDate || null,
          client.notes || null
        ]
      });
      
      // For Turso cloud database, get the inserted record by email since it's unique
      const getResult = await this.db.execute({
        sql: 'SELECT * FROM clients WHERE email = ? ORDER BY ROWID DESC LIMIT 1',
        args: [client.email]
      });
      
      if (getResult.rows && getResult.rows.length > 0) {
        return getResult.rows[0] as Client;
      } else {
        // Fallback: return with a temporary ID
        return { ...client, id: Date.now() };
      }
    } catch (error) {
      console.error('Error adding client to cloud DB:', error);
      throw error;
    }
  }

  async getAllClients(): Promise<Client[]> {
    const result = await this.db.execute('SELECT * FROM clients ORDER BY dateAdded DESC');
    return result.rows as Client[];
  }

  async getClientById(id: number): Promise<Client | null> {
    const result = await this.db.execute({
      sql: 'SELECT * FROM clients WHERE id = ?',
      args: [id]
    });
    return result.rows.length > 0 ? result.rows[0] as Client : null;
  }

  async getClientByEmail(email: string): Promise<Client | null> {
    const result = await this.db.execute({
      sql: 'SELECT * FROM clients WHERE email = ?',
      args: [email]
    });
    return result.rows.length > 0 ? result.rows[0] as Client : null;
  }

  async updateClient(id: number, updates: Partial<Client>): Promise<boolean> {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    const result = await this.db.execute({
      sql: `UPDATE clients SET ${fields} WHERE id = ?`,
      args: [...values, id]
    });
    
    return result.rowsAffected > 0;
  }

  async deleteClient(id: number): Promise<boolean> {
    const result = await this.db.execute({
      sql: 'DELETE FROM clients WHERE id = ?',
      args: [id]
    });
    return result.rowsAffected > 0;
  }

  // Patronage operations
  async addPatronageRecord(clientId: number, date: string, notes?: string): Promise<PatronageRecord> {
    // Add patronage record
    const result = await this.db.execute({
      sql: `INSERT INTO patronage_records (clientId, date, notes)
            VALUES (?, ?, ?)`,
      args: [clientId, date, notes || null]
    });

    // Update client's patronage count and last patronage date
    await this.db.execute({
      sql: `UPDATE clients 
            SET patronageCount = patronageCount + 1, lastPatronageDate = ?
            WHERE id = ?`,
      args: [date, clientId]
    });

    return {
      id: Number(result.lastInsertRowid),
      clientId,
      date,
      notes
    };
  }

  async getPatronageRecords(clientId: number): Promise<PatronageRecord[]> {
    const result = await this.db.execute({
      sql: `SELECT * FROM patronage_records 
            WHERE clientId = ? 
            ORDER BY date DESC`,
      args: [clientId]
    });
    return result.rows as PatronageRecord[];
  }

  // Get clients for email campaigns
  async getClientsForEmailCampaign(): Promise<Client[]> {
    const result = await this.db.execute({
      sql: `SELECT * FROM clients 
            WHERE email IS NOT NULL AND email != ''
            ORDER BY name`,
      args: []
    });
    return result.rows as Client[];
  }

  // Admin method to get all patronage records
  async getAllPatronageRecords(): Promise<PatronageRecord[]> {
    const result = await this.db.execute({
      sql: `SELECT * FROM patronage_records 
            ORDER BY date DESC`,
      args: []
    });
    return result.rows as PatronageRecord[];
  }

  // Get database stats for admin
  async getDatabaseStats() {
    const clientCountResult = await this.db.execute({
      sql: 'SELECT COUNT(*) as count FROM clients',
      args: []
    });
    const patronageCountResult = await this.db.execute({
      sql: 'SELECT COUNT(*) as count FROM patronage_records',
      args: []
    });
    
    const clientCount = clientCountResult.rows[0] as { count: number };
    const patronageCount = patronageCountResult.rows[0] as { count: number };
    
    return {
      totalClients: clientCount.count,
      totalPatronageRecords: patronageCount.count,
      databaseFile: 'Turso Cloud Database'
    };
  }

  // Get paginated clients with search and filter
  async getPaginatedClients(page: number = 1, limit: number = 10, search: string = '', filter: string = 'all') {
    const offset = (page - 1) * limit;
    
    // Build WHERE clause based on search and filter
    let whereClause = '';
    const params: (string | number)[] = [];
    
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
    const countResult = await this.db.execute({
      sql: countQuery,
      args: params
    });
    const totalCount = countResult.rows[0]?.count || 0;
    
    // Get paginated results
    const dataQuery = `
      SELECT * FROM clients 
      ${whereClause} 
      ORDER BY dateAdded DESC 
      LIMIT ? OFFSET ?
    `;
    
    const result = await this.db.execute({
      sql: dataQuery,
      args: [...params, limit, offset]
    });
    const clients = result.rows as Client[];
    
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
  async executeQuery(query: string, params?: (string | number)[]): Promise<unknown> {
    const result = await this.db.execute({
      sql: query,
      args: params || []
    });
    return result.rows;
  }

  // Ensure admin exists (for Vercel temporary storage)
  private async ensureAdminExists() {
    const result = await this.db.execute('SELECT COUNT(*) as count FROM admin_users');
    const existingAdmins = { count: result.rows[0]?.count || 0 };
    
    if (existingAdmins.count === 0) {
      await this.seedDefaultSuperAdmin();
    }
  }

  // Seed default super admin
  private async seedDefaultSuperAdmin() {
    try {
      const result = await this.db.execute('SELECT COUNT(*) as count FROM admin_users');
      const existingAdmins = { count: result.rows[0]?.count || 0 };
      
      if (existingAdmins.count === 0) {
        const defaultPassword = 'admin123'; // Default password
        const hashedPassword = bcrypt.hashSync(defaultPassword, 12);
        const adminId = uuidv4(); // Generate UUID for default admin
        
        const now = new Date().toISOString();
        
        await this.db.execute({
          sql: `INSERT INTO admin_users (id, username, email, password_hash, role, created_at, updated_at, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [adminId, 'superadmin', 'admin@unifiedmovingmaster.ca', hashedPassword, 'super_admin', now, now, 1]
        });
      }
    } catch (error) {
      console.error('Error seeding default super admin:', error);
    }
  }

  // Admin User Management Methods
  async getAllAdminUsers(): Promise<AdminUser[]> {
    try {
      const result = await this.db.execute(`
        SELECT id, username, email, role, created_at, updated_at, last_login, is_active 
        FROM admin_users 
        ORDER BY created_at ASC
      `);
      
      const results = result.rows.map((row: any) => ({
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
      
      return results;
    } catch (error) {
      console.error('Database.getAllAdminUsers() - Error:', error);
      throw error;
    }
  }

  async getAdminUserById(id: number | string): Promise<AdminUser | null> {
    const result = await this.db.execute({
      sql: `SELECT id, username, email, role, created_at, updated_at, last_login, is_active 
            FROM admin_users 
            WHERE id = ?`,
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
  }

  async getAdminUserWithPassword(id: number | string): Promise<AdminUser | null> {
    const result = await this.db.execute({
      sql: 'SELECT * FROM admin_users WHERE id = ? AND is_active = 1',
      args: [id]
    });
    return result.rows.length > 0 ? result.rows[0] as AdminUser : null;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | null> {
    const result = await this.db.execute({
      sql: 'SELECT * FROM admin_users WHERE username = ? AND is_active = 1',
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
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | null> {
    const result = await this.db.execute({
      sql: 'SELECT * FROM admin_users WHERE email = ? AND is_active = 1',
      args: [email]
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
  }

  async createAdminUser(adminData: Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>): Promise<AdminUser> {
    try {
      const now = new Date().toISOString();
      const userId = uuidv4(); // Generate UUID for the new user
      
      await this.db.execute({
        sql: `INSERT INTO admin_users (id, username, email, password_hash, role, created_at, updated_at, is_active)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [userId, adminData.username, adminData.email, adminData.password_hash, adminData.role, now, now, adminData.is_active ? 1 : 0]
      });

      const newUser = {
        ...adminData,
        id: userId,
        created_at: now,
        updated_at: now
      };

      return newUser;
    } catch (error) {
      console.error('Database.createAdminUser() - Error:', error);
      throw error;
    }
  }

  async updateAdminUser(id: number | string, updates: Partial<AdminUser>): Promise<boolean> {
    const now = new Date().toISOString();
    const updateData = { ...updates, updated_at: now };
    
    const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updateData);
    
    const result = await this.db.execute({
      sql: `UPDATE admin_users SET ${fields} WHERE id = ?`,
      args: [...values, id]
    });
    return result.rowsAffected > 0;
  }

  async deleteAdminUser(id: number | string): Promise<boolean> {
    // Prevent deletion of the last super admin
    const userToDelete = await this.getAdminUserById(id);
    
    if (userToDelete?.role === 'super_admin') {
      const result = await this.db.execute({
        sql: 'SELECT COUNT(*) as count FROM admin_users WHERE role = ? AND is_active = 1',
        args: ['super_admin']
      });
      const superAdminCount = { count: result.rows[0]?.count || 0 };
      
      if (superAdminCount.count <= 1) {
        throw new Error('Cannot delete the last super admin');
      }
    }
    
    const result = await this.db.execute({
      sql: 'DELETE FROM admin_users WHERE id = ?',
      args: [id]
    });
    return result.rowsAffected > 0;
  }

  async updateLastLogin(userId: number | string): Promise<boolean> {
    const now = new Date().toISOString();
    
    const result = await this.db.execute({
      sql: 'UPDATE admin_users SET last_login = ? WHERE id = ?',
      args: [now, userId]
    });
    return result.rowsAffected > 0;
  }

  async changePassword(userId: number | string, newPasswordHash: string): Promise<boolean> {
    const now = new Date().toISOString();
    
    const result = await this.db.execute({
      sql: 'UPDATE admin_users SET password_hash = ?, updated_at = ? WHERE id = ?',
      args: [newPasswordHash, now, userId]
    });
    return result.rowsAffected > 0;
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