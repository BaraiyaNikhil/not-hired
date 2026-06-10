import type { HowStep, InsightItem, UpcomingFeature } from "./types";

export const HOW_STEPS: HowStep[] = [
  {
    num: "01",
    title: "Add your applications",
    body: "Log each one in seconds. Company, role, source, date. No setup, no required fields, no friction.",
  },
  {
    num: "02",
    title: "Track every move",
    body: "Update status as things progress. Set follow-up reminders. Add notes from calls. Build a real picture.",
  },
  {
    num: "03",
    title: "Get the brutal truth",
    body: "Your AI coach analyzes the data and tells you what to fix. Not what you want to hear — what you need to.",
  },
];

export const HONESTY_TERMINAL_ROWS: [string, string, string?][] = [
  ["Applications :", "47"],
  ["Sources      :", "LinkedIn (38), Referral (2), Cold (7)"],
  ["Response rate:", "6.4%", "#f87171"],
  ["Follow-ups   :", "3 of 47", "#fcd34d"],
  ["Interviews   :", "2"],
  ["Referrals    :", "2", "#f87171"],
  ["Avg response :", "11 days"],
];

export const HONESTY_INSIGHTS: InsightItem[] = [
  {
    color: "#f87171",
    sev: "Critical",
    emoji: "🔴",
    delay: 0.1,
    text: "81% LinkedIn dependency is killing your pipeline. Referrals get 3× more callbacks. You have 2. You need 10.",
  },
  {
    color: "#fcd34d",
    sev: "Warning",
    emoji: "🟡",
    delay: 0.22,
    text: "3 follow-ups on 47 apps is a 6% follow-up rate. Industry average is 35%. This alone explains the silence.",
  },
  {
    color: "#4ade80",
    sev: "Info",
    emoji: "🟢",
    delay: 0.33,
    text: "Cold email is your best performing channel at 14% response rate. Double down — it's the one thing working.",
  },
];

import aiMentorIcon from "@/assets/icons/ai-mentor.svg";
import analyticsIcon from "@/assets/icons/analytics.svg";
import smartAlertsIcon from "@/assets/icons/smart-alerts.svg";

export const UPCOMING_FEATURES: UpcomingFeature[] = [
  {
    icon: aiMentorIcon,
    label: "AI Mentor",
    desc: "Brutally honest career coaching powered by your real data",
  },
  {
    icon: analyticsIcon,
    label: "Analytics",
    desc: "Source performance, conversion funnels, response trends",
  },
  {
    icon: smartAlertsIcon,
    label: "Smart Alerts",
    desc: "Auto-detect stale applications and missed follow-ups",
  },
];
