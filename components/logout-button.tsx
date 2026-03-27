"use client";

import { signOut } from "@/lib/supabase/auth-client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return <Button onClick={signOut}>Logout</Button>;
}
