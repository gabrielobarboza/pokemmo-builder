import { requireAuth } from "@/lib/supabase/auth";
import { UserMenuDropdown } from "@/components/user-menu-dropdown";

export const UserMenu = async () => {
  const { claims } = await requireAuth();
  const email = typeof claims.email === "string" ? claims.email : "";

  return <UserMenuDropdown email={email} />;
};
