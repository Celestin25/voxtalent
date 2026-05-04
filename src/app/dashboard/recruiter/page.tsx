import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import { User, FileText, Download, Briefcase, Calendar, MapPin, ExternalLink, Phone, Mail, Linkedin, Globe } from "lucide-react";
import styles from "../dashboard.module.css";

export const dynamic = 'force-dynamic';

export default async function RecruiterDashboard() {
  const submissions = await prisma.submission.findMany({
    include: {
      challenge: true,
      candidate: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <div className={styles.statIcon} style={{ width: '32px', height: '32px' }}><Briefcase size={16} /></div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest">Talent Acquisition</span>
            </div>
            <h1>Recruiter Console</h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/dashboard" className="btn-outline" style={{ padding: '0.6rem 1.25rem' }}>Back to Modules</Link>
          </div>
        </header>

        {/* Stats Summary */}
        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><User size={24} /></div>
            <div>
              <div className={styles.statValue}>{submissions.length}</div>
              <div className={styles.statLabel}>Total Applicants</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Briefcase size={24} /></div>
            <div>
              <div className={styles.statValue}>{new Set(submissions.map(s => s.challengeId)).size}</div>
              <div className={styles.statLabel}>Active Roles</div>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Applicant Tracking</h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Applicant</th>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Role Applied</th>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Documents</th>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                      No applications found in the database.
                    </td>
                  </tr>
                ) : (
                  submissions.map((sub) => (
                    <tr key={sub.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          {sub.firstName ? `${sub.firstName} ${sub.lastName}` : (sub.candidate?.name || "Anonymous Applicant")}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail size={12} /> {sub.email || sub.candidate?.email}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{sub.challenge.jobTitle || sub.challenge.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={12} /> {new Date(sub.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {sub.resumeUrl && (
                            <a href={sub.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Download size={12} /> Resume
                            </a>
                          )}
                          {sub.coverLetterUrl && (
                            <a href={sub.coverLetterUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <FileText size={12} /> Cover Letter
                            </a>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          fontWeight: 800, 
                          background: sub.status === 'HIRED' ? 'rgba(16,185,129,0.1)' : 'rgba(79,70,229,0.1)',
                          color: sub.status === 'HIRED' ? '#10b981' : 'var(--color-accent-primary)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          {sub.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <Link href={`/dashboard/recruiter/applicants/${sub.id}`} className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                          View Profile
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
