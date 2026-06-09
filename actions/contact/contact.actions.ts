"use server";

import { authActionClient } from "@/lib/safe-action";
import { createContactSchema, updateContactSchema } from "@/types/contact";
import * as contactService from "@/services/contact/contact.service";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createContactAction = authActionClient
  .inputSchema(createContactSchema)
  .action(async ({ parsedInput, ctx }) => {
    const result = await contactService.createContact(ctx.user.id, parsedInput);
    revalidatePath("/dashboard");
    return result;
  });

export const updateContactAction = authActionClient
  .inputSchema(updateContactSchema)
  .action(async ({ parsedInput, ctx }) => {
    const result = await contactService.updateContact(ctx.user.id, parsedInput);
    revalidatePath("/dashboard");
    return result;
  });

export const deleteContactAction = authActionClient
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    const result = await contactService.deleteContact(ctx.user.id, parsedInput.id);
    revalidatePath("/dashboard");
    return result;
  });
