import { auth } from "@/auth";
import {
  Vote,
  Users,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import styles from "../dashboard.module.css";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/SignOutButton";
import { cookies } from "next/headers";

// Never serve a cached version — vote state must always be fresh
export const dynamic = 'force-dynamic';

export default async function EmployeeDashboard() {
  const session = await auth();

  const userId = (session?.user as any)?.id ?? null;
  const isGuest = !userId;
  const userName = session?.user?.name || "Guest Voter";

  let employeeProfile: any = null;

  if (!isGuest) {
    try {
      employeeProfile = await prisma.employeeProfile.findUnique({
        where: { userId }
      });
    } catch {
      // DB unavailable
    }
  }

  // Resolve the effective voter ID for this browser/session
  // Authenticated users → their DB userId
  // Anonymous guests    → their unique cookie-based guestVoterId (or null if never voted)
  let effectiveVoterId: string | null = userId;
  if (isGuest) {
    const cookieStore = await cookies();
    effectiveVoterId = cookieStore.get('guestVoterId')?.value ?? null;
  }

  // Fetch ALL eligible submissions (no voted filter — we'll mark them instead)
  let allSubmissions: any[] = [];
  let votedSubmissionIds = new Set<string>();
  let votesCount = 0;

  try {
    const whereClause: any = {
      status: 'SUBMITTED',
      OR: [
        { content: { not: '' } },
        { fileUrl: { not: null } }
      ]
    };

    if (!isGuest && employeeProfile?.companyId) {
      // Authenticated employees only see their company's submissions
      whereClause.challenge = { companyId: employeeProfile.companyId };
    }

    allSubmissions = await prisma.submission.findMany({
      where: whereClause,
      include: {
        challenge: {
          include: {
            company: true,
            _count: {
              select: { submissions: true }
            }
          }
        },
        _count: {
          select: { votes: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Fetch which submissions this browser/user has already voted on
    if (effectiveVoterId) {
      const myVotes = await prisma.vote.findMany({
        where: { voterId: effectiveVoterId },
        select: { submissionId: true }
      });
      votedSubmissionIds = new Set(myVotes.map((v: any) => v.submissionId));
      votesCount = myVotes.length;
    }
  } catch (error) {
    console.error("Dashboard Error: Database connection failed.", error);
  }

  const pendingCount = allSubmissions.filter(s => !votedSubmissionIds.has(s.id)).length;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>{isGuest ? "Community Voting" : "Voter Dashboard"}</h1>
            <p className={styles.subtitle}>
              {isGuest
                ? "Review candidate submissions and cast your vote No account required"
                : `Welcome back ${userName} Your merit verification is needed`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {!isGuest && <SignOutButton />}
          </div>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Users size={24} /></div>
            <div>
              <div className={styles.statValue}>{pendingCount}</div>
              <div className={styles.statLabel}>Pending Your Vote</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Vote size={24} /></div>
            <div>
              <div className={styles.statValue}>{votesCount}</div>
              <div className={styles.statLabel}>Votes Cast</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><ShieldCheck size={24} /></div>
            <div>
              <div className={styles.statValue}>1–10</div>
              <div className={styles.statLabel}>Scoring Scale</div>
            </div>
          </div>
        </section>

        <div className={styles.contentGrid}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                All Candidate Submissions
              </h2>
              <span className="text-secondary text-sm">Score each on a 1–10 scale</span>
            </div>

            <div className={styles.list}>
              {allSubmissions.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No submissions are available for voting right now</p>
                  <p className="text-secondary text-xs mt-2">Check back later new candidate submissions will appear here</p>
                </div>
              ) : (
                allSubmissions.map((sub: any) => {
                  const hasVoted = votedSubmissionIds.has(sub.id);
                  return (
                    <div
                      key={sub.id}
                      className={styles.listItem}
                      style={{
                        opacity: hasVoted ? 0.75 : 1,
                        background: hasVoted ? 'rgba(16, 185, 129, 0.04)' : undefined,
                        borderLeft: hasVoted ? '3px solid #10b981' : '3px solid transparent',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div className={styles.listInfo}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <h4 style={{ margin: 0 }}>{sub.challenge.title}</h4>
                          {hasVoted && (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: 'rgba(16,185,129,0.12)',
                              color: '#10b981',
                              borderRadius: '999px',
                              padding: '2px 10px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',
                            }}>
                              <CheckCircle2 size={12} />
                              Voted
                            </span>
                          )}
                        </div>
                        <div className={styles.listMeta}>
                          <AlertCircle size={14} className="text-gold" /> SUB-{sub.id.substring(0, 4)}
                          {isGuest && sub.challenge.company?.name && (
                            <> • {sub.challenge.company.name}</>
                          )}
                          {' '}• <Users size={14} /> {sub._count.votes} votes so far
                        </div>
                      </div>

                      {hasVoted ? (
                        <button
                          disabled
                          style={{
                            padding: '0.4rem 1rem',
                            fontSize: '0.8rem',
                            borderRadius: '999px',
                            border: '2px solid #10b981',
                            background: 'rgba(16,185,129,0.1)',
                            color: '#10b981',
                            fontWeight: 700,
                            cursor: 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            whiteSpace: 'nowrap',
                            opacity: 0.9,
                          }}
                        >
                          <CheckCircle2 size={14} /> Done
                        </button>
                      ) : (
                        <Link
                          href={`/vote/${sub.id}`}
                          className="btn-primary"
                          style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                        >
                          Vote Now
                        </Link>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            
          </section>

          <aside>
            <section className={styles.card}>
              <h3 className={styles.sidebarTitle}>How Voting Works</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingTop: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: 'rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-primary)', fontWeight: 800, fontSize: '0.75rem' }}>1</div>
                  <p className="text-secondary text-sm" style={{ lineHeight: 1.5 }}>Pick a submission from the list and click <strong style={{ color: 'var(--color-text-primary)' }}>Vote Now</strong></p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: 'rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-primary)', fontWeight: 800, fontSize: '0.75rem' }}>2</div>
                  <p className="text-secondary text-sm" style={{ lineHeight: 1.5 }}>Read the candidate's solution and score it <strong style={{ color: 'var(--color-text-primary)' }}>1 (poor) to 10 (excellent)</strong></p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: 'rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-primary)', fontWeight: 800, fontSize: '0.75rem' }}>3</div>
                  <p className="text-secondary text-sm" style={{ lineHeight: 1.5 }}>Optionally leave feedback then submit <strong style={{ color: 'var(--color-text-primary)' }}>No account needed</strong></p>
                </div>
                <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <ShieldCheck size={14} /> Anonymous &amp; Secure
                  </div>
                  <p className="text-secondary" style={{ fontSize: '0.72rem', marginTop: '0.4rem', lineHeight: 1.5 }}>
                    Candidates never see who voted or what score they gave Only aggregated results are shared
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
