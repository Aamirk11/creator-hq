import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#7C3AED",
};

export const metadata: Metadata = {
  title: "CreatorHQ — Your Entire Creator Business. One Dashboard.",
  description:
    "Track revenue per hour, manage brand deals, and run your creator business like a CEO. The only dashboard that shows you which content actually makes money.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "CreatorHQ — Your Entire Creator Business. One Dashboard.",
    description:
      "Track revenue per hour, manage brand deals, and run your creator business like a CEO.",
    type: "website",
    siteName: "CreatorHQ",
  },
  twitter: {
    card: "summary_large_image",
    title: "CreatorHQ — Your Entire Creator Business. One Dashboard.",
    description:
      "Track revenue per hour, manage brand deals, and run your creator business like a CEO.",
  },
  metadataBase: new URL("https://creator-hq.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
