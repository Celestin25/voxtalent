'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function createChallenge(formData: FormData) {
  const session = await auth()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const deadlineStr = formData.get('deadline') as string
  const prize = formData.get('prize') as string

  if (!title || !description || !deadlineStr) {
    throw new Error('Missing required fields')
  }

  // Use session company if available, otherwise fall back to first company in DB
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

  const challenge = await prisma.challenge.create({
    data: {
      title,
      description: `${description}\n\nPrize: ${prize}`,
      deadline: new Date(deadlineStr),
      companyId: companyProfile.id,
      status: 'OPEN'
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
