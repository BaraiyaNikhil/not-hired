import { Suspense } from "react";
import { FeatureFlagList } from "@/components/feature-flags/FeatureFlagList";
import FeatureFlagsSkeleton from "@/components/skeleton/feature-flags/FeatureFlagsSkeleton";

export const metadata = {
  title: "Feature Flags | Admin",
  description: "Manage feature flags for the platform.",
};

export default function FeatureFlagsPage() {
  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 space-y-5">
      <Suspense fallback={<FeatureFlagsSkeleton />}>
        <FeatureFlagList />
      </Suspense>
    </div>
  );
}
