// Types shared across landing data files

export type StageItem = {
  label: string;
  emoji: string;
  color: string;
  x: string;
};

export type FloatCard = {
  company: string;
  stage: string;
  top: string;
  left: string;
  delay: number;
  color: string;
};

export type PulseDot = {
  top: string;
  left: string;
  color: string;
  delay: number;
};

export type ChalkDust = {
  w: number;
  top: string;
  left: string;
  delay: number;
  blur?: boolean;
};

export type BoardCard = {
  co: string;
  role: string;
  source: string;
  date: string;
};

export type BoardColumn = {
  id: string;
  label: string;
  emoji: string;
  bg: string;
  border: string;
  cards: BoardCard[];
};

export type PipelineColumn = {
  label: string;
  emoji: string;
  textColor: string;
  bg: string;
  border: string;
  cards: string[];
};

export type ProblemItem = {
  badge: string;
  badgeColor: string;
  badgeTextColor: string;
  borderColor: string;
  title: string;
  body: string;
};

export type InsightItem = {
  color: string;
  sev: string;
  emoji: string;
  text: string;
  delay: number;
};

export type ReminderItem = {
  message: string;
  company: string;
  role: string;
  appliedInfo: string;
  urgency: "now" | "soon" | "later";
  urgencyLabel?: string;
  dueLabel?: string;
  triggerLabel?: string;
};

import type { StaticImageData } from "next/image";

export type UpcomingFeature = {
  icon: StaticImageData | string;
  label: string;
  desc: string;
};

export type HowStep = {
  num: string;
  title: string;
  body: string;
};
