import type { StageItem, FloatCard, PulseDot, ChalkDust, BoardColumn } from "./types";

export const HERO_STAGES: StageItem[] = [
  { label: "Applied", emoji: "📝", color: "#60a5fa", x: "7%" },
  { label: "Screening", emoji: "🔍", color: "#fbbf24", x: "23%" },
  { label: "Interview", emoji: "🎤", color: "#a78bfa", x: "40%" },
  { label: "Offer", emoji: "🎉", color: "#4ade80", x: "57%" },
  { label: "Rejected", emoji: "❌", color: "#f87171", x: "73%" },
  { label: "Ghosted", emoji: "👻", color: "#9ca3af", x: "88%" },
];

export const HERO_FLOAT_CARDS: FloatCard[] = [
  {
    company: "Chai",
    stage: "Applied",
    top: "13%",
    left: "4%",
    delay: 0,
    color: "rgba(96,165,250,0.15)",
  },
  {
    company: "Biryani",
    stage: "Offer",
    top: "28%",
    left: "16%",
    delay: 1.5,
    color: "rgba(74,222,128,0.13)",
  },
  {
    company: "Samosa",
    stage: "Screening",
    top: "58%",
    left: "6%",
    delay: 3,
    color: "rgba(251,191,36,0.13)",
  },
  {
    company: "Dosa",
    stage: "Rejected",
    top: "20%",
    left: "80%",
    delay: 2.2,
    color: "rgba(248,113,113,0.13)",
  },
  {
    company: "Idli",
    stage: "Ghosted",
    top: "46%",
    left: "80%",
    delay: 4,
    color: "rgba(156,163,175,0.12)",
  },
  {
    company: "Roti",
    stage: "Screening",
    top: "38%",
    left: "58%",
    delay: 3.5,
    color: "rgba(251,191,36,0.11)",
  },
];

export const HERO_PULSE_DOTS: PulseDot[] = [
  { top: "15%", left: "30%", color: "#60a5fa", delay: 0 },
  { top: "65%", left: "14%", color: "#fbbf24", delay: 1.2 },
  { top: "35%", left: "70%", color: "#4ade80", delay: 2.5 },
  { top: "80%", left: "54%", color: "#a78bfa", delay: 0.8 },
  { top: "22%", left: "50%", color: "#f87171", delay: 3.2 },
  { top: "88%", left: "82%", color: "#9ca3af", delay: 1.8 },
];

export const HERO_CHALK_DUST: ChalkDust[] = [
  { w: 4, top: "18%", left: "11%", delay: 0 },
  { w: 6, top: "24%", left: "86%", delay: 1, blur: true },
  { w: 3, top: "62%", left: "7%", delay: 0.5 },
  { w: 5, top: "72%", left: "91%", delay: 2 },
  { w: 3, top: "42%", left: "5%", delay: 0 },
  { w: 4, top: "82%", left: "18%", delay: 0.9 },
  { w: 5, top: "33%", left: "94%", delay: 2.4, blur: true },
];

export const HERO_BOARD_COLUMNS: BoardColumn[] = [
  {
    id: "applied",
    label: "Applied",
    emoji: "📝",
    bg: "rgba(96,165,250,0.18)",
    border: "rgba(96,165,250,0.35)",
    cards: [
      { co: "Chai", role: "Masala Maker", source: "LinkedIn", date: "Jun 3" },
      { co: "Roti", role: "Round FS", source: "Referral", date: "Jun 1" },
      { co: "Lassi", role: "Sweet Dev", source: "Cold Email", date: "Jun 5" },
    ],
  },
  {
    id: "screening",
    label: "Screening",
    emoji: "🔍",
    bg: "rgba(251,191,36,0.18)",
    border: "rgba(251,191,36,0.35)",
    cards: [
      { co: "Samosa", role: "Chutney Eng", source: "Job Portal", date: "May 28" },
      { co: "Pakora", role: "Fryer", source: "LinkedIn", date: "May 30" },
    ],
  },
  {
    id: "interview",
    label: "Interview",
    emoji: "🎤",
    bg: "rgba(167,139,250,0.18)",
    border: "rgba(167,139,250,0.35)",
    cards: [{ co: "Biryani", role: "Spice 🎯", source: "Referral", date: "May 25" }],
  },
  {
    id: "offer",
    label: "Offer",
    emoji: "🎉",
    bg: "rgba(74,222,128,0.18)",
    border: "rgba(74,222,128,0.35)",
    cards: [{ co: "Papad", role: "Crunch SWE", source: "LinkedIn", date: "Jun 3" }],
  },
  {
    id: "rejected",
    label: "Rejected",
    emoji: "❌",
    bg: "rgba(248,113,113,0.18)",
    border: "rgba(248,113,113,0.3)",
    cards: [
      { co: "Dosa", role: "Batter FS", source: "LinkedIn", date: "May 20" },
      { co: "Idli", role: "Steam SWE", source: "Job Portal", date: "May 22" },
    ],
  },
  {
    id: "ghosted",
    label: "Ghosted",
    emoji: "👻",
    bg: "rgba(156,163,175,0.18)",
    border: "rgba(156,163,175,0.3)",
    cards: [{ co: "Vada", role: "Hole QA", source: "LinkedIn", date: "May 15" }],
  },
];
