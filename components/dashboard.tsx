import Link from "next/link";
import { Icon, type IconName } from "./icon";
export type DashboardData = {
  products: number | null;
  orders: number | null;
  revenue: number | null;
  wishlists: number | null;
  recent: {
    id: string;
    order_number: string;
    status: string;
    grand_total: number;
    created_at: string;
  }[];
  statusCounts: Record<string, number>;
  error: boolean;
};
export function Dashboard({
  data,
  preview = false,
}: {
  data: DashboardData;
  preview?: boolean;
}) {
  const metrics: {
    label: string;
    value: string;
    note: string;
    icon: IconName;
  }[] = [
    {
      label: "Total revenue",
      value:
        data.revenue === null
          ? "—"
          : "₹" + data.revenue.toLocaleString("en-IN"),
      note: "Paid orders · all time",
      icon: "chart",
    },
    {
      label: "Orders",
      value: data.orders?.toString() ?? "—",
      note: "Across your store",
      icon: "orders",
    },
    {
      label: "Products",
      value: data.products?.toString() ?? "—",
      note: "Objects in your catalog",
      icon: "box",
    },
    {
      label: "Wishlists",
      value: data.wishlists?.toString() ?? "—",
      note: "Saved by your customers",
      icon: "spark",
    },
  ];
  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link href="/" className="dashboard-brand">
          <span className="brand-symbol">
            <i />
            <i />
            <i />
          </span>
          <strong>
            SEKHON<small>STUDIO / COMMERCE</small>
          </strong>
        </Link>
        <p className="sidebar-label">WORKSPACE</p>
        <nav aria-label="Admin navigation">
          <Link
            className="selected"
            href={preview ? "/design/admin" : "/admin"}
          >
            <Icon name="grid" /> Overview
          </Link>
          <Link href="/admin/products">
            <Icon name="box" /> Products
          </Link>
          <Link href="/admin/orders">
            <Icon name="orders" /> Orders
          </Link>
        </nav>
        <div className="sidebar-studio">
          <Icon name="layers" />
          <p>Ideas made tangible.</p>
          <span>Your studio, all in one place.</span>
        </div>
        <div className="sidebar-bottom">
          <Link href="/">
            <Icon name="arrow" /> View storefront
          </Link>
          {!preview && (
            <form action="/admin/logout" method="post">
              <button>
                <Icon name="logout" /> Sign out
              </button>
            </form>
          )}
        </div>
      </aside>
      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <span>
            Workspace <span>/</span> Overview
          </span>
          <div>
            <span className="live-pill">
              {preview ? "DESIGN PREVIEW" : "STUDIO ADMIN"}
            </span>
            <span className="admin-avatar">S</span>
          </div>
        </header>
        {preview && (
          <div className="preview-notice">
            Design preview · Illustrative empty state. Sign in to access your
            live store. <Link href="/admin/login">Sign in →</Link>
          </div>
        )}
        <div className="dashboard-heading">
          <div>
            <p className="eyebrow">YOUR STUDIO AT A GLANCE</p>
            <h1>Make room for possibility.</h1>
            <p>Here’s what’s happening in your store.</p>
          </div>
          <Link className="button black" href="/admin/products/new">
            <Icon name="plus" /> Add product
          </Link>
        </div>
        {data.error && (
          <div className="alert" role="alert">
            Store data could not be loaded. Check the server’s Supabase
            connection before managing your store.
          </div>
        )}
        <div className="dashboard-metrics">
          {metrics.map((m, i) => (
            <article
              className={
                "dashboard-metric " + (i === 0 ? "featured-metric" : "")
              }
              key={m.label}
            >
              <div>
                <span>{m.label}</span>
                <Icon name={m.icon} />
              </div>
              <strong>{m.value}</strong>
              <small>{m.note}</small>
            </article>
          ))}
        </div>
        <div className="dashboard-body">
          <div>
            <section className="dashboard-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">FROM IDEA TO DELIVERY</p>
                  <h2>Order journey</h2>
                </div>
                <Icon name="layers" />
              </div>
              <div className="journey">
                {[
                  ["pending", "New orders"],
                  ["printing", "In printing"],
                  ["packed", "Packed"],
                  ["shipped", "Shipped"],
                  ["delivered", "Delivered"],
                ].map(([s, l], i) => (
                  <div key={s}>
                    <span className="journey-step">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <strong>
                      {data.error ? "—" : (data.statusCounts[s] ?? 0)}
                    </strong>
                    <small>{l}</small>
                  </div>
                ))}
              </div>
            </section>
            <section className="dashboard-panel orders-panel">
              <div className="panel-heading">
                <h2>Recent orders</h2>
                <Link className="text-link" href="/admin/orders">
                  View orders <Icon name="arrow" />
                </Link>
              </div>
              {data.recent.length ? (
                <div className="order-table">
                  {data.recent.map((o) => (
                    <div key={o.id}>
                      <strong>{o.order_number}</strong>
                      <span className="status">{o.status}</span>
                      <span>
                        ₹{Number(o.grand_total).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="dashboard-empty">
                  <Icon name="orders" width={36} height={36} />
                  <h3>
                    {data.error
                      ? "Orders unavailable"
                      : "Your next chapter starts here."}
                  </h3>
                  <p>
                    {data.error
                      ? "Please check your store connection."
                      : "Orders will appear here as your store grows."}
                  </p>
                </div>
              )}
            </section>
          </div>
          <aside className="dashboard-right">
            <section className="studio-note">
              <span className="eyebrow light">THE NEXT GREAT OBJECT</span>
              <h2>
                Starts with
                <br />
                an idea.
              </h2>
              <p>
                Turn your designs into a collection your customers will love.
              </p>
              <Link href="/admin/products/new" className="button white">
                Create an object <Icon name="arrow" />
              </Link>
              <div className="note-orbit" aria-hidden="true" />
            </section>
            <section className="dashboard-panel checklist">
              <h2>Studio essentials</h2>
              <Link href="/admin/products">
                <Icon name="box" />
                <span>
                  Build your catalog<small>Products, pricing & stock</small>
                </span>
                <Icon name="arrow" />
              </Link>
              <Link href="/admin/orders">
                <Icon name="truck" />
                <span>
                  Follow your orders<small>Printing through delivery</small>
                </span>
                <Icon name="arrow" />
              </Link>
              <Link href="/">
                <Icon name="grid" />
                <span>
                  Visit your storefront
                  <small>See the customer experience</small>
                </span>
                <Icon name="arrow" />
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
