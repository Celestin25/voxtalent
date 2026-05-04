import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Globe, Linkedin, User, Briefcase, Calendar, FileText, Download, CheckCircle, Info, Zap } from "lucide-react";
import styles from "../../../dashboard.module.css";

export const dynamic = 'force-dynamic';

export default async function ApplicantProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const applicant = await prisma.submission.findUnique({
    where: { id },
    include: {
      challenge: true,
      candidate: true,
    }
  });

  if (!applicant) notFound();

  const name = applicant.firstName ? `${applicant.firstName} ${applicant.lastName}` : (applicant.candidate?.name || "Anonymous Applicant");

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <Link href="/dashboard/recruiter" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', textDecoration: 'none' }}>
              <ArrowLeft size={14} /> Back to Applicant Tracking
            </Link>
            <h1>{name}</h1>
            <p className={styles.subtitle}>Applicant Profile for {applicant.challenge.jobTitle || applicant.challenge.title}</p>
          </div>
        </header>

        <div className={styles.contentGrid}>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Personal Information Card */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Personal Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                    <User size={16} /> {name}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                    <Mail size={16} /> {applicant.email || applicant.candidate?.email}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Phone</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                    <Phone size={16} /> {applicant.phone || "Not provided"}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Location</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                    <MapPin size={16} /> {applicant.country || applicant.countryOfResidence || "Not provided"}
                  </div>
                </div>
              </div>
            </div>

            {/* Application Questions Card */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Application Responses</h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-accent-primary)', display: 'block', marginBottom: '0.75rem' }}>What interests and excites you about joining Sand?</label>
                <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', lineHeight: 1.6 }}>
                  {applicant.interestQuestion || "No response provided."}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-accent-primary)', display: 'block', marginBottom: '0.75rem' }}>Why do you think you'd be a good fit?</label>
                <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', lineHeight: 1.6 }}>
                  {applicant.fitQuestion || "No response provided."}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Salary Expectations</label>
                  <div style={{ fontWeight: 600 }}>{applicant.salaryExpectations ? `$${applicant.salaryExpectations}` : "Not provided"}</div>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Available to Start</label>
                  <div style={{ fontWeight: 600 }}>{applicant.joinDate || "Not provided"}</div>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Visa Sponsorship</label>
                  <div style={{ fontWeight: 600 }}>{applicant.visaSponsorship || "Not provided"}</div>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Gender</label>
                  <div style={{ fontWeight: 600 }}>{applicant.gender || "Not provided"}</div>
                </div>
              </div>
            </div>

            {/* Candidate Summary / Notes */}
            {applicant.content && applicant.content !== 'Application submitted via simplified Apply button.' && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Additional Notes</h2>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {applicant.content}
                </div>
              </div>
            )}
          </section>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Documents Section */}
            <div className={styles.card} style={{ borderColor: 'var(--color-accent-primary)', borderStyle: 'dashed' }}>
              <h3 className={styles.sidebarTitle}>Attachments</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {applicant.resumeUrl ? (
                  <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <Download size={18} /> View Resume
                  </a>
                ) : (
                  <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.8rem', background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                    No Resume Attached
                  </div>
                )}

                {applicant.coverLetterUrl ? (
                  <a href={applicant.coverLetterUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <FileText size={18} /> View Cover Letter
                  </a>
                ) : (
                  <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.8rem', background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                    No Cover Letter Attached
                  </div>
                )}
              </div>
            </div>

            {/* Recruitment Info */}
            <div className={styles.card}>
              <h3 className={styles.sidebarTitle}>Sourcing</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Application Date</label>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{new Date(applicant.createdAt).toLocaleDateString()}</div>
                </div>
                <div>
                  <label style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Heard About Role</label>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{applicant.heardAboutRole || "Not provided"}</div>
                </div>
                {applicant.linkedInProfile && (
                  <div>
                    <label style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>LinkedIn</label>
                    <a href={applicant.linkedInProfile} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-accent-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Linkedin size={14} /> View Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Merit Verification Placeholder */}
            <div className={styles.card} style={{ background: 'linear-gradient(to bottom right, #f8fafc, #eff6ff)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent-primary)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  <Zap size={16} /> Merit Consensus
               </div>
               <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
                 This candidate's merit is currently being vetted by the collective employee console.
               </p>
               <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1e293b' }}>
                 TBD
               </div>
               <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verification Score</div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
