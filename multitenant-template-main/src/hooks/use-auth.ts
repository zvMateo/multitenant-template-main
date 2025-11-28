import { useState } from "react";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    userId: null,
  });

  // Simulación de login/logout, para conectar luego con la API
  const login = (token: string, userId: string) => {
    setAuth({ isAuthenticated: true, token, userId });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, token: null, userId: null });
  };

  return { ...auth, login, logout };
};
