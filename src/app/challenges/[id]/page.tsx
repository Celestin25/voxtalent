import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Users,
  Award,
  CheckCircle,
  Clock,
  Zap,
  ShieldCheck,
  Star,
  CheckCircle2,
  MapPin
} from 'lucide-react'
import styles from './page.module.css'
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import SubmissionForm from "./SubmissionForm"
import { notFound } from "next/navigation"
import FileViewer from "@/components/FileViewer"

export default async function ChallengeDetailPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ test?: string }> }) {
  const { id: challengeId } = await params;
  const resolvedSearchParams = await searchParams;
  const session = await auth();

  let challenge: any = null;
  let hasSubmitted = false;

  try {
    challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
      include: {
        company: true,
        _count: {
          select: { submissions: true }
        }
      }
    });

    if (challenge && session?.user && session.user.role === 'CANDIDATE') {
      const existingSubmission = await prisma.submission.findFirst({
        where: { challengeId, candidateId: session.user.id }
      });
      hasSubmitted = !!existingSubmission;
    }
  } catch (error) {
    console.error("Challenge detail: DB unavailable, trying fallback.", error);
    const { challenges: sampleChallenges } = await import('@/lib/data');
    const sample = sampleChallenges.find(c => c.id === challengeId);
    if (sample) {
      challenge = {
        id: sample.id,
        title: sample.title,
        description: sample.description,
        deadline: new Date(sample.deadline),
        status: sample.status,
        company: { name: sample.company.name },
        _count: { submissions: sample.applicants }
      };
    }
  }

  // Check if the user is an employee
  let isEmployee = false;
  if (session?.user?.id) {
    if (session.user.role?.toUpperCase() === 'EMPLOYEE') {
      isEmployee = true;
    } else {
      try {
        const empProfile = await prisma.employeeProfile.findUnique({
          where: { userId: session.user.id }
        });
        if (empProfile) isEmployee = true;
      } catch (e) {
        // ignore
      }
    }
  }

  if (!challenge) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className="container">
          <Link href="/challenges" className="text-secondary hover:text-accent flex items-center gap-2 mb-10 text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to Challenges
          </Link>
          
          <div className={styles.heroContent}>
            <div className={styles.titleBox}>
              <div className={styles.companyInfo}>
                <div className={styles.logo}>{challenge.company.name.substring(0, 2).toUpperCase()}</div>
                <div>
                   <p className="text-gold text-xs font-bold uppercase tracking-widest mb-1">{challenge.company.name}</p>
                   <h1>{challenge.title}</h1>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <section>
            {challenge.jobTitle && (
              <div className={styles.section}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <h3 className={styles.text} style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 0 }}>{challenge.jobTitle}</h3>
                  {challenge.isRemote && (
                    <span style={{ fontSize: '0.75rem', background: 'rgba(79,70,229,0.1)', color: 'var(--color-accent-primary)', padding: '2px 10px', borderRadius: '4px', fontWeight: 800, textTransform: 'uppercase' }}>
                      Remote
                    </span>
                  )}
                  {challenge.jobLocation && (
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={16} /> {challenge.jobLocation}
                    </span>
                  )}
                </div>
                {challenge.jobDescription && (
                  <p className={styles.text} style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>{challenge.jobDescription}</p>
                )}
              </div>
            )}


          </section>

          <aside>
            <div className={styles.sidebarCard}>
              {isEmployee ? (
                <div style={{ padding: '0.5rem 0' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent-primary)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                      <ShieldCheck size={20} /> Internal Merit Voter
                   </div>
                   <p className={styles.sidebarText} style={{ fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                      As a verified employee of {challenge.company.name}, your voice matters in the collective vetting. Remember, candidates are the ones who answer the challenge!
                   </p>
                   <Link href="/dashboard/employee" className="btn-primary" style={{ display: 'block', textAlign: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>
                      Open Voting Queue (1-10 Scale)
                   </Link>
                </div>
              ) : (!session?.user || session.user.role?.toUpperCase() === 'CANDIDATE') ? (
                <>
                  <h3 className={styles.sidebarTitle}>Apply for Role</h3>
                  
                  {hasSubmitted ? (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#10b981', marginBottom: '1rem' }}><CheckCircle size={32} style={{ margin: '0 auto' }} /></div>
                      <p className={styles.sidebarText}>You have already submitted a solution for this challenge.</p>
                      <Link href="/dashboard/candidate" className="btn-outline" style={{ display: 'block', marginTop: '1rem' }}>View My Dashboard</Link>
                    </div>
                  ) : (
                    <>
                      <SubmissionForm 
                        challengeId={challenge.id} 
                        isInternalCandidate={resolvedSearchParams.test === 'internal' || !!(session?.user && session.user.role?.toUpperCase() === 'CANDIDATE')} 
                      />
                    </>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ marginBottom: '1rem' }}><ShieldCheck size={32} style={{ margin: '0 auto', color: 'var(--color-text-muted)' }} /></div>
                  <h3 className={styles.sidebarTitle} style={{ textAlign: 'center' }}>View Only</h3>
                  <p className={styles.sidebarText}>
                    Only candidates can submit solutions. Your role is {session.user.role}.
                  </p>
                </div>
              )}


            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
