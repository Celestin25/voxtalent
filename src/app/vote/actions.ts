'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { randomUUID } from "crypto"

export async function castVote(formData: FormData) {
  try {
    const session = await auth()

    let voterId = session?.user?.id

    if (!voterId) {
      try {
        // Each anonymous browser gets its own unique ID stored in a cookie.
        // This keeps votes anonymous while letting us filter per-device.
        const cookieStore = await cookies()
        let guestId = cookieStore.get('guestVoterId')?.value

        if (!guestId) {
          guestId = `guest-${randomUUID()}`
          cookieStore.set('guestVoterId', guestId, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            // 1 year — persists across browser sessions
            maxAge: 60 * 60 * 24 * 365
          })
        }

        voterId = guestId

        await prisma.user.upsert({
          where: { id: guestId },
          update: {},
          create: {
            id: guestId,
            email: `${guestId}@voxtalent-guest.local`,
            password: 'guest',
            name: 'Anonymous Voter',
            role: 'EMPLOYEE'
          }
        })
      } catch (e) {
        console.error('Upsert guest voter failed:', e)
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
