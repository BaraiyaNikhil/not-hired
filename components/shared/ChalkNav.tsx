"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { LayoutGrid, Home, BookOpen, Bell, Lightbulb, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { logoutAction, getUserProfileAction } from "@/actions/auth";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/applications", label: "Board", icon: LayoutGrid },
  { href: "/reminders", label: "Reminders", icon: Bell },
  { href: "/insights", label: "Insights", icon: Lightbulb },
];

type WelcomePhase = "welcome" | "user";

export function ChalkNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [phase, setPhase] = useState<WelcomePhase>("welcome");

  // Fetch name from Prisma via server action
  const { execute: fetchProfile } = useAction(getUserProfileAction, {
    onSuccess: ({ data }) => {
      if (data?.name) setUserName(data.name);
    },
  });

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // After 2.8s switch from welcome greeting to persistent user chip + logout
  useEffect(() => {
    if (!userName) return;
    const t = setTimeout(() => setPhase("user"), 2800);
    return () => clearTimeout(t);
  }, [userName]);

  const { execute: logout, isPending: isLoggingOut } = useAction(logoutAction, {
    onSuccess: () => router.push("/login"),
    onError: () => router.push("/login"),
  });

  return (
    <nav
      className="flex items-center justify-between gap-2 py-2 px-4 md:px-6 overflow-x-auto no-scrollbar"
      style={{
        borderBottom: "2px dashed rgba(255,255,255,0.15)",
        background: "rgba(0,0,0,0.15)",
      }}
    >
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 shrink-0 md:mr-4">
        <BookOpen size={20} style={{ color: "rgba(255,255,255,0.7)" }} />
        <span className="font-sketch chalk-text text-xl tracking-wide">NotHired</span>
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-1 md:gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-sm transition-all"
              style={{
                color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                fontFamily: "var(--font-body, inherit)",
                borderRadius: "2px 5px 3px 4px",
              }}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px dashed rgba(255,255,255,0.25)",
                    borderRadius: "2px 5px 3px 4px",
                  }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/*
       * User area — fixed height so animation NEVER shifts surrounding layout.
       * `overflow: hidden` clips content; `h-8` matches the pill height.
       * AnimatePresence swaps welcome ↔ user chip in-place.
       */}
      <div
        className="shrink-0 flex items-center justify-end"
        style={{ minWidth: 180, height: 32, overflow: "hidden" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!userName ? null : phase === "welcome" ? (
            /* ── Welcome greeting ── */
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: -32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center gap-2 px-3"
              style={{
                height: 32,
                background: "rgba(255,255,255,0.06)",
                border: "1px dashed rgba(255,255,255,0.2)",
                borderRadius: "2px 5px 3px 4px",
                fontFamily: "var(--font-body, inherit)",
                whiteSpace: "nowrap",
              }}
            >
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                👋 Welcome,{" "}
                <span
                  className="font-sketch chalk-text"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  {userName}
                </span>
                !
              </span>
            </motion.div>
          ) : (
            /* ── Persistent: name chip + logout ── */
            <motion.div
              key="user"
              initial={{ opacity: 0, y: -32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center gap-1.5"
              style={{ height: 32 }}
            >
              {/* Name chip */}
              <div
                className="flex items-center gap-1.5 px-3"
                style={{
                  height: 32,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px dashed rgba(255,255,255,0.18)",
                  borderRadius: "2px 5px 3px 4px",
                  fontFamily: "var(--font-body, inherit)",
                  whiteSpace: "nowrap",
                }}
              >
                <User size={13} style={{ color: "rgba(255,255,255,0.5)" }} />
                <span
                  className="hidden sm:inline font-sketch chalk-text text-sm"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {userName}
                </span>
              </div>

              {/* Logout */}
              <motion.button
                onClick={() => logout()}
                disabled={isLoggingOut}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                title="Sign out"
                className="flex items-center gap-1.5 px-3 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  height: 32,
                  background: "rgba(255,80,80,0.08)",
                  border: "1px dashed rgba(255,100,100,0.3)",
                  borderRadius: "2px 5px 3px 4px",
                  color: "rgba(255,140,140,0.85)",
                  fontFamily: "var(--font-body, inherit)",
                  whiteSpace: "nowrap",
                }}
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">{isLoggingOut ? "Signing out…" : "Logout"}</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
