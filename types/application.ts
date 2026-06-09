import { z } from "zod";

export const createApplicationSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  roleTitle: z.string().trim().min(1, "Role title is required"),
  status: z
    .enum(["applied", "screening", "interview", "offer", "rejected", "ghosted"])
    .default("applied"),
  source: z.enum(["linkedin", "referral", "cold_email", "job_portal", "other"]).default("other"),
  appliedDate: z.string().optional().or(z.literal("")),
  salaryRange: z.string().optional(),
  jobUrl: z.string().trim().url("Must be a valid URL").optional().or(z.literal("")),
  notes: z.string().optional(),

  // Optional list of contacts (max 5)
  contacts: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Name is required"),
        role: z.string().optional(),
        email: z.string().email("Invalid email").optional().or(z.literal("")),
        mobile: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .max(5, "Maximum 5 contacts allowed")
    .optional()
    .default([]),
});

export const updateApplicationSchema = createApplicationSchema.extend({
  id: z.string(),
});

export const changeStatusSchema = z.object({
  id: z.string(),
  status: z.enum(["applied", "screening", "interview", "offer", "rejected", "ghosted"]),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;
export type ChangeStatusInput = z.infer<typeof changeStatusSchema>;
