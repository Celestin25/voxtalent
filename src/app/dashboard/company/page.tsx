import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
  Building2, 
  Target, 
  Users, 
  BarChart3, 
  Plus, 
  ArrowUpRight,
  TrendingUp,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import styles from "../dashboard.module.css";
import { prisma } from "@/lib/prisma";
import ChallengeForm from "./ChallengeForm";
import DeleteChallengeButton from "./DeleteChallengeButton";
import SignOutButton from "@/components/SignOutButton";

export default async function CompanyDashboard() {
  const session = await auth();
  if (!session || !session.user || session.user.role !== 'COMPANY') {
    redirect("/login");
  }
  
  const user = session.user as any;

  // Fetch real data
  const company = await prisma.companyProfile.findUnique({
    where: { userId: user.id },
    include: {
      challenges: {
        include: {
          _count: {
            select: { submissions: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!company) {
    // This shouldn't happen if they have the role, but handle it
    return <div>Profile not found. Please contact support.</div>;
  }

  const activeChallengesCount = company.challenges.filter((c: any) => c.status === 'OPEN').length;
  const totalSubmissions = company.challenges.reduce((acc: number, c: any) => acc + c._count.submissions, 0);
  
  // Total votes across all submissions in this company
  const totalVotesAcrossCompany = await prisma.vote.count({
    where: { 
      submission: { 
        challenge: { 
          companyId: company.id 
        } 
      } 
    }
  });

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <div className={styles.statIcon} style={{ width: '32px', height: '32px' }}><Building2 size={16} /></div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest">Enterprise Suite</span>
            </div>
            <h1>{company.name} Console</h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <SignOutButton />
            <ChallengeForm />
          </div>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Target size={24} /></div>
            <div>
              <div className={styles.statValue}>{activeChallengesCount}</div>
              <div className={styles.statLabel}>Active Challenges</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Users size={24} /></div>
            <div>
              <div className={styles.statValue}>{totalSubmissions}</div>
              <div className={styles.statLabel}>Total Pathfinders</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><TrendingUp size={24} /></div>
            <div>
              <div className={styles.statValue}>{totalVotesAcrossCompany}</div>
              <div className={styles.statLabel}>Merit Verifications</div>
            </div>
          </div>
        </section>

        <div className={styles.contentGrid}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Active Challenges</h2>
              <Link href="/company/challenges" className="text-gold text-sm font-bold hover:underline">Manage All</Link>
            </div>
            
            <div className={styles.list}>
              {company.challenges.length === 0 ? (
                <div className={styles.emptyState}>
                   <p>No challenges created yet.</p>
                </div>
              ) : (
                company.challenges.map((challenge: any) => (
                  <div key={challenge.id} className={styles.listItem}>
                    <div className={styles.listInfo}>
                      <h4>{challenge.title}</h4>
                      <div className={styles.listMeta}>
                         <Users size={14} /> {challenge._count.submissions} Candidates • <Target size={14} /> {challenge.status}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link href={`/dashboard/company/challenges/${challenge.id}`} className="btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                        View Talent
                      </Link>
                      <DeleteChallengeButton challengeId={challenge.id} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <aside>
            <section className={styles.card} style={{ border: '1px solid var(--color-accent-primary)' }}>
              <h3 className={styles.sidebarTitle}>Top Talent Match</h3>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#222', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={24} className="text-gold" />
                </div>
                <h4 style={{ color: 'white', marginBottom: '0.25rem' }}>Sarah Jenkins</h4>
                <p className="text-secondary text-xs mb-4">9.8 Match Score for DevOps</p>
                <button className="btn-primary" style={{ width: '100%', fontSize: '0.8rem' }}>View Full Profile</button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
