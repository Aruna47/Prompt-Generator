"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { UserProfile } from "@/lib/types";

interface AuthContextType {
  user: UserProfile | null;
  isLoaded: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('promptforge_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser({
          ...parsed,
          createdAt: new Date(parsed.createdAt)
        });
      }
    } catch (e) {
      console.error('Failed to parse user:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const mockUser: UserProfile = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      plan: 'free',
      createdAt: new Date(),
    };
    setUser(mockUser);
    localStorage.setItem('promptforge_user', JSON.stringify(mockUser));
  };

  const signUp = async (email: string, password: string, name: string) => {
    const mockUser: UserProfile = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      plan: 'free',
      createdAt: new Date(),
    };
    setUser(mockUser);
    localStorage.setItem('promptforge_user', JSON.stringify(mockUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('promptforge_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoaded, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
