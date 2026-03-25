'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function castVote(formData: FormData) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'EMPLOYEE') {
    throw new Error('Unauthorized')
  }

  const submissionId = formData.get('submissionId') as string
  const score = parseInt(formData.get('score') as string)

  if (!submissionId || isNaN(score)) {
    throw new Error('Missing required fields')
  }

  await prisma.vote.create({
    data: {
      submissionId,
      voterId: session.user.id,
      score
    }
  })

  // If we had a mechanism to check if all votes are in, we could update submission status
  
  revalidatePath('/dashboard/employee')
  revalidatePath(`/vote/${submissionId}`)
  
  return { success: true }
}
