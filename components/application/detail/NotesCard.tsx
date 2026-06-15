import { StickyNote } from "lucide-react";

type Props = {
  notes?: string | null;
};

export function NotesCard({ notes }: Props) {
  return (
    <div className="chalk-card p-6 h-full">
      <h2 className="text-base font-sketch text-white mb-4 border-b border-white/10 pb-3 flex items-center gap-2">
        <StickyNote size={16} className="text-white/40" />
        My Notes
      </h2>
      {notes ? (
        <p className="whitespace-pre-wrap text-white/70 leading-relaxed text-sm font-body">
          {notes}
        </p>
      ) : (
        <p className="text-white/30 italic text-sm">No notes added yet.</p>
      )}
    </div>
  );
}
