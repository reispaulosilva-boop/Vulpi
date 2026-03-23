import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VULPI – Alta Dermatologia Magistral | Clínica Crepaldi",
  description:
    "Formulações magistrais de alta performance, desenvolvidas pela Clínica Crepaldi para resultados reais e mensuráveis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${cormorantGaramond.variable} ${robotoMono.variable}`}
    >
      <body className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
