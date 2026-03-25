import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
  ShieldAlert, 
  Activity, 
  Users, 
  Database, 
  Settings, 
  Server,
  Lock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import styles from "../dashboard.module.css";
import SignOutButton from "@/components/SignOutButton";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
     // For demo purposes, we usually allow admin access if logged in as admin
  }
  
  const user = session?.user as any;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <div className={styles.statIcon} style={{ width: '32px', height: '32px', background: 'rgba(244,63,94,0.1)', color: '#f43f5e' }}><Lock size={16} /></div>
              <span style={{ color: '#f43f5e', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secure Control Center</span>
            </div>
            <h1>System Overview</h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <SignOutButton />
             <button className="btn-outline">Security Logs</button>
             <button className="btn-primary" style={{ background: '#f43f5e', borderColor: '#f43f5e' }}>System Lockdown</button>
          </div>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Activity size={24} /></div>
            <div>
              <div className={styles.statValue}>99.9%</div>
              <div className={styles.statLabel}>System Uptime</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Users size={24} /></div>
            <div>
              <div className={styles.statValue}>1,280</div>
              <div className={styles.statLabel}>Total Users</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><ShieldAlert size={24} /></div>
            <div>
              <div className={styles.statValue}>0</div>
              <div className={styles.statLabel}>Pending Flags</div>
            </div>
          </div>
        </section>

        <div className={styles.contentGrid}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Recent System Events</h2>
              <Settings size={18} className="text-secondary cursor-pointer" />
            </div>
            
            <div className={styles.list}>
              {[
                { title: "New Company Registered", meta: "Lumina Tech • 12 mins ago", icon: Database },
                { title: "High Volume Voting Detected", meta: "Challenge #492 • 45 mins ago", icon: Activity },
                { title: "Automatic Backup Successful", meta: "System • 2 hours ago", icon: Server },
              ].map((item, i) => (
                <div key={i} className={styles.listItem}>
                  <div className={styles.listInfo} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className={styles.statIcon} style={{ width: '36px', height: '36px', borderRadius: '8px' }}><item.icon size={16} /></div>
                    <div>
                      <h4 style={{ marginBottom: 0 }}>{item.title}</h4>
                      <div className={styles.listMeta}>{item.meta}</div>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-secondary" />
                </div>
              ))}
            </div>
          </section>

          <aside>
            <section className={styles.card}>
              <h3 className={styles.sidebarTitle}>Infrastructure</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }} />
                    <span className="text-sm">Main Database</span>
                  </div>
                  <span className="text-xs text-secondary">Healthy</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }} />
                    <span className="text-sm">Auth Server</span>
                  </div>
                  <span className="text-xs text-secondary">Healthy</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }} />
                    <span className="text-sm">Mail Relay</span>
                  </div>
                  <span className="text-xs text-secondary">Slow (80ms)</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
