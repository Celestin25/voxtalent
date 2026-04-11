import { auth } from "@/auth";
import {
  Vote,
  Users,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import styles from "../dashboard.module.css";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/SignOutButton";

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

  // Fetch submissions and stats
  let pendingSubmissions: any[] = [];
  let votesCount = 0;

  try {
    // Guests see ALL open submissions; authenticated employees see their company's only
    const whereClause: any = {
      status: 'SUBMITTED',
    };

    if (!isGuest) {
      // Exclude submissions this user already voted on
      whereClause.votes = { none: { voterId: userId } };
      // Filter to their company if profile exists
      if (employeeProfile?.companyId) {
        whereClause.challenge = { companyId: employeeProfile.companyId };
      }
    }

    pendingSubmissions = await prisma.submission.findMany({
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

    if (!isGuest) {
      votesCount = await prisma.vote.count({
        where: { voterId: userId }
      });
    }
  } catch (error) {
    console.error("Dashboard Error: Database connection failed.", error);
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>{isGuest ? "Community Voting" : "Voter Dashboard"}</h1>
            <p className={styles.subtitle}>
              {isGuest
                ? "Review candidate submissions and cast your vote. No account required."
                : `Welcome back, ${userName}. Your merit verification is needed.`}
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
              <div className={styles.statValue}>{pendingSubmissions.length}</div>
              <div className={styles.statLabel}>Open for Voting</div>
            </div>
          </div>
          {!isGuest && (
            <div className={styles.statCard}>
              <div className={styles.statIcon}><Vote size={24} /></div>
              <div>
                <div className={styles.statValue}>{votesCount}</div>
                <div className={styles.statLabel}>Votes Cast</div>
              </div>
            </div>
          )}
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
                {isGuest ? "Submissions Available to Vote" : "Submissions Pending Your Vote"}
              </h2>
              <span className="text-secondary text-sm">Score each on a 1–10 scale</span>
            </div>

            <div className={styles.list}>
              {pendingSubmissions.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No submissions are available for voting right now.</p>
                  <p className="text-secondary text-xs mt-2">Check back later — new candidate submissions will appear here.</p>
                </div>
              ) : (
                pendingSubmissions.map((sub: any) => (
                  <div key={sub.id} className={styles.listItem}>
                    <div className={styles.listInfo}>
                      <h4>{sub.challenge.title}</h4>
                      <div className={styles.listMeta}>
                        <AlertCircle size={14} className="text-gold" /> SUB-{sub.id.substring(0,4)}
                        {isGuest && sub.challenge.company?.name && (
                          <> • {sub.challenge.company.name}</>
                        )}
                        {' '}• <Users size={14} /> {sub._count.votes} votes so far
                      </div>
                    </div>
                    <Link href={`/vote/${sub.id}`} className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                      Vote Now
                    </Link>
                  </div>
                ))
              )}
            </div>
            
          </section>

          <aside>
            <section className={styles.card}>
              <h3 className={styles.sidebarTitle}>How Voting Works</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingTop: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: 'rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-primary)', fontWeight: 800, fontSize: '0.75rem' }}>1</div>
                  <p className="text-secondary text-sm" style={{ lineHeight: 1.5 }}>Pick a submission from the list and click <strong style={{ color: 'var(--color-text-primary)' }}>Vote Now</strong>.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: 'rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-primary)', fontWeight: 800, fontSize: '0.75rem' }}>2</div>
                  <p className="text-secondary text-sm" style={{ lineHeight: 1.5 }}>Read the candidate's solution and score it <strong style={{ color: 'var(--color-text-primary)' }}>1 (poor) to 10 (excellent)</strong>.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: 'rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-primary)', fontWeight: 800, fontSize: '0.75rem' }}>3</div>
                  <p className="text-secondary text-sm" style={{ lineHeight: 1.5 }}>Optionally leave feedback, then submit. <strong style={{ color: 'var(--color-text-primary)' }}>No account needed.</strong></p>
                </div>
                <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <ShieldCheck size={14} /> Anonymous &amp; Secure
                  </div>
                  <p className="text-secondary" style={{ fontSize: '0.72rem', marginTop: '0.4rem', lineHeight: 1.5 }}>
                    Candidates never see who voted or what score they gave. Only aggregated results are shared.
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
