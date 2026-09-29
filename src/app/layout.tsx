import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { BookingProvider } from '../context/BookingContext';

export const metadata: Metadata = {
  title: 'Luxe Nail Studio | Agendamiento de Citas de Uñas, Catálogo & Diseños',
  description: 'Agenda tu cita de uñas acrílicas, soft gel, manicura rusa y nail art exclusivo. Notificaciones instantáneas por WhatsApp y correo electrónico.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans text-stone-900 bg-[#FAFAFA] selection:bg-rose-200 selection:text-rose-900">
        <AuthProvider>
          <BookingProvider>
            {children}
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
