"use client";

import { signupAction, loginWithGoogleAction } from "@/actions/auth";
import { useAction } from "next-safe-action/hooks";
import { motion, Transition } from "motion/react";
import Image from "next/image";
import Google from "@/assets/img/google-logo.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormValues } from "@/types/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const transitionConfig: Transition = {
  duration: 0.7,
  ease: [0.77, 0, 0.175, 1] as [number, number, number, number],
};

export function SignupForm({
  mode,
  toggleMode,
}: {
  mode: "login" | "signup";
  toggleMode: () => void;
}) {
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(signupAction, {
    onSuccess: () => {
      toast.success("Successfully signed in!");
      router.replace("/applications");
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Failed to sign up");
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
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    await executeAsync(data);
  };
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: mode === "login" ? 0 : 1,
        x: mode === "login" ? "20%" : "0%",
        pointerEvents: mode === "login" ? "none" : "auto",
      }}
      transition={transitionConfig}
      className="absolute top-0 right-0 w-full lg:w-1/2 h-full flex flex-col justify-center p-8 md:p-0 z-10"
    >
      <div className="w-full max-w-sm mx-auto flex flex-col justify-center h-full">
        <h2 className="font-sketch text-3xl md:text-4xl font-bold chalk-text text-center mb-4">
          Create Account
        </h2>
        <p className="font-sketch text-xl md:text-2xl chalk-text text-center mb-8 text-white/70">
          Start your journey with us.
        </p>

        <button
          onClick={() => executeGoogle()}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 chalk-button chalk-text font-sketch text-xl mb-5 cursor-pointer"
          type="button"
        >
          <Image alt="Google Logo" className="w-6 h-6 bg-white rounded-full p-0.5" src={Google} />
          <span>Sign up with Google</span>
        </button>

        <div className="relative flex items-center py-1 mb-5">
          <div className="grow border-t-2 border-dashed border-white/30"></div>
          <span className="shrink-0 mx-4 font-sketch text-xl chalk-text text-white/50 uppercase tracking-wider">
            Or
          </span>
          <div className="grow border-t-2 border-dashed border-white/30"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="group">
            <label
              className="block font-sketch text-xl chalk-text mb-2 transition-colors group-focus-within:text-white"
              htmlFor="signup-name"
            >
              Name
            </label>
            <input
              {...register("name")}
              className="block w-full chalk-input font-sketch text-xl pb-2 transition-colors"
              id="signup-name"
              placeholder="Your name"
              type="text"
            />
            {errors.name && <p className="font-sketch text-red-400 mt-1">{errors.name.message}</p>}
          </div>
          <div className="group">
            <label
              className="block font-sketch text-xl chalk-text mb-2 transition-colors group-focus-within:text-white"
              htmlFor="signup-email"
            >
              Email address
            </label>
            <input
              {...register("email")}
              className="block w-full chalk-input font-sketch text-xl pb-2 transition-colors"
              id="signup-email"
              placeholder="you@example.com"
              type="email"
            />
            {errors.email && (
              <p className="font-sketch text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="group">
            <label
              className="block font-sketch text-xl chalk-text mb-2 transition-colors group-focus-within:text-white"
              htmlFor="signup-password"
            >
              Create Password
            </label>
            <input
              {...register("password")}
              className="block w-full chalk-input font-sketch text-xl pb-2 transition-colors"
              id="signup-password"
              placeholder="••••••••"
              type="password"
            />
            {errors.password && (
              <p className="font-sketch text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="pt-6">
            <button
              className="w-full py-2 px-2 chalk-button chalk-text font-sketch text-2xl font-bold mt-2 cursor-pointer shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              type="submit"
              disabled={isExecuting}
            >
              {isExecuting ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          <div className="mt-5 text-center lg:hidden">
            <p className="font-sketch text-xl chalk-text text-white/70">
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-white hover:underline underline-offset-4"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
