import { auth } from "@/auth";
import Link from "next/link";
import { ShieldUser, Building2, Users, User } from "lucide-react";
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
        </header>

      <section className={styles.statsGrid}>
        {[
          { title: "Admin", icon: ShieldUser, href: "/dashboard/admin", color: "var(--color-accent-primary)", desc: "System control" },
          { title: "Company", icon: Building2, href: "/dashboard/company", color: "var(--color-accent-primary)", desc: "Enterprise suite" },
          { title: "Employee", icon: Users, href: "/dashboard/employee", color: "var(--color-accent-primary)", desc: "Voter console" },
          { title: "Candidate", icon: User, href: "/dashboard/candidate", color: "var(--color-accent-primary)", desc: "Merit profile" },
        ].map((item) => (
          <Link key={item.title} href={item.href} className={styles.statCard} style={{ textDecoration: 'none' }}>
            <div className={styles.statIcon}>
              <item.icon size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '2px' }}>MODULE</div>
              <div className={styles.statValue} style={{ fontSize: '1.25rem' }}>{item.title}</div>
            </div>

          </Link>
        ))}
      </section>

      <div className={styles.card} style={{ textAlign: 'center', opacity: 0.7 }}>
        <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
          Comparative performance benchmark vs VoxTalent global target
        </p>
      </div>
      </div>
    </main>
  );
}
