import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().trim().min(6, { message: "Password must be at least 6 characters" }),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().trim().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().trim().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
