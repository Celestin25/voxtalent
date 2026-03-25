import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Star,
  User,
  CheckCircle2,
  Calendar
} from "lucide-react";
import Link from "next/link";
import styles from "../../../dashboard.module.css";
import { prisma } from "@/lib/prisma";

export default async function CompanySubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: submissionId } = await params;
  const session = await auth();
  if (!session || !session.user || session.user.role !== 'COMPANY') {
    redirect("/login");
  }
  
  const user = session.user as any;

  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: {
      candidate: true,
      challenge: {
        include: {
          company: true
        }
      },
      votes: {
        include: {
          voter: true
        }
      }
    }
  });

  if (!submission || submission.challenge.company.userId !== user.id) {
    notFound();
  }

  const avgScore = submission.votes.length > 0 
    ? (submission.votes.reduce((acc: number, v: any) => acc + v.score, 0) / submission.votes.length).toFixed(1)
    : 'N/A';

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href={`/dashboard/company/challenges/${submission.challengeId}`} className="text-secondary hover:text-white flex items-center gap-2 mb-10 text-xs font-bold uppercase tracking-widest">
          <ArrowLeft size={14} /> Back to Challenge
        </Link>

        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Review: {submission.candidate.name || 'Pathfinder'}</h1>
            <p className={styles.subtitle}>Solution for {submission.challenge.title}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <button className="btn-outline">Download PDF</button>
             <button className="btn-primary">Hire Candidate</button>
          </div>
        </header>

        <div className={styles.contentGrid}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>The Solution</h2>
              <span className="text-secondary text-sm">Submitted {new Date(submission.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.02)', 
              borderRadius: '12px', 
              padding: '2rem', 
              border: '1px solid rgba(255,255,255,0.05)',
              minHeight: '200px',
              whiteSpace: 'pre-wrap',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: '#e2e8f0'
            }}>
              {submission.content}
            </div>
          </section>

          <aside>
            <div className={styles.card} style={{ border: '1px solid var(--color-accent-primary)', marginBottom: '1.5rem' }}>
              <h3 className={styles.sidebarTitle}>Collective Merit</h3>
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-accent-primary)' }}>{avgScore}</div>
                <div className="text-secondary text-xs uppercase tracking-widest">Average Employee Score</div>
              </div>
            </div>

            <section className={styles.card}>
              <h3 className={styles.sidebarTitle}>Verification Trace</h3>
              <div className={styles.list}>
                {submission.votes.length === 0 ? (
                  <p className="text-secondary text-xs">No votes cast yet.</p>
                ) : (
                  submission.votes.map((vote: any) => (
                    <div key={vote.id} className={styles.listItem} style={{ padding: '0.75rem 0', border: 'none' }}>
                      <div className={styles.listInfo}>
                        <div style={{ fontSize: '0.9rem', color: 'white' }}>{vote.voter.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Employee Reviewer</div>
                      </div>
                      <div style={{ color: 'var(--color-accent-primary)', fontWeight: 700 }}>{vote.score}/10</div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
