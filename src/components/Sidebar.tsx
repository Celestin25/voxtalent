"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Target, 
  Map, 
  LineChart, 
  ClipboardCheck, 
  Network, 
  Clock, 
  Users, 
  Database,
  LayoutDashboard,
  LogOut
} from "lucide-react";
import styles from "./Sidebar.module.css";
import { handleSignOut } from "@/actions/auth";

const navItems = [
  { group: "MAIN", items: [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Case Guide", icon: Target, href: "/challenges" },
    { name: "VA Blueprint", icon: Map, href: "#" },
  ]},
  { group: "MORE", items: [
    { name: "Gap Analysis", icon: BarChart3, href: "#" },
    { name: "Case Tracker", icon: ClipboardCheck, href: "#" },
    { name: "Networking Tracker", icon: Network, href: "#" },
    { name: "Application Timeline", icon: Clock, href: "#" },
    { name: "BCG People", icon: Users, href: "#" },
    { name: "Hub Intel", icon: Database, href: "#" },
  ]},
];

export default function Sidebar({ user }: { user?: any }) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>
          <BarChart3 size={24} color="#008542" />
        </div>
        <div className={styles.logoText}>
          <div className={styles.brand}>VoxTalent — BCG</div>
          <div className={styles.status}>TRANSFORMATION HUB</div>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((group, i) => (
          <div key={i} className={styles.group}>
            <div className={styles.groupLabel}>{group.group}</div>
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                  {isActive && <div className={styles.activeDot} />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            {user?.name?.substring(0, 2).toUpperCase() || "ZM"}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user?.name || "Zakariae Mourid"}</div>
            <div className={styles.userRole}>{user?.role || "ASSOCIATE CANDIDATE"}</div>
          </div>
        </div>
        <form action={handleSignOut} className={styles.logoutForm}>
          <button type="submit" className={styles.logoutBtn}>
            <LogOut size={16} />
          </button>
        </form>
      </div>
    </aside>
  );
}
