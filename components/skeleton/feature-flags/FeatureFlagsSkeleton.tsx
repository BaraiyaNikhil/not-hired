export default function FeatureFlagsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="chalk-skeleton h-10 w-56 rounded" />
          <div className="chalk-skeleton h-4 w-64 rounded" />
        </div>
        <div className="chalk-skeleton h-9 w-28 rounded" />
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="chalk-card p-4 space-y-2">
            <div className="chalk-skeleton h-3 w-20 rounded" />
            <div className="chalk-skeleton h-8 w-12 rounded" />
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="chalk-card">
        {/* Table header */}
        <div
          className="flex items-center gap-2 px-5 py-4"
          style={{ borderBottom: "1px dashed rgba(255,255,255,0.1)" }}
        >
          <div className="chalk-skeleton h-4 w-4 rounded" />
          <div className="chalk-skeleton h-3 w-24 rounded" />
          <div className="chalk-skeleton h-5 w-14 rounded ml-auto" />
        </div>

        {/* Column labels */}
        <div
          className="grid grid-cols-[2fr_3fr_120px_60px] px-5 py-2"
          style={{ borderBottom: "1px dashed rgba(255,255,255,0.06)" }}
        >
          {[20, 28, 16, 8].map((w, i) => (
            <div key={i} className={`chalk-skeleton h-2.5 w-${w} rounded`} />
          ))}
        </div>

        {/* Rows */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_3fr_120px_60px] items-center px-5 py-4"
            style={{ borderBottom: "1px dashed rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2">
              <div className="chalk-skeleton w-1.5 h-1.5 rounded-full shrink-0" />
              <div className="chalk-skeleton h-4 w-32 rounded" />
            </div>
            <div className="chalk-skeleton h-3 w-48 rounded" />
            <div className="flex justify-center">
              <div className="chalk-skeleton h-5 w-10 rounded-full" />
            </div>
            <div className="flex justify-center">
              <div className="chalk-skeleton h-5 w-5 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
