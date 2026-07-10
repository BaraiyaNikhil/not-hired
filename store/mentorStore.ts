import { create } from "zustand";
import { UIMessage } from "ai";

interface MentorStore {
  isOpen: boolean;
  messages: UIMessage[];

  open: () => void;
  close: () => void;
  toggle: () => void;
  setMessages: (messages: UIMessage[]) => void;
  resetChat: () => void;
}

export const useMentorStore = create<MentorStore>((set) => ({
  isOpen: false,
  messages: [],

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setMessages: (messages) => set({ messages }),
  resetChat: () => set({ messages: [] }),
}));
