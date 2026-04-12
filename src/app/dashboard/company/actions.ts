'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function createChallenge(formData: FormData) {
  const session = await auth()

  const title = formData.get('title') as string
  const deadlineStr = formData.get('deadline') as string
  // description from text tab; descriptionNote from file tab (optional note)
  const descriptionText = formData.get('description') as string
  const descriptionNote = formData.get('descriptionNote') as string
  const description = descriptionNote?.trim()
    ? descriptionNote.trim()
    : (descriptionText?.trim() || 'See attachment')

  const attachmentFile = formData.get('attachmentFile') as File | null

  if (!title || !deadlineStr) {
    throw new Error('Missing required fields')
  }

  if (!descriptionText && (!attachmentFile || attachmentFile.size === 0)) {
    throw new Error('Please provide a description or upload a file')
  }

  // Resolve company profile
  let companyProfile = null

  if (session?.user?.role === 'COMPANY') {
    const user = await prisma.user.findUnique({
      where: { id: (session.user as any).id },
      include: { companyProfile: true }
    })
    companyProfile = user?.companyProfile
  }

  if (!companyProfile) {
    companyProfile = await prisma.companyProfile.findFirst()
  }

  if (!companyProfile) {
    throw new Error('No company profile found in database')
  }

  // Handle optional file attachment
  let attachmentUrl: string | null = null
  let attachmentName: string | null = null
  let attachmentType: string | null = null

  if (attachmentFile && attachmentFile.size > 0) {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'video/mp4',
      'video/webm',
      'video/quicktime',
      'video/x-msvideo',
    ]

    if (!allowedTypes.includes(attachmentFile.type)) {
      throw new Error('Only PDF, Excel (.xls/.xlsx), and video files are allowed')
    }

    const maxSize = 100 * 1024 * 1024
    if (attachmentFile.size > maxSize) {
      throw new Error('File size must be under 100 MB')
    }

    try {
      const { writeFile, mkdir } = await import('fs/promises')
      const { join } = await import('path')
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'challenges')
      await mkdir(uploadDir, { recursive: true })
      const safeName = `${Date.now()}-${attachmentFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
      const filePath = join(uploadDir, safeName)
      const buffer = Buffer.from(await attachmentFile.arrayBuffer())
      await writeFile(filePath, buffer)
      attachmentUrl = `/uploads/challenges/${safeName}`
      attachmentName = attachmentFile.name
      attachmentType = attachmentFile.type
    } catch (uploadError: any) {
      console.error('File upload failed:', uploadError)
      throw new Error('Failed to upload file.')
    }
  }

  const challenge = await prisma.challenge.create({
    data: {
      title,
      description,
      deadline: new Date(deadlineStr),
      companyId: companyProfile.id,
      status: 'OPEN',
      attachmentUrl,
      attachmentName,
      attachmentType,
    }
  })

  revalidatePath('/dashboard/company')
  revalidatePath('/challenges')

  return { success: true, challengeId: challenge.id }
}

export async function deleteChallenge(challengeId: string) {
  const session = await auth()

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId }
  })

  if (!challenge) {
    throw new Error('Challenge not found')
  }

  // If logged in as COMPANY, verify ownership; otherwise allow guest deletion
  if (session?.user?.role === 'COMPANY') {
    const user = await prisma.user.findUnique({
      where: { id: (session.user as any).id },
      include: { companyProfile: true }
    })
    if (challenge.companyId !== user?.companyProfile?.id) {
      throw new Error('You do not own this challenge')
    }
  }

  await prisma.challenge.delete({
    where: { id: challengeId }
  })

  revalidatePath('/dashboard/company')
  revalidatePath('/challenges')

  return { success: true }
}
