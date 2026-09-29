import { Appointment, StudioConfig } from '../types';

export function formatCurrency(amount: number, symbol: string = '$'): string {
  return `${symbol}${amount.toLocaleString('es-CO')}`;
}

export function generateWhatsAppAppointmentLink(
  appointment: Appointment,
  config: StudioConfig
): string {
  const extrasText = appointment.extras && appointment.extras.length > 0
    ? `\n✨ *Adicionales:* ${appointment.extras.map(e => e.name).join(', ')}`
    : '';

  const notesText = appointment.additionalNotes
    ? `\n📝 *Notas/Diseño:* ${appointment.additionalNotes}`
    : '';

  const message = `🌸 *NUEVA CITA DE UÑAS - ${config.name.toUpperCase()}* 🌸\n`
    + `━━━━━━━━━━━━━━━━━━━━━\n`
    + `💅 *Servicio:* ${appointment.serviceName}\n`
    + `📅 *Fecha:* ${appointment.date}\n`
    + `⏰ *Hora:* ${appointment.time}\n`
    + `👤 *Clienta:* ${appointment.clientName}\n`
    + `📱 *Teléfono:* ${appointment.clientPhone}\n`
    + `📧 *Email:* ${appointment.clientEmail}`
    + extrasText
    + `\n💰 *Total Estimado:* ${formatCurrency(appointment.totalPrice, config.currencySymbol)}`
    + notesText
    + `\n━━━━━━━━━━━━━━━━━━━━━\n`
    + `✨ ¡Hola! Acabo de registrar mi cita en la página web. Quedo atenta a la confirmación. 💖`;

  const cleanPhone = config.phoneWhatsApp.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateDirectContactWhatsAppLink(config: StudioConfig, customText?: string): string {
  const cleanPhone = config.phoneWhatsApp.replace(/\D/g, '');
  const text = customText || `¡Hola ${config.name}! Quisiera hacer una consulta sobre sus servicios de uñas. 💅✨`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
