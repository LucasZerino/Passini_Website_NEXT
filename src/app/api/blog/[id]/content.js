import { NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';

export async function GET(request, { params }) {
  const { id } = params;
  const filePath = path.resolve('public/data', `${id}.md`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json({ content: fileContent });
  } catch (error) {
    return NextResponse.json({ message: 'File not found' }, { status: 404 });
  }
}
