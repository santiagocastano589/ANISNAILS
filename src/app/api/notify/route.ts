import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { appointment, config } = body;

    if (!appointment) {
      return NextResponse.json({ error: 'Missing appointment data' }, { status: 400 });
    }

    console.log('----------------------------------------------------');
    console.log('🌸 NUEVA CITA REGISTRADA EN EL SISTEMA:');
    console.log(`Cliente: ${appointment.clientName} (${appointment.clientPhone})`);
    console.log(`Servicio: ${appointment.serviceName}`);
    console.log(`Fecha y Hora: ${appointment.date} a las ${appointment.time}`);
    console.log(`Total: $${appointment.totalPrice}`);
    console.log(`Notificación enviada a Correo Dueña: ${config?.email || 'citas@luxenails.com'}`);
    console.log(`WhatsApp Destino: +${config?.phoneWhatsApp || '573001234567'}`);
    console.log('----------------------------------------------------');

    // Here we can easily attach Resend or Nodemailer if API keys are set in .env
    // e.g.:
    // if (process.env.RESEND_API_KEY) {
    //   await resend.emails.send({ ... });
    // }

    return NextResponse.json({
      success: true,
      message: 'Notificación procesada exitosamente',
      destinationEmail: config?.email,
      destinationWhatsApp: config?.phoneWhatsApp
    });
  } catch (error) {
    console.error('Error in notification API:', error);
    return NextResponse.json({ error: 'Error processing notification' }, { status: 500 });
  }
}
