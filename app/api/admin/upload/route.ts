import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyAdminToken } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

async function checkAdmin(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  return token ? await verifyAdminToken(token) : null
}

export async function POST(req: NextRequest) {
  if (!await checkAdmin(req)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase non configuré' }, { status: 500 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non autorisé. Utilisez JPG, PNG, WebP ou GIF.' }, { status: 400 })
    }

    // Limiter la taille à 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max 5MB)' }, { status: 400 })
    }

    // Générer un nom de fichier unique
    const ext = file.name.split('.').pop()
    const fileName = `offers/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`

    // Convertir le fichier en buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload vers Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from('images')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: `Erreur upload: ${uploadError.message}` }, { status: 500 })
    }

    // Obtenir l'URL publique
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('images')
      .getPublicUrl(fileName)

    return NextResponse.json({ url: publicUrl })
  } catch (err) {
    console.error('Upload exception:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
