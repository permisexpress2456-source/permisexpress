import { NextRequest, NextResponse } from 'next/server'
import { readFile, stat } from 'fs/promises'
import path from 'path'

const MIME: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
  gif: 'image/gif', webp: 'image/webp', pdf: 'application/pdf',
}

export async function GET(_req: NextRequest, { params }: { params: { folder: string; file: string } }) {
  try {
    const filePath = path.join(process.cwd(), 'uploads', params.folder, params.file)

    // Security: prevent path traversal
    const resolved = path.resolve(filePath)
    const uploadsDir = path.resolve(path.join(process.cwd(), 'uploads'))
    if (!resolved.startsWith(uploadsDir)) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    await stat(filePath) // check exists
    const buffer = await readFile(filePath)
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
    return NextResponse.json({ error: 'Fichier introuvable' }, { status: 404 })
  }
}
