import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <style>{`
          .font-display {
            font-family: inherit !important;
          }
        `}</style>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
