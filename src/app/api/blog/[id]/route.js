import { NextResponse } from 'next/server';
import blogPosts from '@/data/blog';

export async function GET(request, { params }) {
  const { id } = params;
  const post = blogPosts.find(post => post.id === parseInt(id));

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}
