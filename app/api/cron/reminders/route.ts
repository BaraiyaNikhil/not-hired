import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { ReminderDigestEmail } from "@/emails/ReminderDigestEmail";
import { getDueRemindersForDigest } from "@/services/reminder.service";
import { prisma } from "@/lib/db";
import { createElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://not-hired.vercel.app";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "reminders@nothired.dpdns.org";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const reminders = await getDueRemindersForDigest();

    if (reminders.length === 0) {
      return NextResponse.json({ sent: 0, message: "No reminders due today." });
    }

    const byUser = new Map<
      string,
      {
        user: { id: string; email: string; name: string | null };
        reminderIds: string[];
        items: {
          id: string;
          message: string;
          dueDate: Date;
          application: { companyName: string; roleTitle: string };
        }[];
      }
    >();

    for (const r of reminders) {
      const existing = byUser.get(r.userId);
      if (existing) {
        existing.reminderIds.push(r.id);
        existing.items.push({
          id: r.id,
          message: r.message,
          dueDate: r.dueDate,
          application: r.application,
        });
      } else {
        byUser.set(r.userId, {
          user: r.user,
          reminderIds: [r.id],
          items: [
            {
              id: r.id,
              message: r.message,
              dueDate: r.dueDate,
              application: r.application,
            },
          ],
        });
      }
    }

    let sentCount = 0;
    const allSentIds: string[] = [];

    for (const [, { user, reminderIds, items }] of byUser) {
      try {
        const element = createElement(ReminderDigestEmail, {
          userName: user.name ?? user.email.split("@")[0],
          reminders: items,
          appUrl: APP_URL,
        });
        const [html, text] = await Promise.all([
          render(element),
          render(element, { plainText: true }),
        ]);

        await prisma.$transaction(async (tx) => {
          await tx.notification.create({
            data: {
              userId: user.id,
              title: "Daily Reminder Digest",
              message: `You have ${items.length} follow-up${items.length > 1 ? "s" : ""} pending today.`,
              type: "REMINDER_DIGEST",
              link: "/reminders",
            },
          });

          await tx.reminder.updateMany({
            where: { id: { in: reminderIds } },
            data: { digestSent: true, digestSentAt: new Date() },
          });

          const { error: emailError } = await resend.emails.send({
            from: `Nikhil Baraiya <${FROM_EMAIL}>`,
            to: user.email,
            subject: `${items.length} reminder${items.length > 1 ? "s" : ""} due today — NotHired`,
            html: html,
            text: text,
          });

          if (emailError) {
            throw new Error(emailError.message);
          }
        });

        allSentIds.push(...reminderIds);
        sentCount++;
      } catch (emailError) {
        console.error(`[cron/reminders] Failed to send to ${user.email}:`, emailError);
      }
    }

    return NextResponse.json({
      sent: sentCount,
      reminders: allSentIds.length,
      message: `Digest sent to ${sentCount} user(s) for ${allSentIds.length} reminder(s).`,
    });
  } catch (error) {
    console.error("[cron/reminders] Fatal error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
