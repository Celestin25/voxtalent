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

    const verdict = await analyzeSubmission(
      submission.challenge.description,
      submission.content
    )

    if (verdict.isDemo) {
      return { success: true, isDemo: true }
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
