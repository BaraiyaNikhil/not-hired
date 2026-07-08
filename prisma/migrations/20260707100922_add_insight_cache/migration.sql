/*
  Warnings:

  - Added the required column `updated_at` to the `reminders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReminderTrigger" AS ENUM ('MANUAL', 'AUTO_APPLIED', 'AUTO_SCREENING', 'AUTO_INTERVIEW', 'AUTO_OFFER');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SYSTEM', 'REMINDER_DIGEST', 'AI_ACTION');

-- AlterTable
ALTER TABLE "reminders" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "digest_sent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "digest_sent_at" TIMESTAMP(3),
ADD COLUMN     "done_at" TIMESTAMP(3),
ADD COLUMN     "trigger" "ReminderTrigger" NOT NULL DEFAULT 'MANUAL',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'SYSTEM',
    "link" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_insight_caches" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "insights" JSONB NOT NULL,
    "base_activity_count" INTEGER NOT NULL,
    "refreshes_today" INTEGER NOT NULL DEFAULT 0,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_insight_caches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notifications_user_id_is_read_idx" ON "notifications"("user_id", "is_read");

-- CreateIndex
CREATE UNIQUE INDEX "user_insight_caches_user_id_key" ON "user_insight_caches"("user_id");

-- CreateIndex
CREATE INDEX "reminders_due_date_is_done_digest_sent_idx" ON "reminders"("due_date", "is_done", "digest_sent");

-- CreateIndex
CREATE INDEX "reminders_user_id_idx" ON "reminders"("user_id");

-- CreateIndex
CREATE INDEX "reminders_application_id_idx" ON "reminders"("application_id");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_insight_caches" ADD CONSTRAINT "user_insight_caches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
