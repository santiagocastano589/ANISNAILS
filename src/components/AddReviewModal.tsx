'use client';

import React, { useState } from 'react';
import { X, Star, Sparkles, Heart } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({ isOpen, onClose }) => {
  const { addReview, services } = useBooking();
  const { user } = useAuth();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(5);
  const [clientName, setClientName] = useState<string>(user?.name || '');
  const [serviceName, setServiceName] = useState<string>(services[0]?.name || 'Uñas Acrílicas Esculpidas');
  const [comment, setComment] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('Por favor escribe tu opinión sobre nuestro servicio.');
      return;
    }

    addReview({
      clientName: clientName || (user ? user.name : 'Clienta Feliz'),
      clientAvatar: user?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(clientName || 'C')}&background=F7CAD0&color=881337`,
      rating,
      serviceName,
      comment,
    });

    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
          aria-label="Cerrar modal de reseña"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Tu opinión nos hace brillar
          </h3>
          <p className="text-xs text-stone-500">
            Comparte tu experiencia con nuestro estudio y ayuda a otras clientas a elegir su diseño ideal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          {/* Star Rating Picker */}
          <div className="flex flex-col items-center gap-1.5 py-2">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
              Calificación:
            </span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(rating)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-[11px] text-amber-600 font-bold">
              {rating === 5 ? '¡Excelente servicio! 💖' : rating === 4 ? 'Muy buen servicio ✨' : `${rating} estrellas`}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Tu Nombre:
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Carolina Vélez"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Servicio que te realizaste:
            </label>
            <select
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none bg-white"
            >
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Diseño Personalizado">Diseño Personalizado</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Tu Comentario / Reseña:
            </label>
            <textarea
              required
              rows={3}
              placeholder="Cuéntanos cómo fue tu experiencia, la duración de tus uñas, la atención y el acabado..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Publicar Mi Calificación</span>
          </button>
        </form>

      </div>
    </div>
  );
};
