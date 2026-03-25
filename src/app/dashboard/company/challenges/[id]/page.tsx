import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Users, 
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import styles from "../../../dashboard.module.css";
import { prisma } from "@/lib/prisma";

export default async function CompanyChallengeTalentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: challengeId } = await params;
  const session = await auth();
  const user = session?.user as any || { id: "guest-company", role: "COMPANY" };

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
    include: {
      company: true,
      submissions: {
        include: {
          candidate: true,
          votes: true
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!challenge || (user.id !== "guest-company" && challenge.company.userId !== user.id)) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <Link href="/dashboard/company" className="text-secondary hover:text-white flex items-center gap-2 mb-6 text-xs font-bold uppercase tracking-widest">
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <h1>Talent for: {challenge.title}</h1>
            <p className={styles.subtitle}>{challenge.submissions.length} Pathfinders have submitted solutions.</p>
          </div>
        </header>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
             <h2 className={styles.cardTitle}>Submissions & Merit Scores</h2>
             <div className={`${styles.badge} ${styles.badgeActive}`}>ANONYMOUS MERIT REVIEW</div>
          </div>

          <div className={styles.list}>
             {challenge.submissions.length === 0 ? (
               <div className={styles.emptyState}>
                 <p>No submissions yet. Talent is still preparing their solutions.</p>
               </div>
             ) : (
               challenge.submissions.map((sub: any) => {
                 const avgScore = sub.votes.length > 0 
                  ? (sub.votes.reduce((acc: number, v: any) => acc + v.score, 0) / sub.votes.length).toFixed(1)
                  : '--';
                 
                 return (
                   <div key={sub.id} className={styles.listItem}>
                     <div className={styles.listInfo}>
                       <h4>{sub.candidate.name || 'Anonymous Pathfinder'}</h4>
                       <div className={styles.listMeta}>
                         <Clock size={14} /> Submitted {new Date(sub.createdAt).toLocaleDateString()} • <Users size={14} /> {sub.votes.length} Votes
                       </div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ textAlign: 'center' }}>
                           <div style={{ color: 'var(--color-accent-primary)', fontWeight: 800, fontSize: '1.2rem' }}>{avgScore}</div>
                           <div style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Avg Score</div>
                        </div>
                        <Link href={`/dashboard/company/submissions/${sub.id}`} className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                          View Details
                        </Link>
                     </div>
                   </div>
                 )
               })
             )}
          </div>
        </section>
      </div>
    </main>
  );
}
