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
              ) : session?.user?.role?.toUpperCase() === 'CANDIDATE' ? (
                <>
                  <h3 className={styles.sidebarTitle}>Submit Solution</h3>
                  
                  {hasSubmitted ? (
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
                      <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(79, 70, 229, 0.05)', borderRadius: '8px', border: '1px solid rgba(79, 70, 229, 0.12)', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent-primary)' }}>{challenge._count.submissions}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Active Submissions</div>
                      </div>
                      <SubmissionForm challengeId={challenge.id} />
                    </>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ marginBottom: '1rem' }}><ShieldCheck size={32} style={{ margin: '0 auto', color: 'var(--color-text-muted)' }} /></div>
                  <h3 className={styles.sidebarTitle} style={{ textAlign: 'center' }}>View Only</h3>
                  <p className={styles.sidebarText}>
                    {!session?.user ? "Please log in as a candidate to submit your solution." : "Only candidates are allowed to submit solutions."}
                  </p>
                  {!session?.user && (
                    <Link href="/login" className="btn-outline" style={{ display: 'block', marginTop: '1rem' }}>Sign In to Submit</Link>
                  )}
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
