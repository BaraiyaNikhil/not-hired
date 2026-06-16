"use client";

import { Pencil } from "lucide-react";
import { useApplicationStore, AppWithContacts } from "@/store/applicationStore";
import { ChalkButton } from "@/components/shared/ChalkButton";

export function EditApplicationButton({ application }: { application: AppWithContacts }) {
  const setEditingApp = useApplicationStore((state) => state.setEditingApp);

  return (
    <ChalkButton
      onClick={() => setEditingApp(application)}
      className="font-sniglet gap-1.5 px-3 py-1 text-sm hover:text-white"
    >
      <Pencil size={12} />
      Edit
    </ChalkButton>
  );
}
