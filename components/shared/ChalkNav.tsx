"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  LayoutGrid,
  Bell,
  Lightbulb,
  Menu,
  X,
  Flag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { logoutAction, getUserProfileAction } from "@/actions/auth/auth.actions";
import { ChalkNavDesktop } from "./ChalkNavDesktop";
import { ChalkNavMobile } from "./ChalkNavMobile";

const navItems = [
  { href: "/applications", label: "Board", icon: LayoutGrid },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/reminders", label: "Reminders", icon: Bell },
  { href: "/insights", label: "Insights", icon: Lightbulb },
  { href: "/feature-flags", label: "Feature flags", icon: Flag },
];

type WelcomePhase = "welcome" | "user";

export function ChalkNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [phase, setPhase] = useState<WelcomePhase>("welcome");
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  const { execute: fetchProfile } = useAction(getUserProfileAction, {
    onSuccess: ({ data }) => {
      if (data?.name) setUserName(data.name);
      if (data?.isAdmin) setIsAdmin(data.isAdmin);
    },
  });

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!userName) return;
    const t = setTimeout(() => setPhase("user"), 2800);
    return () => clearTimeout(t);
  }, [userName]);

  if (pathname !== prevPathname) {
    setIsOpen(false);
    setPrevPathname(pathname);
  }

  const { execute: logout, isPending: isLoggingOut } = useAction(logoutAction, {
    onSuccess: () => router.push("/login"),
    onError: () => router.push("/login"),
  });

  const filteredNavItems = navItems.filter((item) => {
    if (item.href === "/feature-flags") {
      return isAdmin;
    }
    return true;
  });

  return (
    <nav
      className="flex flex-col w-full relative z-50"
      style={{
        borderBottom: "2px dashed rgba(255,255,255,0.15)",
        background: "rgba(0,0,0,0.15)",
      }}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 py-2 px-4 lg:px-6 h-14">
        {/* Logo */}
        <Link href="/applications" className="flex items-center gap-2 shrink-0 mr-4">
          <BookOpen size={20} style={{ color: "rgba(255,255,255,0.7)" }} />
          <span className="font-sketch chalk-text text-xl tracking-wide">NotHired</span>
        </Link>

        {/* Desktop Navigation */}
        <ChalkNavDesktop
          pathname={pathname}
          navItems={filteredNavItems}
          userName={userName}
          phase={phase}
          logout={logout}
          isLoggingOut={isLoggingOut}
        />

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex items-center justify-center p-2 rounded cursor-pointer transition-colors"
          style={{
            border: "1px dashed rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.85)",
          }}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer (underneath) */}
      <ChalkNavMobile
        pathname={pathname}
        navItems={filteredNavItems}
        userName={userName}
        phase={phase}
        logout={logout}
        isLoggingOut={isLoggingOut}
        isOpen={isOpen}
      />
    </nav>
  );
}
