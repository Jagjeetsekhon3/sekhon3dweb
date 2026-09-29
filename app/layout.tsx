import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sekhon Studio — 3D Printed Products",
  description: "Discover unique 3D printed products and custom creations from Sekhon Studio.",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}