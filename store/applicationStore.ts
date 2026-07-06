import { create } from "zustand";
import { Application, Contact } from "@prisma/client";

export type AppWithContacts = Application & { contacts: Contact[] };

interface ApplicationState {
  // UI state
  isApplicationFormOpen: boolean;
  setApplicationFormOpen: (isOpen: boolean) => void;

  editingApp: AppWithContacts | null;
  setEditingApp: (app: AppWithContacts | null) => void;

  contactsApp: AppWithContacts | null;
  setContactsApp: (app: AppWithContacts | null) => void;

  // Kanban optimistic state
  applications: AppWithContacts[];
  setApplications: (apps: AppWithContacts[]) => void;
  moveApplication: (id: string, newStatus: Application["status"]) => void;
  updateApplication: (updated: AppWithContacts) => void;
  addApplication: (app: AppWithContacts) => void;
  deleteApplication: (id: string) => void;
  appendApplications: (apps: AppWithContacts[]) => void;

  applicationCounts: { total: number; counts: Record<string, number> };
  setApplicationCounts: (counts: { total: number; counts: Record<string, number> }) => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  isApplicationFormOpen: false,
  setApplicationFormOpen: (isOpen) => set({ isApplicationFormOpen: isOpen }),

  editingApp: null,
  setEditingApp: (app) => set({ editingApp: app, isApplicationFormOpen: !!app }),

  contactsApp: null,
  setContactsApp: (app) => set({ contactsApp: app }),

  applications: [],
  applicationCounts: { total: 0, counts: {} },
  setApplicationCounts: (counts) => set({ applicationCounts: counts }),
  setApplications: (apps) => set({ applications: apps }),
  moveApplication: (id, newStatus) =>
    set((state) => {
      const app = state.applications.find((a) => a.id === id);
      if (!app || app.status === newStatus) return {};
      const counts = state.applicationCounts;
      return {
        applications: state.applications.map((a) =>
          a.id === id ? { ...a, status: newStatus } : a
        ),
        applicationCounts: {
          total: counts.total,
          counts: {
            ...counts.counts,
            [app.status]: Math.max(0, (counts.counts[app.status] || 0) - 1),
            [newStatus]: (counts.counts[newStatus] || 0) + 1,
          },
        },
      };
    }),
  updateApplication: (updated) =>
    set((state) => ({
      applications: state.applications.map((a) => (a.id === updated.id ? updated : a)),
    })),
  addApplication: (app) =>
    set((state) => {
      const counts = state.applicationCounts;
      return {
        applications: [app, ...state.applications],
        applicationCounts: {
          total: counts.total + 1,
          counts: {
            ...counts.counts,
            [app.status]: (counts.counts[app.status] || 0) + 1,
          },
        },
      };
    }),
  deleteApplication: (id) =>
    set((state) => {
      const app = state.applications.find((a) => a.id === id);
      if (!app) return {};
      const counts = state.applicationCounts;
      return {
        applications: state.applications.filter((a) => a.id !== id),
        applicationCounts: {
          total: Math.max(0, counts.total - 1),
          counts: {
            ...counts.counts,
            [app.status]: Math.max(0, (counts.counts[app.status] || 0) - 1),
          },
        },
      };
    }),
  appendApplications: (apps) =>
    set((state) => {
      const existingIds = new Set(state.applications.map((a) => a.id));
      const toAdd = apps.filter((a) => !existingIds.has(a.id));
      return { applications: [...state.applications, ...toAdd] };
    }),
}));
