import { challenges } from '@/lib/data'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const type = searchParams.get('type')

  let result = challenges

  if (status) {
    result = result.filter(c => c.status === status)
  }
  if (type) {
    result = result.filter(c => c.type === type)
  }

  return Response.json({
    data: result,
    total: result.length,
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  // In production: validate with Zod and save to DB via Prisma
  console.log('New challenge posted:', body)
  return Response.json({ success: true, id: `ch${Date.now()}`, message: 'Challenge created' }, { status: 201 })
}
