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
  CheckCircle2
} from 'lucide-react'
import styles from './page.module.css'
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import SubmissionForm from "./SubmissionForm"
import { notFound } from "next/navigation"

export default async function ChallengeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: challengeId } = await params;
  const session = await auth();

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
    include: {
      company: true,
      _count: {
        select: { submissions: true }
      }
    }
  });

  if (!challenge) {
    notFound();
  }

  // Check if current user (if any) is a candidate and has already submitted
  let hasSubmitted = false;
  if (session?.user && session.user.role === 'CANDIDATE') {
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        challengeId,
        candidateId: session.user.id
      }
    });
    hasSubmitted = !!existingSubmission;
  }

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className="container">
          <Link href="/challenges" className="text-secondary hover:text-white flex items-center gap-2 mb-10 text-xs font-bold uppercase tracking-widest">
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

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={styles.statLabel}>Submissions</div>
                <div className={styles.statValue}>{challenge._count.submissions}</div>
              </div>
              <div className={styles.heroStat} style={{ borderColor: 'var(--color-accent-primary)' }}>
                <div className={styles.statLabel} style={{ color: 'var(--color-accent-primary)' }}>Deadline</div>
                <div className={styles.statValue} style={{ fontSize: '1rem' }}>{new Date(challenge.deadline).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <section>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Overview</h2>
              <p className={styles.text} style={{ whiteSpace: 'pre-wrap' }}>{challenge.description}</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Technical Requirements</h2>
              <div className={styles.skills}>
                {['Next.js', 'TypeScript', 'Tailwind CSS'].map(skill => (
                  <span key={skill} className={styles.skillBadge}>{skill}</span>
                ))}
              </div>
            </div>
          </section>

          <aside>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Submit Solution</h3>
              
              {!session?.user ? (
                <div style={{ textAlign: 'center' }}>
                  <p className={styles.sidebarText}>Please sign in to submit your solution.</p>
                  <Link href="/login" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>Sign In</Link>
                </div>
              ) : session.user.role !== 'CANDIDATE' ? (
                <p className={styles.sidebarText}>Only candidates can submit solutions to challenges.</p>
              ) : hasSubmitted ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#10b981', marginBottom: '1rem' }}><CheckCircle size={32} style={{ margin: '0 auto' }} /></div>
                  <p className={styles.sidebarText}>You have already submitted a solution for this challenge.</p>
                  <Link href="/dashboard/candidate" className="btn-outline" style={{ display: 'block', marginTop: '1rem' }}>View My Dashboard</Link>
                </div>
              ) : (
                <>
                  <p className={styles.sidebarText}>
                    Ready to be vetted on your merits? Submit your solution below.
                  </p>
                  <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.1)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent-primary)' }}>{challenge._count.submissions}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Active Submissions</div>
                  </div>
                  <SubmissionForm challengeId={challenge.id} />
                </>
              )}

              {session?.user && session.user.role === 'EMPLOYEE' && (
                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '12px', border: '1px solid var(--color-accent-primary)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent-primary)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      <ShieldCheck size={16} /> Internal Merit Voter
                   </div>
                   <p className={styles.sidebarText} style={{ fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                      As a verified employee of {challenge.company.name}, your voice matters in the collective vetting.
                   </p>
                   <Link href="/dashboard/employee" className="btn-primary" style={{ display: 'block', textAlign: 'center', fontSize: '0.85rem' }}>
                      Open Voting Queue
                   </Link>
                </div>
              )}

              <div className={styles.featureList} style={{ marginTop: '2rem' }}>
                <div className={styles.featureItem}><ShieldCheck size={18} className="text-gold" /> Anonymous Merit Review</div>
                <div className={styles.featureItem}><CheckCircle2 size={18} className="text-gold" /> Verified Prize Guarantee</div>
                <div className={styles.featureItem}><Zap size={18} className="text-gold" /> Priority Hiring Status</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
