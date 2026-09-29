import { Appointment, Review, StudioConfig, User } from '../types';
import { DEFAULT_STUDIO_CONFIG, INITIAL_REVIEWS } from '../data/mockData';

const STORAGE_KEYS = {
  APPOINTMENTS: 'nail_studio_appointments',
  REVIEWS: 'nail_studio_reviews',
  CONFIG: 'nail_studio_config',
  USER: 'nail_studio_current_user',
  USERS_LIST: 'nail_studio_registered_users',
};

// Config
export function getSavedConfig(): StudioConfig {
  if (typeof window === 'undefined') return DEFAULT_STUDIO_CONFIG;
  const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return DEFAULT_STUDIO_CONFIG;
    }
  }
  return DEFAULT_STUDIO_CONFIG;
}

export function saveConfig(config: StudioConfig): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
}

// Appointments
export function getSavedAppointments(): Appointment[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveAppointment(appointment: Appointment): Appointment[] {
  const existing = getSavedAppointments();
  const updated = [appointment, ...existing];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
  }
  return updated;
}

export function updateAppointmentStatus(
  id: string,
  status: Appointment['status']
): Appointment[] {
  const existing = getSavedAppointments();
  const updated = existing.map((app) =>
    app.id === id ? { ...app, status } : app
  );
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
  }
  return updated;
}

// Reviews
export function getSavedReviews(): Review[] {
  if (typeof window === 'undefined') return INITIAL_REVIEWS;
  const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_REVIEWS;
    }
  }
  return INITIAL_REVIEWS;
}

export function saveReview(review: Review): Review[] {
  const existing = getSavedReviews();
  const updated = [review, ...existing];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
  }
  return updated;
}

// Current User Session
export function getSavedUser(): User | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(STORAGE_KEYS.USER);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
}

export function saveUserSession(user: User | null): void {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}
