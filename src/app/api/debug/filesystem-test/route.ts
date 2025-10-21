import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const results = [];
    
    // Test 1: Current working directory
    const cwd = process.cwd();
    results.push({ test: 'Current Working Directory', value: cwd });
    
    // Test 2: Check if current directory is writable
    try {
      const testFile = path.join(cwd, 'test-write.tmp');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      results.push({ test: 'CWD Writable', value: '✅ Yes' });
    } catch (error) {
      results.push({ test: 'CWD Writable', value: '❌ No - ' + (error as Error).message });
    }
    
    // Test 3: Check /tmp directory
    try {
      const testFile = '/tmp/test-write.tmp';
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      results.push({ test: '/tmp Writable', value: '✅ Yes' });
    } catch (error) {
      results.push({ test: '/tmp Writable', value: '❌ No - ' + (error as Error).message });
    }
    
    // Test 4: What would happen with ./clients.db
    const localDbPath = path.join(cwd, 'clients.db');
    results.push({ test: './clients.db resolves to', value: localDbPath });
    
    // Test 5: Environment info
    results.push({ test: 'VERCEL env var', value: process.env.VERCEL || 'not set' });
    results.push({ test: 'NODE_ENV', value: process.env.NODE_ENV || 'not set' });
    results.push({ test: 'DATABASE_PATH env var', value: process.env.DATABASE_PATH || 'not set' });
    
    return NextResponse.json({
      environment: process.env.VERCEL ? 'Vercel' : 'Local',
      tests: results,
      recommendation: process.env.VERCEL 
        ? 'Use /tmp/clients.db or cloud database for Vercel'
        : './clients.db works fine locally'
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Test failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}