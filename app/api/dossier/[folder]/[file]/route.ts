import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyAdminToken } from '@/lib/adminAuth'

const MIME: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
  gif: 'image/gif', webp: 'image/webp', pdf: 'application/pdf',
}

export async function GET(req: NextRequest, { params }: { params: { folder: string; file: string } }) {
  const token = req.nextUrl.searchParams.get('token') || req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token || !await verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }
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
}
