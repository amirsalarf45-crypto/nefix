
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NefixIntro from "@/components/NefixIntro";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEFIX | Premium Cinema",
  description: "Your premium cinematic experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NefixIntro>{children}</NefixIntro>
      </body>
    </html>
  );
}
