import { createClient } from "./supabase/server";
import { getUserProfileService } from "@/services/auth.service";

export async function getCurrentUserProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return await getUserProfileService(user.id);
}
