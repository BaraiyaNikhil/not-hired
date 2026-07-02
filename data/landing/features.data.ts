import type { ProblemItem, PipelineColumn, InsightItem, ReminderItem } from "./types";

export const PROBLEM_ITEMS: ProblemItem[] = [
  {
    badge: "98% fail rate",
    badgeColor: "rgba(248,113,113,0.15)",
    badgeTextColor: "#f87171",
    borderColor: "rgba(248,113,113,0.2)",
    title: "You're applying into a void",
    body: "Most job seekers have no idea which sources are working. LinkedIn Easy Apply has the lowest response rate — but you keep using it because it feels like progress.",
  },
  {
    badge: "80% missed",
    badgeColor: "rgba(251,191,36,0.15)",
    badgeTextColor: "#fbbf24",
    borderColor: "rgba(251,191,36,0.2)",
    title: "You forget to follow up",
    body: "A warm lead goes cold in 5 days. Without a reminder, 80% of follow-ups never happen. That recruiter didn't ghost you — you disappeared first.",
  },
  {
    badge: "0 insights",
    badgeColor: "rgba(96,165,250,0.15)",
    badgeTextColor: "#60a5fa",
    borderColor: "rgba(96,165,250,0.2)",
    title: "Your spreadsheet lies to you",
    body: "A spreadsheet shows you what you tracked. It doesn't tell you what's wrong. There's a difference between recording failure and understanding it.",
  },
];

export const PIPELINE_COLUMNS: PipelineColumn[] = [
  {
    label: "Applied",
    emoji: "📝",
    textColor: "text-blue-400",
    bg: "rgba(96,165,250,0.25)",
    border: "rgba(96,165,250,0.3)",
    cards: ["Chai · Masala Maker", "Samosa · Chutney Eng", "Lassi · Sweet Dev"],
  },
  {
    label: "Screening",
    emoji: "🔍",
    textColor: "text-yellow-300",
    bg: "rgba(251,191,36,0.25)",
    border: "rgba(251,191,36,0.3)",
    cards: ["Pakora · Fryer", "Jalebi · Sugar FS"],
  },
  {
    label: "Interview",
    emoji: "🎤",
    textColor: "text-purple-400",
    bg: "rgba(167,139,250,0.25)",
    border: "rgba(167,139,250,0.35)",
    cards: ["Biryani · Spice 🎯"],
  },
  {
    label: "Offer",
    emoji: "🎉",
    textColor: "text-green-400",
    bg: "rgba(74,222,128,0.25)",
    border: "rgba(74,222,128,0.35)",
    cards: ["Dosa · Batter SWE"],
  },
  {
    label: "Rejected",
    emoji: "❌",
    textColor: "text-red-400",
    bg: "rgba(248,113,113,0.25)",
    border: "rgba(248,113,113,0.25)",
    cards: ["Idli · Steam SWE", "Vada · Hole SWE"],
  },
  {
    label: "Ghosted",
    emoji: "👻",
    textColor: "text-gray-400",
    bg: "rgba(156,163,175,0.25)",
    border: "rgba(156,163,175,0.25)",
    cards: ["Roti · Round FS"],
  },
];

export const AI_INSIGHTS: InsightItem[] = [
  {
    color: "#f87171",
    sev: "Critical",
    emoji: "🔴",
    delay: 0.1,
    text: "94% of apps from LinkedIn Easy Apply — the lowest response rate source. Diversify immediately.",
  },
  {
    color: "#fcd34d",
    sev: "Warning",
    emoji: "🟡",
    delay: 0.22,
    text: "Avg follow-up gap is 11 days. Industry standard is 5. You're losing warm leads to silence.",
  },
  {
    color: "#4ade80",
    sev: "Info",
    emoji: "🟢",
    delay: 0.33,
    text: "Interview-to-response rate above average. The problem is sourcing, not your resume.",
  },
];

export const REMINDER_ITEMS: ReminderItem[] = [
  {
    message: "Follow up on application",
    company: "Chai",
    role: "Masala Maker",
    appliedInfo: "Applied 6 days ago",
    urgency: "now",
    urgencyLabel: "Due today",
    triggerLabel: "Auto",
  },
  {
    message: "Check in after screening",
    company: "Samosa",
    role: "Chutney Eng",
    appliedInfo: "Applied 3 days ago",
    urgency: "soon",
    dueLabel: "Due in 2 days",
    triggerLabel: "Auto",
  },
  {
    message: "Prepare for technical round",
    company: "Lassi",
    role: "Sweet Dev",
    appliedInfo: "Applied 1 day ago",
    urgency: "later",
    dueLabel: "Due in 4 days",
  },
];
