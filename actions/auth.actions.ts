"use server";

import { actionClient, authActionClient } from "@/lib/safe-action";
import { signupSchema, loginSchema } from "@/types/auth";
import {
  signupService,
  loginService,
  loginWithGoogleService,
  logoutService,
} from "@/services/auth.service";

export const signupAction = actionClient
  .inputSchema(signupSchema)
  .action(async ({ parsedInput }) => {
    const result = await signupService(parsedInput);
    if (result.error) {
      throw new Error(result.error);
    }
    return { success: result.success };
  });

export const loginAction = actionClient.inputSchema(loginSchema).action(async ({ parsedInput }) => {
  const result = await loginService(parsedInput);
  if (result.error) {
    throw new Error(result.error);
  }
  return { success: result.success };
});

export const loginWithGoogleAction = actionClient.action(async () => {
  const result = await loginWithGoogleService();
  if (result.error) {
    throw new Error(result.error);
  }
  return { url: result.url };
});

export const logoutAction = authActionClient.action(async () => {
  const result = await logoutService();
  if (result.error) {
    throw new Error(result.error);
  }
});
