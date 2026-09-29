'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appointment, Review, Service, StudioConfig } from '../types';
import {
  getSavedAppointments,
  saveAppointment,
  updateAppointmentStatus as updateStatusInStorage,
  getSavedReviews,
  saveReview as saveReviewInStorage,
  getSavedConfig,
  saveConfig as saveConfigInStorage,
} from '../lib/storage';
import { DEFAULT_STUDIO_CONFIG, INITIAL_SERVICES } from '../data/mockData';

interface BookingContextType {
  appointments: Appointment[];
  reviews: Review[];
  services: Service[];
  config: StudioConfig;
  selectedServiceForBooking: Service | null;
  isBookingModalOpen: boolean;
  openBookingModal: (service?: Service) => void;
  closeBookingModal: () => void;
  createAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => Promise<Appointment>;
  updateStatus: (id: string, status: Appointment['status']) => void;
  addReview: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;
  updateStudioConfig: (newConfig: StudioConfig) => void;
  lastCreatedAppointment: Appointment | null;
  clearLastAppointment: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [config, setConfig] = useState<StudioConfig>(DEFAULT_STUDIO_CONFIG);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<Service | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [lastCreatedAppointment, setLastCreatedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    setAppointments(getSavedAppointments());
    setReviews(getSavedReviews());
    setConfig(getSavedConfig());
  }, []);

  const openBookingModal = (service?: Service) => {
    if (service) {
      setSelectedServiceForBooking(service);
    } else if (INITIAL_SERVICES.length > 0) {
      setSelectedServiceForBooking(INITIAL_SERVICES[0]);
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedServiceForBooking(null);
  };

  const createAppointment = async (
    data: Omit<Appointment, 'id' | 'createdAt' | 'status'>
  ): Promise<Appointment> => {
    const newAppointment: Appointment = {
      ...data,
      id: `cita-${Date.now()}`,
      status: 'pendiente',
      createdAt: new Date().toISOString(),
    };

    const updated = saveAppointment(newAppointment);
    setAppointments(updated);
    setLastCreatedAppointment(newAppointment);

    // Call notification API route in background
    try {
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointment: newAppointment, config }),
      }).catch((err) => console.log('Notification API notice:', err));
    } catch (e) {
      // Ignored if offline
    }

    return newAppointment;
  };

  const updateStatus = (id: string, status: Appointment['status']) => {
    const updated = updateStatusInStorage(id, status);
    setAppointments(updated);
  };

  const addReview = (data: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const newReview: Review = {
      ...data,
      id: `rev-${Date.now()}`,
      date: 'Reciente',
      verified: true,
    };
    const updated = saveReviewInStorage(newReview);
    setReviews(updated);
  };

  const updateStudioConfig = (newConfig: StudioConfig) => {
    saveConfigInStorage(newConfig);
    setConfig(newConfig);
  };

  const clearLastAppointment = () => {
    setLastCreatedAppointment(null);
  };

  return (
    <BookingContext.Provider
      value={{
        appointments,
        reviews,
        services: INITIAL_SERVICES,
        config,
        selectedServiceForBooking,
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        createAppointment,
        updateStatus,
        addReview,
        updateStudioConfig,
        lastCreatedAppointment,
        clearLastAppointment,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
