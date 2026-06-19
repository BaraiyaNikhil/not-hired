import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getApplicationById, searchApplications } from "@/services/application.service";
import { ApplicationListSidebar } from "@/components/application/ApplicationListSidebar";
import { ApplicationMobileSearch } from "@/components/application/ApplicationMobileSearch";
import { DetailHeader } from "@/components/application/detail/DetailHeader";
import { JobDetailsCard } from "@/components/application/detail/JobDetailsCard";
import { NotesCard } from "@/components/application/detail/NotesCard";
import { ContactsCard } from "@/components/application/detail/ContactsCard";
import { StatusTimeline } from "@/components/application/detail/StatusTimeline";
import { ApplicationDetailSkeleton } from "@/components/skeleton/application/detail/ApplicationDetailSkeleton";
import { StatusLogEntry, ApplicationSummary } from "@/types/application";
import { KanbanDialogs } from "@/components/application/KanbanDialogs";
import { AppWithContacts } from "@/store/applicationStore";

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

  const [app, allApps] = await Promise.all([
    getApplicationById(user.id, id),
    searchApplications(user.id, { query: "" }),
  ]);

  if (!app) {
    redirect("/applications");
  }

  const statusLogs = app.statusLogs as StatusLogEntry[];
  const sidebarApps = allApps as ApplicationSummary[];
  const applicationForStore = app as AppWithContacts;

  return (
    <>
      <div className="flex h-full overflow-hidden">
        <aside
          className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 border-r border-white/10 overflow-hidden"
          aria-label="All applications"
        >
          {/* Sidebar header */}
          <div className="px-4 py-3 border-b border-white/10 shrink-0">
            <p className="text-lg text-white/80 uppercase tracking-widest">Applications</p>
          </div>
          <div className="flex-1 overflow-hidden pt-3">
            <Suspense
              fallback={
                <div className="space-y-2 px-3 animate-pulse">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="chalk-skeleton h-[52px] rounded-lg" />
                  ))}
                </div>
              }
            >
              <ApplicationListSidebar currentId={id} initialApplications={sidebarApps} />
            </Suspense>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<ApplicationDetailSkeleton />}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-7 animate-fade-in-up">
              {/* Mobile-only search bar */}
              <div className="lg:hidden mb-5 bg-white/5 border border-white/10 rounded-xl relative z-50">
                <div className="px-3 py-3">
                  <p className="text-xs text-white/80 uppercase tracking-widest mb-2">
                    Jump to another application
                  </p>
                  <ApplicationMobileSearch currentId={id} initialApplications={sidebarApps} />
                </div>
              </div>

              {/* Header */}
              <DetailHeader application={applicationForStore} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 space-y-5">
                  <div className="animate-fade-in-up animation-delay-100">
                    <JobDetailsCard
                      source={app.source}
                      appliedDate={app.appliedDate}
                      salaryRange={app.salaryRange}
                      status={app.status}
                    />
                  </div>
                  <div className="animate-fade-in-up animation-delay-200">
                    <ContactsCard contacts={app.contacts} />
                  </div>
                  <div className="animate-fade-in-up animation-delay-200">
                    <NotesCard notes={app.notes} />
                  </div>
                </div>

                {/* ── Sidebar column (1/3) */}
                <div className="animate-fade-in-up animation-delay-100">
                  <StatusTimeline logs={statusLogs} createdAt={app.createdAt} />
                </div>
              </div>
            </div>
          </Suspense>
        </main>
      </div>
      <KanbanDialogs />
    </>
  );
}
