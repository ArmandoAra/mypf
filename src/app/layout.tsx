import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "../lib/utils";

import { ThemeProvider } from "@/components/theme/theme-provider";
import NavBar from "@/components/nav/navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "My personal finance",
  description: "Custom personal finance app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={cn(
        " bg-background font-sans antialiased flex items-center justify-around ",
        fontSans.variable
      )}><ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
          <main className="w-screen flex-col flex items-center">
            <NavBar />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

