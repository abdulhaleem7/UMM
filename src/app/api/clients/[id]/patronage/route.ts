import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getDatabase } from '@/lib/database';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

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

// POST - Add patronage record for a client
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const authResult = await checkAuth(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { message: authResult.error },
        { status: authResult.status }
      );
    }

    const resolvedParams = await params;
    const clientId = parseInt(resolvedParams.id);
    const body = await request.json();
    const { date, notes } = body;

    if (!date) {
      return NextResponse.json(
        { message: 'Date is required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // Check if client exists
    const client = await db.getClientById(clientId);
    if (!client) {
      return NextResponse.json(
        { message: 'Client not found' },
        { status: 404 }
      );
    }

    const patronageRecord = await db.addPatronageRecord(clientId, date, notes);

    return NextResponse.json({
      success: true,
      patronageRecord,
      message: 'Patronage recorded successfully'
    });

  } catch (error) {
    console.error('Add patronage error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get patronage records for a client
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const authResult = await checkAuth(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { message: authResult.error },
        { status: authResult.status }
      );
    }

    const resolvedParams = await params;
    const clientId = parseInt(resolvedParams.id);
    const db = getDatabase();
    
    // Check if client exists
    const client = await db.getClientById(clientId);
    if (!client) {
      return NextResponse.json(
        { message: 'Client not found' },
        { status: 404 }
      );
    }

    const patronageRecords = await db.getPatronageRecords(clientId);

    return NextResponse.json({
      success: true,
      patronageRecords
    });

  } catch (error) {
    console.error('Get patronage records error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}