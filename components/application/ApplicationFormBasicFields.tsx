import { useFormContext } from "react-hook-form";
import { CreateApplicationInput } from "@/types/application";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selectTriggerStyle = {
  background: "transparent",
  border: "0",
  borderBottom: "3px dashed rgba(255,255,255,0.7)",
  borderRadius: 0,
  color: "white",
  paddingLeft: 8,
};

export function ApplicationFormBasicFields() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<CreateApplicationInput>();

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="space-y-1.5">
        <Label className="chalk-text font-sketch text-base">Company Name *</Label>
        <Input {...register("companyName")} className="chalk-input" placeholder="e.g. Google" />
        {errors.companyName && (
          <p className="text-sm" style={{ color: "#f87171" }}>
            {errors.companyName.message as string}
          </p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label className="chalk-text font-sketch text-base">Role Title *</Label>
        <Input
          {...register("roleTitle")}
          className="chalk-input"
          placeholder="e.g. Senior Engineer"
        />
        {errors.roleTitle && (
          <p className="text-sm" style={{ color: "#f87171" }}>
            {errors.roleTitle.message as string}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="chalk-text font-sketch text-base">Status</Label>
        <Select
          defaultValue={getValues("status")}
          onValueChange={(val) =>
            setValue(
              "status",
              val as "applied" | "screening" | "interview" | "offer" | "rejected" | "ghosted"
            )
          }
        >
          <SelectTrigger style={selectTriggerStyle}>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent
            style={{ background: "#2a3439", border: "2px dashed rgba(255,255,255,0.4)" }}
          >
            {["applied", "screening", "interview", "offer", "rejected", "ghosted"].map((s) => (
              <SelectItem key={s} value={s} className="chalk-text capitalize">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="chalk-text font-sketch text-base">Source</Label>
        <Select
          defaultValue={getValues("source")}
          onValueChange={(val) =>
            setValue(
              "source",
              val as "linkedin" | "referral" | "cold_email" | "job_portal" | "other"
            )
          }
        >
          <SelectTrigger style={selectTriggerStyle}>
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent
            style={{ background: "#2a3439", border: "2px dashed rgba(255,255,255,0.4)" }}
          >
            <SelectItem value="linkedin" className="chalk-text">
              LinkedIn
            </SelectItem>
            <SelectItem value="referral" className="chalk-text">
              Referral
            </SelectItem>
            <SelectItem value="cold_email" className="chalk-text">
              Cold Email
            </SelectItem>
            <SelectItem value="job_portal" className="chalk-text">
              Job Portal
            </SelectItem>
            <SelectItem value="other" className="chalk-text">
              Other
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="chalk-text font-sketch text-base">Applied Date</Label>
        <Input type="date" {...register("appliedDate")} className="chalk-input" />
      </div>
      <div className="space-y-1.5">
        <Label className="chalk-text font-sketch text-base">Salary Range</Label>
        <Input
          placeholder="e.g. $100k–$120k"
          {...register("salaryRange")}
          className="chalk-input"
        />
      </div>

      <div className="space-y-1.5 col-span-2">
        <Label className="chalk-text font-sketch text-base">Job URL</Label>
        <Input
          type="url"
          placeholder="https://..."
          {...register("jobUrl")}
          className="chalk-input"
        />
        {errors.jobUrl && (
          <p className="text-sm" style={{ color: "#f87171" }}>
            {errors.jobUrl.message as string}
          </p>
        )}
      </div>

      <div className="space-y-1.5 col-span-2">
        <Label className="chalk-text font-sketch text-base">Notes</Label>
        <Textarea
          {...register("notes")}
          className="chalk-input resize-none"
          rows={3}
          placeholder="Any notes..."
        />
      </div>
    </div>
  );
}
