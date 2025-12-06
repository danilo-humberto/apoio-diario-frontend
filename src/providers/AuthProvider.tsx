import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  clearTokens,
  getStoredTokens,
  loginRequest,
  registerRequest,
  storeTokens,
} from "../api/authApi";
import api from "../api/axios";
import { registerSignOut } from "../utils/authManager";

type User = {
  id?: string;
  email?: string;
  password?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (payload: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  isSignedIn: boolean;
};

type JwtPayload = {
  sub?: string | number;
  id?: string;
  email?: string;
};

const extractUserIdFromJwt = (token: string): string | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    const id = decoded.id;

    return id || null;
  } catch (e) {
    console.warn("Failed to extract user id from JWT token", e);
    return null;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const tokens = await getStoredTokens();
        if (tokens?.accessToken) {
          api.defaults.headers.common["Authorization"] =
            `Bearer ${tokens.accessToken}`;

          const userId = extractUserIdFromJwt(tokens.accessToken);

          if (userId) {
            try {
              const response = await api.get(`/users/${userId}`);
              setUser(response.data || null);
            } catch {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    registerSignOut(async () => {
      await clearTokens();
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      const data = await loginRequest(email, password);

      const token = data.token;
      if (!token) throw new Error("Token not found");

      await storeTokens({ accessToken: token });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userId = extractUserIdFromJwt(token);

      if (userId) {
        try {
          const response = await api.get(`/users/${userId}`);
          setUser(response.data || null);
        } catch {
          console.warn("Failed to fetch user data");
          setUser(null);
        }
      } else {
        console.warn("Failed to extract user id from JWT token");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (payload: { email: string; password: string }) => {
    setLoading(true);

    try {
      await registerRequest(payload);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);

    try {
      await clearTokens();
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, isSignedIn: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within a AuthProvider");
  return ctx;
};
