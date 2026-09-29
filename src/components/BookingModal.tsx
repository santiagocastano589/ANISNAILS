'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, DollarSign, Sparkles, User as UserIcon, Phone, Mail, FileText, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { AVAILABLE_EXTRAS } from '../data/mockData';
import { Service } from '../types';
import { formatCurrency } from '../lib/whatsapp';

const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '12:00 PM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
];

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    services,
    selectedServiceForBooking,
    createAppointment,
    config,
  } = useBooking();
  const { user } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service>(services[0]);
  const [selectedExtras, setSelectedExtras] = useState<typeof AVAILABLE_EXTRAS>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Client details
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Synchronize when opened with a specific service
  useEffect(() => {
    if (selectedServiceForBooking) {
      setSelectedService(selectedServiceForBooking);
    }
  }, [selectedServiceForBooking]);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      if (user.name) setClientName(user.name);
      if (user.email) setClientEmail(user.email);
      if (user.phone) setClientPhone(user.phone);
    }
  }, [user]);

  // Set default date to tomorrow if empty
  useEffect(() => {
    if (!selectedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setSelectedDate(`${yyyy}-${mm}-${dd}`);
    }
  }, [selectedDate]);

  if (!isBookingModalOpen) return null;

  const toggleExtra = (extra: typeof AVAILABLE_EXTRAS[0]) => {
    if (selectedExtras.some((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const calculateTotal = (): number => {
    const extrasSum = selectedExtras.reduce((sum, item) => sum + item.price, 0);
    return selectedService.price + extrasSum;
  };

  const handleNextStep = () => {
    if (step === 2 && !selectedTime) {
      alert('Por favor selecciona una hora de atención disponible.');
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientEmail) {
      alert('Por favor completa tu nombre, teléfono de WhatsApp y correo.');
      return;
    }

    setIsSubmitting(true);

    try {
      await createAppointment({
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        servicePrice: selectedService.price,
        extras: selectedExtras.map((e) => ({ id: e.id, name: e.name, price: e.price })),
        totalPrice: calculateTotal(),
        date: selectedDate,
        time: selectedTime || '10:30 AM',
        clientName,
        clientPhone,
        clientEmail,
        additionalNotes: notes,
      });

      closeBookingModal();
      // Reset steps for next time
      setStep(1);
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al agendar. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-rose-100 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-rose-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                Agendar Cita de Uñas
              </h3>
              <p className="text-[11px] text-stone-500">
                Paso {step} de 3 • {step === 1 ? 'Servicio y Adicionales' : step === 2 ? 'Fecha y Horario' : 'Tus Datos de Contacto'}
              </p>
            </div>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/50"
            aria-label="Cerrar modal de agendamiento"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="w-full bg-stone-100 h-1">
          <div
            className="bg-gradient-to-r from-rose-500 to-amber-500 h-1 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: Servicio y Adicionales */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Selecciona el Servicio Principal:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {services.map((svc) => (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => setSelectedService(svc)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex items-start justify-between ${
                        selectedService.id === svc.id
                          ? 'border-rose-500 bg-rose-50/70 shadow-sm ring-1 ring-rose-300'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-xs text-stone-900">{svc.name}</p>
                        <p className="text-[11px] text-stone-500">{svc.durationMinutes} minutos aprox.</p>
                      </div>
                      <span className="font-serif font-bold text-xs text-rose-600 shrink-0">
                        {formatCurrency(svc.price, config.currencySymbol)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extras */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    ¿Deseas agregar adicionales? (Opcional):
                  </label>
                  <span className="text-[11px] text-stone-400">Selecciona los que apliquen</span>
                </div>
                <div className="space-y-2">
                  {AVAILABLE_EXTRAS.map((extra) => {
                    const isChecked = selectedExtras.some((e) => e.id === extra.id);
                    return (
                      <div
                        key={extra.id}
                        onClick={() => toggleExtra(extra)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          isChecked
                            ? 'border-rose-400 bg-rose-50/50'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                              isChecked
                                ? 'bg-rose-500 border-rose-500 text-white'
                                : 'border-stone-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-stone-800">{extra.name}</p>
                            <p className="text-[10px] text-stone-400">+{extra.duration} min</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-stone-700">
                          +{formatCurrency(extra.price, config.currencySymbol)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total preview */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500">Inversión estimada:</p>
                  <p className="font-serif text-xl font-bold text-stone-900">
                    {formatCurrency(calculateTotal(), config.currencySymbol)}
                  </p>
                </div>
                <div className="text-right text-[11px] text-stone-400">
                  Incluye servicio base + {selectedExtras.length} adicionales
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Fecha y Hora */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Selecciona la Fecha de tu Cita:
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm font-medium text-stone-800"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Atendemos de {config.workingDays} en horario continuo ({config.workingHours}).
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Selecciona la Hora Disponible:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-rose-500 text-white border-rose-500 shadow-md ring-2 ring-rose-200'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-rose-300 hover:bg-rose-50/40'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/70 text-xs text-amber-900 space-y-1">
                <p className="font-bold">✨ Tolerancia y puntualidad:</p>
                <p className="text-[11px] text-amber-800">
                  Para brindarte el mejor diseño sin prisas, agradecemos llegar con 5 a 10 minutos de anticipación.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Datos de Contacto y Confirmación */}
          {step === 3 && (
            <form id="booking-form" onSubmit={handleSubmitBooking} className="space-y-4">
              
              {!user && (
                <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200 flex items-center justify-between text-xs">
                  <span className="text-stone-700">¿Ya tienes cuenta o deseas ingresar con Google?</span>
                  <span className="text-rose-600 font-bold">Rápido y seguro</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sofía Gómez"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    WhatsApp (con código de país) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+57 300 123 4567"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-rose-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="sofia@ejemplo.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Notas sobre el diseño o estado de tus uñas (Opcional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={2}
                    placeholder="Ej. Deseo uñas almendradas tono nude con efecto espejo, o tengo uñas de otro salón que retirar."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold text-stone-800">
                  <span>{selectedService.name}</span>
                  <span>{formatCurrency(selectedService.price, config.currencySymbol)}</span>
                </div>
                {selectedExtras.map((e) => (
                  <div key={e.id} className="flex justify-between text-stone-500 text-[11px]">
                    <span>+ {e.name}</span>
                    <span>{formatCurrency(e.price, config.currencySymbol)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
                  <span>Fecha & Hora:</span>
                  <span className="text-rose-600">{selectedDate} a las {selectedTime || 'Por acordar'}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-stone-900">
                  <span>Total a Pagar en Cita:</span>
                  <span className="text-rose-600">{formatCurrency(calculateTotal(), config.currencySymbol)}</span>
                </div>
              </div>

            </form>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 bg-stone-50/90 border-t border-rose-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-white flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <span>Continuar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              form="booking-form"
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-rose-500/25 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isSubmitting ? 'Confirmando Cita...' : 'Confirmar y Agendar'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
