"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { createContactAction, updateContactAction } from "@/actions/contact.actions";
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
      mobile: "",
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
        mobile: editingContact.mobile || "",
        notes: editingContact.notes || "",
      });
    } else {
      form.reset({
        applicationId,
        name: "",
        role: "",
        email: "",
        mobile: "",
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
            className="chalk-button chalk-text font-sketch text-base"
            style={{ border: "2px dashed rgba(255,255,255,0.5)", background: "transparent" }}
          >
            + Add Contact
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="p-0 overflow-hidden"
        style={{
          background: "#2a3439",
          border: "3px dashed rgba(255,255,255,0.45)",
          borderRadius: "4px 10px 5px 8px",
          boxShadow: "6px 6px 0 rgba(0,0,0,0.4)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="p-6"
        >
          <DialogHeader className="mb-4">
            <DialogTitle
              className="font-sketch chalk-text text-2xl"
              style={{ borderBottom: "2px dashed rgba(255,255,255,0.2)", paddingBottom: 8 }}
            >
              {isEditing ? "✏️ Edit Contact" : "👤 New Contact"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Fill out the form below to {isEditing ? "edit the" : "create a new"} contact.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label className="chalk-text font-sketch text-base">Name *</Label>
                <Input {...form.register("name")} className="chalk-input" placeholder="Full name" />
                {form.formState.errors.name && (
                  <p className="text-sm" style={{ color: "#f87171" }}>
                    {form.formState.errors.name.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="chalk-text font-sketch text-base">Role</Label>
                <Input
                  {...form.register("role")}
                  className="chalk-input"
                  placeholder="e.g. Recruiter"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="chalk-text font-sketch text-base">Mobile</Label>
                <Input
                  {...form.register("mobile")}
                  className="chalk-input"
                  placeholder="+1 234 567 8900"
                  type="tel"
                />
              </div>

              <div className="space-y-1.5 col-span-2">
                <Label className="chalk-text font-sketch text-base">Email</Label>
                <Input
                  {...form.register("email")}
                  className="chalk-input"
                  placeholder="email@company.com"
                  type="email"
                />
              </div>

              <div className="space-y-1.5 col-span-2">
                <Label className="chalk-text font-sketch text-base">Notes</Label>
                <Textarea
                  {...form.register("notes")}
                  className="chalk-input resize-none"
                  placeholder="Any notes about this contact..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="chalk-button chalk-text font-sketch"
                style={{ background: "transparent" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="chalk-button chalk-text font-sketch"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "2px dashed rgba(255,255,255,0.6)",
                }}
              >
                {isSubmitting ? "Saving..." : isEditing ? "Update Contact" : "Save Contact"}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
