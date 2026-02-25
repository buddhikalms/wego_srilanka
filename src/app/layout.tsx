import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Ceylon Travels - Discover Sri Lanka",
  description:
    "Experience the wonders of Sri Lanka with our curated tours, destinations, and activities. Your gateway to the Pearl of the Indian Ocean.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
