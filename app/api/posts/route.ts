import { NextRequest, NextResponse } from 'next/server';
import getMongoClient from '@/lib/mongodb';

const dbName = process.env.MONGODB_DB_NAME || 'cjp_social';

export async function GET() {
  const client = await getMongoClient();
  const db = client.db(dbName);
  const posts = await db
    .collection('posts')
    .find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();

  return NextResponse.json(posts.map((p) => ({ ...p, _id: p._id.toString() })));
}

export async function POST(req: NextRequest) {
  const { caption, mediaUrl } = await req.json();

  if (!mediaUrl || typeof mediaUrl !== 'string') {
    return NextResponse.json({ error: 'mediaUrl is required.' }, { status: 400 });
  }

  const client = await getMongoClient();
  const db = client.db(dbName);

  const result = await db.collection('posts').insertOne({
    caption: typeof caption === 'string' ? caption.slice(0, 280) : '',
    mediaUrl,
    createdAt: new Date()
  });

  return NextResponse.json({ insertedId: result.insertedId.toString() });
}
