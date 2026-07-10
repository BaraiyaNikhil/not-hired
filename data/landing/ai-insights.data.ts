import type { AiInsight } from "@/types/dashboard";

/** Mock insights that match the real AiInsight shape used in the dashboard */
export const LANDING_AI_INSIGHTS: AiInsight[] = [
  {
    id: "1",
    type: "critical",
    text: "81% of your applications are from LinkedIn Easy Apply — the lowest response-rate source. You're optimising for volume, not results.",
    action: "Add 2 referral contacts this week. Referrals get 3× more callbacks.",
  },
  {
    id: "2",
    type: "warning",
    text: "You've followed up on only 3 of 47 applications. Industry standard is 35%. Silence isn't a no — it's a missed opportunity.",
    action: "Set follow-up reminders for every application older than 5 days.",
  },
  {
    id: "3",
    type: "info",
    text: "Cold email is your best-performing channel at 14% response rate. It's the one thing working — you're barely using it.",
    action: "Double your cold outreach. Template what's working and send 5 more this week.",
  },
];

/** Mock chat exchange shown in the AI mentor preview */
export const LANDING_CHAT_PREVIEW = [
  {
    role: "user" as const,
    text: "Why am I getting ghosted after every application?",
  },
  {
    role: "mentor" as const,
    text: "You're applying to 47 roles but following up on only 3. That's a 6% follow-up rate. The industry average is 35%. Recruiters aren't ghosting you — you're disappearing first.",
  },
];
