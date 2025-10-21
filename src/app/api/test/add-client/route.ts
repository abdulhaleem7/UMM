import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST() {
  try {
    console.log('Test API: Testing database operations');
    
    const db = getDatabase();
    
    // Test adding a simple client
    const testClient = {
      name: 'Test Client',
      email: `test${Date.now()}@example.com`,
      phone: '+1234567890',
      patronageCount: 0,
      dateAdded: new Date().toISOString(),
      notes: 'Test client for debugging'
    };

    console.log('Test API: Adding test client:', testClient);
    const result = await db.addClient(testClient);
    console.log('Test API: Client added:', result);
    
    return NextResponse.json({
      success: true,
      message: 'Test client added successfully',
      client: result
    });
    
  } catch (error) {
    console.error('Test API: Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}