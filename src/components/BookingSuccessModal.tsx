'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, Mail, Calendar, Clock, DollarSign, X } from 'lucide-react';
import { Appointment } from '../types';
import { useBooking } from '../context/BookingContext';
import { generateWhatsAppAppointmentLink, formatCurrency } from '../lib/whatsapp';

interface BookingSuccessModalProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  appointment,
  onClose,
}) => {
  const { config } = useBooking();

  useEffect(() => {
    if (appointment) {
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#d4a373', '#ecc880'],
      });
    }
  }, [appointment]);

  if (!appointment) return null;

  const whatsappUrl = generateWhatsAppAppointmentLink(appointment, config);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
          aria-label="Cerrar confirmación"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
            ¡Cita Registrada con Éxito!
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
            Te esperamos con los brazos abiertos
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Código de reserva: <span className="font-mono font-bold text-stone-800">{appointment.id}</span>
          </p>
        </div>

        {/* Appointment Details Box */}
        <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200/80 text-left space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="text-stone-500">Servicio:</span>
            <span className="font-bold text-stone-900 text-right">{appointment.serviceName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-500 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-500" />
              Fecha:
            </span>
            <span className="font-semibold text-stone-800">{appointment.date}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-500 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-rose-500" />
              Hora:
            </span>
            <span className="font-semibold text-stone-800">{appointment.time}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-500">Clienta:</span>
            <span className="font-semibold text-stone-800">{appointment.clientName}</span>
          </div>

          {appointment.extras && appointment.extras.length > 0 && (
            <div className="pt-1 text-stone-500 text-[11px]">
              <span className="font-semibold">Adicionales: </span>
              {appointment.extras.map((e) => e.name).join(', ')}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-base font-bold text-stone-900">
            <span>Total Estimado:</span>
            <span className="text-rose-600">{formatCurrency(appointment.totalPrice, config.currencySymbol)}</span>
          </div>
        </div>

        {/* WhatsApp Notification Button */}
        <div className="space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-6 h-6 fill-white" />
            <span>Enviar Notificación a WhatsApp</span>
          </a>

          <p className="text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-stone-400" />
            <span>También hemos enviado un respaldo a tu correo y a la dueña del salón.</span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-xs font-semibold text-stone-400 hover:text-stone-700 underline"
        >
          Volver a la página principal
        </button>

      </div>
    </div>
  );
};
