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
  const user = session?.user as any || { id: "guest-company", role: "COMPANY" };

  let submission: any = null;

  try {
    submission = await prisma.submission.findUnique({
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
  } catch (error) {
    console.error("Submission detail: DB error", error);
  }

  if (!submission) {
    const sampleSubmissions: Record<string, any> = {
      'sample-sub-1': {
        id: 'sample-sub-1',
        createdAt: new Date(Date.now() - 86400000 * 2),
        challengeId: 'sample-ch-1',
        content: 'I would approach this challenge by first containerizing all services using Docker, then orchestrating with Kubernetes. The CI/CD pipeline would use GitHub Actions for automated testing and deployment. Infrastructure as Code via Terraform would manage cloud resources, and Prometheus + Grafana would handle monitoring and alerting.',
        candidate: { name: 'Alex Rivera' },
        challenge: { title: 'Senior DevOps Challenge' },
        votes: [
          { id: 'v1', score: 8, voter: { name: 'Sarah K.' } },
          { id: 'v2', score: 9, voter: { name: 'Mike T.' } },
          { id: 'v3', score: 7, voter: { name: 'Lisa M.' } }
        ]
      },
      'sample-sub-2': {
        id: 'sample-sub-2',
        createdAt: new Date(Date.now() - 86400000 * 4),
        challengeId: 'sample-ch-1',
        content: 'My solution leverages a microservices architecture with service mesh (Istio) for inter-service communication. I would implement blue-green deployments to minimize downtime, use Helm charts for Kubernetes package management, and establish automated rollback mechanisms for failed deployments.',
        candidate: { name: 'Jamie Chen' },
        challenge: { title: 'Senior DevOps Challenge' },
        votes: [
          { id: 'v4', score: 9, voter: { name: 'Sarah K.' } },
          { id: 'v5', score: 10, voter: { name: 'David R.' } }
        ]
      },
      'sample-sub-3': {
        id: 'sample-sub-3',
        createdAt: new Date(Date.now() - 86400000 * 6),
        challengeId: 'sample-ch-1',
        content: 'Proposed solution uses GitOps principles with ArgoCD for continuous delivery. The pipeline includes automated security scanning (Snyk/Trivy), performance benchmarking gates, and multi-environment promotion workflows. On-call runbooks would be maintained alongside the infrastructure code.',
        candidate: { name: 'Taylor Brooks' },
        challenge: { title: 'Senior DevOps Challenge' },
        votes: []
      },
      'sample-sub-4': {
        id: 'sample-sub-4',
        createdAt: new Date(Date.now() - 86400000 * 1),
        challengeId: 'sample-ch-2',
        content: 'Full-stack solution using Next.js 14 with App Router for the frontend, paired with a Node.js/Express API layer. PostgreSQL handles data persistence with Prisma ORM. Real-time features are implemented via WebSockets, and the UI is designed with accessibility (WCAG 2.1) in mind.',
        candidate: { name: 'Morgan Smith' },
        challenge: { title: 'Fullstack Product Engineer' },
        votes: [
          { id: 'v6', score: 7, voter: { name: 'Emma W.' } },
          { id: 'v7', score: 8, voter: { name: 'Chris B.' } }
        ]
      },
      'sample-sub-5': {
        id: 'sample-sub-5',
        createdAt: new Date(Date.now() - 86400000 * 3),
        challengeId: 'sample-ch-2',
        content: 'Built with React + TypeScript frontend and a GraphQL API using Apollo Server. The architecture emphasizes type safety end-to-end with code generation from the GraphQL schema. State management uses Zustand, and testing coverage is maintained above 80% with Vitest and Playwright for e2e.',
        candidate: { name: 'Jordan Lee' },
        challenge: { title: 'Fullstack Product Engineer' },
        votes: [
          { id: 'v8', score: 6, voter: { name: 'Emma W.' } },
          { id: 'v9', score: 7, voter: { name: 'Chris B.' } },
          { id: 'v10', score: 8, voter: { name: 'Sarah K.' } }
        ]
      }
    };
    submission = sampleSubmissions[submissionId] || null;
    if (!submission) {
      notFound();
    }
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
