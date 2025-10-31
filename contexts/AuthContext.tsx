'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Credentials, ValidationErrors } from '@/types';
import { validateEmail, validatePassword } from '@/lib/utils';
import { STORAGE_KEYS } from '@/lib/constants';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<{ success: boolean; errors?: ValidationErrors }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (token) {
          try {
            const userData = JSON.parse(token);
            setUser(userData);
          } catch {
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          }
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (
    credentials: Credentials
  ): Promise<{ success: boolean; errors?: ValidationErrors }> => {
    const errors: ValidationErrors = {};

    // Validate email
    if (!credentials.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(credentials.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!credentials.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(credentials.password)) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // Simulate login (in a real app, this would call an API)
    // For now, we'll accept any valid credentials
    const newUser: User = {
      id: '1',
      email: credentials.email,
      name: credentials.email.split('@')[0],
    };

    setUser(newUser);

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(newUser));
    }

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
