import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getAvailableSlots } from '@/lib/availability'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ slots: [] })
  }

  const today = new Date().toISOString().split('T')[0]
  if (date < today) return NextResponse.json({ slots: [] })

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data: businessId } = await db.rpc('get_default_business_id')
  if (!businessId) return NextResponse.json({ slots: [] })

  const result = await getAvailableSlots(date, businessId)
  return NextResponse.json(result)
}
