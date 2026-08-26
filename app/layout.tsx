import type { Metadata } from "next";
import { Outfit, Inter } from 'next/font/google';
import GlobalGrain from '@/components/GlobalGrain/GlobalGrain';
import "./globals.css";

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600']
});

export const metadata: Metadata = {
  title: "Mohsen — Designer & Developer",
  description: "Premium digital portfolio of Mohsen — UI/UX designer and front-end developer building products that matter.",
  keywords: ["designer", "developer", "portfolio", "UI/UX", "web development", "Mohsen"],
  openGraph: {
    title: "Mohsen — Designer & Developer",
    description: "Building digital experiences that feel premium, precise, and alive.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>
        <GlobalGrain />
        {children}
      </body>
    </html>
  );
}
