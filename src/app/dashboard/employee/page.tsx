import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
  Vote, 
  Users, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import styles from "../dashboard.module.css";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/SignOutButton";

export default async function EmployeeDashboard() {
  const session = await auth();
  
  let userId = (session?.user as any)?.id;
  let userName = session?.user?.name || "Voter Guest";

  if (!userId) {
     const sampleEmployee = await prisma.employeeProfile.findFirst({
       include: { user: true }
     });
     if (sampleEmployee) {
       userId = sampleEmployee.userId;
       userName = sampleEmployee.user.name || "Voter Guest";
     }
  }

  // Fetch submissions that this employee hasn't voted on yet
  // For simplicity, we'll just fetch all SUBMITTED submissions for challenges at their company
  // In a real app, you'd filter by the employee's company
  
  let employeeProfile = await prisma.employeeProfile.findUnique({
    where: { userId: userId || "non-existent-id" }
  });

  // Provide sample fallback if profile doesn't exist
  if (!employeeProfile) {
    employeeProfile = {
      id: "guest-employee-id",
      userId: userId || "guest-id",
      companyId: "guest-company-id",
      role: "Voter",
      bio: "A demo employee helping to verify technical merit.",
      createdAt: new Date(),
    } as any;
  }

  // Fetch submissions and stats
  let pendingSubmissions: any[] = [];
  let totalSubmissionsInCompany = 0;
  let votesCount = 0;

  try {
    pendingSubmissions = await prisma.submission.findMany({
      where: {
        status: 'SUBMITTED',
        votes: {
          none: {
            voterId: userId || "guest-no-match"
          }
        },
        challenge: {
          companyId: employeeProfile?.companyId || "guest-company-id"
        }
      },
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

    // Calculate company stats
    totalSubmissionsInCompany = await prisma.submission.count({
      where: { challenge: { companyId: employeeProfile?.companyId || "no-match" } }
    });

    votesCount = await prisma.vote.count({
      where: { voterId: userId || "guest-id" }
    });
  } catch (error) {
    console.error("Dashboard Error: Database connection failed.", error);
    // Fallback stays empty/zero or use samples
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Voter Dashboard</h1>
            <p className={styles.subtitle}>Welcome back, {userName}. Your merit verification is needed.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <SignOutButton />
             <button className="btn-outline">Voting Policy</button>
             <Link href="/challenges" className="btn-primary">View Challenges</Link>
          </div>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Vote size={24} /></div>
            <div>
              <div className={styles.statValue}>{votesCount}</div>
              <div className={styles.statLabel}>Votes Cast</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Users size={24} /></div>
            <div>
              <div className={styles.statValue}>{pendingSubmissions.length}</div>
              <div className={styles.statLabel}>Pending Reviews</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><ShieldCheck size={24} /></div>
            <div>
              <div className={styles.statValue}>100%</div>
              <div className={styles.statLabel}>Voting Accuracy</div>
            </div>
          </div>
        </section>

        <div className={styles.contentGrid}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Submissions Pending Your Vote</h2>
              <span className="text-secondary text-sm">Priority Queue</span>
            </div>
            
            <div className={styles.list}>
              {pendingSubmissions.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>All caught up! No submissions pending your review for this company.</p>
                  <p className="text-secondary text-xs mt-2">New submissions from candidates will appear here automatically.</p>
                  <Link href="/challenges" className="text-gold text-xs font-bold hover:underline mt-4 block">
                    Browse More Challenges
                  </Link>
                </div>
              ) : (
                pendingSubmissions.map((sub: any) => (
                  <div key={sub.id} className={styles.listItem}>
                    <div className={styles.listInfo}>
                      <h4>{sub.challenge.title}</h4>
                      <div className={styles.listMeta}>
                        <AlertCircle size={14} className="text-gold" /> SUB-{sub.id.substring(0,4)} • <Users size={14} /> {sub._count.votes} Peer Votes
                      </div>
                    </div>
                    <Link href={`/vote/${sub.id}`} className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                      Cast Vote
                    </Link>
                  </div>
                ))
              )}
            </div>
            
            <Link href="/voting-history" className="text-gold text-sm font-bold flex items-center gap-1 hover:underline mt-6 justify-center">
              View Your Voting History <ArrowRight size={14} />
            </Link>
          </section>

          <aside>
            <section className={styles.card}>
              <h3 className={styles.sidebarTitle}>Voter Reputation</h3>
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  border: '4px solid var(--color-accent-primary)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800 }}>98</span>
                  <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Score</span>
                </div>
                <p className="text-secondary text-xs leading-relaxed">
                  Your voting pattern is highly consistent with the group consensus. You are in the <span className="text-gold">Top 5%</span> of voters.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
