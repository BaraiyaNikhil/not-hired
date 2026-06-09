"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { LayoutGrid, Home, BookOpen, Bell, Lightbulb } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/applications", label: "Board", icon: LayoutGrid },
  { href: "/reminders", label: "Reminders", icon: Bell },
  { href: "/insights", label: "Insights", icon: Lightbulb },
];

export function ChalkNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex items-center justify-between md:justify-start gap-2 md:gap-1 py-2 px-4 md:px-6 overflow-x-auto no-scrollbar"
      style={{
        borderBottom: "2px dashed rgba(255,255,255,0.15)",
        background: "rgba(0,0,0,0.15)",
      }}
    >
      {/* Logo */}
      <Link href="/dashboard" className="md:mr-6 flex items-center gap-2 shrink-0">
        <BookOpen size={20} style={{ color: "rgba(255,255,255,0.7)" }} />
        <span className="font-sketch chalk-text text-xl tracking-wide">NotHired</span>
      </Link>

      <div className="flex items-center gap-1 md:gap-2 shrink-0">
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
    </nav>
  );
}
