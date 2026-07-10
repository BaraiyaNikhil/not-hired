"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { createApplicationAction, updateApplicationAction } from "@/actions/application.actions";
import { createApplicationSchema } from "@/types/application";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useApplicationStore } from "@/store";
import { useEffect } from "react";
import { motion } from "motion/react";

interface ApplicationFormProps {
  trigger?: React.ReactNode;
}

import { ApplicationFormBasicFields } from "./ApplicationFormBasicFields";
import { ApplicationFormContacts } from "./ApplicationFormContacts";

export function ApplicationForm({ trigger }: ApplicationFormProps) {
  const isApplicationFormOpen = useApplicationStore((state) => state.isApplicationFormOpen);
  const setApplicationFormOpen = useApplicationStore((state) => state.setApplicationFormOpen);
  const editingApp = useApplicationStore((state) => state.editingApp);
  const setEditingApp = useApplicationStore((state) => state.setEditingApp);
  const isEditing = !!editingApp;

  const handleOpenChange = (newOpen: boolean) => {
    setApplicationFormOpen(newOpen);
    if (!newOpen) {
      setEditingApp(null);
    }
  };

  const { execute: createApplication, isExecuting: isCreating } = useAction(
    createApplicationAction,
    {
      onSuccess: () => {
        toast.success("Application created successfully");
        handleOpenChange(false);
        form.reset();
      },
      onError: (error) => {
        toast.error(error.error.serverError || "Failed to create application");
      },
    }
  );

  const { execute: updateApplication, isExecuting: isUpdating } = useAction(
    updateApplicationAction,
    {
      onSuccess: () => {
        toast.success("Application updated successfully");
        handleOpenChange(false);
      },
      onError: (error) => {
        toast.error(error.error.serverError || "Failed to update application");
      },
    }
  );

  const form = useForm({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      companyName: "",
      roleTitle: "",
      status: "applied" as const,
      source: "other" as const,
      appliedDate: "",
      salaryRange: "",
      jobUrl: "",
      notes: "",
      contacts: [],
    },
  });

  useEffect(() => {
    if (editingApp) {
      form.reset({
        companyName: editingApp.companyName,
        roleTitle: editingApp.roleTitle,
        status: editingApp.status,
        source: editingApp.source,
        appliedDate: editingApp.appliedDate
          ? new Date(editingApp.appliedDate).toISOString().split("T")[0]
          : "",
        salaryRange: editingApp.salaryRange || "",
        jobUrl: editingApp.jobUrl || "",
        notes: editingApp.notes || "",
        contacts: editingApp.contacts
          ? editingApp.contacts.map(
              (c: {
                name: string;
                role?: string | null;
                email?: string | null;
                mobile?: string | null;
                notes?: string | null;
              }) => ({
                name: c.name,
                role: c.role || "",
                email: c.email || "",
                mobile: c.mobile || "",
                notes: c.notes || "",
              })
            )
          : [],
      });
    } else {
      form.reset({
        companyName: "",
        roleTitle: "",
        status: "applied",
        source: "other",
        appliedDate: "",
        salaryRange: "",
        jobUrl: "",
        notes: "",
        contacts: [],
      });
    }
  }, [editingApp, form]);

  const onSubmit = form.handleSubmit((data) => {
    if (isEditing && editingApp) {
      updateApplication({ ...data, id: editingApp.id });
    } else {
      createApplication(data);
    }
  });

  const isSubmitting = isCreating || isUpdating;

  return (
    <Dialog open={isApplicationFormOpen} onOpenChange={handleOpenChange}>
      {trigger && (
        <DialogTrigger asChild onClick={() => setApplicationFormOpen(true)}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent
        className="max-w-[calc(100%-2rem)] sm:max-w-2xl max-h-[90vh] overflow-y-scroll scrollbar-none p-0"
        style={{
          background: "#2a3439",
          border: "3px dashed rgba(255,255,255,0.45)",
          borderRadius: "4px 12px 5px 10px",
          boxShadow: "8px 8px 0 rgba(0,0,0,0.4)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.2 }}
          className="p-4"
        >
          <DialogHeader className="mb-5">
            <DialogTitle
              className="font-sketch chalk-text text-2xl md:text-3xl"
              style={{ borderBottom: "2px dashed rgba(255,255,255,0.2)", paddingBottom: 10 }}
            >
              {isEditing ? "✏️ Edit Application" : "📝 New Application"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Fill out the form below to {isEditing ? "edit the" : "create a new"} application.
            </DialogDescription>
          </DialogHeader>

          <FormProvider {...form}>
            <form onSubmit={onSubmit} className="space-y-5">
              <ApplicationFormBasicFields />
              <ApplicationFormContacts />

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="chalk-button chalk-text font-sketch text-base"
                  style={{ background: "transparent" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="chalk-button chalk-text font-sketch text-base"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "2px dashed rgba(255,255,255,0.6)",
                  }}
                >
                  {isSubmitting ? "Saving..." : isEditing ? "Update" : "Create Application"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
