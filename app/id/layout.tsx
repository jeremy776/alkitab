import BottomNav from "@/components/bottom-nav";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alkitab online - Baca Alkitab dalam berbagai versi bahasa dan terjemahan",
  description: "Baca Alkitab dalam berbagai versi bahasa dan terjemahan",
  keywords: "alkitab, alkitab online, baca alkitab, firman tuhan, ayat harian",
  // openGraph: {
  //   title: "HollyVerse | Alkitab online - Baca Alkitab dalam berbagai versi bahasa dan terjemahan",
  //   description: "Baca Alkitab dalam berbagai versi bahasa dan terjemahan",
  //   url: "https://alkitab-ecru.vercel.app/",
  //   type: "website"
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={inter.className}>
      <Navbar />
      {children}
      <BottomNav />
      <Footer />
    </main>
  );
}