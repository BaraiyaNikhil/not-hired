"use client";

import { loginAction, loginWithGoogleAction } from "@/actions/auth";
import { useAction } from "next-safe-action/hooks";
import { motion, Transition } from "motion/react";
import Image from "next/image";
import Google from "@/assets/img/google-logo.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/types/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const transitionConfig: Transition = {
  duration: 0.7,
  ease: [0.77, 0, 0.175, 1] as [number, number, number, number],
};

export function LoginForm({
  mode,
  toggleMode,
}: {
  mode: "login" | "signup";
  toggleMode: () => void;
}) {
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(loginAction, {
    onSuccess: () => {
      toast.success("Successfully signed in!");
      setTimeout(() => router.push("/applications"), 1000);
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Failed to login");
    },
  });
  const { execute: executeGoogle } = useAction(loginWithGoogleAction, {
    onSuccess: ({ data }) => {
      if (data?.url) {
        router.replace(data.url);
      }
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Failed to login with Google");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await executeAsync(data);
  };

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: mode === "signup" ? 0 : 1,
        x: mode === "signup" ? "-20%" : "0%",
        pointerEvents: mode === "signup" ? "none" : "auto",
      }}
      transition={transitionConfig}
      className="absolute top-0 left-0 w-full lg:w-1/2 h-full flex flex-col justify-center p-8 md:p-0 z-10"
    >
      <div className="w-full max-w-sm mx-auto flex flex-col justify-center h-full">
        <h2 className="font-sketch text-4xl md:text-5xl font-bold chalk-text text-center mb-4">
          Sign In
        </h2>
        <p className="font-sketch text-xl md:text-2xl chalk-text text-center mb-8 text-white/70">
          Welcome back to Not Hired.
        </p>

        <button
          onClick={() => executeGoogle()}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 chalk-button chalk-text font-sketch text-2xl mb-8 cursor-pointer"
          type="button"
        >
          <Image alt="Google Logo" className="w-6 h-6 bg-white rounded-full p-0.5" src={Google} />
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center py-2 mb-8">
          <div className="grow border-t-2 border-dashed border-white/30"></div>
          <span className="shrink-0 mx-4 font-sketch text-xl chalk-text text-white/50 uppercase tracking-wider">
            Or
          </span>
          <div className="grow border-t-2 border-dashed border-white/30"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="group">
            <label
              className="block font-sketch text-2xl chalk-text mb-2 transition-colors group-focus-within:text-white"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              {...register("email")}
              className="block w-full chalk-input font-sketch text-2xl pb-2 transition-colors"
              id="email"
              placeholder="you@example.com"
              type="email"
            />
            {errors.email && (
              <p className="font-sketch text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="group">
            <div className="flex items-center justify-between mb-2">
              <label
                className="block font-sketch text-2xl chalk-text transition-colors group-focus-within:text-white"
                htmlFor="password"
              >
                Password
              </label>
              <a
                className="font-sketch text-xl text-white/50 hover:text-white transition-colors"
                href="#"
              >
                Forgot?
              </a>
            </div>
            <input
              {...register("password")}
              className="block w-full chalk-input font-sketch text-2xl pb-2 transition-colors"
              id="password"
              placeholder="••••••••••••••••"
              type="password"
            />
            {errors.password && (
              <p className="font-sketch text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="pt-6">
            <button
              className="w-full py-3 px-4 chalk-button chalk-text font-sketch text-3xl font-bold mt-2 cursor-pointer shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              type="submit"
              disabled={isExecuting}
            >
              {isExecuting ? "Signing In..." : "Sign In"}
            </button>
          </div>

          <div className="mt-6 text-center lg:hidden">
            <p className="font-sketch text-xl chalk-text text-white/70">
              New here ?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-white hover:underline underline-offset-4"
              >
                Sign up today
              </button>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
