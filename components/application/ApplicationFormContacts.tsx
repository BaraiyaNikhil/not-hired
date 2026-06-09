import { useFieldArray, useFormContext } from "react-hook-form";
import { CreateApplicationInput } from "@/types/application";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ApplicationFormContacts() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateApplicationInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  return (
    <div
      className="pt-4 space-y-4"
      style={{ borderTop: "2px dashed rgba(255,255,255,0.15)", marginTop: 8 }}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-sketch chalk-text text-lg">Contacts (Optional)</h3>
        {fields.length < 5 && (
          <Button
            type="button"
            onClick={() => append({ name: "", role: "", email: "", mobile: "", notes: "" })}
            className="chalk-button chalk-text font-sketch text-sm h-8 px-3"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px dashed rgba(255,255,255,0.6)",
            }}
          >
            + Add Contact
          </Button>
        )}
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 space-y-4 relative"
          style={{
            background: "rgba(0,0,0,0.2)",
            borderRadius: 8,
            border: "1px dashed rgba(255,255,255,0.2)",
          }}
        >
          <Button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/40 hover:text-red-200"
            style={{ border: "1px dashed rgba(248,113,113,0.5)" }}
          >
            ✕
          </Button>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="chalk-text font-sketch">Name *</Label>
              <Input
                {...register(`contacts.${index}.name` as const)}
                className="chalk-input"
                placeholder="Jane Doe"
              />
              {errors.contacts?.[index]?.name && (
                <p className="text-sm" style={{ color: "#f87171" }}>
                  {errors.contacts[index]?.name?.message as string}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="chalk-text font-sketch">Role</Label>
              <Input
                {...register(`contacts.${index}.role` as const)}
                className="chalk-input"
                placeholder="Recruiter"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="chalk-text font-sketch">Email</Label>
              <Input
                type="email"
                {...register(`contacts.${index}.email` as const)}
                className="chalk-input"
                placeholder="recruiter@company.com"
              />
              {errors.contacts?.[index]?.email && (
                <p className="text-sm" style={{ color: "#f87171" }}>
                  {errors.contacts[index]?.email?.message as string}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="chalk-text font-sketch">Phone Number</Label>
              <Input
                {...register(`contacts.${index}.mobile` as const)}
                className="chalk-input"
                placeholder="+1 234 567 8900"
              />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label className="chalk-text font-sketch">Notes</Label>
              <Input
                {...register(`contacts.${index}.notes` as const)}
                className="chalk-input"
                placeholder="Met at a conference..."
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
