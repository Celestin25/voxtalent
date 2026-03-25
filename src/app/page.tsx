import Link from "next/link";
import { ArrowRight, Zap, Target, Users, ShieldCheck, Trophy } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section 
        className={styles.hero}
        style={{ backgroundImage: 'url("/hero-bg.png")' }}
      >
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>
            Hire via <span className="text-gold">Collective Intelligence</span>
          </h1>
          <p className={styles.heroSubtitle}>
            We've replaced gut feelings with data-driven consensus from the people who will actually work with the hire.
          </p>
          <div className={styles.heroActions}>
            <Link href="/challenges" className="btn-primary">
              Explore Challenges <ArrowRight size={18} style={{ marginLeft: "8px" }} />
            </Link>
            <Link href="/how-it-works" className="btn-outline">
              Learn Methodology
            </Link>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="section bg-secondary">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className="text-gold" style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Our Philosophy</p>
              <h2 style={{ maxWidth: '600px' }}>Engineered for Accuracy, Built for Truth.</h2>
            </div>
          </div>
          
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <Zap size={24} />
              </div>
              <h3 className={styles.cardTitle}>Collective Intelligence</h3>
              <p className={styles.cardText}>
                Harness the wisdom of your entire team. Multiple voters mean better signal and less individual bias.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <Target size={24} />
              </div>
              <h3 className={styles.cardTitle}>Real-Work Challenges</h3>
              <p className={styles.cardText}>
                Candidates prove their ability by solving actual problems your company faces — not theoretical puzzles.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <ShieldCheck size={24} />
              </div>
              <h3 className={styles.cardTitle}>Anonymous Voting</h3>
              <p className={styles.cardText}>
                Employees vote without seeing each other's scores, eliminating groupthink and social pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
            <div>
              <h2 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>2,400+</h2>
              <p className="text-secondary" style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Active Challenges</p>
            </div>
            <div>
              <h2 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>48k+</h2>
              <p className="text-secondary" style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Votes Cast</p>
            </div>
            <div>
              <h2 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>61%</h2>
              <p className="text-secondary" style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Bias Reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-secondary" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Ready to redefine your <span className="text-gold">Hiring?</span></h2>
          <p className="text-secondary" style={{ marginBottom: '2.5rem', maxWidth: '600px', marginInline: 'auto' }}>
            Join the elite companies already using VoxTalent to build teams that matter.
          </p>
          <Link href="/signup" className="btn-primary">
            Get Started Today <ArrowRight size={18} style={{ marginLeft: "8px" }} />
          </Link>
        </div>
      </section>
    </main>
  );
}
