export function ApplicationListSidebarSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="chalk-skeleton h-[52px] rounded-lg"
          style={{ animationDelay: `${i * 60}ms` }}
        />
      ))}
    </div>
  );
}
