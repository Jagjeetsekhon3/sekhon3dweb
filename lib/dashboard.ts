import "server-only";
import { createAdminClient } from "@/lib/supabase/server";
import type { DashboardData } from "@/components/dashboard";
export async function getDashboardData(): Promise<DashboardData> {
  const empty = {
    products: null,
    orders: null,
    revenue: null,
    wishlists: null,
    recent: [],
    statusCounts: {},
    error: true,
  };
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return empty;
  const db = createAdminClient();
  const [products, orders, wishlists] = await Promise.all([
    db.from("products").select("id", { head: true, count: "exact" }),
    db
      .from("orders")
      .select("id,order_number,status,payment_status,grand_total,created_at")
      .order("created_at", { ascending: false }),
    db.from("wishlists").select("id", { head: true, count: "exact" }),
  ]);
  if (products.error || orders.error || wishlists.error) return empty;
  const rows = orders.data ?? [];
  const statusCounts: Record<string, number> = {};
  for (const row of rows)
    statusCounts[row.status] = (statusCounts[row.status] ?? 0) + 1;
  return {
    products: products.count ?? 0,
    orders: rows.length,
    wishlists: wishlists.count ?? 0,
    revenue: rows
      .filter((o) => o.payment_status === "paid")
      .reduce((sum, o) => sum + Number(o.grand_total), 0),
    recent: rows.slice(0, 5),
    statusCounts,
    error: false,
  };
}
