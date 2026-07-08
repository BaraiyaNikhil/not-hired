"use server";

import { authActionClient } from "@/lib/safe-action";
import {
  createApplicationSchema,
  updateApplicationSchema,
  changeStatusSchema,
  searchApplicationsSchema,
  loadMoreApplicationsSchema,
} from "@/types/application";
import * as applicationService from "@/services/application.service";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createApplicationAction = authActionClient
  .inputSchema(createApplicationSchema)
  .action(async ({ parsedInput, ctx }) => {
    const result = await applicationService.createApplication(ctx.user.id, parsedInput);
    revalidatePath("/dashboard");
    revalidatePath("/applications");
    return result;
  });

export const updateApplicationAction = authActionClient
  .inputSchema(updateApplicationSchema)
  .action(async ({ parsedInput, ctx }) => {
    const result = await applicationService.updateApplication(ctx.user.id, parsedInput);
    revalidatePath("/dashboard");
    revalidatePath("/applications");
    revalidatePath(`/applications/${parsedInput.id}`);
    return result;
  });

export const changeApplicationStatusAction = authActionClient
  .inputSchema(changeStatusSchema)
  .action(async ({ parsedInput, ctx }) => {
    const result = await applicationService.updateApplicationStatus(ctx.user.id, parsedInput);
    revalidatePath("/dashboard");
    revalidatePath("/applications");
    revalidatePath(`/applications/${parsedInput.id}`);
    return result;
  });

export const deleteApplicationAction = authActionClient
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    const result = await applicationService.deleteApplication(ctx.user.id, parsedInput.id);
    revalidatePath("/dashboard");
    revalidatePath("/applications");
    return result;
  });

export const searchApplicationsAction = authActionClient
  .inputSchema(searchApplicationsSchema)
  .action(async ({ parsedInput, ctx }) => {
    return applicationService.searchApplications(ctx.user.id, parsedInput);
  });

export const loadMoreApplicationsAction = authActionClient
  .inputSchema(loadMoreApplicationsSchema)
  .action(async ({ parsedInput, ctx }) => {
    return applicationService.getMoreApplications(
      ctx.user.id,
      parsedInput.status,
      parsedInput.cursorId
    );
  });
