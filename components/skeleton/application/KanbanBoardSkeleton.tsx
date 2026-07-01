import { KANBAN_COLUMNS } from "@/types/kanban";

export function KanbanBoardSkeleton() {
  return (
    <div className="flex flex-col h-full w-full animate-pulse">
      {/* Board header */}
      <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
        <div>
          <h1 className="font-sketch text-3xl md:text-5xl chalk-text tracking-wide">
            Applications
          </h1>
          <div className="mt-1 flex items-center h-[16px] md:h-[20px]">
            <div className="chalk-skeleton h-3 w-28 md:w-32 rounded" />
          </div>
        </div>

        <div className="chalk-skeleton chalk-button px-3 py-2 md:px-4 rounded-md w-[140px] md:w-[176px] h-[40px] md:h-[46px]" />
      </div>

      {/* Kanban columns */}
      <div className="flex-1 overflow-x-auto scrollbar-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-row gap-5 h-full xl:min-w-max">
          {KANBAN_COLUMNS.map((col, colIndex) => (
            <div
              key={col.id}
              className="flex flex-col shrink-0 w-full md:w-auto md:min-w-0 xl:w-[260px] xl:min-w-[260px] h-auto md:h-[42dvh] xl:h-[60dvh]"
            >
              {/* Column header */}
              <div
                className="flex items-center gap-2 px-1 mb-0 md:mb-3"
                style={{ borderBottom: "2px dashed rgba(255,255,255,0.2)", paddingBottom: 8 }}
              >
                <span className="text-lg">{col.emoji}</span>
                <span className="font-sketch chalk-text text-lg tracking-wide">{col.label}</span>
                <div className="ml-auto">
                  <div className="chalk-skeleton h-6 w-8 rounded" />
                </div>
              </div>

              {/* Drop zone skeleton */}
              <div
                className="relative flex flex-col gap-3 rounded-sm overflow-hidden flex-1 py-2 px-1 border-2 opacity-100"
                style={{
                  background: col.color,
                  borderColor: "rgba(255,255,255,0.12)",
                  borderRadius: "3px 6px 4px 5px",
                  borderStyle: "dashed",
                }}
              >
                {/* Skeleton cards */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="chalk-skeleton w-full flex flex-col gap-3 px-[14px] py-[12px]"
                    style={{
                      border: "2px dashed rgba(255,255,255,0.1)",
                      borderRadius: "2px 6px 3px 5px",
                      animationDelay: `${(colIndex * 3 + i) * 80}ms`,
                    }}
                  >
                    <div className="h-4 w-3/4 rounded bg-white/10" />
                    <div className="h-3 w-1/2 rounded bg-white/10" />
                    <div className="flex gap-2 mt-2">
                      <div className="h-5 w-16 bg-white/10 rounded-sm" />
                      <div className="h-5 w-16 bg-white/10 rounded-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
