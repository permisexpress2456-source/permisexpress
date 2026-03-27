import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const MIME: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
  gif: 'image/gif', webp: 'image/webp', pdf: 'application/pdf',
}

export async function GET(_req: NextRequest, { params }: { params: { folder: string; file: string } }) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase non configuré' }, { status: 500 })
    }

    const filePath = `${params.folder}/${params.file}`

    const { data, error } = await supabaseAdmin.storage
      .from('inscriptions')
      .download(filePath)

    if (error || !data) {
      return NextResponse.json({ error: 'Fichier introuvable' }, { status: 404 })
    }

    const buffer = Buffer.from(await data.arrayBuffer())
    const ext = params.file.split('.').pop()?.toLowerCase() || 'bin'
    const contentType = MIME[ext] || 'application/octet-stream'

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${params.file}"`,
        'Cache-Control': 'private, max-age=3600',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
