import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyAdminToken } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token || !await verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase non configuré' }, { status: 500 })

  const { data, error } = await supabaseAdmin
    .from('inscriptions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ inscriptions: data })
}
