"use client";

import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/22 py-[22px] px-7 flex items-center justify-between flex-wrap gap-3">
      <div className="font-sketch text-[18px] text-white/90">
        NotHired{" "}
        <span
          className="text-[12px] text-white/50 font-normal"
          style={{ fontFamily: "var(--font-body)" }}
        >
          © {new Date().getFullYear()}
        </span>
      </div>

      <ul className="flex gap-[22px] list-none p-0 m-0">
        {[
          { label: "How it works", href: "#how" },
          { label: "Features", href: "#features" },
          { label: "Insights", href: "#honesty" },
          { label: "Sign in", href: "/applications" },
        ].map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[13px] text-white/50 hover:text-white/90 transition-colors no-underline"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="text-[12px] text-white/50" style={{ fontFamily: "var(--font-body)" }}>
        Made with ☕ by a job seeker
      </div>
    </footer>
  );
}
