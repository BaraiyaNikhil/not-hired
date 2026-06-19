import { getAllFeatureFlags } from "@/services/feature_flag.service";
import { FeatureFlagClient } from "@/components/feature-flags/FeatureFlagClient";

export async function FeatureFlagList() {
  const flags = await getAllFeatureFlags();
  return <FeatureFlagClient initialFeatureFlags={flags} />;
}
