import { auth } from "@/auth";
import Link from "next/link";
import { ShieldUser, Building2, Users, User, ArrowRight } from "lucide-react";
import styles from "./dashboard.module.css";

export default async function DashboardPage() {
  const session = await auth();
  const role = (session?.user as any)?.role;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Hello, {session?.user?.name || "User"}</h1>
            <p className={styles.subtitle}>Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} • <span style={{ color: '#10b981', fontWeight: 600 }}>On track for Elite Tier</span></p>
          </div>
        <Link href="/challenges" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.75rem' }}>
          + NEW CHALLENGE ENTRY
        </Link>
        </header>

      <section className={styles.statsGrid}>
        {[
          { title: "DAYS LEFT", value: "186", icon: ShieldUser, label: "Until final app", progress: 65, color: "var(--color-accent-primary)" },
          { title: "HIGH PRIORITY GAPS", value: "03", icon: Building2, label: "Focus. Cases, French", progress: 30, color: "#f59e0b" },
          { title: "PROFILES ANALYZED", value: "11", icon: Users, label: "+2 this week", progress: 85, color: "#10b981" },
          { title: "MILESTONES DONE", value: "0%", icon: User, label: "Phase 1 complete", progress: 10, color: "#6366f1" },
        ].map((item) => (
          <div key={item.title} className="card-premium" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <div className="text-label">{item.title}</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, color: 'var(--color-text-primary)' }}>{item.value}</span>
              <span className="text-secondary" style={{ fontSize: '0.8rem', paddingBottom: '6px' }}>{item.label}</span>
            </div>
            <div className="progress-container" style={{ margin: '0.5rem 0' }}>
              <div className="progress-bar" style={{ width: `${item.progress}%`, background: item.color }}></div>
            </div>
          </div>
        ))}
      </section>

      <div className="card-premium" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        {[
          { title: "Admin", href: "/dashboard/admin", desc: "System control" },
          { title: "Company", href: "/dashboard/company", desc: "Enterprise suite" },
          { title: "Employee", href: "/dashboard/employee", desc: "Voter console" },
          { title: "Candidate", href: "/dashboard/candidate", desc: "Merit profile" },
        ].map((item) => (
          <Link key={item.title} href={item.href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div className="text-label" style={{ color: 'var(--color-accent-primary)' }}>MODULE</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{item.title}</div>
            <div className="text-secondary" style={{ fontSize: '0.8rem' }}>{item.desc}</div>
          </Link>
        ))}
      </div>
      </div>
    </main>
  );
}
