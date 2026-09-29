'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { TechniquesSection } from '../components/TechniquesSection';
import { GallerySection } from '../components/GallerySection';
import { ReviewsSection } from '../components/ReviewsSection';
import { Footer } from '../components/Footer';
import { BookingModal } from '../components/BookingModal';
import { BookingSuccessModal } from '../components/BookingSuccessModal';
import { AuthModal } from '../components/AuthModal';
import { MyAppointmentsModal } from '../components/MyAppointmentsModal';
import { AdminPanelModal } from '../components/AdminPanelModal';
import { useBooking } from '../context/BookingContext';
import { MessageCircle } from 'lucide-react';
import { generateDirectContactWhatsAppLink } from '../lib/whatsapp';

export default function HomePage() {
  const { lastCreatedAppointment, clearLastAppointment, config } = useBooking();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAppointments={() => setIsAppointmentsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <TechniquesSection />
        <GallerySection />
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Contact Button */}
      <a
        href={generateDirectContactWhatsAppLink(config)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all transform hover:scale-110 active:scale-95 flex items-center gap-2 group"
        aria-label="Contactar al WhatsApp del salón"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-1">
          ¿Tienes dudas? Escríbenos
        </span>
      </a>

      {/* Modals */}
      <BookingModal />
      <BookingSuccessModal
        appointment={lastCreatedAppointment}
        onClose={clearLastAppointment}
      />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <MyAppointmentsModal
        isOpen={isAppointmentsOpen}
        onClose={() => setIsAppointmentsOpen(false)}
      />
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
