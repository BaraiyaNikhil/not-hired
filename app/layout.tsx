import type { Metadata } from "next";
import { Inter, Cabin_Sketch } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cabinSketch = Cabin_Sketch({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sketch",
});

export const metadata: Metadata = {
  title: "Not Hired",
  description: "Draw your own career path.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased")} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-full flex flex-col font-sans m-0 p-0 box-border",
          inter.variable,
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
