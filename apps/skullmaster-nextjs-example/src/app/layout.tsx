import type { Metadata } from "next";
import "./globals.css";
import { LoadingProvider } from "@/components/LoadingProvider";
import { SkullMaster } from "@skullmaster/react";

export const metadata: Metadata = {
  title: "Skullmaster · Sample Next.js Demo",
  description:
    "Sample demo app for Skullmaster, built with Next.js and Tailwind CSS. All content is placeholder test data.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LoadingProvider>
          <SkullMaster />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
