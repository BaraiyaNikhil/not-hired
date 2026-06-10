import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { MarqueeStrip } from "@/components/landing/MarqueeStrip";
import { ProblemSection } from "@/components/landing/PainSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HonestySection } from "@/components/landing/AISection";
import { StatsAndStepsSection } from "@/components/landing/StatsSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NotHired — Stop guessing why you're getting ghosted.",
  description:
    "NotHired tracks every job application across 6 stages — Applied, Screening, Interview, Offer, Rejected, Ghosted — with follow-up reminders and brutally honest AI insights. Free to start.",
  keywords: [
    "job search tracker",
    "application tracker",
    "kanban board jobs",
    "job hunt tool",
    "follow-up reminders",
    "career management",
    "job application pipeline",
    "NotHired",
  ],
  openGraph: {
    title: "NotHired — Stop guessing why you're getting ghosted.",
    description:
      "Track every application across 6 stages. Get follow-up reminders. Get brutally honest AI insights about your job search.",
    type: "website",
    url: "http://not-hired.vercel.app",
    siteName: "NotHired",
  },
  twitter: {
    card: "summary_large_image",
    title: "NotHired — Your job search deserves more than a spreadsheet.",
    description:
      "Kanban board for job applications. Follow-up reminders. Brutally honest AI coach. Free to start.",
  },
  alternates: {
    canonical: "http://not-hired.vercel.app",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#2a3439] text-white/90">
      <LandingNav />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <ProblemSection />
        <FeaturesSection />
        <HonestySection />
        <StatsAndStepsSection />
        <CtaSection />
      </main>
      <LandingFooter />

      {/* Structured data — SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "NotHired",
            applicationCategory: "ProductivityApplication",
            operatingSystem: "Web",
            description:
              "Track job applications across 6 stages with a Kanban board, get follow-up reminders, and receive brutally honest AI insights about your job search.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "50",
            },
          }),
        }}
      />
    </div>
  );
}
