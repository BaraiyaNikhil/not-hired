import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full min-h-screen flex-1 flex items-center justify-center relative font-sans overflow-hidden text-foreground dark:bg-background">
      <div className="h-[90vh] relative z-10 w-[90vw] max-w-5xl lg:min-h-[700px] board-bg overflow-hidden rounded-xl m-2">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
