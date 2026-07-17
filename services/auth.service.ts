import "server-only";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import {
  SignupFormValues,
  LoginFormValues,
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
} from "@/types/auth";

export async function signupService(data: SignupFormValues) {
  const supabase = await createClient();

  const headersList = await headers();
  const origin =
    headersList.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (authData.user) {
    try {
      // Sync with Prisma User table
      await prisma.user.create({
        data: {
          id: authData.user.id,
          email: data.email,
          name: data.name,
        },
      });
    } catch (e) {
      console.error("Failed to sync user to Prisma:", e);
      return { error: "Failed to create user account. Please try again." };
    }
  }

  return { success: "Check your email for the confirmation link." };
}

export async function loginService(data: LoginFormValues) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function loginWithGoogleService() {
  const supabase = await createClient();

  const headersList = await headers();
  const origin =
    headersList.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { url: data.url };
}

export async function getUserProfileService(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, isAdmin: true },
    });
    return {
      name: user?.name || user?.email?.split("@")[0] || "there",
      isAdmin: user?.isAdmin || false,
    };
  } catch (e) {
    console.error("Failed to fetch user profile:", e);
    return { name: "there", isAdmin: false };
  }
}

export async function logoutService() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function forgotPasswordService(data: ForgotPasswordFormValues) {
  const supabase = await createClient();

  const headersList = await headers();
  const origin =
    headersList.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  if (error) {
    console.error("Failed to send password reset email:", error);
  }

  return { success: true };
}

export async function resetPasswordService(data: ResetPasswordFormValues) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
