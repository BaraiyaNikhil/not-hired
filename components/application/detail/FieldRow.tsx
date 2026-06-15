export function FieldRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <span className="text-[12px] text-white/50 uppercase tracking-widest">{label}</span>
      <div className="flex items-center gap-2 text-white/75 text-sm">
        {icon}
        {children}
      </div>
    </div>
  );
}
