import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CreatorHQ — Your Entire Creator Business. One Dashboard.",
  description:
    "Track revenue per hour, manage brand deals, and run your creator business like a CEO. The only dashboard that shows you which content actually makes money.",
  openGraph: {
    title: "CreatorHQ — Your Entire Creator Business. One Dashboard.",
    description:
      "Track revenue per hour, manage brand deals, and run your creator business like a CEO.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
