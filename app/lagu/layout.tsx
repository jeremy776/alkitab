import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lagu Rohani online - Dapatkan lirik lagu rohani",
  description: "",
  keywords: "alkitab, alkitab online, baca alkitab, firman tuhan, ayat harian",
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
    </main>
  )
}