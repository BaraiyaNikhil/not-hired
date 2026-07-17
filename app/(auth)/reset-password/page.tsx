import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login?error=Your+reset+link+has+expired.+Please+request+a+new+one.");
  }

  return (
    <div className="w-full min-h-screen flex-1 flex items-center justify-center relative font-sans overflow-hidden text-foreground dark:bg-background">
      <div className="h-[90vh] relative z-10 w-[90vw] max-w-5xl lg:min-h-[700px] board-bg overflow-hidden rounded-xl m-2">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
