import { create } from "zustand";
import { Application, Contact } from "@prisma/client";

export type AppWithContacts = Application & { contacts: Contact[] };

interface ApplicationState {
  isApplicationFormOpen: boolean;
  setApplicationFormOpen: (isOpen: boolean) => void;

  editingApp: AppWithContacts | null;
  setEditingApp: (app: AppWithContacts | null) => void;

  contactsApp: AppWithContacts | null;
  setContactsApp: (app: AppWithContacts | null) => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  isApplicationFormOpen: false,
  setApplicationFormOpen: (isOpen) => set({ isApplicationFormOpen: isOpen }),

  editingApp: null,
  setEditingApp: (app) => set({ editingApp: app, isApplicationFormOpen: !!app }),

  contactsApp: null,
  setContactsApp: (app) => set({ contactsApp: app }),
}));
