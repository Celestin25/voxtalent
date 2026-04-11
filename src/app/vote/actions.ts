'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function castVote(formData: FormData) {
  try {
    const session = await auth()

    let voterId = session?.user?.id

    if (!voterId) {
      try {
        voterId = 'guest-voter'
        await prisma.user.upsert({
          where: { id: 'guest-voter' },
          update: {},
          create: {
            id: 'guest-voter',
            email: 'voter@voxtalent.com',
            password: 'guest',
            name: 'Anonymous Voter',
            role: 'EMPLOYEE'
          }
        })
      } catch (e) {
        console.error('Upsert voter failed:', e)
      }
    }

    const submissionId = formData.get('submissionId') as string
    const score = parseInt(formData.get('score') as string)
    const feedback = (formData.get('feedback') as string) || null

    if (!submissionId || isNaN(score)) {
      return { success: false, error: 'Missing required fields' }
    }

    await prisma.vote.create({
      data: {
        submissionId,
        voterId: voterId || 'guest-voter',
        score,
        feedback
      }
    })

    revalidatePath('/dashboard/employee')
    revalidatePath(`/vote/${submissionId}`)

    return { success: true }
  } catch (error: any) {
    console.error("Cast vote error:", error);
    return { success: false, error: error.message || 'An unexpected error occurred' }
  }
}
