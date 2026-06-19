import { getCurrentUserProfile } from "./auth";
import { getFeatureFlagByName } from "@/services/feature_flag.service";

export async function isFeatureEnabled(featureName: string): Promise<boolean> {
  const [user, featureFlag] = await Promise.all([
    getCurrentUserProfile(),
    getFeatureFlagByName(featureName),
  ]);

  if (featureFlag?.isEnabled) {
    return true;
  }

  if (user?.isAdmin) {
    return true;
  }

  return false;
}
