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
    
    // Personal Information
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const preferredFirstName = formData.get('preferredFirstName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const country = formData.get('country') as string
    
    // Application Questions
    const interestQuestion = formData.get('interestQuestion') as string
    const fitQuestion = formData.get('fitQuestion') as string
    const salaryExpectations = formData.get('salaryExpectations') as string
    const joinDate = formData.get('joinDate') as string
    const countryOfResidence = formData.get('countryOfResidence') as string
    const visaSponsorship = formData.get('visaSponsorship') as string
    const gender = formData.get('gender') as string
    const heardAboutRole = formData.get('heardAboutRole') as string
    const sourceDetail = formData.get('sourceDetail') as string
    const linkedInProfile = formData.get('linkedInProfile') as string

    const resumeFile = formData.get('resume') as File | null
    const coverLetterFile = formData.get('coverLetter') as File | null

    if (!challengeId) {
      return { success: false, error: 'Missing challenge ID' }
    }

    const { put } = await import('@vercel/blob')
    
    async function uploadFile(file: File | null, pathPrefix: string) {
      if (!file || file.size === 0) return null
      
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/rtf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'video/mp4',
        'video/webm',
        'video/quicktime',
        'video/x-msvideo',
      ]

      if (!allowedTypes.includes(file.type)) {
        throw new Error(`File type ${file.type} not allowed for ${pathPrefix}`)
      }

      const maxSize = 100 * 1024 * 1024 // 100 MB
      if (file.size > maxSize) {
        throw new Error(`File size must be under 100 MB for ${pathPrefix}`)
      }

      try {
        const safeName = `${pathPrefix}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const blob = await put(safeName, file, { access: 'public' })
        return {
          url: blob.url,
          name: file.name,
          type: file.type
        }
      } catch (uploadError: any) {
        console.error(`${pathPrefix} upload failed:`, uploadError)
        throw new Error(`Failed to upload ${pathPrefix}.`)
      }
    }

    let resumeData = null
    let coverLetterData = null

    try {
      resumeData = await uploadFile(resumeFile, 'resumes')
      coverLetterData = await uploadFile(coverLetterFile, 'cover-letters')
    } catch (e: any) {
      return { success: false, error: e.message }
    }

    await prisma.submission.create({
      data: {
        challengeId,
        candidateId,
        content,
        firstName,
        lastName,
        preferredFirstName,
        email,
        phone,
        country,
        interestQuestion,
        fitQuestion,
        salaryExpectations,
        joinDate,
        countryOfResidence,
        visaSponsorship,
        gender,
        heardAboutRole,
        sourceDetail,
        linkedInProfile,
        resumeUrl: resumeData?.url,
        resumeName: resumeData?.name,
        resumeType: resumeData?.type,
        coverLetterUrl: coverLetterData?.url,
        coverLetterName: coverLetterData?.name,
        coverLetterType: coverLetterData?.type,
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
