import { Building2, Calendar, DollarSign, Activity } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils";
import { ApplicationSource, ApplicationStatus } from "@prisma/client";

const SOURCE_LABELS: Record<ApplicationSource, string> = {
  linkedin: "LinkedIn",
  referral: "Referral",
  cold_email: "Cold Email",
  job_portal: "Job Portal",
  other: "Other",
};

type Props = {
  source: ApplicationSource;
  status: ApplicationStatus;
  appliedDate?: Date | null;
  salaryRange?: string | null;
};

import { FieldRow } from "./FieldRow";

export function JobDetailsCard({ source, status, appliedDate, salaryRange }: Props) {
  return (
    <div className="chalk-card p-6">
      <h2 className="text-base font-sketch text-white mb-5 border-b border-white/10 pb-3">
        Job Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldRow icon={<Activity size={14} className="text-white/35 shrink-0" />} label="Status">
          <p className="capitalize">{status}</p>
        </FieldRow>

        <FieldRow icon={<Building2 size={14} className="text-white/35 shrink-0" />} label="Source">
          <p className="capitalize">{SOURCE_LABELS[source]}</p>
        </FieldRow>

        {appliedDate && (
          <FieldRow
            icon={<Calendar size={14} className="text-white/35 shrink-0" />}
            label="Applied On"
          >
            <span>
              {new Date(appliedDate).toLocaleDateString()}{" "}
              <span className="text-white/35">({formatRelativeDate(appliedDate)})</span>
            </span>
          </FieldRow>
        )}

        {salaryRange && (
          <FieldRow
            icon={<DollarSign size={14} className="text-white/35 shrink-0" />}
            label="Salary Range"
          >
            {salaryRange}
          </FieldRow>
        )}
      </div>
    </div>
  );
}
