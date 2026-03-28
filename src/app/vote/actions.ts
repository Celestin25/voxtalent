'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function castVote(formData: FormData) {
  const session = await auth()

  // Allow voting with or without an account.
  // Authenticated employees are tracked by their real user ID.
  // Everyone else gets a one-time anonymous ID so votes are never duplicated
  // within the same submission, but the voter doesn't need to be signed in.
  const voterId = session?.user?.id
    ? session.user.id
    : `anon-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

  const submissionId = formData.get('submissionId') as string
  const score = parseInt(formData.get('score') as string)

  if (!submissionId || isNaN(score)) {
    throw new Error('Missing required fields')
  }

  await prisma.vote.create({
    data: {
      submissionId,
      voterId,
      score
    }
  })

  revalidatePath('/dashboard/employee')
  revalidatePath(`/vote/${submissionId}`)

  return { success: true }
}
