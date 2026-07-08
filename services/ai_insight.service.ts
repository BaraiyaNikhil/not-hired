import "server-only";

import { generateText, Output } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { buildUserContext } from "@/lib/context";
import { InsightResponse, AiInsight } from "@/types/dashboard";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function getOrGenerateNudges(
  userId: string,
  forceRefresh: boolean
): Promise<InsightResponse> {
  const applicationCount = await prisma.application.count({
    where: { userId },
  });

  if (applicationCount < 1) {
    return {
      insights: [],
      isLocked: true,
      generatedAt: null,
      refreshesToday: 0,
    };
  }

  const cache = await prisma.userInsightCache.findUnique({
    where: { userId },
  });

  const currentActivityCount = await prisma.applicationStatusLog.count({
    where: { application: { userId } },
  });

  const now = new Date();
  const maxRefreshes = parseInt(process.env.MAX_DAILY_INSIGHT_REFRESHES || "3");

  let needsGeneration = false;
  let refreshesToday = cache?.refreshesToday || 0;

  if (!cache) {
    needsGeneration = true;
  } else {
    const isToday =
      cache.generatedAt.getDate() === now.getDate() &&
      cache.generatedAt.getMonth() === now.getMonth() &&
      cache.generatedAt.getFullYear() === now.getFullYear();

    if (!isToday) {
      needsGeneration = true;
      refreshesToday = 0;
    } else if (currentActivityCount - cache.baseActivityCount >= 10) {
      needsGeneration = true;
    } else if (forceRefresh) {
      if (refreshesToday < maxRefreshes) {
        needsGeneration = true;
        refreshesToday += 1;
      }
    }
  }

  if (!needsGeneration && cache) {
    return {
      insights: cache.insights as unknown as AiInsight[],
      isLocked: false,
      generatedAt: cache.generatedAt.toISOString(),
      refreshesToday,
    };
  }

  const userContext = await buildUserContext(userId);

  const systemPrompt = `You are a brutally honest job search coach.
  You have the user's real job search data.
  Return ONLY a valid JSON object containing an "insights" array of exactly 3 insights.
  No markdown. No explanation. Raw JSON only.

  Format:
  {
    "insights": [
      {
        "id": "insight_1",
        "type": "critical" | "warning" | "info", 
        "text": "2-3 sentences using their actual numbers",
        "action": "One specific action they can do today"
      }
    ]
  }`;

  const promptContext = `User's job search data:
  ${JSON.stringify(userContext, null, 2)}

  Based on this data, provide exactly 3 insights.
  Each should have a short, punchy 'text' (2-3 sentences using their actual numbers) and an actionable 'action' (One specific action they can do today).`;

  try {
    const { output } = await generateText({
      model: openrouter(process.env.OPENROUTER_MODEL || "openai/gpt-oss-20b:free"),
      system: systemPrompt,
      prompt: promptContext,
      output: Output.object({
        schema: z.object({
          insights: z
            .array(
              z.object({
                id: z.string(),
                type: z.enum(["info", "warning", "critical"]),
                text: z.string(),
                action: z.string(),
              })
            )
            .length(3),
        }),
      }),
    });

    const object = output;

    const newCache = await prisma.userInsightCache.upsert({
      where: { userId },
      update: {
        insights: object.insights,
        baseActivityCount: currentActivityCount,
        generatedAt: now,
        refreshesToday,
      },
      create: {
        userId,
        insights: object.insights,
        baseActivityCount: currentActivityCount,
        generatedAt: now,
        refreshesToday,
      },
    });

    return {
      insights: newCache.insights as unknown as AiInsight[],
      isLocked: false,
      generatedAt: newCache.generatedAt.toISOString(),
      refreshesToday: newCache.refreshesToday,
    };
  } catch (error) {
    console.error("Failed to generate insights:", error);
    // Fallback to cache if generation fails, otherwise empty array
    if (cache) {
      return {
        insights: cache.insights as unknown as AiInsight[],
        isLocked: false,
        generatedAt: cache.generatedAt.toISOString(),
        refreshesToday: cache.refreshesToday,
      };
    }
    throw error;
  }
}
