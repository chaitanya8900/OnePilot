import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "OnePilot — Everything Your Business Needs. One Partner.",
  description:
    "OnePilot is your strategic operating partner. Technology, AI, marketing, automation, customer support, and operations — all under one roof. Stop managing vendors. Start building your business.",
  keywords: [
    "business growth",
    "AI automation",
    "marketing",
    "operations",
    "customer support",
    "business infrastructure",
    "startup growth",
    "SMB solutions",
  ],
  openGraph: {
    title: "OnePilot — Everything Your Business Needs. One Partner.",
    description:
      "Technology, AI, Marketing, automation, and operations under one roof.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
