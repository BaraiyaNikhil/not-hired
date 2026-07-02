"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export function ChalkNavDesktopLinks({
  pathname,
  navItems,
}: {
  pathname: string;
  navItems: NavItem[];
}) {
  return (
    <>
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
    </>
  );
}
