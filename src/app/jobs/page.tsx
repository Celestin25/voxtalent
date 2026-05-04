import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, Briefcase, MapPin, Building2 } from "lucide-react";
import styles from "./jobs.module.css";

export const dynamic = 'force-dynamic';

export default async function JobsPage() {
  // Fetch OPEN challenges that have a jobTitle
  const challenges = await prisma.challenge.findMany({
    where: { status: 'OPEN', jobTitle: { not: null } },
    include: { company: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className={styles.main}>
      <div className={styles.heroBanner}>
        <div className="container">
          <h1 className={styles.heroTitle}>Explore Open Roles</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <p className={styles.heroSubtitle} style={{ marginBottom: 0 }}>Find your next opportunity and prove your skills through our merit-based challenges.</p>
            <Link href="/dashboard/company" className="btn-outline" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              Post a Job
            </Link>
          </div>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <Search className={styles.searchIcon} size={20} />
              <input 
                type="text" 
                placeholder="Search by job title..." 
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filters}>
              <select className={styles.filterSelect}>
                <option>All departments</option>
              </select>
              <select className={styles.filterSelect}>
                <option>All locations</option>
              </select>
              <select className={styles.filterSelect}>
                <option>All employment types</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <section className="container" style={{ padding: '4rem 1rem' }}>
        <div className={styles.jobGrid}>
          {challenges.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No open roles available right now. Check back later!</p>
            </div>
          ) : (
            challenges.map(challenge => (
              <div key={challenge.id} className={styles.jobCard}>
                <div className={styles.jobCardHeader}>
                  <h2 className={styles.jobTitle}>{challenge.jobTitle}</h2>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className={styles.companyName}>
                      <Building2 size={14} className="mr-1" />
                      {challenge.company.name}
                    </span>
                    {challenge.jobLocation && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} /> {challenge.jobLocation}
                      </span>
                    )}
                    {challenge.isRemote && (
                      <span style={{ fontSize: '0.7rem', background: 'rgba(79,70,229,0.1)', color: 'var(--color-accent-primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase' }}>
                        Remote
                      </span>
                    )}
                  </div>
                </div>
                
                <div className={styles.jobDescription}>
                  {challenge.jobDescription ? (
                    <p>{challenge.jobDescription.length > 150 ? `${challenge.jobDescription.substring(0, 150)}...` : challenge.jobDescription}</p>
                  ) : (
                    <p className="text-secondary italic">No description provided.</p>
                  )}
                </div>

                <div className={styles.jobFooter}>
                  <Link href={`/challenges/${challenge.id}`} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    View & Apply
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
