'use client';

import React, { useState } from 'react';
import { Sparkles, Calendar, User as UserIcon, LogOut, Menu, X, Shield, Clock, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenAppointments: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenAppointments,
  onOpenAdmin,
}) => {
  const { user, logout, isAdmin } = useAuth();
  const { config, appointments, openBookingModal } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const clientAppointmentsCount = appointments.filter(
    (a) => a.clientEmail === user?.email || (user?.phone && a.clientPhone === user?.phone)
  ).length;

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-400 via-rose-300 to-amber-200 p-[2px] shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-rose-500" />
              </div>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-rose-600 transition-colors">
                Anis Nails
              </span>
              <p className="text-[10px] tracking-widest uppercase text-stone-500 font-medium">
                Nail Art & Spa Studio
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#servicios"
              className="text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors"
            >
              Servicios
            </a>
            <a
              href="#tecnicas"
              className="text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors"
            >
              Técnicas
            </a>
            <a
              href="#galeria"
              className="text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors"
            >
              Galería
            </a>
            <a
              href="#resenas"
              className="text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors"
            >
              Opiniones
            </a>
            <a
              href="#contacto"
              className="text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors"
            >
              Contacto
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Admin button if admin or quick access */}
            <button
              onClick={onOpenAdmin}
              title="Panel Administrativo de la Dueña"
              className={`p-2 rounded-full border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                isAdmin
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'text-stone-500 hover:text-stone-800 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-600" />
              <span className="hidden lg:inline">{isAdmin ? 'Admin' : 'Dueña'}</span>
            </button>

            {/* Client Appointments Button */}
            <button
              onClick={onOpenAppointments}
              className="relative p-2.5 rounded-full text-stone-700 hover:text-rose-600 hover:bg-rose-50 border border-stone-200 transition-colors"
              title="Mis Citas Agendadas"
            >
              <Clock className="w-5 h-5" />
              {appointments.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {user ? clientAppointmentsCount || appointments.length : appointments.length}
                </span>
              )}
            </button>

            {/* User Session Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-rose-200 bg-rose-50/70 hover:bg-rose-100/70 transition-colors"
                >
                  <img
                    src={user.avatarUrl || 'https://ui-avatars.com/api/?name=Clienta'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-rose-300"
                  />
                  <span className="text-xs font-semibold text-stone-800 max-w-[90px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-rose-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-800 truncate">{user.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAppointments();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-stone-700 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-rose-500" />
                      Mis Citas Agendadas
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 border border-stone-200 hover:border-rose-300 rounded-full hover:bg-rose-50/50 transition-all"
              >
                <UserIcon className="w-4 h-4 text-rose-500" />
                <span>Ingresar / Registro</span>
              </button>
            )}

            {/* Primary Booking Button */}
            <button
              onClick={() => openBookingModal()}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Cita</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => openBookingModal()}
              className="p-2 bg-rose-500 text-white rounded-full text-xs font-medium shadow-sm flex items-center gap-1"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-rose-600 rounded-lg"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-rose-100 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 py-2">
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-rose-50"
            >
              Servicios
            </a>
            <a
              href="#tecnicas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-rose-50"
            >
              Técnicas
            </a>
            <a
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-rose-50"
            >
              Galería de Diseños
            </a>
            <a
              href="#resenas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-rose-50"
            >
              Opiniones y Calificaciones
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-rose-50"
            >
              Contacto y Horarios
            </a>
          </nav>

          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointments();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-stone-200 text-stone-800 text-sm font-semibold flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-500" />
                Mis Citas Agendadas
              </span>
              <span className="bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {appointments.length}
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-amber-200 bg-amber-50/50 text-amber-900 text-sm font-semibold flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-amber-600" />
              Panel de la Dueña / Admin
            </button>

            {user ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatarUrl || 'https://ui-avatars.com/api/?name=Clienta'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-800">{user.name}</p>
                    <p className="text-[10px] text-stone-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="text-xs text-red-600 font-semibold hover:underline"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 text-stone-800 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <UserIcon className="w-4 h-4 text-rose-500" />
                Ingresar / Crear Cuenta
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
