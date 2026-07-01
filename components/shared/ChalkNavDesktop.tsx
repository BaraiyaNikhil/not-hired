"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { User, LogOut, LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface ChalkNavDesktopProps {
  pathname: string;
  navItems: NavItem[];
  userName: string | null;
  phase: "welcome" | "user";
  logout: () => void;
  isLoggingOut: boolean;
  notificationBell?: React.ReactNode;
}

export function ChalkNavDesktop({
  pathname,
  navItems,
  userName,
  phase,
  logout,
  isLoggingOut,
  notificationBell,
}: ChalkNavDesktopProps) {
  return (
    <>
      {/* Desktop Nav links */}
      <div className="hidden lg:flex items-center gap-2 flex-1">
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
              <span className="relative">
                <Icon size={15} />
              </span>
              <span>{item.label}</span>
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

      {/* Desktop User Section */}
      <div
        className="hidden lg:flex shrink-0 items-center justify-end gap-3"
        style={{ minWidth: 200, height: 32 }}
      >
        {notificationBell}

        <AnimatePresence mode="wait" initial={false}>
          {!userName ? null : phase === "welcome" ? (
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
                  className="font-sketch chalk-text text-sm"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {userName}
                </span>
              </div>

              {/* Logout */}
              <motion.button
                onClick={logout}
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
                <span>{isLoggingOut ? "Signing out…" : "Logout"}</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
