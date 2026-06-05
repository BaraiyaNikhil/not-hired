"use client";

import { Contact, Application } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { deleteContactAction } from "@/actions/contact/contact.actions";
import { toast } from "sonner";
import { ContactForm } from "./ContactForm";
import { useContactStore } from "@/store";

export function ContactList({
  application,
}: {
  application: Application & { contacts: Contact[] };
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {application.contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{contact.role || "-"}</TableCell>
              <TableCell>{contact.email || "-"}</TableCell>
              <TableCell className="max-w-[200px] truncate">{contact.notes || "-"}</TableCell>
              <TableCell className="text-right flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingContact(contact);
                    setContactFormOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500"
                  onClick={() => {
                    if (confirm("Delete this contact?")) {
                      deleteContact({ id: contact.id });
                    }
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {application.contacts.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24">
                No contacts added yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
