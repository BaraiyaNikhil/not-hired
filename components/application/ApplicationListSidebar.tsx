"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { searchApplicationsAction } from "@/actions/application.actions";
import { ApplicationSummary } from "@/types/application";
import { ApplicationRow } from "./ApplicationRow";
import { ApplicationListSidebarSkeleton } from "@/components/skeleton/application/ApplicationListSidebarSkeleton";

type Props = {
  currentId: string;
  initialApplications: ApplicationSummary[];
};

export function ApplicationListSidebar({ currentId, initialApplications }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ApplicationSummary[]>(initialApplications);
  const [isPending, startTransition] = useTransition();
  const debouncedQuery = useDebounce(query, 350);

  const runSearch = useCallback((q: string) => {
    startTransition(async () => {
      const res = await searchApplicationsAction({ query: q });
      if (res?.data) {
        setResults(res.data as ApplicationSummary[]);
      }
    });
  }, []);

  useEffect(() => {
    runSearch(debouncedQuery);
  }, [debouncedQuery, runSearch]);

  return (
    <aside className="flex flex-col h-full">
      {/* Search */}
      <div className="px-3 pb-3 shrink-0">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
          />
          <Input
            id="application-sidebar-search"
            type="search"
            placeholder="Search applications…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="chalk-input font-sketch text-lg pl-9 pr-8 h-10 w-full"
          />
          {isPending && (
            <Loader2
              size={13}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 animate-spin"
            />
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        {isPending && results.length === 0 ? (
          <ApplicationListSidebarSkeleton />
        ) : results.length === 0 ? (
          <p className="text-xs text-white/30 text-center py-8">No applications found.</p>
        ) : (
          results.map((app) => <ApplicationRow key={app.id} app={app} currentId={currentId} />)
        )}
      </div>
    </aside>
  );
}
