import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getApplicationById } from "@/services/application/application.service";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  DollarSign,
  Building2,
  Users,
  StickyNote,
  Activity,
} from "lucide-react";
import { formatRelativeDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const app = await getApplicationById(user.id, id);

  if (!app) {
    redirect("/applications");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/applications"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Board
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-sketch text-white tracking-wide">
              {app.companyName}
            </h1>
            <p className="text-lg text-white/70 mt-1">{app.roleTitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm uppercase tracking-wider font-semibold">
              {app.status}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Details Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-sketch text-white mb-6 border-b border-white/10 pb-4">
              Job Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-xs text-white/40 uppercase tracking-wider">Source</span>
                <div className="flex items-center gap-2 text-white/80">
                  <Building2 size={16} className="text-white/40" />
                  <span className="capitalize">{app.source.replace("_", " ")}</span>
                </div>
              </div>

              {app.appliedDate && (
                <div className="space-y-1">
                  <span className="text-xs text-white/40 uppercase tracking-wider">Applied On</span>
                  <div className="flex items-center gap-2 text-white/80">
                    <Calendar size={16} className="text-white/40" />
                    <span>
                      {new Date(app.appliedDate).toLocaleDateString()} (
                      {formatRelativeDate(app.appliedDate)})
                    </span>
                  </div>
                </div>
              )}

              {app.salaryRange && (
                <div className="space-y-1">
                  <span className="text-xs text-white/40 uppercase tracking-wider">
                    Salary Range
                  </span>
                  <div className="flex items-center gap-2 text-white/80">
                    <DollarSign size={16} className="text-white/40" />
                    <span>{app.salaryRange}</span>
                  </div>
                </div>
              )}

              {app.jobUrl && (
                <div className="space-y-1">
                  <span className="text-xs text-white/40 uppercase tracking-wider">
                    Job Listing
                  </span>
                  <div className="flex items-center gap-2 text-white/80">
                    <ExternalLink size={16} className="text-white/40" />
                    <a
                      href={app.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-400"
                    >
                      View Posting
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-sketch text-white mb-4 border-b border-white/10 pb-4 flex items-center gap-2">
              <StickyNote size={20} className="text-white/50" />
              My Notes
            </h2>
            {app.notes ? (
              <div className="whitespace-pre-wrap text-white/80 leading-relaxed font-body">
                {app.notes}
              </div>
            ) : (
              <p className="text-white/40 italic">No notes added for this application yet.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Contacts */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-sketch text-white mb-4 border-b border-white/10 pb-4 flex items-center gap-2">
              <Users size={20} className="text-white/50" />
              Contacts ({app.contacts.length})
            </h2>
            {app.contacts.length > 0 ? (
              <ul className="space-y-4">
                {app.contacts.map((contact) => (
                  <li key={contact.id} className="bg-black/20 p-4 rounded-lg border border-white/5">
                    <div className="font-semibold text-white/90">{contact.name}</div>
                    {contact.role && (
                      <div className="text-sm text-white/60 mt-1">{contact.role}</div>
                    )}
                    {(contact.email || contact.mobile) && (
                      <div className="mt-3 text-sm text-white/50 space-y-1">
                        {contact.email && <div>{contact.email}</div>}
                        {contact.mobile && <div>{contact.mobile}</div>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/40 italic">No contacts added.</p>
            )}
          </div>

          {/* Timeline Placeholder */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-sketch text-white mb-4 border-b border-white/10 pb-4 flex items-center gap-2">
              <Activity size={20} className="text-white/50" />
              Status Change Log
            </h2>
            <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-white/20 before:to-transparent">
              {/* Fake timeline item */}
              <div className="relative flex items-center gap-4">
                <div className="absolute left-0 ml-[-25px] h-3 w-3 rounded-full border-2 border-white bg-black"></div>
                <div>
                  <p className="text-sm text-white/80">
                    Application moved to{" "}
                    <span className="font-semibold text-white">{app.status}</span>
                  </p>
                  <p className="text-xs text-white/40 mt-1">{formatRelativeDate(app.updatedAt)}</p>
                </div>
              </div>

              <div className="relative flex items-center gap-4">
                <div className="absolute left-0 ml-[-25px] h-3 w-3 rounded-full border-2 border-white/30 bg-black"></div>
                <div>
                  <p className="text-sm text-white/50">Application created</p>
                  <p className="text-xs text-white/40 mt-1">{formatRelativeDate(app.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-blue-200/70 text-center">
                This is a placeholder for the future status change log tracking feature.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
