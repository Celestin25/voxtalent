import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

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
