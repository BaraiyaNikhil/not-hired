import { z } from "zod";

export const createFeatureFlagSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  isEnabled: z.boolean(),
});

export const toggleFeatureFlagSchema = createFeatureFlagSchema.extend({
  id: z.string(),
});

export type CreateFeatureFlagInput = z.infer<typeof createFeatureFlagSchema>;
export type UpdateFeatureFlagInput = z.infer<typeof toggleFeatureFlagSchema>;
