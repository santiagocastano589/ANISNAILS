'use client';

import React, { useState } from 'react';
import { Clock, Check, Calendar, Sparkles, HelpCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Service, ServiceCategory } from '../types';
import { formatCurrency } from '../lib/whatsapp';

interface ServicesSectionProps {
  onLearnMoreTechnique?: (techniqueId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onLearnMoreTechnique }) => {
  const { services, config, openBookingModal } = useBooking();
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos los Servicios' },
    { id: 'acrilico', label: 'Acrílico & Kapping' },
    { id: 'soft-gel', label: 'Soft Gel / Gel X' },
    { id: 'semipermanente', label: 'Semipermanente' },
    { id: 'nail-art', label: 'Nail Art & Diseños' },
    { id: 'spa-cuidado', label: 'Spa & Cuidado' },
  ];

  const filteredServices = activeCategory === 'todos'
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <section id="servicios" className="py-20 bg-stone-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nuestra Carta de Servicios</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Técnicas profesionales para cada estilo de vida
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Utilizamos productos hipoalergénicos de gama alta y herramientas 100% esterilizadas. 
            Elige el servicio ideal para ti y agenda tu horario preferido.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-rose-50/60 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-rose-100/70 transition-all duration-300 flex flex-col group"
            >
              {/* Image banner */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {service.popular && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                    ★ Más Solicitado
                  </span>
                )}

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5 text-xs font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-rose-300" />
                    <span>{service.durationMinutes} min aprox.</span>
                  </div>
                  <span className="font-serif text-xl font-bold">
                    {formatCurrency(service.price, config.currencySymbol)}
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                      Lo que incluye el servicio:
                    </p>
                    <ul className="space-y-1.5">
                      {service.includes.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                  <button
                    onClick={() => openBookingModal(service)}
                    className="flex-1 py-3 px-4 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white text-xs font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Agendar Cita</span>
                  </button>

                  <a
                    href="#tecnicas"
                    className="p-3 text-stone-400 hover:text-stone-700 hover:bg-stone-50 rounded-2xl border border-stone-200 transition-colors"
                    title="Ver explicación de la técnica"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
