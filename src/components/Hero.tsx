'use client';

import React from 'react';
import { Sparkles, Calendar, Star, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const Hero: React.FC = () => {
  const { config, openBookingModal } = useBooking();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Estudio Profesional de Uñas & Nail Art</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              El arte de lucir unas manos{' '}
              <span className="bg-gradient-to-r from-rose-500 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                impecables, elegantes y duraderas
              </span>
            </h1>

            {/* Description */}
            <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Especialistas en <strong>Uñas Acrílicas Esculpidas</strong>, <strong>Soft Gel / Gel X</strong>, 
              <strong> Manicura Rusa</strong> y diseños personalizados. Agenda tu cita en menos de 2 minutos 
              y recibe confirmación inmediata por WhatsApp y correo.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => openBookingModal()}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:shadow-rose-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 text-base"
              >
                <Calendar className="w-5 h-5" />
                <span>Agendar Cita Ahora</span>
              </button>

              <a
                href="#servicios"
                className="w-full sm:w-auto px-7 py-4 bg-white/90 hover:bg-white text-stone-800 font-semibold rounded-full border border-stone-200 hover:border-rose-300 shadow-sm transition-all flex items-center justify-center gap-2 text-base group"
              >
                <span>Explorar Servicios y Precios</span>
                <ArrowRight className="w-4 h-4 text-rose-500 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-rose-100/80 max-w-xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-500 font-bold text-lg sm:text-xl">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5 font-medium">+150 Opiniones reales</p>
              </div>

              <div className="text-center lg:text-left border-x border-stone-200 px-2">
                <p className="font-bold text-lg sm:text-xl text-stone-900">+1,800</p>
                <p className="text-xs text-stone-500 mt-0.5 font-medium">Sets aplicados</p>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-emerald-600 font-bold text-sm sm:text-base">
                  <ShieldCheck className="w-5 h-5" />
                  <span>100%</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5 font-medium">Esterilización grado médico</p>
              </div>
            </div>

          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Luxury Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80"
                  alt="Uñas Acrílicas de Lujo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-2.5 py-1 bg-rose-500/90 backdrop-blur-sm rounded-full text-[11px] font-semibold tracking-wider uppercase">
                    Tendencia Destacada
                  </span>
                  <p className="font-serif text-lg sm:text-xl font-bold mt-2">
                    Efecto Glazed & Cristales Swarovski
                  </p>
                  <p className="text-xs text-rose-100 mt-1">
                    Diseños a medida con duración superior a 4 semanas.
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: WhatsApp instant notification */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-rose-100 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                  💬
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800">Aviso a tu WhatsApp</p>
                  <p className="text-[11px] text-stone-500">Recordatorio instantáneo</p>
                </div>
              </div>

              {/* Floating Badge 2: Google & Email login */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-rose-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold shadow-sm">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800">Cuidado & Calidad</p>
                  <p className="text-[11px] text-stone-500">Garantía de satisfacción</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
