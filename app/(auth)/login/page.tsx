"use client";

import { useState } from "react";
import { LoginForm } from "../../../components/login/LoginForm";
import { SignupForm } from "../../../components/login/SignupForm";
import { SlidingOverlay } from "../../../components/login/SlidingOverlay";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMode = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  return (
    <div className="w-full min-h-screen flex-1 flex items-center justify-center relative font-sans overflow-hidden text-foreground dark:bg-background">
      {/* Main Chalkboard Container */}
      <div className="h-[90vh] relative z-10 w-[90vw] max-w-5xl lg:min-h-[700px] board-bg overflow-hidden rounded-xl m-2">
        {/* === Static Center Dashed Line === */}
        <div className="hidden lg:block absolute top-8 bottom-8 left-1/2 w-0 border-l-4 border-dashed border-white/30 z-40 transform -translate-x-1/2 pointer-events-none mix-blend-overlay"></div>

        <LoginForm mode={mode} toggleMode={toggleMode} />
        <SignupForm mode={mode} toggleMode={toggleMode} />
        <SlidingOverlay mode={mode} toggleMode={toggleMode} />
      </div>
    </div>
  );
}
