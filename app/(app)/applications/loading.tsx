import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationsLoading() {
  // Mimic 5 columns (e.g., Wishlist, Applied, Interview, Offer, Rejected)
  const columns = Array.from({ length: 5 });

  return (
    <div
      className="overflow-auto px-4 py-6 md:px-7 md:py-7 md:pb-10"
      style={{
        minHeight: "calc(100vh - 52px)",
      }}
    >
      <div
        style={{ maxWidth: 1660, margin: "0 auto", height: "100%" }}
        className="flex flex-col h-full"
      >
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
          <div>
            <Skeleton className="h-10 md:h-14 w-48 md:w-64 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          {/* Button skeleton */}
          <Skeleton
            className="h-10 md:h-12 w-12 sm:w-40 border-[3px] border-dashed border-white/20 bg-white/5"
            style={{ borderRadius: "4px 8px 3px 6px", animation: "none" }}
          />
        </div>

        {/* Kanban columns Skeleton */}
        <div className="flex-1 overflow-x-auto scrollbar-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-row gap-5 h-full xl:min-w-max">
            {columns.map((_, i) => (
              <div
                key={i}
                className="w-full xl:w-[320px] shrink-0 flex flex-col gap-3 rounded-md p-3"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "2px dashed rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-6 w-24 bg-white/10" />
                  <Skeleton className="h-5 w-8 rounded-full bg-white/10" />
                </div>

                {/* Dummy Cards */}
                <Skeleton className="h-32 w-full border border-dashed border-white/10" />
                <Skeleton className="h-28 w-full border border-dashed border-white/10 opacity-70" />
                {i % 2 === 0 && (
                  <Skeleton className="h-36 w-full border border-dashed border-white/10 opacity-40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
