"use client";

import { useTransition } from "react";
import { FeatureFlag } from "@prisma/client";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFeatureFlagSchema, CreateFeatureFlagInput } from "@/types/feature_flag";
import { createFeatureFlagAction } from "@/actions/feature-flag/feature_flag.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface CreateFeatureFlagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFlagCreated: (flag: FeatureFlag) => void;
}

export function CreateFeatureFlagDialog({
  open,
  onOpenChange,
  onFlagCreated,
}: CreateFeatureFlagDialogProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CreateFeatureFlagInput>({
    resolver: zodResolver(createFeatureFlagSchema),
    defaultValues: {
      name: "",
      description: "",
      isEnabled: false,
    },
  });
  const isEnabledValue = useWatch({ control: form.control, name: "isEnabled" });

  const onSubmit = (data: CreateFeatureFlagInput) => {
    startTransition(async () => {
      const result = await createFeatureFlagAction(data);

      if (result?.serverError || !result?.data) {
        toast.error("Failed to create feature flag");
      } else {
        toast.success("Feature flag created");
        onFlagCreated(result.data);
        form.reset();
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[440px] border-0 p-0 overflow-hidden"
        style={{
          background: "#2a3439",
          border: "2px dashed rgba(255,255,255,0.2)",
          borderRadius: "4px 12px 5px 10px",
        }}
      >
        <DialogHeader
          className="px-6 pt-6 pb-4"
          style={{ borderBottom: "1px dashed rgba(255,255,255,0.1)" }}
        >
          <DialogTitle className="font-sketch chalk-text text-2xl tracking-wide">
            New Feature Flag
          </DialogTitle>
          <DialogDescription
            className="font-body text-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            define a flag to control access to a feature in the platform.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 py-5 space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="flag-name"
              className="text-xs font-body tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Flag Name
            </label>
            <input
              id="flag-name"
              placeholder="e.g. beta-dashboard"
              {...form.register("name")}
              disabled={isPending}
              className="chalk-input w-full text-sm font-body py-2 px-0"
            />
            {form.formState.errors.name && (
              <p className="text-xs font-body" style={{ color: "#f87171" }}>
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label
              htmlFor="flag-desc"
              className="text-xs font-body tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Description
            </label>
            <textarea
              id="flag-desc"
              rows={2}
              placeholder="what does this flag control?"
              {...form.register("description")}
              disabled={isPending}
              className="chalk-input w-full text-sm font-body py-2 px-0 resize-none"
            />
            {form.formState.errors.description && (
              <p className="text-xs font-body" style={{ color: "#f87171" }}>
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Toggle */}
          <div
            className="flex items-center justify-between py-3 px-0 border-y"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <div>
              <p className="text-sm font-body chalk-text">Enable immediately</p>
              <p className="text-xs font-body" style={{ color: "rgba(255,255,255,0.35)" }}>
                turn on this feature right after creation
              </p>
            </div>
            <Switch
              checked={isEnabledValue}
              onCheckedChange={(checked) => form.setValue("isEnabled", checked)}
              disabled={isPending}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="text-xs font-body px-4 py-2"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="chalk-button text-xs font-body chalk-text px-5 py-2"
            >
              {isPending ? "Creating..." : "Create Flag"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
