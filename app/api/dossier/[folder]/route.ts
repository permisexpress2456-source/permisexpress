import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyAdminToken } from '@/lib/adminAuth'

export async function GET(req: NextRequest, { params }: { params: { folder: string } }) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token || !await verifyAdminToken(token)) {
    return NextResponse.json({ ok: false, error: 'Accès refusé' }, { status: 403 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ ok: false, error: 'Supabase non configuré' }, { status: 500 })
  }

  const folder = params.folder

  const { data: meta, error: dbError } = await supabaseAdmin
    .from('inscriptions')
    .select('*')
    .eq('folder', folder)
    .single()

  if (dbError || !meta) {
    return NextResponse.json({ ok: false, error: 'Dossier introuvable' }, { status: 404 })
  }

  const { data: files } = await supabaseAdmin.storage
    .from('inscriptions')
    .list(folder)

  const documents = (files || []).map(f => {
    const ext = f.name.split('.').pop()?.toLowerCase() || ''
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)
    return { name: f.name, ext, isImage }
  })

  return NextResponse.json({ ok: true, meta, documents })
}
