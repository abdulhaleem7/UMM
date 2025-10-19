import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
import Database from '@/lib/database';

// Helper function to verify JWT and get user info
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

// PUT /api/admin/users/[id] - Update admin user (Super Admin only)
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const currentUser = await verifyAdminToken(request);
    
    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Access denied. Super admin required.' }, { status: 403 });
    }

    const { username, email, role, is_active } = await request.json();
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const db = new Database();
    const userToUpdate = await db.getAdminUserById(userId);
    
    if (!userToUpdate) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    // Prevent super admin from demoting themselves if they're the only super admin
    if (userToUpdate.id === currentUser.id && userToUpdate.role === 'super_admin' && role === 'admin') {
      const superAdminCount = (await db.getAllAdminUsers()).filter(u => u.role === 'super_admin' && u.is_active).length;
      if (superAdminCount <= 1) {
        return NextResponse.json({ error: 'Cannot demote the last super admin' }, { status: 400 });
      }
    }

    // Build update object
    const updates: Record<string, string | boolean> = {};
    if (username !== undefined) updates.username = username;
    if (email !== undefined) updates.email = email;
    if (role !== undefined) updates.role = role;
    if (is_active !== undefined) updates.is_active = is_active;

    const success = await db.updateAdminUser(userId, updates);
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to update admin user' }, { status: 500 });
    }

    const updatedUser = await db.getAdminUserById(userId);
    const { password_hash: _password_hash, ...safeUser } = updatedUser!;

    return NextResponse.json({ 
      message: 'Admin user updated successfully',
      adminUser: safeUser
    });

  } catch (error) {
    console.error('Update admin user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/users/[id] - Delete admin user (Super Admin only)
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const currentUser = await verifyAdminToken(request);
    
    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Access denied. Super admin required.' }, { status: 403 });
    }

    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Prevent self-deletion
    if (userId === currentUser.id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    const db = new Database();
    
    try {
      const success = await db.deleteAdminUser(userId);
      
      if (!success) {
        return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Admin user deleted successfully' });
    } catch (error) {
      if (error instanceof Error && error.message === 'Cannot delete the last super admin') {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      throw error;
    }

  } catch (error) {
    console.error('Delete admin user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}