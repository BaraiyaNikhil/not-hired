import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ChalkButton } from "@/components/shared/ChalkButton";
import { EditApplicationButton } from "./EditApplicationButton";
import { AppWithContacts } from "@/store/applicationStore";

type Props = {
  application: AppWithContacts;
};

export function DetailHeader({ application }: Props) {
  return (
    <div className="mb-7">
      <Link
        href="/applications"
        className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition-colors mb-5 group"
      >
        <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
        Back to Board
      </Link>

      <div className="flex sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl md:text-4xl font-sketch text-white tracking-wide leading-tight truncate">
            {application.companyName}
          </h1>
          <p className="text-base text-white/60 mt-1 font-body truncate">{application.roleTitle}</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 shrink-0">
          {application.jobUrl && (
            <ChalkButton
              asChild
              className="font-sniglet gap-1.5 px-3 py-1 text-sm hover:text-white"
            >
              <a href={application.jobUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={12} />
                Posting
              </a>
            </ChalkButton>
          )}
          <EditApplicationButton application={application} />
        </div>
      </div>
    </div>
  );
}
