import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PolymerCryst",
  description: "Polymer crystallization research platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-canvas antialiased font-sans">{children}</body>
    </html>
  );
}
