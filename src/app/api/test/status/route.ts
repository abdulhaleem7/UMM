import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET() {
  try {
    console.log('Status API: Checking database status');
    
    const db = getDatabase();
    
    // Check database connectivity
    const allClients = await db.getAllClients();
    const allAdmins = await db.getAllAdminUsers();
    
    return NextResponse.json({
      success: true,
      status: 'Database connected',
      clientsCount: allClients.length,
      adminsCount: allAdmins.length,
      databaseType: process.env.TURSO_DATABASE_URL ? 'Turso Cloud' : 'Local SQLite',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Status API: Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}