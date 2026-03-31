import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyAdminToken } from '@/lib/adminAuth'
import { CreateOfferInput, validateOffer } from '@/types/offer'

export const dynamic = 'force-dynamic'

async function checkAdmin(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  return token ? await verifyAdminToken(token) : null
}

/**
 * GET /api/admin/offers - Récupère toutes les offres
 * Exigences: 6.1, 6.5
 */
export async function GET(req: NextRequest) {
  if (!await checkAdmin(req)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }
  
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase non configuré' }, { status: 500 })
  }

  const { searchParams } = new URL(req.url)
  const sortBy = searchParams.get('sortBy') || 'created_at'
  const sortOrder = searchParams.get('sortOrder') === 'asc' ? true : false

  const validSortFields = ['title', 'created_at', 'price', 'slug']
  const sortField = validSortFields.includes(sortBy) ? sortBy : 'created_at'

  const { data, error } = await supabaseAdmin
    .from('offers')
    .select('*')
    .order(sortField, { ascending: sortOrder })

  if (error) {
    return NextResponse.json({ error: `Erreur serveur: ${error.message}` }, { status: 500 })
  }

  return NextResponse.json({ offers: data })
}

/**
 * POST /api/admin/offers - Crée une nouvelle offre
 * Exigences: 6.2, 6.5, 6.6
 */
export async function POST(req: NextRequest) {
  if (!await checkAdmin(req)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase non configuré' }, { status: 500 })
  }

  const body: CreateOfferInput = await req.json()
  
  // Validation des champs obligatoires
  const errors = validateOffer(body)
  if (errors.length > 0) {
    return NextResponse.json({ 
      error: `Champs obligatoires manquants: ${errors.join(', ')}` 
    }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('offers')
    .insert({
      slug: body.slug.trim(),
      title: body.title.trim(),
      price: body.price.trim(),
      description: body.description?.trim() || '',
      documents: body.documents || [],
      is_active: body.is_active ?? true
    })
    .select()
    .single()

  if (error) {
    // Erreur de contrainte unique sur le slug
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Le slug est déjà utilisé' }, { status: 400 })
    }
    return NextResponse.json({ error: `Erreur serveur: ${error.message}` }, { status: 500 })
  }

  return NextResponse.json({ offer: data, ok: true }, { status: 201 })
}
