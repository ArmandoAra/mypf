
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "../lib/utils";

import { ThemeProvider } from "@/components/theme/theme-provider";
import NavBar from "@/components/nav/navbar";

const APP_NAME = "PF App";
const APP_DEFAULT_TITLE = "My Personal Finance App";
const APP_TITLE_TEMPLATE = "%s - PF App";
const APP_DESCRIPTION = "My first personal finance PWA app.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};






const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

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

