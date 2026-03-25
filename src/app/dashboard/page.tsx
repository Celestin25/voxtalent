import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShieldUser, Building2, Users, User, ArrowRight } from "lucide-react";
import styles from "./dashboard.module.css";

export default async function DashboardPage() {
  const session = await auth();
  
  if (session?.user) {
    const role = (session.user as any).role;
    switch (role) {
      case 'ADMIN':
        redirect("/dashboard/admin");
      case 'COMPANY':
        redirect("/dashboard/company");
      case 'EMPLOYEE':
        redirect("/dashboard/employee");
      case 'CANDIDATE':
        redirect("/dashboard/candidate");
      default:
        redirect("/");
    }
  }

  // Guest Hub
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Dashboard Hub</h1>
            <p className={styles.subtitle}>Select a dashboard to view as a guest.</p>
          </div>
        </header>

        <section className={styles.statsGrid}>
          {[
            { title: "Admin", icon: ShieldUser, href: "/dashboard/admin", color: "#f43f5e", desc: "System control center" },
            { title: "Company", icon: Building2, href: "/dashboard/company", color: "#d4af37", desc: "Enterprise suite" },
            { title: "Employee", icon: Users, href: "/dashboard/employee", color: "#3b82f6", desc: "Voter console" },
            { title: "Candidate", icon: User, href: "/dashboard/candidate", color: "#10b981", desc: "Merit profile" },
          ].map((item) => (
            <Link key={item.title} href={item.href} className={styles.statCard} style={{ textDecoration: 'none' }}>
              <div className={styles.statIcon} style={{ background: `${item.color}1a`, color: item.color }}>
                <item.icon size={24} />
              </div>
              <div>
                <div className={styles.statValue}>{item.title}</div>
                <div className={styles.statLabel}>{item.desc}</div>
              </div>
              <ArrowRight size={20} style={{ marginLeft: 'auto', opacity: 0.5 }} />
            </Link>
          ))}
        </section>

        <div className={styles.card} style={{ textAlign: 'center', background: 'rgba(212, 175, 55, 0.05)', border: '1px dashed var(--color-accent-primary)' }}>
          <p className="text-secondary">
            Note: Accessing these dashboards without a login will show sample data from the system.
          </p>
        </div>
      </div>
    </main>
  );
}
