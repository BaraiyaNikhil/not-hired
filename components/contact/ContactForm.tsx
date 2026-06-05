"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { createContactAction, updateContactAction } from "@/actions/contact/contact.actions";
import { createContactSchema } from "@/types/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useContactStore } from "@/store";
import { useEffect } from "react";
import { motion } from "motion/react";

interface ContactFormProps {
  applicationId: string;
  trigger?: React.ReactNode;
}

export function ContactForm({ applicationId, trigger }: ContactFormProps) {
  const { isContactFormOpen, setContactFormOpen, editingContact, setEditingContact } =
    useContactStore();
  const isEditing = !!editingContact;

  const handleOpenChange = (newOpen: boolean) => {
    setContactFormOpen(newOpen);
    if (!newOpen) {
      setEditingContact(null);
    }
  };

  const { execute: createContact, isExecuting: isCreating } = useAction(createContactAction, {
    onSuccess: () => {
      toast.success("Contact created successfully");
      handleOpenChange(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(error.error.serverError || "Failed to create contact");
    },
  });

  const { execute: updateContact, isExecuting: isUpdating } = useAction(updateContactAction, {
    onSuccess: () => {
      toast.success("Contact updated successfully");
      handleOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.error.serverError || "Failed to update contact");
    },
  });

  const form = useForm({
    resolver: zodResolver(createContactSchema),
    defaultValues: {
      applicationId,
      name: "",
      role: "",
      email: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (editingContact) {
      form.reset({
        applicationId,
        name: editingContact.name,
        role: editingContact.role || "",
        email: editingContact.email || "",
        notes: editingContact.notes || "",
      });
    } else {
      form.reset({
        applicationId,
        name: "",
        role: "",
        email: "",
        notes: "",
      });
    }
  }, [editingContact, applicationId, form]);

  const onSubmit = form.handleSubmit((data) => {
    if (isEditing && editingContact) {
      updateContact({ ...data, id: editingContact.id });
    } else {
      createContact(data);
    }
  });

  const isSubmitting = isCreating || isUpdating;

  return (
    <Dialog open={isContactFormOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={() => setContactFormOpen(true)}>
        {trigger || (
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-white/40 hover:bg-white hover:text-black transition-colors"
          >
            Add Contact
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-zinc-950 border-white/20 text-white overflow-hidden p-0 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="p-6"
        >
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Contact" : "New Contact"}</DialogTitle>
            <DialogDescription className="sr-only">
              Fill out the form below to {isEditing ? "edit the" : "create a new"} contact.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message as string}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input {...form.register("role")} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" {...form.register("email")} />
            </div>
            <div className="space-y-2 md:max-w-[400px] max-w-[350px]">
              <Label>Notes</Label>
              <Textarea {...form.register("notes")} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Contact"}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
