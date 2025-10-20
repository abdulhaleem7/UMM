import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getDatabase } from '@/lib/database';

// Helper function to verify JWT and get user info
async function verifyAdminToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const db = getDatabase();
    const adminUser = await db.getAdminUserById(decoded.adminId);
    return adminUser;
  } catch (error) {
    return null;
  }
}

// GET /api/admin/users - Get all admin users (Super Admin only)
export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/admin/users - Starting request');
    const currentUser = await verifyAdminToken(request);
    console.log('Current user:', currentUser ? { id: currentUser.id, username: currentUser.username, role: currentUser.role } : 'null');
    
    if (!currentUser || currentUser.role !== 'super_admin') {
      console.log('Access denied - not super admin');
      return NextResponse.json({ error: 'Access denied. Super admin required.' }, { status: 403 });
    }

    const db = getDatabase();
    const adminUsers = await db.getAllAdminUsers();
    console.log('Raw admin users from database:', adminUsers?.length || 0, 'users');
    
    // Remove password hashes from response
    const safeAdminUsers = adminUsers.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
      last_login: user.last_login,
      is_active: user.is_active
    }));

    console.log('Returning safe admin users:', safeAdminUsers?.length || 0, 'users');
    return NextResponse.json({ adminUsers: safeAdminUsers });
  } catch (error) {
    console.error('Get admin users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/users - Create new admin user (Super Admin only)
export async function POST(request: NextRequest) {
  try {
    const currentUser = await verifyAdminToken(request);
    
    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Access denied. Super admin required.' }, { status: 403 });
    }

    const { username, email, password, role } = await request.json();

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Username, email, and password are required' }, { status: 400 });
    }

    // Validate role
    if (role && !['admin', 'super_admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role. Must be "admin" or "super_admin"' }, { status: 400 });
    }

    const db = getDatabase();

    // Check if username or email already exists
    const existingUser = await db.getAdminUserByUsername(username) || await db.getAdminUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'Username or email already exists' }, { status: 409 });
    }

    // Hash password
    const passwordHash = bcrypt.hashSync(password, 12);

    // Create admin user
    const newAdminUser = await db.createAdminUser({
      username,
      email,
      password_hash: passwordHash,
      role: role || 'admin',
      is_active: true
    });

    console.log('Created new admin user:', { id: newAdminUser.id, username: newAdminUser.username, email: newAdminUser.email, role: newAdminUser.role });

    // Remove password hash from response
    const { password_hash: _password_hash, ...safeUser } = newAdminUser;

    return NextResponse.json({ 
      message: 'Admin user created successfully',
      adminUser: safeUser
    }, { status: 201 });

  } catch (error) {
    console.error('Create admin user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}