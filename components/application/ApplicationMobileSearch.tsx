"use client";

import { useState, useTransition, useEffect, useCallback, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { searchApplicationsAction } from "@/actions/application.actions";
import { ApplicationSummary } from "@/types/application";
import { ApplicationRow } from "./ApplicationRow";

type Props = {
  currentId: string;
  initialApplications: ApplicationSummary[];
};

export function ApplicationMobileSearch({ currentId, initialApplications }: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<ApplicationSummary[]>(initialApplications.slice(0, 5));
  const [isPending, startTransition] = useTransition();
  const debouncedQuery = useDebounce(query, 350);
  const containerRef = useRef<HTMLDivElement>(null);

  const runSearch = useCallback((q: string) => {
    startTransition(async () => {
      const res = await searchApplicationsAction({ query: q });
      if (res?.data) {
        setResults((res.data as ApplicationSummary[]).slice(0, 5));
      }
    });
  }, []);

  useEffect(() => {
    if (debouncedQuery !== "") {
      runSearch(debouncedQuery);
    } else {
      startTransition(() => {
        setResults(initialApplications.slice(0, 5));
      });
    }
  }, [debouncedQuery, runSearch, initialApplications]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative w-full z-50"
      ref={containerRef}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
        />
        <Input
          id="application-mobile-search"
          type="search"
          placeholder="Search applications…"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          className="chalk-input font-sketch text-lg pl-9 pr-8 h-10 w-full"
        />
        {isPending && (
          <Loader2
            size={13}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 animate-spin"
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 chalk-card shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
            {isPending && results.length === 0 ? (
              <div className="flex justify-center p-4">
                <Loader2 size={16} className="text-white/40 animate-spin" />
              </div>
            ) : results.length === 0 ? (
              <p className="text-xs text-white/30 text-center py-4">No applications found.</p>
            ) : (
              results.map((app) => (
                <div key={app.id} onClick={() => setIsOpen(false)}>
                  <ApplicationRow app={app} currentId={currentId} />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
