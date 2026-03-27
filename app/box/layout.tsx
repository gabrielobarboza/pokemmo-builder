import { EnvVarWarning } from "@/components/env-var-warning";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";
import { requireAuth } from "@/lib/supabase/auth";
import { AuthProvider } from "@/contexts/auth-context";
import { UserMenu } from "@/components/user-menu";
import PageLayout from "@/components/ui/page-layout";

async function AuthGate({ children }: { children: React.ReactNode }) {
  const { claims } = await requireAuth();
  return <AuthProvider claims={claims}>{children}</AuthProvider>;
}

export default function BoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLayout>      
      <main className="min-h-screen flex flex-col items-start fixed top-0 left-0 w-full">
        <div className="flex-1 w-full flex flex-row items-start overflow-hidden">
          <div className="w-9/12 flex flex-col min-h-[calc(100vh-49px)]">
            <nav className="w-full flex justify-start h-14 bg-black/[0.5]">
              <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <Suspense>
                    <UserMenu />
                  </Suspense>
                </div>
                <ThemeSwitcher />
              </div>
            </nav>
            {!hasEnvVars && (
              <EnvVarWarning />
            )}
            <div className="w-full flex-1 flex flex-col p-5">
              <Suspense>
                <AuthGate>{children}</AuthGate>
              </Suspense>
            </div>
          </div>
          <div className="w-3/12 flex flex-col bg-black/[0.25] min-h-[calc(100vh-48px)] ">
            <nav className="w-full flex justify-start h-14 bg-black/[0.5]">
              <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
              
              </div>
            </nav>
            <div className="w-full flex-1 flex flex-col relative">
              <div className="w-full h-12"></div>
              <div className="w-full h-10 bg-black/[0.25]"></div>
              <div className="w-full h-64"></div>
              <div className="w-full h-10 bg-black/[0.25]"></div>
              <div className="w-full h-12"></div>
              <div className="w-full h-64 bg-black/[0.25]"></div>
            </div>
          </div>
        </div>
        <footer className="bg-black/[0.5] w-full flex items-center justify-center mx-auto text-center text-xs gap-8 py-6 h-10">
          <p>
           
          </p>
        </footer>
      </main>
    </PageLayout>      
  );
}
