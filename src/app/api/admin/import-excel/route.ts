import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import * as XLSX from 'xlsx';
import Database, { Client } from '@/lib/database';

export async function POST(request: NextRequest) {
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

    // Get the uploaded file
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Check if it's an Excel file
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      return NextResponse.json({ error: 'Please upload an Excel file (.xlsx or .xls)' }, { status: 400 });
    }

    // Read the file
    const fileBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    
    // Get the first worksheet
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    if (!jsonData || jsonData.length === 0) {
      return NextResponse.json({ error: 'Excel file is empty or invalid' }, { status: 400 });
    }

    // Validate and process the data
    const db = new Database();
    let importedCount = 0;
    let skippedCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < jsonData.length; i++) {
      const row = jsonData[i] as any;
      
      try {
        // Map Excel columns to Client interface
        const clientData: Partial<Client> = {
          name: row['Client Name'] || row['name'] || '',
          email: row['Email'] || row['email'] || '',
          phone: row['Phone'] || row['phone'] || '',
          patronageCount: parseInt(row['Patronage Count'] || row['patronageCount'] || '0') || 0,
          dateAdded: row['Date Added'] || row['dateAdded'] || new Date().toISOString().split('T')[0],
          lastPatronageDate: row['Last Patronage Date'] || row['lastPatronageDate'] || null,
          notes: row['Notes'] || row['notes'] || ''
        };

        // Validate required fields
        if (!clientData.name || !clientData.email) {
          errors.push(`Row ${i + 2}: Missing required fields (Name or Email)`);
          skippedCount++;
          continue;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(clientData.email)) {
          errors.push(`Row ${i + 2}: Invalid email format: ${clientData.email}`);
          skippedCount++;
          continue;
        }

        // Check if client already exists (by email)
        const existingClient = await db.getClientByEmail(clientData.email);
        if (existingClient) {
          // Update existing client
          await db.updateClient(existingClient.id!, clientData);
          importedCount++;
        } else {
          // Add new client
          await db.addClient(clientData as Client);
          importedCount++;
        }

      } catch (error) {
        console.error(`Error processing row ${i + 2}:`, error);
        errors.push(`Row ${i + 2}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        skippedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Import completed successfully`,
      summary: {
        totalRows: jsonData.length,
        imported: importedCount,
        skipped: skippedCount,
        errors: errors
      }
    });

  } catch (error) {
    console.error('Import Excel error:', error);
    return NextResponse.json({ 
      error: 'Failed to import Excel file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}