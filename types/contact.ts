import { z } from "zod";

export const createContactSchema = z.object({
  applicationId: z.string().min(1, "Application ID is required"),
  name: z.string().trim().min(1, "Name is required"),
  role: z.string().trim().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  notes: z.string().optional(),
});

export const updateContactSchema = createContactSchema
  .extend({
    id: z.string(),
  })
  .omit({ applicationId: true });

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;
