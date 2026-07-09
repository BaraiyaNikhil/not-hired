import { StarterPrompt } from "@/types/mentor";

export const STARTER_PROMPTS: StarterPrompt[] = [
  {
    id: "no-responses",
    label: "Why no responses?",
    text: "Why am I not getting responses from my applications? Be brutally honest.",
    emoji: "📭",
  },
  {
    id: "prioritise",
    label: "What to prioritise?",
    text: "What should I prioritise in my job search this week based on my data?",
    emoji: "🎯",
  },
  {
    id: "response-rate",
    label: "My response rate",
    text: "How does my response rate compare to what's typical? What does it tell you?",
    emoji: "📊",
  },
  {
    id: "best-source",
    label: "Best source for me",
    text: "Which application source is working best for me and why?",
    emoji: "🔍",
  },
];
