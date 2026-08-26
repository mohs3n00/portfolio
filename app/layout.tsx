import type { Metadata } from "next";
import GlobalGrain from '@/components/GlobalGrain/GlobalGrain';
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GlobalGrain />
        {children}
      </body>
    </html>
  );
}
