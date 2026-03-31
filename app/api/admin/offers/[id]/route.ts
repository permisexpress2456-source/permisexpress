import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyAdminToken } from '@/lib/adminAuth'
import { UpdateOfferInput } from '@/types/offer'

async function checkAdmin(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  return token ? await verifyAdminToken(token) : null
}

/**
 * PATCH /api/admin/offers/[id] - Modifie une offre existante
 * Exigences: 6.3
 */
export async function PATCH(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await checkAdmin(req)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase non configuré' }, { status: 500 })
  }

  const { id } = await params
  const body: UpdateOfferInput = await req.json()

  // Vérifier que l'offre existe
  const { data: existing } = await supabaseAdmin
    .from('offers')
    .select('id')
    .eq('id', id)
    .single()

  if (!existing) {
    return NextResponse.json({ error: 'Offre non trouvée' }, { status: 404 })
  }

  // Construire l'objet de mise à jour
  const updateData: Record<string, unknown> = {}
  
  if (body.slug !== undefined) updateData.slug = body.slug.trim()
  if (body.title !== undefined) updateData.title = body.title.trim()
  if (body.price !== undefined) updateData.price = body.price.trim()
  if (body.description !== undefined) updateData.description = body.description.trim()
  if (body.documents !== undefined) updateData.documents = body.documents
  if (body.is_active !== undefined) updateData.is_active = body.is_active

  const { error } = await supabaseAdmin
    .from('offers')
    .update(updateData)
    .eq('id', id)

  if (error) {
    // Erreur de contrainte unique sur le slug
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Le slug est déjà utilisé par une autre offre' }, { status: 400 })
    }
    return NextResponse.json({ error: `Erreur serveur: ${error.message}` }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

/**
 * DELETE /api/admin/offers/[id] - Supprime une offre
 * Exigences: 6.4
 */
export async function DELETE(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await checkAdmin(req)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase non configuré' }, { status: 500 })
  }

  const { id } = await params

  // Vérifier que l'offre existe
  const { data: existing } = await supabaseAdmin
    .from('offers')
    .select('id')
    .eq('id', id)
    .single()

  if (!existing) {
    return NextResponse.json({ error: 'Offre non trouvée' }, { status: 404 })
  }

  const { error } = await supabaseAdmin
    .from('offers')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: `Erreur serveur: ${error.message}` }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
