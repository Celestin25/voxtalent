'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function submitSolution(formData: FormData) {
  const session = await auth()

  // Allow submissions with or without an account.
  // Signed-in candidates are tracked by their real user ID.
  // Guests are assigned a sample candidate ID so the DB constraint is satisfied.
  let candidateId = (session?.user as any)?.id

  if (!candidateId) {
    try {
      const sampleCandidate = await prisma.user.findFirst({
        where: { role: 'CANDIDATE' }
      })
      candidateId = sampleCandidate?.id || 'guest-candidate'
    } catch {
      candidateId = 'guest-candidate'
    }
  }

  const challengeId = formData.get('challengeId') as string
  const content = formData.get('content') as string

  if (!challengeId || !content) {
    throw new Error('Missing required fields')
  }

  await prisma.submission.create({
    data: {
      challengeId,
      candidateId,
      content,
      status: 'SUBMITTED'
    }
  })

  revalidatePath(`/challenges/${challengeId}`)
  revalidatePath('/dashboard/candidate')

  return { success: true }
}
