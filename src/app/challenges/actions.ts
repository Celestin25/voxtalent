'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function submitSolution(formData: FormData) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'CANDIDATE') {
    throw new Error('Unauthorized')
  }

  const challengeId = formData.get('challengeId') as string
  const content = formData.get('content') as string

  if (!challengeId || !content) {
    throw new Error('Missing required fields')
  }

  await prisma.submission.create({
    data: {
      challengeId,
      candidateId: session.user.id,
      content,
      status: 'SUBMITTED'
    }
  })

  revalidatePath(`/challenges/${challengeId}`)
  revalidatePath('/dashboard/candidate')
  
  return { success: true }
}
