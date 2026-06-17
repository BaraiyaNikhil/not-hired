export function DashboardSkeleton() {
  return (
    <div
      className="px-4 md:px-6 lg:px-8 py-6 space-y-5 animate-pulse overflow-hidden"
      style={{ maxHeight: "calc(100vh - 56px)" }}
    >
      {/* Page title */}
      <div className="animate-fade-in-up">
        <h1 className="font-sketch chalk-text text-4xl md:text-5xl tracking-wide">Dashboard</h1>
        <p className="text-sm font-body mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          your job hunt, brutally honest.
        </p>
      </div>

      {/* ① Header Strip — 4 key numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="chalk-card p-5 space-y-3"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="chalk-skeleton h-3 w-24 rounded" />
            <div className="chalk-skeleton h-8 w-16 rounded" />
            <div className="chalk-skeleton h-2 w-20 rounded" />
          </div>
        ))}
      </div>

      {/* Top row: Funnel, Stale, Reminders (Equal space) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Funnel */}
        <div className="chalk-card p-5 space-y-4 h-[300px]">
          <div className="chalk-skeleton h-6 w-32 rounded" />
          <div className="space-y-3 pt-2">
            {[90, 72, 56, 42].map((w, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="chalk-skeleton h-10 rounded" style={{ width: `${w}%` }} />
                <div className="chalk-skeleton h-3 w-12 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Stale Applications */}
        <div className="chalk-card p-5 space-y-4 h-[300px]">
          <div className="flex justify-between items-center">
            <div className="chalk-skeleton h-6 w-40 rounded" />
            <div className="chalk-skeleton h-5 w-16 rounded" />
          </div>
          <div className="space-y-4 pt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="chalk-skeleton h-5 w-5 rounded shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="chalk-skeleton h-4 w-full rounded" />
                  <div className="chalk-skeleton h-3 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="chalk-card p-5 space-y-4 h-[300px]">
          <div className="chalk-skeleton h-6 w-48 rounded" />
          <div className="space-y-4 pt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="chalk-skeleton h-5 w-5 rounded shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="chalk-skeleton h-4 w-full rounded" />
                  <div className="chalk-skeleton h-3 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second row: Source (60%) + Recent (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Source Breakdown */}
        <div className="lg:col-span-3 chalk-card p-5 space-y-4 h-[350px]">
          <div className="chalk-skeleton h-6 w-48 rounded" />
          <div className="space-y-3 pt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="chalk-skeleton h-4 w-24 rounded" />
                <div className="chalk-skeleton h-4 w-12 rounded ml-auto" />
                <div className="chalk-skeleton h-4 w-12 rounded" />
                <div className="chalk-skeleton h-4 w-16 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 chalk-card p-5 space-y-4 h-[350px]">
          <div className="chalk-skeleton h-6 w-36 rounded" />
          <div className="space-y-4 pt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="chalk-skeleton h-5 w-5 rounded shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="chalk-skeleton h-4 w-full rounded" />
                  <div className="chalk-skeleton h-3 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third row: Heatmap (Full width) */}
      <div className="w-full chalk-card p-5 space-y-4 h-[220px]">
        <div className="flex justify-between items-center">
          <div className="chalk-skeleton h-6 w-64 rounded" />
          <div className="flex gap-4">
            <div className="chalk-skeleton h-10 w-16 rounded" />
            <div className="chalk-skeleton h-10 w-16 rounded" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-4">
          {[...Array(120)].map((_, i) => (
            <div key={i} className="chalk-skeleton w-3.5 h-3.5 rounded-sm" />
          ))}
        </div>
      </div>

      {/* Fourth row: AI Insights (1 row with 3 cards) */}
      <div className="w-full pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="chalk-card p-5 space-y-3 h-[140px]">
              <div className="flex gap-2 items-center">
                <div className="chalk-skeleton h-5 w-5 rounded-full" />
                <div className="chalk-skeleton h-4 w-24 rounded" />
              </div>
              <div className="chalk-skeleton h-12 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
