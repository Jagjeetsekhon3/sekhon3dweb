import { Dashboard } from "@/components/dashboard";
export const metadata = {
  title: "Admin design preview | Sekhon Studio",
  robots: { index: false, follow: false },
};
export default function Preview() {
  return (
    <Dashboard
      preview
      data={{
        products: 0,
        orders: 0,
        revenue: 0,
        wishlists: 0,
        recent: [],
        statusCounts: {},
        error: false,
      }}
    />
  );
}
