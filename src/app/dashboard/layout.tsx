import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";
import styles from "./dashboard.module.css";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg-primary)" }}>
      <Sidebar user={user} />
      <div 
        style={{ 
          flex: 1, 
          marginLeft: "260px", // Match sidebar width
          padding: "2rem",
          transition: "margin-left 0.3s ease"
        }}
        className={styles.dashboardContent}
      >
        {children}
      </div>
    </div>
  );
}
