import { z } from "zod";
import { ReminderTrigger } from "@prisma/client";

export const createReminderSchema = z.object({
  applicationId: z.string().min(1, "Application is required"),
  message: z.string().trim().min(1, "Message is required"),
  dueDate: z.string().min(1, "Due date is required"),
});

export const markReminderDoneSchema = z.object({
  id: z.string().min(1),
});

export type CreateReminderInput = z.infer<typeof createReminderSchema>;
export type MarkReminderDoneInput = z.infer<typeof markReminderDoneSchema>;

export type ReminderWithApplication = {
  id: string;
  userId: string;
  applicationId: string;
  message: string;
  dueDate: Date;
  isDone: boolean;
  doneAt: Date | null;
  digestSent: boolean;
  digestSentAt: Date | null;
  trigger: ReminderTrigger;
  createdAt: Date;
  updatedAt: Date;
  application: {
    id: string;
    companyName: string;
    roleTitle: string;
    status: string;
  };
};

export type GroupedReminders = {
  today: ReminderWithApplication[];
  upcoming: ReminderWithApplication[];
  completed: ReminderWithApplication[];
};
