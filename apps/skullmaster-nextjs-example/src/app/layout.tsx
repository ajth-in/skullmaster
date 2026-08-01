import type { Metadata } from "next";
import "./globals.css";
import { LoadingProvider } from "@/components/LoadingProvider";
import { SkullMaster } from "@skullmaster/react";

export const metadata: Metadata = {
  title: "Skullmaster · Next.js + Tailwind Example",
  description: "Neo Brutalist UI showcase built with Next.js, Tailwind CSS and Skullmaster.",
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
