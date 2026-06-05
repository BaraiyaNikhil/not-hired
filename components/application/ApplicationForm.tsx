"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import {
  createApplicationAction,
  updateApplicationAction,
} from "@/actions/application/application.actions";
import { createApplicationSchema } from "@/types/application";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function ApplicationForm({ trigger }: ApplicationFormProps) {
  const { isApplicationFormOpen, setApplicationFormOpen, editingApp, setEditingApp } =
    useApplicationStore();
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
      status: "applied",
      source: "other",
      appliedDate: "",
      salaryRange: "",
      jobUrl: "",
      notes: "",
      contactName: "",
      contactRole: "",
      contactEmail: "",
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
        contactName: "",
        contactRole: "",
        contactEmail: "",
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
      <DialogTrigger asChild onClick={() => setApplicationFormOpen(true)}>
        {trigger || (
          <Button className="bg-white text-black hover:bg-gray-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all active:translate-y-1 active:shadow-none">
            Create Application
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border-white/20 text-white p-0 overflow-hidden shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-6"
        >
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Application" : "New Application"}</DialogTitle>
            <DialogDescription className="sr-only">
              Fill out the form below to {isEditing ? "edit the" : "create a new"} application.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name *</Label>
                <Input {...form.register("companyName")} />
                {form.formState.errors.companyName && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.companyName.message as string}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Role Title *</Label>
                <Input {...form.register("roleTitle")} />
                {form.formState.errors.roleTitle && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.roleTitle.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  defaultValue={form.getValues("status")}
                  onValueChange={(val) =>
                    form.setValue(
                      "status",
                      val as
                        | "applied"
                        | "screening"
                        | "interview"
                        | "offer"
                        | "rejected"
                        | "ghosted"
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="ghosted">Ghosted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Source</Label>
                <Select
                  defaultValue={form.getValues("source")}
                  onValueChange={(val) =>
                    form.setValue(
                      "source",
                      val as "linkedin" | "referral" | "cold_email" | "job_portal" | "other"
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="cold_email">Cold Email</SelectItem>
                    <SelectItem value="job_portal">Job Portal</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Applied Date</Label>
                <Input type="date" {...form.register("appliedDate")} />
              </div>
              <div className="space-y-2">
                <Label>Salary Range</Label>
                <Input placeholder="e.g. $100k - $120k" {...form.register("salaryRange")} />
              </div>

              <div className="space-y-2 col-span-2">
                <Label>Job URL</Label>
                <Input type="url" placeholder="https://..." {...form.register("jobUrl")} />
                {form.formState.errors.jobUrl && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.jobUrl.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2 col-span-2">
                <Label>Notes</Label>
                <Textarea {...form.register("notes")} />
              </div>
            </div>

            {!isEditing && (
              <div className="pt-4 border-t border-white/20 mt-4">
                <h3 className="font-medium mb-4">Initial Contact (Optional)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Contact Name</Label>
                    <Input {...form.register("contactName")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Role</Label>
                    <Input {...form.register("contactRole")} />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Contact Email</Label>
                    <Input type="email" {...form.register("contactEmail")} />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Application"}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
