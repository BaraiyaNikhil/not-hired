import { Mail, Phone } from "lucide-react";
import { Contact } from "@prisma/client";

export function ContactItem({ contact }: { contact: Contact }) {
  return (
    <li className="bg-black/20 p-4 rounded-lg border border-white/5">
      <div className=" text-white/85 text-sm">{contact.name}</div>
      {contact.role && <div className="text-xs text-white/50 mt-0.5">{contact.role}</div>}
      {(contact.email || contact.mobile) && (
        <div className="mt-2 space-y-1">
          {contact.email && (
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Mail size={11} />
              {contact.email}
            </div>
          )}
          {contact.mobile && (
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Phone size={11} />
              {contact.mobile}
            </div>
          )}
        </div>
      )}
    </li>
  );
}
