export function ReminderPageSkeleton() {
  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 space-y-8 animate-pulse">
      {/* Page header */}
      <div>
        <div className="chalk-skeleton h-10 w-52 rounded mb-2" />
        <div className="chalk-skeleton h-4 w-72 rounded" />
      </div>

      {/* TODAY section */}
      <section className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="chalk-skeleton h-5 w-16 rounded" />
          <div className="chalk-skeleton h-4 w-8 rounded-full" />
        </div>
        <div className="chalk-card p-4 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-3"
              style={{ borderBottom: "1px dashed rgba(255,255,255,0.07)" }}
            >
              <div className="chalk-skeleton h-5 w-5 rounded shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <div className="chalk-skeleton h-4 w-3/4 rounded" />
                <div className="chalk-skeleton h-3 w-1/2 rounded" />
              </div>
              <div className="chalk-skeleton h-7 w-24 rounded shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING section */}
      <section className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="chalk-skeleton h-5 w-24 rounded" />
          <div className="chalk-skeleton h-4 w-8 rounded-full" />
        </div>
        <div className="chalk-card p-4 space-y-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-3"
              style={{ borderBottom: "1px dashed rgba(255,255,255,0.07)" }}
            >
              <div className="chalk-skeleton h-5 w-5 rounded shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <div className="chalk-skeleton h-4 w-2/3 rounded" />
                <div className="chalk-skeleton h-3 w-2/5 rounded" />
              </div>
              <div className="chalk-skeleton h-6 w-16 rounded shrink-0" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
