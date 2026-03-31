import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

/**
 * GET /api/offers - Récupère les offres actives (endpoint public)
 * Exigences: 5.3, 8.1
 */
export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase non configuré' }, { status: 500 })
  }

  const { data, error } = await supabaseAdmin
    .from('offers')
    .select('*')
    .eq('is_active', true)
    .order('title', { ascending: true })

  if (error) {
    return NextResponse.json({ error: `Erreur serveur: ${error.message}` }, { status: 500 })
  }

  return NextResponse.json({ offers: data })
}
