'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function createChallenge(formData: FormData) {
  const session = await auth()
  if (!session || !session.user || session.user.role !== 'COMPANY') {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const deadlineStr = formData.get('deadline') as string
  const prize = formData.get('prize') as string

  if (!title || !description || !deadlineStr) {
    throw new Error('Missing required fields')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { companyProfile: true }
  })

  if (!user?.companyProfile) {
    throw new Error('Company profile not found')
  }

  const challenge = await prisma.challenge.create({
    data: {
      title,
      description: `${description}\n\nPrize: ${prize}`,
      deadline: new Date(deadlineStr),
      companyId: user.companyProfile.id,
      status: 'OPEN'
    }
  })

  revalidatePath('/dashboard/company')
  revalidatePath('/challenges')
  
  return { success: true, challengeId: challenge.id }
}

export async function deleteChallenge(challengeId: string) {
  const session = await auth()
  if (!session || !session.user || session.user.role !== 'COMPANY') {
    throw new Error('Unauthorized')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { companyProfile: true }
  })

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId }
  })

  if (!challenge || challenge.companyId !== user?.companyProfile?.id) {
    throw new Error('Unauthorized or challenge not found')
  }

  await prisma.challenge.delete({
    where: { id: challengeId }
  })

  revalidatePath('/dashboard/company')
  revalidatePath('/challenges')
  
  return { success: true }
}
