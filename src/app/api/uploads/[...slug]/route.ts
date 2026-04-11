import { readFile } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const resolvedParams = await params
  const filename = resolvedParams.slug.join('/')
  // Only allow simple filenames — no path traversal
  if (filename.includes('..') || filename.includes('/')) {
    return new NextResponse('Not found', { status: 404 })
  }

  const filePath = join('/tmp/voxtalent-uploads', filename)

  try {
    const data = await readFile(filePath)
    const ext = filename.split('.').pop()?.toLowerCase() ?? ''

    const contentTypeMap: Record<string, string> = {
      pdf: 'application/pdf',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      mp4: 'video/mp4',
      webm: 'video/webm',
      mov: 'video/quicktime',
      avi: 'video/x-msvideo',
    }

    const contentType = contentTypeMap[ext] ?? 'application/octet-stream'

    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${filename}"`,
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
