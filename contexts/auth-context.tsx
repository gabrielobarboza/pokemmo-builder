"use client";

import { createContext, useContext } from "react";

export type AuthClaims = Record<string, unknown>;

type AuthContextType = {
  claims: AuthClaims;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  claims,
  children,
}: {
  claims: AuthClaims;
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider value={{ claims }}>{children}</AuthContext.Provider>
  );
}

/**
 * Hook para acessar os dados de autenticação do usuário.
 * Deve ser usado dentro de páginas/componentes protegidos pelo AuthProvider.
 *
 * @example
 * const { claims } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
