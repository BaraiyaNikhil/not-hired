export type InsightType = "critical" | "warning" | "info";

export interface AiInsight {
  id: string;
  type: InsightType;
  text: string;
  action: string;
}

export const AI_INSIGHTS_DATA: AiInsight[] = [
  {
    id: "insight-1",
    type: "critical",
    text: "44% of applications are LinkedIn Easy Apply — your lowest-performing source at 9% response rate.",
    action: "Action: Cut LinkedIn volume. Shift effort to referrals and cold email.",
  },
  {
    id: "insight-2",
    type: "warning",
    text: "You applied 0 jobs in W5 and W7. Inconsistency is killing your pipeline momentum.",
    action: "Action: Set a weekly floor — minimum 5 applications, no exceptions.",
  },
  {
    id: "insight-3",
    type: "info",
    text: "Your referral rate (8%) is low for 62 applications. Most offers come from networks, not job boards.",
    action: "Action: Reach out to 3 contacts this week before applying anywhere new.",
  },
];
