import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
  Trophy, 
  Target, 
  Clock, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  User,
  Star
} from "lucide-react";
import Link from "next/link";
import styles from "../dashboard.module.css";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/SignOutButton";

export default async function CandidateDashboard() {
  const session = await auth();
  
  let userId = (session?.user as any)?.id;

  if (!userId) {
     const sampleCandidate = await prisma.user.findFirst({
       where: { role: 'CANDIDATE' }
     });
     if (sampleCandidate) {
       userId = sampleCandidate.id;
     }
  }

  // Fetch real data
  const candidate = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      candidateProfile: true,
      submissions: {
        include: {
          challenge: {
            include: {
              company: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!candidate) {
    return <div>Profile not found.</div>;
  }

  const activeSubmissions = candidate.submissions.length;
  // For demo, we'll calculate wins based on submissions with status 'HIRED' or something
  const wins = candidate.submissions.filter((s: any) => s.status === 'HIRED').length;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.profileInfo}>
            {candidate.image ? (
              <img src={candidate.image} alt={candidate.name || ''} className={styles.avatarLarge} />
            ) : (
              <div className={styles.avatarLarge} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212, 175, 55, 0.1)' }}>
                <User size={40} className="text-gold" />
              </div>
            )}
            <div>
              <h1 style={{fontSize:'2.5rem', fontWeight: 700}}>{candidate.name || 'Candidate'}</h1>
              <p className={styles.subtitle}>Verified Merit: <span className="text-gold font-bold">Gold Tier</span> • {candidate.email}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <SignOutButton />
            <Link href="/profile/edit" className="btn-outline">Edit Profile</Link>
          </div>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Target size={24} /></div>
            <div>
              <div className={styles.statValue}>{activeSubmissions}</div>
              <div className={styles.statLabel}>Total Submissions</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Trophy size={24} /></div>
            <div>
              <div className={styles.statValue}>{wins}</div>
              <div className={styles.statLabel}>Wins & Badges</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Star size={24} /></div>
            <div>
              <div className={styles.statValue}>-</div>
              <div className={styles.statLabel}>Avg. Peer Score</div>
            </div>
          </div>
        </section>

        <div className={styles.contentGrid}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>My Recent Submissions</h2>
              <Link href="/submissions" className="text-gold text-sm font-bold flex items-center gap-1 hover:underline">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className={styles.list}>
              {candidate.submissions.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>You haven't submitted any solutions yet.</p>
                  <Link href="/challenges" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Browse Challenges</Link>
                </div>
              ) : (
                candidate.submissions.map((sub: any) => (
                  <div key={sub.id} className={styles.listItem}>
                    <div className={styles.listInfo}>
                      <h4>{sub.challenge.title}</h4>
                      <div className={styles.listMeta}>
                        <Briefcase size={14} /> {sub.challenge.company.name} • <Clock size={14} /> {new Date(sub.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`${styles.badge} ${sub.status === 'SUBMITTED' ? styles.badgePending : styles.badgeActive}`}>
                      {sub.status === 'SUBMITTED' ? 'VOTING IN PROGRESS' : sub.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <aside>
            <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
              <h3 className={styles.sidebarTitle}>Quick Actions</h3>
              <div className={styles.quickActions}>
                <Link href="/challenges" className={styles.actionBtn}><Target size={18} /> Find New Challenge</Link>
                <button className={styles.actionBtn}><Star size={18} /> View Certifications</button>
                <button className={styles.actionBtn}><Trophy size={18} /> Leaderboard</button>
              </div>
            </section>

            <section className={styles.card}>
              <h3 className={styles.sidebarTitle}>Skill Insights</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                    <span>System Design</span>
                    <span className="text-gold">--%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                    <div style={{ width: '0%', height: '100%', background: 'var(--color-accent-primary)' }} />
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
