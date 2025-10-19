import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
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

// POST /api/admin/change-password - Change admin user password
export async function POST(request: NextRequest) {
  try {
    const currentUser = await verifyAdminToken(request);
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 });
    }

    // Validate new password strength
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters long' }, { status: 400 });
    }

    const db = new Database();

    // Get user with password hash for verification
    const userWithPassword = await db.getAdminUserWithPassword(currentUser.id!);
    if (!userWithPassword) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify current password
    const isCurrentPasswordValid = bcrypt.compareSync(currentPassword, userWithPassword.password_hash);
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    // Hash new password
    const newPasswordHash = bcrypt.hashSync(newPassword, 12);

    // Update password
    const success = await db.changePassword(currentUser.id!, newPasswordHash);
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}