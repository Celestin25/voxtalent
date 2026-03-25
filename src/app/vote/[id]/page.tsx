import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Star,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import styles from "../../challenges/[id]/page.module.css";
import dashboardStyles from "../../dashboard/dashboard.module.css";
import { prisma } from "@/lib/prisma";
import VotingForm from "./VotingForm";

export default async function VotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: submissionId } = await params;
  const session = await auth();

  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: {
      challenge: {
        include: {
          company: true
        }
      },
      votes: {
        where: {
          voterId: session.user.id
        }
      }
    }
  });

  if (!submission) {
    notFound();
  }

  if (submission.votes.length > 0) {
    return (
      <main className={dashboardStyles.main}>
        <div className={dashboardStyles.container} style={{ textAlign: 'center' }}>
          <h1 className={dashboardStyles.cardTitle}>Vote Recorded</h1>
          <p className="text-secondary mb-8">You have already cast your vote for this submission.</p>
          <Link href="/dashboard/employee" className="btn-primary">Back to Dashboard</Link>
        </div>
      </main>
    )
  }

  return (
    <main className={dashboardStyles.main}>
      <div className={dashboardStyles.container}>
        <Link href="/dashboard/employee" className="text-secondary hover:text-white flex items-center gap-2 mb-10 text-xs font-bold uppercase tracking-widest">
          <ArrowLeft size={14} /> Back to Queue
        </Link>

        <header className={dashboardStyles.header}>
          <div className={dashboardStyles.headerTitle}>
            <h1>Merit Review</h1>
            <p className={dashboardStyles.subtitle}>
              Submission for: <span className="text-white font-bold">{submission.challenge.title}</span>
            </p>
          </div>
          <div className={`${dashboardStyles.badge} ${dashboardStyles.badgePending}`}>
            ANONYMOUS REVIEW
          </div>
        </header>

        <div className={dashboardStyles.contentGrid}>
          <section className={dashboardStyles.card}>
            <div className={dashboardStyles.cardHeader}>
              <h2 className={dashboardStyles.cardTitle}>Candidate Solution</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                <AlertCircle size={14} /> SUB-{submission.id.substring(0,8)}
              </div>
            </div>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.02)', 
              borderRadius: '12px', 
              padding: '2rem', 
              border: '1px solid rgba(255,255,255,0.05)',
              minHeight: '300px',
              whiteSpace: 'pre-wrap',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: '#e2e8f0'
            }}>
              {submission.content}
            </div>
          </section>

          <aside>
            <div className={dashboardStyles.card} style={{ border: '1px solid var(--color-accent-primary)' }}>
              <h3 className={dashboardStyles.sidebarTitle}>Cast Your Vote</h3>
              <p className="text-secondary text-sm mb-6">
                Score this solution based on technical merit, clarity, and adherence to requirements.
              </p>
              
              <VotingForm submissionId={submission.id} />

              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-accent-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <ShieldCheck size={16} /> Anonymous Protocol
                </div>
                <p className="text-secondary" style={{ fontSize: '0.75rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
                  Your identity is hidden from the candidate. Only aggregated scores are revealed.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
