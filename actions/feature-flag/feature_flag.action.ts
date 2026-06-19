"use server";

import * as featureFlagService from "@/services/feature_flag.service";
import { authActionClient } from "@/lib/safe-action";
import { createFeatureFlagSchema, toggleFeatureFlagSchema } from "@/types/feature_flag";
import { revalidatePath } from "next/cache";
import z from "zod";

export const createFeatureFlagAction = authActionClient
  .inputSchema(createFeatureFlagSchema)
  .action(async ({ parsedInput, ctx }) => {
    const result = await featureFlagService.createFeatureFlag(ctx.user.id, parsedInput);
    revalidatePath("/feature-flags");
    return result;
  });

export const toggleFeatureFlagAction = authActionClient
  .inputSchema(toggleFeatureFlagSchema)
  .action(async ({ parsedInput, ctx }) => {
    const result = await featureFlagService.toggleFeatureFlag(ctx.user.id, parsedInput);
    revalidatePath("/admin");
    return result;
  });

export const deleteFeatureFlagAction = authActionClient
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    const result = await featureFlagService.deleteFeatureFlag(ctx.user.id, parsedInput.id);
    revalidatePath("/admin");
    return result;
  });
