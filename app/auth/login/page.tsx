import { LoginForm } from "@/components/login-form";
import PageLayout from "@/components/ui/page-layout";

export default function Page() {
  return (
    <PageLayout>      
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 fixed top-0 left-0">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </PageLayout>      
  );
}
