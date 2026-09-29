'use client';

import React, { useState } from 'react';
import { Sparkles, Maximize2, Heart, Instagram } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem } from '../types';
import { ImageModal } from './ImageModal';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('todas');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);

  const filters = [
    { id: 'todas', label: 'Todas las creaciones' },
    { id: 'french-nude', label: 'Francesas & Nude' },
    { id: 'glam', label: 'Glam & Cristalería' },
    { id: 'nail-art', label: 'Nail Art & 3D' },
    { id: 'soft-gel', label: 'Soft Gel' },
    { id: 'acrilico', label: 'Acrílico Esculpido' },
  ];

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const filteredItems = activeFilter === 'todas'
    ? items
    : items.filter((item) => item.category === activeFilter || item.category === 'todas');

  return (
    <section id="galeria" className="py-20 bg-stone-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portafolio de Creaciones</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Inspiración para tu próxima cita
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Fotografías reales de nuestros trabajos. Cada set es una obra de arte diseñada 
            según tu gusto, longitud y estilo personal.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-8 no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-rose-50/60 border border-stone-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-square bg-stone-200 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <span className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="px-2 py-0.5 bg-rose-500/90 text-white rounded text-[10px] font-bold uppercase">
                    {item.tags[0] || 'Diseño'}
                  </span>
                  <p className="font-serif text-sm font-bold line-clamp-1">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-stone-300 line-clamp-1">
                      {item.technique}
                    </span>
                    <button
                      onClick={(e) => handleLike(e, item.id)}
                      className="flex items-center gap-1 text-xs text-rose-300 hover:text-rose-400"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                      <span>{item.likes}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Instagram Follow Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-rose-100/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <p className="font-serif font-bold text-stone-900">¿Quieres ver más diseños diarios?</p>
              <p className="text-xs text-stone-500">Síguenos en Instagram para ver videos de procesos y nuevas tendencias.</p>
            </div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-full transition-all shrink-0"
          >
            Ver en Instagram
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      <ImageModal item={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
};
