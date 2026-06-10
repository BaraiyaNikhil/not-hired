import type { Metadata } from "next";
import { Cabin_Sketch, Sniglet } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const cabinSketch = Cabin_Sketch({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sketch",
});

const sniglet = Sniglet({
  weight: ["400", "800"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "NotHired — Stop guessing why you're getting ghosted.",
    template: "%s | NotHired",
  },
  description:
    "NotHired tracks every job application, reminds you to follow up, and tells you — without sugarcoating — exactly what's broken in your job search. Kanban board, AI insights, follow-up reminders.",
  keywords: [
    "job search tracker",
    "application tracker",
    "kanban board",
    "job hunt",
    "follow-up reminders",
    "career management",
    "NotHired",
  ],
  authors: [{ name: "NotHired" }],
  creator: "NotHired",
  metadataBase: new URL("https://nothired.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NotHired",
    title: "NotHired — Stop guessing why you're getting ghosted.",
    description:
      "Track every application, get follow-up reminders, and brutally honest AI insights about your job search.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NotHired — Stop guessing why you're getting ghosted.",
    description:
      "Track every application, get follow-up reminders, and brutally honest AI insights about your job search.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased")} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2a3439" />
      </head>
      <body
        className={cn(
          "min-h-full flex flex-col font-sans m-0 p-0 box-border",
          sniglet.variable,
          cabinSketch.variable
        )}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
