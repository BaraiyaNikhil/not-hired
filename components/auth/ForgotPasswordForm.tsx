"use client";

import { useAction } from "next-safe-action/hooks";
import { forgotPasswordAction } from "@/actions/auth.actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/types/auth";
import { toast } from "sonner";
import { motion, Transition } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const transitionConfig: Transition = {
  duration: 0.7,
  ease: [0.77, 0, 0.175, 1] as [number, number, number, number],
};

export function ForgotPasswordForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { executeAsync, isExecuting } = useAction(forgotPasswordAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        setSuccessMessage(
          "If account is associated with us, you will get email with the password reset link."
        );
      }
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Failed to send reset email");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setSuccessMessage(null);
    await executeAsync(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transitionConfig}
      className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-8 z-10"
    >
      <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full">
        <h2 className="font-sketch text-2xl sm:text-4xl md:text-5xl font-semibold chalk-text text-center mb-4">
          Forgot Password
        </h2>
        <p className="text-sm text-amber-300/50 text-center mb-4">
          *Please check Spam if email not found!
        </p>
        <p className="font-sketch text-xl md:text-2xl chalk-text text-center mb-4 text-white/70">
          We&apos;ll send you a link to get back into your account.
        </p>

        {successMessage ? (
          <div className="text-center">
            <p className="font-sketch text-2xl chalk-text text-green-400 mb-4">{successMessage}</p>
            <Link
              href="/login"
              className="font-sketch text-xl text-white/70 hover:text-white transition-colors underline underline-offset-4"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="group">
              <label
                className="block font-sketch text-xl sm:text-2xl chalk-text mb-2 transition-colors group-focus-within:text-white"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                {...register("email")}
                className="block w-full chalk-input font-sketch text-xl sm:text-2xl pb-2 transition-colors"
                id="email"
                placeholder="you@example.com"
                type="email"
              />
              {errors.email && (
                <p className="font-sketch text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="sm:pt-6">
              <button
                className="w-full py-3 px-4 chalk-button chalk-text font-sketch text-xl sm:text-3xl font-bold mt-2 cursor-pointer shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                type="submit"
                disabled={isExecuting}
              >
                {isExecuting ? "Sending..." : "Send Reset Link"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="font-sketch text-lg sm:text-xl chalk-text text-white/70">
                Remembered your password?{" "}
                <Link href="/login" className="text-white hover:underline underline-offset-4">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}
