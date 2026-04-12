import { auth } from "@/auth";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import styles from "../../challenges/[id]/page.module.css";
import dashboardStyles from "../../dashboard/dashboard.module.css";
import { prisma } from "@/lib/prisma";
import VotingForm from "./VotingForm";
import FileViewer from "@/components/FileViewer";

export default async function VotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: submissionId } = await params;
  const session = await auth();

  const isSignedIn = !!session?.user?.id;

  let submission: any = null;

  try {
    submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        challenge: {
          include: {
            company: true
          }
        },
        votes: isSignedIn
          ? { where: { voterId: session!.user!.id } }
          : { where: { voterId: 'no-match' } }
      }
    });
  } catch (error) {
    console.error("Vote page: DB error", error);
  }

  if (!submission) {
    notFound();
  }

  if (isSignedIn && submission.votes.length > 0) {
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

  const challenge = submission.challenge;

  return (
    <main className={dashboardStyles.main}>
      <div className={dashboardStyles.container}>
        <Link href="/challenges" className="text-secondary hover:text-accent flex items-center gap-2 mb-10 text-xs font-bold uppercase tracking-widest">
          <ArrowLeft size={14} /> Back to Challenges
        </Link>

        <header className={dashboardStyles.header}>
          <div className={dashboardStyles.headerTitle}>
            <h1>Merit Review</h1>
            <p className={dashboardStyles.subtitle} style={{ color: '#000', opacity: 1 }}>
              Submission for: <span style={{ color: '#000', fontWeight: 'bold' }}>{challenge.title}</span>
            </p>
          </div>
          <div className={`${dashboardStyles.badge} ${dashboardStyles.badgePending}`}>
            ANONYMOUS REVIEW
          </div>
        </header>

        {/* Challenge brief */}
        <section className={dashboardStyles.card} style={{ marginBottom: '2rem' }}>
          <div className={dashboardStyles.cardHeader}>
            <h2 className={dashboardStyles.cardTitle} style={{ color: '#000', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={20} /> Challenge Brief
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              {challenge.company.name}
            </span>
          </div>

          <div style={{
            background: 'rgba(79,70,229,0.03)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(79,70,229,0.1)',
            whiteSpace: 'pre-wrap',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: '#000',
          }}>
            {challenge.description || (
              <span style={{ fontStyle: 'italic', color: '#555' }}>No text description. See attachment below.</span>
            )}
          </div>

          {challenge.attachmentUrl && challenge.attachmentName && challenge.attachmentType && (
            <FileViewer
              url={challenge.attachmentUrl}
              name={challenge.attachmentName}
              type={challenge.attachmentType}
              label="Challenge Attachment"
            />
          )}
        </section>

        <div className={dashboardStyles.contentGrid}>
          {/* Candidate solution */}
          <section className={dashboardStyles.card}>
            <div className={dashboardStyles.cardHeader}>
              <h2 className={dashboardStyles.cardTitle} style={{ color: '#000' }}>Candidate Solution</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000', fontSize: '0.8rem', fontWeight: 600 }}>
                <AlertCircle size={14} /> SUB-{submission.id.substring(0, 8)}
              </div>
            </div>

            <div style={{
              background: 'rgba(79,70,229,0.03)',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid rgba(79,70,229,0.1)',
              minHeight: '200px',
              whiteSpace: 'pre-wrap',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: '#000',
            }}>
              {submission.content || (
                <div style={{ fontStyle: 'italic', color: '#555', fontSize: '0.95rem' }}>
                  No text provided. See attachment below.
                </div>
              )}
            </div>

            {submission.fileUrl && submission.fileName && submission.fileType && (
              <FileViewer
                url={submission.fileUrl}
                name={submission.fileName}
                type={submission.fileType}
                label="Answer Attachment"
              />
            )}
          </section>

          <aside>
            <div className={dashboardStyles.card} style={{ border: '1px solid var(--color-accent-primary)' }}>
              <h3 className={dashboardStyles.sidebarTitle}>Observation Desk</h3>
              <p className="text-secondary text-sm mb-6" style={{ color: '#000', fontWeight: 500 }}>
                Identify technical flaws by stacking lemons <strong>0 lemons = Excellence</strong> 10 lemons = Significant failure Only submit lemons for identified weaknesses
              </p>

              <VotingForm submissionId={submission.id} isSignedIn={isSignedIn} />

              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-accent-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <ShieldCheck size={16} /> Anonymous Protocol
                </div>
                <p className="text-secondary" style={{ fontSize: '0.75rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
                  Your identity is never shown to the candidate Only the aggregated score is revealed
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
