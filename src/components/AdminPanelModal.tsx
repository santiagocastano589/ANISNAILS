'use client';

import React, { useState } from 'react';
import { X, Shield, Calendar, Check, Ban, MessageCircle, Settings, Phone, Mail, MapPin, DollarSign, Clock, UserCheck } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Appointment, StudioConfig } from '../types';
import { formatCurrency } from '../lib/whatsapp';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { appointments, updateStatus, config, updateStudioConfig } = useBooking();
  const [activeTab, setActiveTab] = useState<'citas' | 'ajustes'>('citas');
  const [statusFilter, setStatusFilter] = useState<string>('todas');
  
  // Settings form state
  const [studioName, setStudioName] = useState(config.name);
  const [phoneWhatsApp, setPhoneWhatsApp] = useState(config.phoneWhatsApp);
  const [email, setEmail] = useState(config.email);
  const [address, setAddress] = useState(config.address);
  const [workingHours, setWorkingHours] = useState(config.workingHours);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudioConfig = {
      ...config,
      name: studioName,
      phoneWhatsApp: phoneWhatsApp.replace(/\D/g, ''),
      email,
      address,
      workingHours,
    };
    updateStudioConfig(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const filteredAppointments = statusFilter === 'todas'
    ? appointments
    : appointments.filter((a) => a.status === statusFilter);

  const pendingCount = appointments.filter((a) => a.status === 'pendiente').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmada').length;
  const totalRevenue = appointments
    .filter((a) => a.status !== 'cancelada')
    .reduce((sum, a) => sum + a.totalPrice, 0);

  const openClientWhatsAppChat = (app: Appointment) => {
    const cleanPhone = app.clientPhone.replace(/\D/g, '');
    const text = `🌸 ¡Hola ${app.clientName}! Te escribo de ${config.name} respecto a tu cita para el ${app.date} a las ${app.time} (${app.serviceName}). ¡Será un gusto atenderte! ✨`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg">
                Panel de Control de la Dueña / Manicurista
              </h3>
              <p className="text-[11px] text-stone-400">
                Gestiona tus citas entrantes, clientas y tus canales de notificación (WhatsApp y Correo)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800"
            aria-label="Cerrar panel administrativo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 px-6 pt-2 bg-stone-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('citas')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'citas'
                ? 'border-rose-500 text-rose-600 font-bold bg-white rounded-t-xl'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Agenda de Citas</span>
            {pendingCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {pendingCount} pendientes
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('ajustes')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'ajustes'
                ? 'border-rose-500 text-rose-600 font-bold bg-white rounded-t-xl'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configuración del Salón (WhatsApp & Correo)</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'citas' ? (
            <div className="space-y-6">
              
              {/* Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                  <p className="text-[11px] font-bold text-amber-800 uppercase">Pendientes</p>
                  <p className="text-2xl font-bold text-amber-900 mt-1">{pendingCount}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <p className="text-[11px] font-bold text-emerald-800 uppercase">Confirmadas</p>
                  <p className="text-2xl font-bold text-emerald-900 mt-1">{confirmedCount}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-100 border border-stone-200">
                  <p className="text-[11px] font-bold text-stone-700 uppercase">Total Citas</p>
                  <p className="text-2xl font-bold text-stone-900 mt-1">{appointments.length}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
                  <p className="text-[11px] font-bold text-rose-800 uppercase">Proyección</p>
                  <p className="text-lg sm:text-xl font-bold text-rose-900 mt-1">
                    {formatCurrency(totalRevenue, config.currencySymbol)}
                  </p>
                </div>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {['todas', 'pendiente', 'confirmada', 'completada', 'cancelada'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-full capitalize font-semibold transition-all ${
                      statusFilter === st
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {st === 'todas' ? 'Todas las Citas' : st}
                  </button>
                ))}
              </div>

              {/* Appointment Cards */}
              <div className="space-y-3">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-12 text-stone-400">
                    <p className="text-sm">No hay citas en este estado.</p>
                  </div>
                ) : (
                  filteredAppointments.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-white hover:border-rose-300 shadow-sm space-y-3 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                              {app.clientName}
                            </h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              app.status === 'confirmada'
                                ? 'bg-emerald-100 text-emerald-800'
                                : app.status === 'completada'
                                ? 'bg-blue-100 text-blue-800'
                                : app.status === 'cancelada'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {app.status}
                            </span>
                          </div>
                          <p className="text-xs text-rose-600 font-semibold">{app.serviceName}</p>
                        </div>

                        <div className="text-right">
                          <p className="font-serif font-bold text-base text-stone-900">
                            {formatCurrency(app.totalPrice, config.currencySymbol)}
                          </p>
                          <p className="text-[11px] text-stone-400">
                            {app.date} a las {app.time}
                          </p>
                        </div>
                      </div>

                      {/* Contact details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl">
                        <p><strong>WhatsApp:</strong> {app.clientPhone}</p>
                        <p><strong>Email:</strong> {app.clientEmail}</p>
                        {app.additionalNotes && (
                          <p className="col-span-2 text-stone-500 italic">
                            <strong>Notas:</strong> {app.additionalNotes}
                          </p>
                        )}
                      </div>

                      {/* Admin action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
                        <button
                          onClick={() => openClientWhatsAppChat(app)}
                          className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>Escribir por WhatsApp a Clienta</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          {app.status !== 'confirmada' && (
                            <button
                              onClick={() => updateStatus(app.id, 'confirmada')}
                              className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200"
                            >
                              Confirmar
                            </button>
                          )}
                          {app.status !== 'completada' && (
                            <button
                              onClick={() => updateStatus(app.id, 'completada')}
                              className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200"
                            >
                              Completada
                            </button>
                          )}
                          {app.status !== 'cancelada' && (
                            <button
                              onClick={() => updateStatus(app.id, 'cancelada')}
                              className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg border border-red-200"
                            >
                              Cancelar
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          ) : (
            /* Ajustes Tab */
            <form onSubmit={handleSaveSettings} className="max-w-xl mx-auto space-y-4">
              <div className="text-center space-y-1 mb-6">
                <h4 className="font-serif text-xl font-bold text-stone-900">
                  Canales de Contacto y Datos del Estudio
                </h4>
                <p className="text-xs text-stone-500">
                  Configura aquí el número de WhatsApp y correo donde quieres que te lleguen las notificaciones de nuevas citas.
                </p>
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>¡Datos del salón actualizados exitosamente!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Nombre de tu Estudio / Salón:
                </label>
                <input
                  type="text"
                  required
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Tu WhatsApp (Donde recibirás las citas de las clientas):
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. 573001234567 (código de país sin signos)"
                    value={phoneWhatsApp}
                    onChange={(e) => setPhoneWhatsApp(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  Coloca el código de país (ej. 57 para Colombia, 52 para México) seguido de tu número celular.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Correo Electrónico de Notificaciones:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-rose-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Dirección / Ubicación:
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Horario de Atención:
                  </label>
                  <input
                    type="text"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>Guardar Ajustes del Salón</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
