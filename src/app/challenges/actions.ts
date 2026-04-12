'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function submitSolution(formData: FormData) {
  try {
    const session = await auth()

    let candidateId = (session?.user as any)?.id

    if (candidateId) {
      const userExists = await prisma.user.findUnique({ where: { id: candidateId } })
      if (!userExists) {
        candidateId = null
      }
    }

    if (!candidateId) {
      try {
        candidateId = 'guest-candidate'
        await prisma.user.upsert({
          where: { id: 'guest-candidate' },
          update: {},
          create: {
            id: 'guest-candidate',
            email: 'guest@voxtalent.com',
            password: 'guest',
            name: 'Anonymous Guest',
            role: 'CANDIDATE'
          }
        })
      } catch (e) {
        console.error('Upsert failed:', e)
      }
    }

    const challengeId = formData.get('challengeId') as string
    const content = (formData.get('content') as string) || ''
    const file = formData.get('file') as File | null

    if (!challengeId) {
      return { success: false, error: 'Missing challenge ID' }
    }

    if (!content && (!file || file.size === 0)) {
      return { success: false, error: 'Please provide a text answer or upload a file' }
    }

    let fileUrl: string | null = null
    let fileName: string | null = null
    let fileType: string | null = null

    if (file && file.size > 0) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'video/mp4',
        'video/webm',
        'video/quicktime',
        'video/x-msvideo',
      ]

      if (!allowedTypes.includes(file.type)) {
        return { success: false, error: 'Only PDF, Excel (.xls/.xlsx), and video files are allowed' }
      }

      const maxSize = 100 * 1024 * 1024 // 100 MB
      if (file.size > maxSize) {
        return { success: false, error: 'File size must be under 100 MB' }
      }

      try {
        const { writeFile, mkdir } = await import('fs/promises')
        const { join } = await import('path')
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'submissions')
        await mkdir(uploadDir, { recursive: true })
        const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const filePath = join(uploadDir, safeName)
        const buffer = Buffer.from(await file.arrayBuffer())
        await writeFile(filePath, buffer)
        fileUrl = `/uploads/submissions/${safeName}`
        fileName = file.name
        fileType = file.type
      } catch (uploadError: any) {
        console.error('File upload failed:', uploadError)
        return { success: false, error: 'Failed to upload file.' }
      }
    }

    await prisma.submission.create({
      data: {
        challengeId,
        candidateId,
        content,
        fileUrl,
        fileName,
        fileType,
        status: 'SUBMITTED'
      }
    })

    revalidatePath(`/challenges/${challengeId}`)
    revalidatePath('/dashboard/candidate')

    return { success: true }
  } catch (error: any) {
    console.error("Server action error:", error);
    return { success: false, error: error.message || 'An unexpected error occurred in the server' }
  }
}
