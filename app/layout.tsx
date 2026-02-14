import type { Metadata } from "next";
import { fontSans, fontMono } from "./fonts";
import { Shell } from "@/components/layout/Shell";
import QueryProvider from "@/components/providers/QueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "TransitPulse Malaysia",
  description: "Community Transit Utility for Malaysia's Last Mile",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <QueryProvider>
          <Shell>{children}</Shell>
        </QueryProvider>
      </body>
    </html>
  );
}
