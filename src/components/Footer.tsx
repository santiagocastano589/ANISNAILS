'use client';

import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Clock, Heart, Instagram, MessageCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { generateDirectContactWhatsAppLink } from '../lib/whatsapp';

export const Footer: React.FC = () => {
  const { config, openBookingModal } = useBooking();

  return (
    <footer id="contacto" className="bg-stone-900 text-white pt-16 pb-12 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400 to-amber-300 flex items-center justify-center text-stone-900">
                <Sparkles className="w-5 h-5 text-stone-950" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                {config.name}
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {config.tagline}
            </p>

            <div className="pt-2">
              <a
                href={generateDirectContactWhatsAppLink(config)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-full transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chatear por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Enlaces Rápidos
            </p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#servicios" className="hover:text-rose-400 transition-colors">
                  Servicios y Precios
                </a>
              </li>
              <li>
                <a href="#tecnicas" className="hover:text-rose-400 transition-colors">
                  Comparativa de Técnicas
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-rose-400 transition-colors">
                  Galería de Diseños
                </a>
              </li>
              <li>
                <a href="#resenas" className="hover:text-rose-400 transition-colors">
                  Opiniones de Clientas
                </a>
              </li>
              <li>
                <button
                  onClick={() => openBookingModal()}
                  className="text-rose-400 hover:text-rose-300 font-bold transition-colors"
                >
                  Agendar una Cita
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Location */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Ubicación y Horarios
            </p>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{config.address}, {config.city}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p>{config.workingDays}</p>
                  <p className="text-stone-300 font-semibold">{config.workingHours}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{config.email}</span>
              </div>
            </div>
          </div>

          {/* Policies & Safety */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Políticas de Atención
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              <strong>Tolerancia:</strong> 10 minutos de espera máxima. Si necesitas reagendar, 
              agradecemos avisar con al menos 24 horas de anticipación por WhatsApp.
            </p>
            <p className="text-xs text-stone-400 leading-relaxed pt-1">
              <strong>Bioseguridad:</strong> Instrumental desinfectado en autoclave grado médico y kits de limas desechables.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {config.name}. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado con <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> para profesionales del Nail Art.
          </p>
        </div>
      </div>
    </footer>
  );
};
