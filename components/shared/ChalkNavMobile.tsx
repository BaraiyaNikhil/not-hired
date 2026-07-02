"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { User, LogOut, LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface ChalkNavMobileProps {
  pathname: string;
  navItems: NavItem[];
  userName: string | null;
  phase: "welcome" | "user";
  logout: () => void;
  isLoggingOut: boolean;
  isOpen: boolean;
}

export function ChalkNavMobile({
  pathname,
  navItems,
  userName,
  phase,
  logout,
  isLoggingOut,
  isOpen,
}: ChalkNavMobileProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="lg:hidden w-full overflow-hidden flex flex-col gap-3 pb-4 px-4 border-t border-dashed border-white/10"
        >
          <div className="flex flex-col gap-1.5 pt-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm transition-all"
                  style={{
                    color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
                    fontFamily: "var(--font-body, inherit)",
                    background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                    border: isActive ? "1px dashed rgba(255,255,255,0.2)" : "1px solid transparent",
                    borderRadius: "2px 5px 3px 4px",
                  }}
                >
                  <span className="relative">
                    <Icon size={16} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile User Section */}
          <div className="flex flex-col gap-2 pt-3 border-t border-dashed border-white/10">
            {userName && (
              <>
                <div className="flex items-center justify-between px-3">
                  <div className="flex items-center gap-1.5">
                    <User size={13} style={{ color: "rgba(255,255,255,0.5)" }} />
                    <span
                      className="font-sketch chalk-text text-sm"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      {userName}
                    </span>
                  </div>
                  {/* Small welcome message if stage is welcome */}
                  {phase === "welcome" && (
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                      👋 Welcome!
                    </span>
                  )}
                </div>

                <button
                  onClick={logout}
                  disabled={isLoggingOut}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm cursor-pointer disabled:opacity-50"
                  style={{
                    background: "rgba(255,80,80,0.08)",
                    border: "1px dashed rgba(255,100,100,0.3)",
                    borderRadius: "2px 5px 3px 4px",
                    color: "rgba(255,140,140,0.85)",
                    fontFamily: "var(--font-body, inherit)",
                  }}
                >
                  <LogOut size={13} />
                  <span>{isLoggingOut ? "Signing out…" : "Logout"}</span>
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
