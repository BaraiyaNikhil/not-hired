export function ApplicationDetailSkeleton() {
  return (
    <div className="flex h-full w-full animate-pulse">
      {/* Sidebar skeleton — hidden on mobile */}
      <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 border-r border-white/10 h-full p-4 gap-3">
        {/* Search bar */}
        <div className="chalk-skeleton h-10 rounded-lg w-full" />
        {/* List items */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="chalk-skeleton h-[60px] rounded-lg w-full"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </aside>

      {/* Main content skeleton */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
        {/* Back link */}
        <div className="chalk-skeleton h-5 w-32 rounded" />

        {/* Header */}
        <div className="space-y-3">
          <div className="chalk-skeleton h-10 w-3/4 rounded-lg" />
          <div className="chalk-skeleton h-5 w-1/2 rounded" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="chalk-skeleton h-44 rounded-xl" />
            <div className="chalk-skeleton h-36 rounded-xl" />
          </div>
          <div className="space-y-5">
            <div className="chalk-skeleton h-52 rounded-xl" />
            <div className="chalk-skeleton h-40 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
