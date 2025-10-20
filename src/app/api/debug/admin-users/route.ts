import { NextRequest, NextResponse } from 'next/server';
import Database from '@/lib/database';

export async function GET() {
  try {
    console.log('DEBUG: Starting admin users debug endpoint');
    
    const db = new Database();
    
    // Test the getAllAdminUsers method
    const adminUsers = db.getAllAdminUsers();
    console.log('DEBUG: Admin users from getAllAdminUsers method:', adminUsers?.length || 0, 'users');
    
    // Also try to check if database exists and is accessible
    const testUser = db.getAdminUserById(1);
    console.log('DEBUG: Test user by ID 1:', testUser ? 'found' : 'not found');
    
    return NextResponse.json({
      debug: true,
      adminUsersCount: adminUsers?.length || 0,
      adminUsers: adminUsers,
      testUserById1: testUser ? { id: testUser.id, username: testUser.username } : null,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('DEBUG: Error in admin users debug:', error);
    return NextResponse.json({ 
      error: 'Debug failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}