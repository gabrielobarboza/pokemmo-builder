import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Verifica se o usuário está autenticado.
 * Redireciona para /auth/login caso não esteja.
 *
 * Use em Server Components e Server Actions que exigem autenticação.
 *
 * @example
 * const { claims } = await requireAuth();
 */
export async function requireAuth() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return { supabase, claims: data.claims };
}
