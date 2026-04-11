import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    environment: process.env.VERCEL ? 'vercel' : 'local',
    variables_present: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      TURSO_DATABASE_URL: !!process.env.TURSO_DATABASE_URL,
      TURSO_AUTH_TOKEN: !!process.env.TURSO_AUTH_TOKEN,
    },
  });
}
