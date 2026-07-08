"use server";

import { actionClient } from "@/lib/safe-action";
import { getOrGenerateNudges } from "@/services/ai_insight.service";
import { createClient } from "@/utils/supabase/server";

export const fetchInsightsAction = actionClient.action(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return await getOrGenerateNudges(user.id, false);
});

export const refreshInsightsAction = actionClient.action(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return await getOrGenerateNudges(user.id, true);
});
