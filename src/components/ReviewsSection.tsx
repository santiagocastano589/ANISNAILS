'use client';

import React, { useState } from 'react';
import { Star, Sparkles, MessageSquareHeart, CheckCircle, Plus } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { AddReviewModal } from './AddReviewModal';

export const ReviewsSection: React.FC = () => {
  const { reviews } = useBooking();
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section id="resenas" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-rose-100">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
              <MessageSquareHeart className="w-3.5 h-3.5" />
              <span>Experiencias Reales</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
              Lo que nuestras clientas dicen de nosotras
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              La confianza, satisfacción y durabilidad en cada set son nuestra mayor pasión y garantía.
            </p>
          </div>

          {/* Average Badge & Add Review CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="flex items-center gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <div className="text-center">
                <span className="font-serif text-3xl font-bold text-stone-900">{averageRating}</span>
                <span className="text-xs text-stone-400"> / 5</span>
              </div>
              <div className="border-l border-stone-200 pl-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Basado en {reviews.length} testimonios
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAddReviewOpen(true)}
              className="px-5 py-3.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-2xl shadow-md flex items-center gap-2 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Calificar Servicio</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-50/70 hover:bg-stone-50 p-6 rounded-3xl border border-rose-100/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Client info header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.clientAvatar || 'https://ui-avatars.com/api/?name=Clienta'}
                      alt={rev.clientName}
                      className="w-10 h-10 rounded-full object-cover border border-rose-200"
                    />
                    <div>
                      <p className="font-bold text-sm text-stone-900">{rev.clientName}</p>
                      <p className="text-[11px] text-stone-400">{rev.date}</p>
                    </div>
                  </div>

                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verificada</span>
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Service Tag */}
                <div className="inline-block px-2.5 py-0.5 bg-rose-100/70 text-rose-800 rounded-md text-[11px] font-semibold">
                  💅 {rev.serviceName}
                </div>

                {/* Comment text */}
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1 text-[11px] text-rose-500 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Experiencia 5 estrellas en Anis Nails</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      <AddReviewModal
        isOpen={isAddReviewOpen}
        onClose={() => setIsAddReviewOpen(false)}
      />
    </section>
  );
};
