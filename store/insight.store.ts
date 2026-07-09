import { create } from "zustand";
import { AiInsight } from "@/types/dashboard";

interface InsightState {
  insights: AiInsight[];
  isLocked: boolean;
  generatedAt: string | null;
  refreshesToday: number;
  isLoading: boolean;

  setInsightsData: (data: {
    insights: AiInsight[];
    isLocked: boolean;
    generatedAt: string | null;
    refreshesToday: number;
  }) => void;
  setLoading: (loading: boolean) => void;
}

export const useInsightStore = create<InsightState>((set) => ({
  insights: [],
  isLocked: false,
  generatedAt: null,
  refreshesToday: 0,
  isLoading: true,

  setInsightsData: (data) => set({ ...data, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
