"use client";

import { useState, useTransition } from "react";
import { FeatureFlag } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import {
  toggleFeatureFlagAction,
  deleteFeatureFlagAction,
} from "@/actions/feature-flag/feature_flag.action";
import { toast } from "sonner";

interface FeatureFlagRowProps {
  featureFlag: FeatureFlag;
  index: number;
  onDeleted: (id: string) => void;
}

export function FeatureFlagRow({ featureFlag, index, onDeleted }: FeatureFlagRowProps) {
  const [isPending, startTransition] = useTransition();
  const [isEnabled, setIsEnabled] = useState(featureFlag.isEnabled);

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    startTransition(async () => {
      const result = await toggleFeatureFlagAction({
        id: featureFlag.id,
        name: featureFlag.name,
        description: featureFlag.description,
        isEnabled: checked,
      });

      if (result?.serverError) {
        setIsEnabled(!checked);
        toast.error("Failed to toggle feature flag");
      } else {
        toast.success(`"${featureFlag.name}" ${checked ? "enabled" : "disabled"}`);
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteFeatureFlagAction({ id: featureFlag.id });
      if (result?.serverError) {
        toast.error("Failed to delete feature flag");
      } else {
        toast.success(`"${featureFlag.name}" deleted`);
        onDeleted(featureFlag.id);
      }
    });
  };

  return (
    <div
      className="group grid grid-cols-[2fr_3fr_120px_60px] items-center px-5 py-4 animate-fade-in-up transition-colors"
      style={{
        animationDelay: `${index * 40}ms`,
        borderBottom: "1px dashed rgba(255,255,255,0.08)",
      }}
    >
      {/* Name */}
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: isEnabled ? "#4ade80" : "rgba(255,255,255,0.2)" }}
        />
        <span className="font-body chalk-text text-sm truncate">{featureFlag.name}</span>
      </div>

      {/* Description */}
      <span className="text-xs font-body truncate pr-4" style={{ color: "rgba(255,255,255,0.4)" }}>
        {featureFlag.description}
      </span>

      {/* Toggle */}
      <div className="flex justify-center">
        <Switch
          checked={isEnabled}
          onCheckedChange={handleToggle}
          disabled={isPending}
          aria-label={`Toggle ${featureFlag.name}`}
        />
      </div>

      {/* Delete */}
      <div className="flex justify-center">
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="chalk-action-btn opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Delete ${featureFlag.name}`}
        >
          <Trash2 size={14} className="text-red-400/70 hover:text-red-400" />
        </button>
      </div>
    </div>
  );
}
