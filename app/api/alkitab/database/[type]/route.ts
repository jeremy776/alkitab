import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Fungsi untuk membaca file JSON
function readJsonFile(filePath: string) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

export async function GET(request: { url: string | URL; }, { params }: any) {
  const { type } = params;
  const { searchParams } = new URL(request.url);
  
  // Validasi parameter type
  if (!type || !['tb', 'tm'].includes(type)) {
    return NextResponse.json({
      error: 'Invalid type parameter',
      message: 'Type must be either "tb" or "tm"',
      validTypes: ['tb', 'tm']
    }, { status: 400 });
  }

  // Path ke file JSON
  const filePath = `database/indo_${type}.json`;

  try {
    const data = readJsonFile(filePath);
    
    if (!data) {
      return NextResponse.json({
        error: 'File not found',
        message: `Could not find or read ${type}.json file`,
        filePath: filePath
      }, { status: 404 });
    }
    
    // Optional query parameters
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset') as any
    const search = searchParams.get('search');
    const id = searchParams.get('id');
    
    let result = { ...data };
    
    // Jika data memiliki array items, lakukan filtering
    if (Array.isArray(result)) {
      // Jika data adalah array langsung
      let items = result;
      
      // Filter berdasarkan ID spesifik
      if (id) {
        const item = items.find(item => item.id == id);
        if (!item) {
          return NextResponse.json({
            error: 'Item not found',
            message: `Item with id ${id} not found`
          }, { status: 404 });
        }
        return NextResponse.json({
          success: true,
          data: item,
          meta: {
            type: type,
            requestTime: new Date().toISOString()
          }
        });
      }
      
      // Filter berdasarkan search
      if (search) {
        items = items.filter(item => {
          return Object.values(item).some(value => 
            String(value).toLowerCase().includes(search.toLowerCase())
          );
        });
      }
      
      // Pagination
      if (limit) {
        const limitNum = parseInt(limit);
        const offsetNum = parseInt(offset) || 0;
        items = items.slice(offsetNum, offsetNum + limitNum);
      }
      
      result = items;
    } else if (result.items && Array.isArray(result.items)) {
      // Jika data memiliki property items yang berupa array
      let items = result.items;
      
      if (id) {
        const item = items.find((item: { id: string; }) => item.id == id);
        if (!item) {
          return NextResponse.json({
            error: 'Item not found',
            message: `Item with id ${id} not found`
          }, { status: 404 });
        }
        return NextResponse.json({
          success: true,
          data: item,
          meta: {
            type: type,
            requestTime: new Date().toISOString()
          }
        });
      }
      
      if (search) {
        items = items.filter((item: { [s: string]: unknown; } | ArrayLike<unknown>) => {
          return Object.values(item).some(value => 
            String(value).toLowerCase().includes(search.toLowerCase())
          );
        });
      }
      
      if (limit) {
        const limitNum = parseInt(limit);
        const offsetNum = parseInt(offset) || 0;
        items = items.slice(offsetNum, offsetNum + limitNum);
      }
      
      result.items = items;
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        type: type,
        totalItems: Array.isArray(result) ? result.length : 
                    (result.items ? result.items.length : 1),
        requestTime: new Date().toISOString(),
        filePath: filePath
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Internal server error',
      // message: error.message
    }, { status: 500 });
  }
}