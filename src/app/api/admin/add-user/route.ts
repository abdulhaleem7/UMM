import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Database from '@/lib/database';

async function verifyAdminToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const db = new Database();
    const adminUser = await db.getAdminUserById(decoded.adminId);
    return adminUser;
  } catch (error) {
    return null;
  }
}

// POST /api/admin/add-user - Add a new admin user (Super Admin only)
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/admin/add-user - Starting request');
    const currentUser = await verifyAdminToken(request);
    console.log('Current user:', currentUser ? { id: currentUser.id, username: currentUser.username, role: currentUser.role } : 'null');
    
    if (!currentUser || currentUser.role !== 'super_admin') {
      console.log('Access denied - not super admin');
      return NextResponse.json({ error: 'Access denied. Super admin required.' }, { status: 403 });
    }

    const body = await request.json();
    const { username, email, password, role } = body;

    console.log('Adding new admin user:', { username, email, role });

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Username, email, and password are required' }, { status: 400 });
    }

    // Validate role
    if (role && !['admin', 'super_admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role. Must be "admin" or "super_admin"' }, { status: 400 });
    }

    const db = new Database();

    // Check if username or email already exists
    const existingUserByUsername = await db.getAdminUserByUsername(username);
    const existingUserByEmail = await db.getAdminUserByEmail(email);
    
    if (existingUserByUsername) {
      console.log('Username already exists:', username);
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
    }
    
    if (existingUserByEmail) {
      console.log('Email already exists:', email);
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    // Hash password
    console.log('Hashing password...');
    const passwordHash = bcrypt.hashSync(password, 12);

    // Create admin user
    const newAdminUser = await db.createAdminUser({
      username,
      email,
      password_hash: passwordHash,
      role: role || 'admin',
      is_active: true
    });

    console.log('Successfully created new admin user:', { id: newAdminUser.id, username: newAdminUser.username, email: newAdminUser.email, role: newAdminUser.role });

    // Remove password hash from response
    const { password_hash: _password_hash, ...safeUser } = newAdminUser;

    return NextResponse.json({ 
      success: true,
      message: 'Admin user created successfully',
      adminUser: safeUser
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json({ 
      error: 'Failed to create admin user',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}