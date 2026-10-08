import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Sekhon Studio — Ideas made tangible",
    template: "%s | Sekhon Studio",
  },
  description:
    "Thoughtful 3D printed objects and personal creations. Explore the possibilities at Sekhon Studio.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
