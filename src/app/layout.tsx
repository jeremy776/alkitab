import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";

const inter = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SelaVibes | Aplikasi Rohani Kristen Gen Z - Teduh, Dekat Tuhan",
  icons: "/logo.png",
  description:
 "SelaVibes: Aplikasi rohani Kristen modern untuk Gen Z Indonesia. Temukan ayat harian, lagu pujian kontemporer, dan konten inspiratif lainnya untuk waktu teduh yang lebih bermakna dan hubungan yang lebih dekat dengan Tuhan.",
  keywords: [
    "SelaVibes",
    "aplikasi Kristen Gen Z",
 "aplikasi rohani anak muda",
    "ayat harian",
    "lagu rohani",
 "musik rohani",
    "waktu teduh",
    "aplikasi teduh",
    "aplikasi Alkitab modern",
    "trivia Kristen",
    "devotional app Indonesia",
 "doa harian",
  ],
  metadataBase: new URL("https://alkitab-ecru.vercel.app/"), // ganti ke domain kamu jika beda
  openGraph: {
    title: "SelaVibes | Teduhin Hidupmu, Dekat Sama Tuhan",
    description:
      "Explore SelaVibes — app rohani untuk anak muda! Lagu, ayat, dan konten kekinian yang bisa bikin hati tenang dan jiwa naik level.",
    url: "https://selavibes.app",
    siteName: "SelaVibes",
    images: [
      {
 url: "/og-image.png", // pastikan gambar OG tersedia di direktori public
        width: 1200,
        height: 630,
        alt: "SelaVibes - Teduhin Hidupmu",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
 title: "SelaVibes | App Rohani Kristen Gen Z - Waktu Teduh Kekinian",
    description:
 "Aplikasi rohani modern buat anak muda Kristen. Ayat harian, lagu pujian, trivia seru. Teduhin hidupmu, deket sama Tuhan, anti ribet!",
 images: ["/og-image.png"], // sama seperti OG dari direktori public
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
