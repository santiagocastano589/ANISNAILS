'use client';

import React from 'react';
import { X, Heart, Sparkles, Calendar } from 'lucide-react';
import { GalleryItem } from '../types';
import { useBooking } from '../context/BookingContext';

interface ImageModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ item, onClose }) => {
  const { openBookingModal } = useBooking();
  if (!item) return null;

  const handleBookThisDesign = () => {
    onClose();
    openBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-rose-100 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md backdrop-blur-sm transition-transform active:scale-95"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Image */}
        <div className="md:w-3/5 relative bg-stone-100 min-h-[320px] md:min-h-[460px]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details column */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full text-[11px] font-bold uppercase tracking-wider">
                Trabajo Real
              </span>
              <span className="flex items-center gap-1 text-xs text-rose-600 font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>{item.likes} me gusta</span>
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
              {item.title}
            </h3>

            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Técnica & Materiales
              </p>
              <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                {item.technique}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                Etiquetas de Estilo
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100">
            <button
              onClick={handleBookThisDesign}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Quiero agendar este diseño</span>
            </button>
            <p className="text-[10px] text-stone-400 text-center mt-2">
              Puedes adjuntar esta foto o mostrarla durante tu cita.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
