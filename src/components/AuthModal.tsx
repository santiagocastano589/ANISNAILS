'use client';

import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User as UserIcon, Phone, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, isLoading } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    try {
      await loginWithGoogle();
      onClose();
    } catch (e) {
      setErrorMsg('No se pudo iniciar sesión con Google.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'login') {
      const ok = await loginWithEmail(email, password);
      if (ok) onClose();
      else setErrorMsg('Credenciales incorrectas.');
    } else {
      if (!name) {
        setErrorMsg('Por favor ingresa tu nombre completo.');
        return;
      }
      const ok = await registerWithEmail(name, email, password, phone);
      if (ok) onClose();
      else setErrorMsg('No se pudo crear la cuenta.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
          aria-label="Cerrar modal de autenticación"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            {mode === 'login' ? 'Bienvenida de nuevo' : 'Crea tu Cuenta VIP'}
          </h3>
          <p className="text-xs text-stone-500">
            {mode === 'login'
              ? 'Accede para ver tus citas programadas y agendar en un clic.'
              : 'Regístrate para gestionar tus citas, calificar y recibir promociones.'}
          </p>
        </div>

        {/* Error notice */}
        {errorMsg && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        {/* Google OAuth Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs sm:text-sm rounded-2xl border border-stone-300 shadow-sm flex items-center justify-center gap-3 transition-all hover:border-stone-400"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continuar con Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200" />
          </div>
          <span className="relative px-3 bg-white text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            O con tu Correo
          </span>
        </div>

        {/* Tabs switcher */}
        <div className="flex bg-stone-100 p-1 rounded-2xl mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mode === 'login' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mode === 'register' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
            }`}
          >
            Crear Cuenta
          </button>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Nombre Completo:
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Sofía Ramírez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
              Correo Electrónico:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="tuemail@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                WhatsApp / Teléfono (Opcional):
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="+57 300 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
              Contraseña:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>{isLoading ? 'Procesando...' : mode === 'login' ? 'Entrar a mi Cuenta' : 'Registrarme Gratis'}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
