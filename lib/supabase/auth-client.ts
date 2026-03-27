"use client";

import { createClient } from "@/lib/supabase/client";

/**
 * Realiza o logout do usuário e redireciona para a página de login.
 *
 * Use em Client Components que precisam de um botão de logout.
 *
 * @example
 * <button onClick={signOut}>Logout</button>
 */
export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  window.location.href = "/auth/login";
}
