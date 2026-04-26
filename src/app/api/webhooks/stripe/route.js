import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'
import { Resend } from 'resend'

export async function POST(request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return new Response(`Webhook error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const bookingId = session.metadata?.booking_id

    if (bookingId) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )

      // Obtener datos completos de la reserva
      const { data: booking } = await supabase
        .from('bookings')
        .select('*, services(name)')
        .eq('id', bookingId)
        .single()

      await supabase
        .from('bookings')
        .update({ status: 'pagado' })
        .eq('id', bookingId)

      // Crear registro en el historial como Pendiente para que el admin asigne empleado
      if (booking) {
        await supabase
          .from('service_records')
          .insert({
            business_id: booking.business_id,
            service_id:  booking.service_id,
            date:        booking.date,
            price:       booking.price,
            status:      'pendiente',
            is_paid:     true,
            notes:       `Reserva online · ${booking.customer_name} · ${booking.license_plate} · ${String(booking.time_slot).slice(0, 5)}`,
          })
      }

      // Enviar emails si Resend está configurado
      if (process.env.RESEND_API_KEY && booking) {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const serviceName = booking.services?.name ?? 'Servicio'
        const fecha = booking.date
        const hora = booking.time_slot
        const cliente = booking.customer_name
        const matricula = booking.license_plate
        const precio = `${booking.price}€`

        // Email al admin
        await resend.emails.send({
          from: 'La Impecable <info@laimpecable.es>',
          to: 'info@laimpecable.es',
          subject: `Nueva reserva — ${cliente} · ${fecha} ${hora}`,
          html: `
            <h2>Nueva reserva confirmada</h2>
            <table>
              <tr><td><strong>Cliente:</strong></td><td>${cliente}</td></tr>
              <tr><td><strong>Servicio:</strong></td><td>${serviceName}</td></tr>
              <tr><td><strong>Fecha:</strong></td><td>${fecha} a las ${hora}</td></tr>
              <tr><td><strong>Matrícula:</strong></td><td>${matricula}</td></tr>
              <tr><td><strong>Total cobrado:</strong></td><td>${precio}</td></tr>
            </table>
          `,
        })

        // Email al cliente (solo si dejó email)
        if (booking.customer_email) {
          await resend.emails.send({
            from: 'La Impecable <info@laimpecable.es>',
            to: booking.customer_email,
            subject: `Reserva confirmada — ${fecha} a las ${hora}`,
            html: `
              <h2>¡Tu reserva está confirmada!</h2>
              <p>Hola ${cliente}, te esperamos el <strong>${fecha} a las ${hora}</strong>.</p>
              <table>
                <tr><td><strong>Servicio:</strong></td><td>${serviceName}</td></tr>
                <tr><td><strong>Matrícula:</strong></td><td>${matricula}</td></tr>
                <tr><td><strong>Total pagado:</strong></td><td>${precio}</td></tr>
              </table>
              <p>Si tienes alguna duda escríbenos a <a href="mailto:info@laimpecable.es">info@laimpecable.es</a></p>
            `,
          })
        }
      }
    }
  }

  return new Response('ok', { status: 200 })
}
