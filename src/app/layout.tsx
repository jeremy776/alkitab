import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";

const inter = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SelaVibes | Teduhin Hidupmu, Dekat Sama Tuhan",
  icons: "/logo.png",
  description:
    "SelaVibes adalah aplikasi rohani yang chill dan kekinian. Temukan lagu pujian, ayat harian, dan trivia seru buat hidup yang makin teduh dan bermakna.",
  keywords: [
    "SelaVibes",
    "aplikasi Kristen Gen Z",
    "ayat harian",
    "lagu rohani",
    "waktu teduh",
    "aplikasi teduh",
    "aplikasi Kristen anak muda",
    "aplikasi Alkitab modern",
    "trivia Kristen",
    "devotional app Indonesia",
  ],
  metadataBase: new URL("https://alkitab-ecru.vercel.app/"), // ganti ke domain kamu jika beda
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SelaVibes | Teduhin Hidupmu, Dekat Sama Tuhan",
    description:
      "Explore SelaVibes — app rohani untuk anak muda! Lagu, ayat, dan konten kekinian yang bisa bikin hati tenang dan jiwa naik level.",
    url: "https://selavibes.app",
    siteName: "SelaVibes",
    images: [
      {
        url: "https://selavibes.app/og-image.png", // pastikan gambar OG tersedia
        width: 1200,
        height: 630,
        alt: "SelaVibes - Teduhin Hidupmu",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SelaVibes | Teduhin Hidupmu, Dekat Sama Tuhan",
    description:
      "Aplikasi rohani modern buat kamu yang pengen deket sama Tuhan tanpa ribet.",
    images: ["https://selavibes.app/og-image.png"], // sama seperti OG
    creator: "@selavibesapp", // opsional, jika punya Twitter
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#6C4AB6", // atau sesuai warna branding utama
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
