import { Users } from "lucide-react";
import { Contact } from "@prisma/client";

type Props = {
  contacts: Contact[];
};

import { ContactItem } from "./ContactItem";

export function ContactsCard({ contacts }: Props) {
  return (
    <div className="chalk-card p-6">
      <h2 className="text-base font-sketch text-white mb-4 border-b border-white/10 pb-3 flex items-center gap-2">
        <Users size={16} className="text-white/40" />
        Contacts <span className="text-white/30 text-sm font-body">({contacts.length})</span>
      </h2>
      {contacts.length > 0 ? (
        <ul className="space-y-3">
          {contacts.map((c) => (
            <ContactItem key={c.id} contact={c} />
          ))}
        </ul>
      ) : (
        <p className="text-white/30 italic text-sm">No contacts added.</p>
      )}
    </div>
  );
}
