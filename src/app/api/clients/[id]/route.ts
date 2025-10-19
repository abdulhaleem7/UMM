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

// PUT - Update client
export async function PUT(request: NextRequest, { params }: Params) {
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
    const updates = await request.json();

    if (!clientId || isNaN(clientId)) {
      return NextResponse.json(
        { message: 'Invalid client ID' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // Check if client exists
    const existingClient = db.getClientById(clientId);
    if (!existingClient) {
      return NextResponse.json(
        { message: 'Client not found' },
        { status: 404 }
      );
    }

    // Validate email uniqueness if email is being updated
    if (updates.email && updates.email !== existingClient.email) {
      const emailExists = db.getAllClients().some(client => 
        client.email === updates.email && client.id !== clientId
      );
      
      if (emailExists) {
        return NextResponse.json(
          { message: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    // Update client
    const success = db.updateClient(clientId, updates);

    if (success) {
      const updatedClient = db.getClientById(clientId);
      return NextResponse.json({
        success: true,
        client: updatedClient,
        message: 'Client updated successfully'
      });
    } else {
      return NextResponse.json(
        { message: 'Failed to update client' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Update client error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete client
export async function DELETE(request: NextRequest, { params }: Params) {
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

    if (!clientId || isNaN(clientId)) {
      return NextResponse.json(
        { message: 'Invalid client ID' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // Check if client exists
    const existingClient = db.getClientById(clientId);
    if (!existingClient) {
      return NextResponse.json(
        { message: 'Client not found' },
        { status: 404 }
      );
    }

    // Delete client
    const success = db.deleteClient(clientId);

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Client deleted successfully'
      });
    } else {
      return NextResponse.json(
        { message: 'Failed to delete client' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Delete client error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}