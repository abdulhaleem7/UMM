import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getDatabase } from '@/lib/database';

// Middleware to check authentication
async function checkAuth(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return { error: 'No token provided', status: 401 };
  }

  const user = verifyToken(token);
  if (!user) {
    return { error: 'Invalid token', status: 401 };
  }

  return { user };
}

// GET - Fetch all clients (with pagination support)
export async function GET(request: NextRequest) {
  try {
    const authResult = await checkAuth(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { message: authResult.error },
        { status: authResult.status }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || 'all';

    const db = getDatabase();
    
    // Get paginated clients with search and filter
    const result = db.getPaginatedClients(page, limit, search, filter);

    return NextResponse.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Get clients error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Add new client
export async function POST(request: NextRequest) {
  try {
    const authResult = await checkAuth(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { message: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    const { name, email, phone, company, notes } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const newClient = {
      name,
      email,
      phone: phone || '',
      company: company || '',
      patronageCount: 0,
      dateAdded: new Date().toISOString(),
      notes: notes || ''
    };

    try {
      const client = db.addClient(newClient);
      return NextResponse.json({
        success: true,
        client,
        message: 'Client added successfully'
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        return NextResponse.json(
          { message: 'A client with this email already exists' },
          { status: 400 }
        );
      }
      throw error;
    }

  } catch (error) {
    console.error('Add client error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}