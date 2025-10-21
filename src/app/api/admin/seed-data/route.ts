import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST() {
  try {
    console.log('Seed API: Starting seed data creation');
    
    const db = getDatabase();
    
    // Check if clients already exist
    const existingClients = await db.getAllClients();
    
    if (existingClients.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Sample data already exists',
        existingClientsCount: existingClients.length
      });
    }
    
    console.log('Seed API: Creating sample clients');
    
    // Sample clients data that the UI can use
    const sampleClients = [
      {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1-416-555-0101',
        patronageCount: 3,
        dateAdded: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        lastPatronageDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Regular customer, prefers early morning appointments'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@gmail.com',
        phone: '+1-647-555-0202',
        patronageCount: 1,
        dateAdded: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        lastPatronageDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'New client, moving from downtown Toronto to Mississauga'
      },
      {
        name: 'Michael Brown',
        email: 'mike.brown@outlook.com',
        phone: '+1-905-555-0303',
        patronageCount: 5,
        dateAdded: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        lastPatronageDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'VIP customer, owns multiple properties, books quarterly moves'
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@yahoo.com',
        phone: '+1-416-555-0404',
        patronageCount: 2,
        dateAdded: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        lastPatronageDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Reliable client, always books in advance'
      },
      {
        name: 'David Wilson',
        email: 'david.wilson@company.com',
        phone: '+1-289-555-0505',
        patronageCount: 1,
        dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        lastPatronageDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Corporate client, office relocation'
      },
      {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@email.com',
        phone: '+1-905-555-0606',
        patronageCount: 4,
        dateAdded: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        lastPatronageDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Repeat customer, family moves and downsizing'
      },
      {
        name: 'Robert Taylor',
        email: 'rob.taylor@gmail.com',
        phone: '+1-647-555-0707',
        patronageCount: 1,
        dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        lastPatronageDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'First-time customer, student moving to new apartment'
      },
      {
        name: 'Jennifer Martinez',
        email: 'jen.martinez@outlook.com',
        phone: '+1-416-555-0808',
        patronageCount: 6,
        dateAdded: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
        lastPatronageDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Loyal customer, real estate agent who refers clients'
      },
      {
        name: 'James Thompson',
        email: 'james.thompson@business.ca',
        phone: '+1-289-555-0909',
        patronageCount: 2,
        dateAdded: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        lastPatronageDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Business owner, seasonal moves for inventory'
      },
      {
        name: 'Amanda White',
        email: 'amanda.white@email.com',
        phone: '+1-905-555-1010',
        patronageCount: 1,
        dateAdded: new Date().toISOString(),
        lastPatronageDate: new Date().toISOString(),
        notes: 'New client, just completed first move today'
      }
    ];

    const createdClients = [];
    
    // Create each client
    for (const clientData of sampleClients) {
      try {
        const client = await db.addClient(clientData);
        createdClients.push(client);
        
        // Add some patronage records for clients with multiple visits
        if (clientData.patronageCount > 1) {
          for (let i = 1; i < clientData.patronageCount; i++) {
            const patronageDate = new Date(
              new Date(clientData.dateAdded).getTime() + (i * 14 * 24 * 60 * 60 * 1000)
            ).toISOString();
            
            await db.addPatronageRecord(
              client.id!, 
              patronageDate, 
              `Visit #${i + 1} - ${i % 2 === 0 ? 'Residential move' : 'Office relocation'}`
            );
          }
        }
      } catch (error) {
        console.error('Error creating client:', clientData.name, error);
      }
    }
    
    console.log('Seed API: Sample data created successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Sample data created successfully',
      clientsCreated: createdClients.length,
      clients: createdClients.map(c => ({
        id: c.id,
        name: c.name,
        email: c.email,
        patronageCount: c.patronageCount
      }))
    });
    
  } catch (error) {
    console.error('Seed API: Error creating sample data:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create sample data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}