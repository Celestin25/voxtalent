import { submissions } from '@/lib/data'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  // In production: verify employee JWT and return vote data
  const challengeSubmissions = submissions.map(s => ({
    ...s,
    // Hide candidate identity until voting closed
    candidateName: `Anonymous Candidate #${s.rank}`,
    candidateTitle: undefined,
    candidateAvatar: '🕵️',
  }))

  return Response.json({ data: challengeSubmissions, total: challengeSubmissions.length })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  // In production: validate voter auth, check they're invited to this challenge, save vote
  const { submissionId, scores, feedback } = body
  if (!submissionId || !scores) {
    return Response.json({ error: 'submissionId and scores are required' }, { status: 400 })
  }
  console.log('Vote recorded:', { submissionId, scores, feedback })
  return Response.json({ success: true, message: 'Vote recorded anonymously' })
}
