import { ApplicationDetailSkeleton } from "@/components/skeleton/application/detail/ApplicationDetailSkeleton";

export default function ApplicationDetailLoading() {
  return (
    <div className="flex h-full overflow-hidden">
      <aside
        className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 border-r border-white/10 overflow-hidden"
        aria-label="All applications"
      >
        <div className="px-4 py-3 border-b border-white/10 shrink-0">
          <p className="text-lg text-white/80 uppercase tracking-widest">Applications</p>
        </div>
        <div className="flex-1 overflow-hidden pt-3">
          <div className="space-y-2 px-3 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="chalk-skeleton h-[52px] rounded-lg" />
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <ApplicationDetailSkeleton />
      </main>
    </div>
  );
}
