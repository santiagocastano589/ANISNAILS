'use client';

import React, { useState } from 'react';
import { Sparkles, Shield, Clock, Heart, CheckCircle2, ChevronRight } from 'lucide-react';
import { TECHNIQUES_DATA } from '../data/mockData';
import { TechniqueInfo } from '../types';
import { useBooking } from '../context/BookingContext';

export const TechniquesSection: React.FC = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<TechniqueInfo>(TECHNIQUES_DATA[0]);
  const { openBookingModal } = useBooking();

  return (
    <section id="tecnicas" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>Guía de Especialidades</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Conoce nuestras técnicas y elige la ideal para ti
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            ¿No sabes cuál técnica se adapta mejor al estado de tus uñas? 
            Compara aquí las ventajas, duración y cuidados de cada método.
          </p>
        </div>

        {/* Technique Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-10 pb-8">
          {TECHNIQUES_DATA.map((tech) => (
            <button
              key={tech.id}
              onClick={() => setSelectedTechnique(tech)}
              className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                selectedTechnique.id === tech.id
                  ? 'border-rose-400 bg-rose-50/70 shadow-md ring-2 ring-rose-200'
                  : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50 hover:border-stone-300'
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  selectedTechnique.id === tech.id ? 'text-rose-600' : 'text-stone-400'
                }`}>
                  Técnica
                </span>
                <p className="font-serif font-bold text-sm text-stone-900 mt-1 line-clamp-1">
                  {tech.name}
                </p>
              </div>
              <div className="mt-3 flex items-center text-xs font-medium text-stone-500">
                <span className="truncate">{tech.durability}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Technique Detailed Card */}
        <div className="bg-stone-50 rounded-3xl border border-rose-100/70 overflow-hidden shadow-sm max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Image */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src={selectedTechnique.imageUrl}
                alt={selectedTechnique.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-serif text-xl font-bold">{selectedTechnique.name}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-rose-200">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Duración aproximada: {selectedTechnique.durability}</span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {selectedTechnique.name}
                </h3>
                <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                  {selectedTechnique.fullDescription}
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Beneficios y ventajas clave:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTechnique.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700 bg-white p-2.5 rounded-xl border border-stone-200/70">
                      <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal for & Maintenance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-rose-50/50 p-3.5 rounded-2xl border border-rose-100">
                  <p className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">
                    ¿Para quién se recomienda?
                  </p>
                  <p className="text-xs text-stone-700 mt-1">
                    {selectedTechnique.idealFor}
                  </p>
                </div>
                <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-100">
                  <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                    Cuidado & Mantenimiento
                  </p>
                  <p className="text-xs text-stone-700 mt-1">
                    {selectedTechnique.maintenance}
                  </p>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => openBookingModal()}
                  className="px-6 py-3 bg-stone-900 hover:bg-rose-600 text-white text-xs font-bold rounded-full shadow transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Agendar cita con esta técnica</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
