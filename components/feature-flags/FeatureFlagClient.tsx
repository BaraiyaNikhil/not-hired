"use client";

import { useState } from "react";
import { FeatureFlag } from "@prisma/client";
import { CreateFeatureFlagDialog } from "@/components/feature-flags/CreateFeatureFlagDialog";
import { FeatureFlagRow } from "@/components/feature-flags/FeatureFlagRow";
import { Plus, Flag } from "lucide-react";

interface FeatureFlagClientProps {
  initialFeatureFlags: FeatureFlag[];
}

export function FeatureFlagClient({ initialFeatureFlags }: FeatureFlagClientProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [featureFlags, setFeatureFlags] = useState(initialFeatureFlags);

  const handleFlagCreated = (newFlag: FeatureFlag) => {
    setFeatureFlags((prev) => [newFlag, ...prev]);
  };

  const handleFlagDeleted = (id: string) => {
    setFeatureFlags((prev) => prev.filter((f) => f.id !== id));
  };

  const enabledCount = featureFlags.filter((f) => f.isEnabled).length;
  const disabledCount = featureFlags.length - enabledCount;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-sketch chalk-text text-4xl md:text-5xl tracking-wide">
            Feature Flags
          </h1>
          <p className="text-sm font-body mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            toggle features on or off across the platform.
          </p>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="chalk-button flex items-center gap-2 px-4 py-2 text-sm font-body chalk-text shrink-0"
        >
          <Plus size={15} />
          New Flag
        </button>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Flags", value: featureFlags.length, color: "#60a5fa" },
          { label: "Enabled", value: enabledCount, color: "#4ade80" },
          { label: "Disabled", value: disabledCount, color: "#f87171" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="chalk-card p-4 flex flex-col gap-1 animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span
              className="text-xs font-body tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {stat.label}
            </span>
            <p
              className="font-sketch text-3xl chalk-text leading-none"
              style={{ textShadow: `0 0 20px ${stat.color}40`, color: stat.color }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Flags Table */}
      <div className="chalk-card animate-fade-in-up" style={{ animationDelay: "120ms" }}>
        {/* Table Header */}
        <div
          className="flex items-center gap-2 px-5 py-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <Flag size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
          <span
            className="text-xs font-body tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Active Flags
          </span>
          <span
            className="ml-auto text-xs font-body px-2 py-0.5 rounded-sm"
            style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}
          >
            {featureFlags.length} total
          </span>
        </div>

        {featureFlags.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            <Flag size={36} strokeWidth={1} />
            <p className="font-sketch text-xl tracking-wide">no flags yet</p>
            <p className="text-sm font-body">create one to get started</p>
          </div>
        ) : (
          <>
            {/* Column Labels */}
            <div
              className="grid grid-cols-[2fr_3fr_120px_60px] px-5 py-2 text-xs font-body tracking-widest uppercase"
              style={{
                color: "rgba(255,255,255,0.3)",
                borderBottom: "1px dashed rgba(255,255,255,0.08)",
              }}
            >
              <span>Name</span>
              <span>Description</span>
              <span className="text-center">Status</span>
              <span className="text-center">Action</span>
              <span />
            </div>

            {/* Rows */}
            <div>
              {featureFlags.map((flag, i) => (
                <FeatureFlagRow
                  key={flag.id}
                  featureFlag={flag}
                  index={i}
                  onDeleted={handleFlagDeleted}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <CreateFeatureFlagDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onFlagCreated={handleFlagCreated}
      />
    </div>
  );
}
