"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useApplicationStore } from "@/store";
import { ContactList } from "./ContactList";
import { motion } from "motion/react";

export function ContactsDialog() {
  const contactsApp = useApplicationStore((state) => state.contactsApp);
  const setContactsApp = useApplicationStore((state) => state.setContactsApp);
  const currentApp = useApplicationStore((state) =>
    state.contactsApp
      ? state.applications.find((a) => a.id === state.contactsApp?.id) || state.contactsApp
      : null
  );

  return (
    <Dialog open={!!contactsApp} onOpenChange={(open) => !open && setContactsApp(null)}>
      <DialogContent
        className="md:max-w-2xl lg:max-w-3xl p-0 overflow-hidden"
        style={{
          background: "#2a3439",
          border: "3px dashed rgba(255,255,255,0.4)",
          borderRadius: "4px 10px 5px 8px",
          boxShadow: "6px 6px 0 rgba(0,0,0,0.4)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-6"
        >
          <DialogHeader className="mb-4">
            <DialogTitle
              className="font-sketch chalk-text text-2xl"
              style={{ borderBottom: "2px dashed rgba(255,255,255,0.2)", paddingBottom: 8 }}
            >
              👥 Contacts — {currentApp?.companyName}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Manage contacts for this application.
            </DialogDescription>
          </DialogHeader>
          {currentApp && <ContactList application={currentApp} />}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
