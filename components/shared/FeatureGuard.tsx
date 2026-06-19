import { ReactNode } from "react";
import { isFeatureEnabled } from "@/utils/feature_flag";

interface FeatureGuardProps {
  featureName: string;
  fallback?: ReactNode;
  children: ReactNode;
}

export default async function FeatureGuard({
  featureName,
  fallback = null,
  children,
}: FeatureGuardProps) {
  const enabled = await isFeatureEnabled(featureName);

  if (!enabled) {
    return fallback;
  }

  return children;
}
