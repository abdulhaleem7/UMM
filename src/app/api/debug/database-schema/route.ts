import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET /api/debug/database-schema - Check current database schema
export async function GET() {
  try {
    console.log('DEBUG: Checking database schema');
    
    const db = getDatabase();
    
    // Get the actual table schema for admin_users
    const schemaQuery = "SELECT sql FROM sqlite_master WHERE type='table' AND name='admin_users'";
    const schemaResult = (db as any).db.prepare(schemaQuery).get();
    
    console.log('DEBUG: Current admin_users table schema:', schemaResult);
    
    // Get sample data to see current ID format
    const sampleQuery = "SELECT id, username, role FROM admin_users LIMIT 3";
    const sampleData = (db as any).db.prepare(sampleQuery).all();
    
    console.log('DEBUG: Sample admin users data:', sampleData);
    
    return NextResponse.json({
      debug: true,
      schema: schemaResult,
      sampleData: sampleData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('DEBUG: Error checking database schema:', error);
    return NextResponse.json({ 
      error: 'Schema check failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}