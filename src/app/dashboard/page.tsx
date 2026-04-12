import { auth } from "@/auth";
import Link from "next/link";
import { ShieldUser, Building2, Users, User, ArrowRight } from "lucide-react";
import styles from "./dashboard.module.css";

export default async function DashboardPage() {
  const session = await auth();
  const role = (session?.user as any)?.role;

  return (
    <main>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, background: 'var(--color-bg-secondary)', border: '1px solid var(--color-accent-primary)', color: 'var(--color-accent-primary)', padding: '2px 8px', borderRadius: '4px' }}>
              SYSTEM v2.6.4
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.5 }}>ARCHITECTURAL ANALYST</span>
          </div>
          <h1>Hello, {(session?.user?.name || "Zakariae").split(' ')[0]}</h1>
          <p className={styles.subtitle}>Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} • <span style={{ color: '#10b981', fontWeight: 600 }}>On track for Elite Tier</span></p>
        </div>
        <Link href="/challenges" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.75rem' }}>
          + NEW CHALLENGE ENTRY
        </Link>
      </div>

      <section className={styles.statsGrid}>
        {[
          { title: "Admin", icon: ShieldUser, href: "/dashboard/admin", color: "var(--color-accent-primary)", desc: "System control" },
          { title: "Company", icon: Building2, href: "/dashboard/company", color: "var(--color-accent-primary)", desc: "Enterprise suite" },
          { title: "Employee", icon: Users, href: "/dashboard/employee", color: "var(--color-accent-primary)", desc: "Voter console" },
          { title: "Candidate", icon: User, href: "/dashboard/candidate", color: "var(--color-accent-primary)", desc: "Merit profile" },
        ].map((item) => (
          <Link key={item.title} href={item.href} className={styles.statCard} style={{ textDecoration: 'none' }}>
            <div className={styles.statIcon} style={{ background: 'rgba(0, 133, 66, 0.08)', color: 'var(--color-accent-primary)' }}>
              <item.icon size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '2px' }}>MODULE</div>
              <div className={styles.statValue} style={{ fontSize: '1.25rem' }}>{item.title}</div>
            </div>
            <ArrowRight size={18} style={{ marginLeft: 'auto', opacity: 0.3 }} />
          </Link>
        ))}
      </section>

      <div className={styles.card} style={{ textAlign: 'center', opacity: 0.7 }}>
        <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
          Comparative performance benchmark vs VoxTalent global target.
        </p>
      </div>
    </main>
  );
}
