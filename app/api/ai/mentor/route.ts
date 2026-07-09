import { createClient } from "@/utils/supabase/server";
import { buildUserContext } from "@/lib/context";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from "ai";

export const maxDuration = 30;

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  const userContext = await buildUserContext(user.id);

  const systemPrompt = `You are a brutally honest job search mentor.
  You have full context of this user's job search below.
  Reference their specific data when relevant — not generic advice.
  Be direct. 3-5 sentences max unless they ask for detail.
  If they ask you to draft something (email, message), do it fully.
  Never use bullet points unless explicitly asked.

  User's job search data:
  ${JSON.stringify(userContext, null, 2)}`;

  const result = streamText({
    model: openrouter(process.env.OPENROUTER_MODEL ?? "openai/gpt-oss-120b:free"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
