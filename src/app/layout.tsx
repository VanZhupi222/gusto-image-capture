import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/ui/navigation";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Image Capture App",
  description: "Take selfies and analyze them with image detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16`}
      >
        <Navigation />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
