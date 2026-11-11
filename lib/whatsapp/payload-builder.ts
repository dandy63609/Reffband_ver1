/**
 * Reffband 1-Tap WhatsApp Booking Handshake Payload Builder
 * Architectural Decision: AD-5 (Hybrid 1-Tap WhatsApp Booking Handshake)
 */

export interface BookingPayloadInput {
  bandName: string;
  bandSlug: string;
  organizerName: string;
  eventName: string;
  eventDate: string;
  venueLocation: string;
  offeredRate: string;
  notes?: string;
}

/**
 * Builds standard Indonesian professional gig invitation message for WhatsApp
 */
export function buildWhatsAppBookingPayload(input: BookingPayloadInput): string {
  const lines = [
    `Halo Manajer ${input.bandName},`,
    ``,
    `Kami dari ${input.organizerName || "Panitia Acara"} tertarik untuk mengundang ${input.bandName} tampil di acara kami:`,
    `• Nama Acara: ${input.eventName}`,
    `• Tanggal: ${input.eventDate}`,
    `• Lokasi / Venue: ${input.venueLocation}`,
    `• Penawaran Honorarium: ${input.offeredRate}`,
  ];

  if (input.notes && input.notes.trim()) {
    lines.push(`• Catatan Tambahan: ${input.notes.trim()}`);
  }

  lines.push(
    ``,
    `Kami telah meninjau portofolio EPK, cuplikan audio demo 30s, dan technical rider resmi ${input.bandName} di Reffband:`,
    `https://reffband.id/@${input.bandSlug}`,
    ``,
    `Mohon konfirmasi ketersediaan jadwal dan kesesuaian rider. Terima kasih!`
  );

  return lines.join("\n");
}

/**
 * Normalizes phone numbers to international WhatsApp format (e.g. 0812... -> 62812...)
 * and produces standard wa.me redirect URL
 */
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  // Strip non-digit characters
  let cleanPhone = phoneNumber.replace(/\D/g, "");

  // Convert leading 0 to Indonesian country code 62
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "62" + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith("62")) {
    cleanPhone = "62" + cleanPhone;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
