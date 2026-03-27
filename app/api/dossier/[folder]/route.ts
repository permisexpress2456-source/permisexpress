import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET(_req: NextRequest, { params }: { params: { folder: string } }) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ ok: false, error: 'Supabase non configuré' }, { status: 500 })
    }

    const folder = params.folder

    // Get metadata from DB
    const { data: meta, error: dbError } = await supabaseAdmin
      .from('inscriptions')
      .select('*')
      .eq('folder', folder)
      .single()

    if (dbError || !meta) {
      return NextResponse.json({ ok: false, error: 'Dossier introuvable' }, { status: 404 })
    }

    // List files in storage
    const { data: files } = await supabaseAdmin.storage
      .from('inscriptions')
      .list(folder)

    const documents = (files || []).map(f => {
      const ext = f.name.split('.').pop()?.toLowerCase() || ''
      const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)
      return { name: f.name, ext, isImage }
    })

    return NextResponse.json({ ok: true, meta, documents })
  } catch {
    return NextResponse.json({ ok: false, error: 'Erreur serveur' }, { status: 500 })
  }
}
