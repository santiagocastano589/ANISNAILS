export type ServiceCategory = 'acrilico' | 'soft-gel' | 'semipermanente' | 'nail-art' | 'spa-cuidado';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  description: string;
  technique: string;
  includes: string[];
  imageUrl: string;
  popular?: boolean;
}

export interface TechniqueInfo {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  durability: string;
  idealFor: string;
  maintenance: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'todas' | 'acrilico' | 'soft-gel' | 'french-nude' | 'nail-art' | 'glam';
  imageUrl: string;
  technique: string;
  likes: number;
  tags: string[];
}

export interface Review {
  id: string;
  clientName: string;
  clientAvatar?: string;
  rating: number; // 1 to 5
  date: string;
  serviceName: string;
  comment: string;
  verified: boolean;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  additionalNotes?: string;
  extras?: {
    id: string;
    name: string;
    price: number;
  }[];
  totalPrice: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  status: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  createdAt: string;
  referenceImages?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  provider: 'google' | 'email';
  isAdmin?: boolean;
}

export interface StudioConfig {
  name: string;
  tagline: string;
  phoneWhatsApp: string; // formatted e.g. 573001234567
  email: string;
  instagram: string;
  address: string;
  city: string;
  workingDays: string;
  workingHours: string;
  currencySymbol: string;
}
