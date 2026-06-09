"use client";

import { Application } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Phone, Mail } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { deleteContactAction } from "@/actions/contact/contact.actions";
import { toast } from "sonner";
import { ContactForm } from "./ContactForm";
import { useContactStore } from "@/store";
import { motion, AnimatePresence } from "motion/react";

// Extended type that includes mobile field
type ContactWithMobile = {
  id: string;
  applicationId: string;
  name: string;
  role: string | null;
  email: string | null;
  mobile: string | null;
  notes: string | null;
};

export function ContactList({
  application,
}: {
  application: Application & { contacts: ContactWithMobile[] };
}) {
  const { setEditingContact, setContactFormOpen } = useContactStore();

  const { execute: deleteContact } = useAction(deleteContactAction, {
    onSuccess: () => toast.success("Contact deleted"),
    onError: (e) => toast.error(e.error.serverError || "Failed to delete contact"),
  });

  return (
    <div className="space-y-4 w-full min-w-0">
      <div className="flex justify-end">
        <ContactForm applicationId={application.id} />
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {application.contacts.map((contact) => (
            <motion.div
              key={contact.id}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18 }}
              className="group relative flex items-start gap-3 p-3"
              style={{
                border: "2px dashed rgba(255,255,255,0.25)",
                borderRadius: "2px 6px 3px 5px",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {/* Avatar */}
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-sketch text-base chalk-text"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px dashed rgba(255,255,255,0.3)",
                }}
              >
                {contact.name[0].toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-sketch chalk-text text-base">{contact.name}</p>
                {contact.role && (
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}
                  >
                    {contact.role}
                  </p>
                )}
                <div className="flex flex-wrap gap-3 mt-1.5">
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-1 text-xs hover:opacity-80 transition-opacity"
                      style={{ color: "rgba(96,165,250,0.8)" }}
                    >
                      <Mail size={11} />
                      {contact.email}
                    </a>
                  )}
                  {contact.mobile && (
                    <a
                      href={`tel:${contact.mobile}`}
                      className="flex items-center gap-1 text-xs hover:opacity-80 transition-opacity"
                      style={{ color: "rgba(74,222,128,0.8)" }}
                    >
                      <Phone size={11} />
                      {contact.mobile}
                    </a>
                  )}
                </div>
                {contact.notes && (
                  <p
                    className="text-xs mt-1.5 italic"
                    style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
                  >
                    {contact.notes}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 chalk-action-btn"
                  onClick={() => {
                    setEditingContact(contact);
                    setContactFormOpen(true);
                  }}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  style={{ color: "rgba(248,113,113,0.7)" }}
                  onClick={() => deleteContact({ id: contact.id })}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {application.contacts.length === 0 && (
          <div
            className="text-center py-8"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}
          >
            <p className="font-sketch chalk-text text-lg mb-1" style={{ opacity: 0.4 }}>
              No contacts yet
            </p>
            <p className="text-sm">Add someone you spoke with at this company</p>
          </div>
        )}
      </div>
    </div>
  );
}
