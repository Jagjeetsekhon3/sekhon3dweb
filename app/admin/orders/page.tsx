import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/server";
export default async function Orders() {
  if (!(await requireAdmin())) redirect("/admin/login");
  const result = process.env.SUPABASE_SERVICE_ROLE_KEY
    ? await createAdminClient()
        .from("orders")
        .select("id,order_number,status,payment_status,grand_total,created_at")
        .order("created_at", { ascending: false })
    : { data: null, error: true };
  return (
    <main className="inner-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">STUDIO COMMERCE</p>
          <h1>Orders</h1>
        </div>
        <Link href="/admin" className="button black">
          Back to overview
        </Link>
      </div>
      {result.error ? (
        <div className="alert">
          Order data is unavailable. Check the server’s Supabase connection.
        </div>
      ) : result.data?.length ? (
        <div className="order-table">
          {result.data.map((o) => (
            <div key={o.id}>
              <strong>{o.order_number}</strong>
              <span className="status">{o.status}</span>
              <span>{o.payment_status}</span>
              <span>₹{Number(o.grand_total).toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <div>
            <h3>No orders yet.</h3>
            <p>Customer orders will appear here when placed.</p>
          </div>
        </div>
      )}
    </main>
  );
}
