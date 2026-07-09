"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LayoutGrid, Bell, Menu, X, Flag } from "lucide-react";
import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { logoutAction } from "@/actions/auth.actions";
import { ChalkNavDesktopLinks } from "./ChalkNavDesktopLinks";
import { ChalkNavDesktopUser } from "./ChalkNavDesktopUser";
import { ChalkNavMobile } from "./ChalkNavMobile";

const navItems = [
  { href: "/applications", label: "Board", icon: LayoutGrid },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/reminders", label: "Reminders", icon: Bell },
  { href: "/feature-flags", label: "Feature flags", icon: Flag },
];

type WelcomePhase = "welcome" | "user";

export function ChalkNav({
  notificationBell,
  initialUserName = null,
  initialIsAdmin = false,
}: {
  notificationBell?: React.ReactNode;
  initialUserName?: string | null;
  initialIsAdmin?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const userName = initialUserName ?? null;
  const isAdmin = initialIsAdmin ?? false;
  const [phase, setPhase] = useState<WelcomePhase>("welcome");
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

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
      <div className="flex items-center justify-between gap-2 py-2 px-4 lg:px-6 h-14 w-full">
        {/* Logo */}
        <Link href="/applications" className="flex items-center gap-2 shrink-0 mr-4">
          <Image src="/Logo.png" alt="NotHired Logo" width={40} height={40} className="rounded" />
          <span className="font-sketch chalk-text text-xl tracking-wide">NotHired</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-2 flex-1">
          <ChalkNavDesktopLinks pathname={pathname} navItems={filteredNavItems} />
        </div>

        {/* Right side container */}
        <div className="flex items-center gap-3 shrink-0">
          {notificationBell}

          <ChalkNavDesktopUser
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
