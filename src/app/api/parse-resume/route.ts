// app/api/resume/parse/route.ts

import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import pdf from 'pdf-parse-fork';
import { parseResumeAsync } from '@/lib/resume-parser';

const resumeStore = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const data = await pdf(buffer);
    
    console.log('[API] PDF extracted, parsing with AI...');
    
    const resumeData = await parseResumeAsync(data.text);
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const fullData = { ...resumeData, id };
    
    resumeStore.set(id, fullData);
    console.log('[API] Resume parsed successfully, projects:', fullData.projects.length);

    return NextResponse.json({
      success: true,
      id,
      data: fullData
    });

  } catch (error) {
    console.error('[API] Parse error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to parse PDF', 
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
  }
  
  const data = resumeStore.get(id);
  
  if (!data) {
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }
  
  return NextResponse.json({ success: true, data });
}
