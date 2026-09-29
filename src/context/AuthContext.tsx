'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { getSavedUser, saveUserSession } from '../lib/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  registerWithEmail: (name: string, email: string, pass: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  setIsAdminMode: (admin: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  useEffect(() => {
    const saved = getSavedUser();
    if (saved) {
      setUser(saved);
      if (saved.isAdmin) setIsAdminMode(true);
    }
    setIsLoading(false);
  }, []);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    // Simulates instant Google OAuth popup & returns authenticated profile
    await new Promise((resolve) => setTimeout(resolve, 800));
    const googleUser: User = {
      id: `google-${Date.now()}`,
      name: 'Clienta Google VIP',
      email: 'clienta.google@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      provider: 'google',
      isAdmin: false
    };
    setUser(googleUser);
    saveUserSession(googleUser);
    setIsLoading(false);
  };

  const loginWithEmail = async (email: string, _pass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const isStudioAdmin = email.toLowerCase().includes('admin') || email.toLowerCase().includes('citas@');
    const loggedUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=F7CAD0&color=881337`,
      provider: 'email',
      isAdmin: isStudioAdmin
    };

    setUser(loggedUser);
    saveUserSession(loggedUser);
    if (isStudioAdmin) setIsAdminMode(true);
    setIsLoading(false);
    return true;
  };

  const registerWithEmail = async (
    name: string,
    email: string,
    _pass: string,
    phone?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name,
      email: email,
      phone: phone || '',
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=D4A373&color=ffffff`,
      provider: 'email',
      isAdmin: false
    };

    setUser(newUser);
    saveUserSession(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAdminMode(false);
    saveUserSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        isAdmin: isAdminMode || (user?.isAdmin ?? false),
        setIsAdminMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
