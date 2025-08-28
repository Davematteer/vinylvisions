import { NextResponse } from 'next/server';
import postgres from 'postgres';

export async function GET() {
  const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });
  const response = await sql`SELECT * from users`;
  return NextResponse.json(response);
}

