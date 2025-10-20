import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import * as XLSX from 'xlsx';
import Database, { Client } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Verify JWT token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get all clients from database
    const db = new Database();
    const clients = await db.getAllClients();

    // Prepare data for Excel
    const excelData = clients.map((client: Client) => ({
      ID: client.id,
      'Client Name': client.name,
      'Email': client.email,
      'Phone': client.phone || '',
      'Patronage Count': client.patronageCount,
      'Date Added': client.dateAdded,
      'Last Patronage Date': client.lastPatronageDate || '',
      'Notes': client.notes || ''
    }));

    // Create workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths for better readability
    const columnWidths = [
      { wch: 8 },   // ID
      { wch: 25 },  // Client Name
      { wch: 30 },  // Email
      { wch: 15 },  // Phone
      { wch: 15 },  // Patronage Count
      { wch: 20 },  // Date Added
      { wch: 20 },  // Last Patronage Date
      { wch: 30 }   // Notes
    ];
    worksheet['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'UMM Clients');

    // Generate Excel buffer
    const excelBuffer = XLSX.write(workbook, { 
      type: 'buffer', 
      bookType: 'xlsx',
      compression: true 
    });

    // Get current date for filename
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `UMM_Clients_Export_${currentDate}.xlsx`;

    // Return Excel file
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': excelBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Export Excel error:', error);
    return NextResponse.json({ 
      error: 'Failed to export Excel file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}