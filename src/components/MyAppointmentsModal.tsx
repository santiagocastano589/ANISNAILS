'use client';

import React from 'react';
import { X, Calendar, Clock, MessageCircle, AlertCircle, Sparkles, CheckCircle2, Ban } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { generateWhatsAppAppointmentLink, generateDirectContactWhatsAppLink, formatCurrency } from '../lib/whatsapp';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { appointments, updateStatus, config, openBookingModal } = useBooking();
  const { user } = useAuth();

  if (!isOpen) return null;

  // Filter for client appointments (or show all local if not logged in for testing)
  const clientAppointments = user
    ? appointments.filter(
        (a) =>
          a.clientEmail.toLowerCase() === user.email.toLowerCase() ||
          (user.phone && a.clientPhone === user.phone)
      )
    : appointments;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmada':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Confirmada
          </span>
        );
      case 'completada':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-stone-100 text-stone-700 flex items-center gap-1">
            Atendida ✨
          </span>
        );
      case 'cancelada':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 flex items-center gap-1">
            <Ban className="w-3 h-3" /> Cancelada
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
            Pendiente de Confirmación
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
          aria-label="Cerrar mis citas"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-4 border-b border-rose-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Mis Citas de Uñas
            </h3>
            <p className="text-xs text-stone-500">
              Revisa el estado de tus citas programadas y contacta con el salón.
            </p>
          </div>
        </div>

        {/* Content List */}
        <div className="py-6 overflow-y-auto flex-1 space-y-4">
          {clientAppointments.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-800">
                Aún no tienes citas agendadas
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Selecciona tu servicio preferido y programa tu cita para lucir unas uñas espectaculares.
              </p>
              <button
                onClick={() => {
                  onClose();
                  openBookingModal();
                }}
                className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-full shadow-md transition-all inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Agendar mi Primera Cita</span>
              </button>
            </div>
          ) : (
            clientAppointments.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3 hover:border-rose-200 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                      Reserva #{app.id.slice(-6)}
                    </span>
                    <h4 className="font-serif font-bold text-stone-900 text-base">
                      {app.serviceName}
                    </h4>
                  </div>
                  <div>{getStatusBadge(app.status)}</div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-200/60">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-rose-500" />
                    <span>{app.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-rose-500" />
                    <span>{app.time}</span>
                  </div>
                  <div className="font-bold text-stone-900 col-span-2 sm:col-span-1">
                    Total: {formatCurrency(app.totalPrice, config.currencySymbol)}
                  </div>
                </div>

                {app.additionalNotes && (
                  <p className="text-[11px] text-stone-500 italic bg-amber-50/50 p-2 rounded-lg">
                    Notas: {app.additionalNotes}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/70">
                  <a
                    href={generateWhatsAppAppointmentLink(app, config)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Contactar por WhatsApp</span>
                  </a>

                  {app.status !== 'cancelada' && app.status !== 'completada' && (
                    <button
                      onClick={() => {
                        if (confirm('¿Estás segura de cancelar tu cita?')) {
                          updateStatus(app.id, 'cancelada');
                        }
                      }}
                      className="text-xs text-stone-400 hover:text-red-600 underline font-medium"
                    >
                      Cancelar cita
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Direct Help Footer */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>¿Deseas cambiar la fecha o tienes dudas?</span>
          <a
            href={generateDirectContactWhatsAppLink(config)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 font-bold hover:underline"
          >
            Chatear con el Estudio
          </a>
        </div>

      </div>
    </div>
  );
};
