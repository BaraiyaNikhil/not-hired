import { Application, Contact } from "@prisma/client";

export type AppWithContacts = Application & { contacts: Contact[] };

export type KanbanColumn = {
  id: Application["status"];
  label: string;
  emoji: string;
  color: string;
};

export const KANBAN_COLUMNS: KanbanColumn[] = [
  { id: "applied", label: "Applied", emoji: "📝", color: "rgba(96,165,250,0.25)" },
  { id: "screening", label: "Screening", emoji: "🔍", color: "rgba(251,191,36,0.25)" },
  { id: "interview", label: "Interview", emoji: "🎤", color: "rgba(167,139,250,0.25)" },
  { id: "offer", label: "Offer", emoji: "🎉", color: "rgba(74,222,128,0.25)" },
  { id: "rejected", label: "Rejected", emoji: "❌", color: "rgba(248,113,113,0.25)" },
  { id: "ghosted", label: "Ghosted", emoji: "👻", color: "rgba(156,163,175,0.25)" },
];
