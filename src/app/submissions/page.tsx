import { auth } from "@/auth";
import { 
  Target, 
  Clock, 
  Briefcase, 
  ArrowLeft,
  User,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import styles from "../dashboard/dashboard.module.css";
import { prisma } from "@/lib/prisma";

export default async function SubmissionsPage() {
  const session = await auth();
  
  let userId = (session?.user as any)?.id;

  // If not logged in, we check the guest-candidate
  if (!userId) {
    userId = 'guest-candidate';
  }

  // Fetch real data
  let candidate: any = null;

  try {
    candidate = await prisma.user.findUnique({
      where: { id: userId },
      include: {
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
  } catch {
    // DB unavailable fallback
  }

  // If candidate is still null (e.g. guest doesn't exist yet in DB), show empty
  const submissions = candidate?.submissions || [];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <Link href="/dashboard/candidate" className="text-secondary hover:text-accent flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest">
                <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <h1>My Submissions</h1>
            <p className={styles.subtitle}>
              Track the status of your merited solutions.
            </p>
          </div>
          <Link href="/challenges" className="btn-primary">Find New Challenge</Link>
        </header>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Total Submissions ({submissions.length})</h2>
          </div>
          
          <div className={styles.list}>
            {submissions.length === 0 ? (
              <div className={styles.emptyState}>
                <div style={{ marginBottom: '1.5rem', opacity: 0.5 }}><Target size={48} style={{ margin: '0 auto' }} /></div>
                <p>You haven't submitted any solutions yet.</p>
                <Link href="/challenges" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>Browse Challenges</Link>
              </div>
            ) : (
              submissions.map((sub: any) => (
                <div key={sub.id} className={styles.listItem}>
                  <div className={styles.listInfo}>
                    <h4>{sub.challenge.title}</h4>
                    <div className={styles.listMeta}>
                      <Briefcase size={14} /> {sub.challenge.company.name} • <Clock size={14} /> {new Date(sub.createdAt).toLocaleDateString()} • <AlertCircle size={14} className="text-gold" /> SUB-{sub.id.substring(0,6)}
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
      </div>
    </main>
  );
}
