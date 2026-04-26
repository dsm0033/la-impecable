'use server'

import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { getAvailableSlots } from '@/lib/availability'

export async function crearReserva(prevState, formData) {
  const service_id     = formData.get('service_id')
  const customer_name  = formData.get('customer_name')?.trim()
  const license_plate  = formData.get('license_plate')?.trim().toUpperCase()
  const customer_email = formData.get('customer_email')?.trim() || null
  const date           = formData.get('date')
  const time_slot      = formData.get('time_slot')

  if (!service_id)    return { error: 'Selecciona un servicio.' }
  if (!customer_name) return { error: 'El nombre es obligatorio.' }
  if (!license_plate) return { error: 'La matrícula es obligatoria.' }
  if (!date)          return { error: 'Selecciona una fecha.' }
  if (!time_slot || !/^\d{2}:\d{2}$/.test(time_slot)) return { error: 'Selecciona una hora válida.' }

  const today = new Date().toISOString().split('T')[0]
  if (date < today) return { error: 'La fecha no puede ser en el pasado.' }

  const supabase = await createClient()
  const adminSupabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // Obtener business_id
  const { data: businessId } = await supabase.rpc('get_default_business_id')
  if (!businessId) return { error: 'Error interno. Inténtalo más tarde.' }

  // Validar disponibilidad real (fecha no bloqueada, día abierto, slot libre)
  const { slots, blocked, closed } = await getAvailableSlots(date, businessId)
  if (blocked || closed) return { error: 'Este día no está disponible para reservas.' }
  if (!slots.includes(time_slot)) return { error: 'Esta hora ya no está disponible. Elige otra.' }

  // Obtener servicio
  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('name, price')
    .eq('id', service_id)
    .eq('active', true)
    .single()

  if (serviceError || !service) return { error: 'Servicio no encontrado.' }

  // Crear reserva en estado pendiente
  const { data: booking, error: bookingError } = await adminSupabase
    .from('bookings')
    .insert({
      business_id:    businessId,
      service_id,
      customer_name,
      license_plate,
      customer_email,
      date,
      time_slot,
      price:  service.price,
      status: 'pendiente',
    })
    .select('id')
    .single()

  if (bookingError) return { error: 'No se pudo crear la reserva. Inténtalo de nuevo.' }

  // Crear sesión de pago en Stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    automatic_payment_methods: { enabled: true },
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: service.name,
          description: `${date} a las ${time_slot} · ${license_plate}`,
        },
        unit_amount: Math.round(service.price * 100),
      },
      quantity: 1,
    }],
    customer_email: customer_email ?? undefined,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/reservar/confirmado?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${process.env.NEXT_PUBLIC_SITE_URL}/reservar`,
    metadata: { booking_id: booking.id },
  })

  await adminSupabase
    .from('bookings')
    .update({ stripe_session_id: session.id })
    .eq('id', booking.id)

  redirect(session.url)
}
