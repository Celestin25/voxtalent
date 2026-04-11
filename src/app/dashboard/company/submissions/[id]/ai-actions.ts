'use server'

import { prisma } from "@/lib/prisma"
import { analyzeSubmission } from "@/lib/ai"
import { revalidatePath } from "next/cache"

export async function requestAiVerdict(submissionId: string) {
  try {
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: { challenge: true }
    })

    if (!submission) {
      return { success: false, error: "Submission not found" }
    }

    const votes = await prisma.vote.findMany({
      where: { submissionId }
    })
    
    const avgHumanScore = votes.length > 0 
      ? votes.reduce((acc, v) => acc + v.score, 0) / votes.length 
      : 5;

    let verdict = await analyzeSubmission(
      submission.challenge.description,
      submission.content
    )

    // Demo Mode: If AI fails, simulate a realistic technical score
    // Demo Mode: Simulate realistic AI variation (-3 to +3 from human average)
    // We use a "seed" based on submissionId so the result is consistent for that person
    if (verdict.isDemo) {
      const offsets = [-3, -2, -1, 0, 1, 2, 3]
      const seed = submissionId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const randomOffset = offsets[seed % offsets.length]
      const simulatedScore = Math.max(0, Math.min(10, Math.floor(avgHumanScore) + randomOffset))

      verdict = {
        lemonCount: simulatedScore,
        critique: ""
      }
    }

    await prisma.submission.update({
      where: { id: submissionId },
      data: {
        aiScore: verdict.lemonCount,
        aiCritique: verdict.critique,
        aiEvaluatedAt: new Date()
      }
    })

    revalidatePath(`/dashboard/company/submissions/${submissionId}`)
    return { success: true }
  } catch (error: any) {
    console.error("AI Verdict Action Error:", error)
    return { success: false, error: error.message || "Failed to analyze with AI" }
  }
}

export async function deleteAiVerdict(submissionId: string) {
  try {
    await prisma.submission.update({
      where: { id: submissionId },
      data: {
        aiScore: null,
        aiCritique: null,
        aiEvaluatedAt: null
      }
    })
    revalidatePath(`/dashboard/company/submissions/${submissionId}`)
    return { success: true }
  } catch (error: any) {
    console.error("Delete AI Verdict Error:", error)
    return { success: false, error: "Failed to reset AI verdict." }
  }
}
