import { create } from "zustand";
import { Contact } from "@prisma/client";

interface ContactState {
  isContactFormOpen: boolean;
  setContactFormOpen: (isOpen: boolean) => void;

  editingContact: Contact | null;
  setEditingContact: (contact: Contact | null) => void;
}

export const useContactStore = create<ContactState>((set) => ({
  isContactFormOpen: false,
  setContactFormOpen: (isOpen) => set({ isContactFormOpen: isOpen }),

  editingContact: null,
  setEditingContact: (contact) => set({ editingContact: contact, isContactFormOpen: !!contact }),
}));
