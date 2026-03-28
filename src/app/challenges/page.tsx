import { Search, MapPin, Clock, Users, Zap, Filter, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import styles from './page.module.css'
import { prisma } from "@/lib/prisma"
import { challenges as sampleChallenges } from "@/lib/data"

export default async function ChallengesPage() {
  let challenges: any[] = [];

  try {
    challenges = await prisma.challenge.findMany({
      include: {
        company: true,
        _count: {
          select: { submissions: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Challenges page: DB unavailable, using fallback data.", error);
    challenges = sampleChallenges.map(ch => ({
      id: ch.id,
      title: ch.title,
      description: ch.description,
      status: ch.status,
      deadline: new Date(ch.deadline),
      company: { name: ch.company.name },
      _count: { submissions: ch.applicants }
    }));
  }

  return (
    <main className={styles.main}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Solve Problems. <span className="text-gold">Get Vetted.</span></h1>
          <p className={styles.subtitle}>
            Bypass resumes. Prove your skills through anonymous challenges reviewed by the people who already do the work.
          </p>
        </header>

        <div className={styles.searchBar}>
          <Search size={20} className="text-secondary" style={{ marginLeft: '1.5rem' }} />
          <input placeholder="Search skills, companies, or roles..." />
          <button className="btn-primary" style={{ borderRadius: '30px', padding: '0.75rem 1.5rem', fontSize: '0.85rem' }}>
            Find Projects
          </button>
        </div>

        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3>Categories</h3>
              <div className={styles.filterList}>
                <div className={styles.filterItem}><div className={styles.filterCheckbox} /> Engineering</div>
                <div className={styles.filterItem}><div className={styles.filterCheckbox} /> Product Design</div>
                <div className={styles.filterItem}><div className={styles.filterCheckbox} /> Marketing</div>
                <div className={styles.filterItem}><div className={styles.filterCheckbox} /> Finance</div>
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3>Difficulty</h3>
              <div className={styles.filterList}>
                <div className={styles.filterItem}><div className={styles.filterCheckbox} /> Entry Level</div>
                <div className={styles.filterItem}><div className={styles.filterCheckbox} /> Mid-Level</div>
                <div className={styles.filterItem}><div className={styles.filterCheckbox} /> Senior+</div>
              </div>
            </div>

            <div style={{ padding: '2rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
               <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Verified Talent Only</h4>
               <p className="text-secondary" style={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
                 Enable Advanced Verification to access challenges with prize pools over $5,000.
               </p>
               <button className="btn-outline" style={{ display:'block', width: '100%', marginTop: '1.25rem', fontSize: '0.75rem' }}>
                 Get Verified
               </button>
            </div>
          </aside>

          <section className={styles.grid}>
            {challenges.length === 0 ? (
              <div className={styles.emptyState} style={{ gridColumn: '1 / -1' }}>
                <p>No active challenges found.</p>
              </div>
            ) : (
              challenges.map((ch: any) => (
                <Link key={ch.id} href={`/challenges/${ch.id}`} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.companyLogo}>{ch.company.name.substring(0, 2).toUpperCase()}</div>
                    <div className={`${styles.badge}`} style={{background: ch.status === 'OPEN' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: ch.status === 'OPEN' ? '#10b981' : '#f59e0b'}}>
                      {ch.status}
                    </div>
                  </div>
                  
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{ch.title}</h3>
                    <p className="text-gold text-xs font-bold uppercase tracking-widest mb-4">{ch.company.name}</p>
                    <p className={styles.cardDesc}>{ch.description.substring(0, 100)}...</p>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.cardMeta}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-accent-primary)', fontWeight: 700 }}><Users size={14} /> {ch._count.submissions} PATHFINDERS</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {new Date(ch.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
