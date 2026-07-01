"use server";

import { authActionClient } from "@/lib/safe-action";
import { createReminderSchema, markReminderDoneSchema } from "@/types/reminder";
import * as reminderService from "@/services/reminder.service";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createReminderAction = authActionClient
  .inputSchema(createReminderSchema)
  .action(async ({ parsedInput, ctx }) => {
    const result = await reminderService.createReminder(ctx.user.id, {
      applicationId: parsedInput.applicationId,
      message: parsedInput.message,
      dueDate: new Date(parsedInput.dueDate),
    });
    revalidatePath("/reminders");
    return result;
  });

export const markReminderDoneAction = authActionClient
  .inputSchema(markReminderDoneSchema)
  .action(async ({ parsedInput, ctx }) => {
    const result = await reminderService.markReminderDone(ctx.user.id, parsedInput.id);
    revalidatePath("/reminders");
    return result;
  });

export const getReminderCountAction = authActionClient
  .inputSchema(z.object({}))
  .action(async ({ ctx }) => {
    const count = await reminderService.getTodayReminderCount(ctx.user.id);
    return { count };
  });

const getPaginatedRemindersSchema = z.object({
  cursor: z.string().optional(),
  limit: z.number().optional().default(10),
});

export const getTodayRemindersAction = authActionClient
  .inputSchema(getPaginatedRemindersSchema)
  .action(async ({ parsedInput, ctx }) => {
    return reminderService.getTodayReminders(ctx.user.id, parsedInput.cursor, parsedInput.limit);
  });

export const getUpcomingRemindersAction = authActionClient
  .inputSchema(getPaginatedRemindersSchema)
  .action(async ({ parsedInput, ctx }) => {
    return reminderService.getUpcomingReminders(ctx.user.id, parsedInput.cursor, parsedInput.limit);
  });

export const getCompletedRemindersAction = authActionClient
  .inputSchema(getPaginatedRemindersSchema)
  .action(async ({ parsedInput, ctx }) => {
    return reminderService.getCompletedReminders(
      ctx.user.id,
      parsedInput.cursor,
      parsedInput.limit
    );
  });
