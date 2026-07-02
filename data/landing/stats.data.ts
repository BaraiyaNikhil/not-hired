import type { InsightItem } from "./types";

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
