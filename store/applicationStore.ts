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
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  isApplicationFormOpen: false,
  setApplicationFormOpen: (isOpen) => set({ isApplicationFormOpen: isOpen }),

  editingApp: null,
  setEditingApp: (app) => set({ editingApp: app, isApplicationFormOpen: !!app }),

  contactsApp: null,
  setContactsApp: (app) => set({ contactsApp: app }),

  applications: [],
  setApplications: (apps) => set({ applications: apps }),
  moveApplication: (id, newStatus) =>
    set((state) => ({
      applications: state.applications.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
    })),
  updateApplication: (updated) =>
    set((state) => ({
      applications: state.applications.map((a) => (a.id === updated.id ? updated : a)),
    })),
  addApplication: (app) => set((state) => ({ applications: [app, ...state.applications] })),
  deleteApplication: (id) =>
    set((state) => ({ applications: state.applications.filter((a) => a.id !== id) })),
}));
