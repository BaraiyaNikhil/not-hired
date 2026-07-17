"use client";

import { useAction } from "next-safe-action/hooks";
import { resetPasswordAction } from "@/actions/auth.actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/types/auth";
import { toast } from "sonner";
import { motion, Transition } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const transitionConfig: Transition = {
  duration: 0.7,
  ease: [0.77, 0, 0.175, 1] as [number, number, number, number],
};

export function ResetPasswordForm() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // Store the timeout id so we can clear it if the component unmounts before redirect fires
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const { executeAsync, isExecuting } = useAction(resetPasswordAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        setSuccessMessage("Your password has been successfully reset!");
        toast.success("Password reset successful.");
        redirectTimerRef.current = setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Failed to reset password");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
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
        <h2 className="font-sketch text-2xl sm:text-4xl md:text-5xl font-bold chalk-text text-center mb-4">
          New Password
        </h2>
        <p className="font-sketch text-xl md:text-2xl chalk-text text-center mb-8 text-white/70">
          Enter your new password below.
        </p>

        {successMessage ? (
          <div className="text-center">
            <p className="font-sketch text-2xl chalk-text text-green-400 mb-8">{successMessage}</p>
            <p className="font-sketch text-xl text-white/70">Redirecting you to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="group">
              <label
                className="block font-sketch text-xl sm:text-2xl chalk-text mb-2 transition-colors group-focus-within:text-white"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                {...register("password")}
                className="block w-full chalk-input font-sketch text-xl sm:text-2xl pb-2 transition-colors"
                id="password"
                placeholder="••••••••••••••••"
                type="password"
              />
              {errors.password && (
                <p className="font-sketch text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="group">
              <label
                className="block font-sketch text-xl sm:text-2xl chalk-text mb-2 transition-colors group-focus-within:text-white"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                className="block w-full chalk-input font-sketch text-xl sm:text-2xl pb-2 transition-colors"
                id="confirmPassword"
                placeholder="••••••••••••••••"
                type="password"
              />
              {errors.confirmPassword && (
                <p className="font-sketch text-red-400 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="sm:pt-6">
              <button
                className="w-full py-3 px-4 chalk-button chalk-text font-sketch text-xl sm:text-3xl font-bold mt-2 cursor-pointer shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                type="submit"
                disabled={isExecuting}
              >
                {isExecuting ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}
