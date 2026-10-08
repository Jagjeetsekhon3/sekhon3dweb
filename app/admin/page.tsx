import { requireAdmin } from "@/lib/auth/admin";
import { redirect } from "next/navigation";
import { Dashboard } from "@/components/dashboard";
import { getDashboardData } from "@/lib/dashboard";
export default async function Admin() {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");
  return <Dashboard data={await getDashboardData()} />;
}
