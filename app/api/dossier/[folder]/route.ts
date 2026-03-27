import { NextRequest, NextResponse } from 'next/server'
import { readFile, readdir } from 'fs/promises'
import path from 'path'

export async function GET(req: NextRequest, { params }: { params: { folder: string } }) {
  try {
    const folder = params.folder
    const uploadDir = path.join(process.cwd(), 'uploads', folder)

    const files = await readdir(uploadDir)

    // Read metadata
    let meta = null
    if (files.includes('_info.json')) {
      const raw = await readFile(path.join(uploadDir, '_info.json'), 'utf-8')
      meta = JSON.parse(raw)
    }

    // List uploaded documents (exclude _info.json)
    const documents = files.filter(f => f !== '_info.json').map(f => {
      const ext = f.split('.').pop()?.toLowerCase() || ''
      const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)
      return { name: f, ext, isImage }
    })

    return NextResponse.json({ ok: true, meta, documents })
  } catch {
    return NextResponse.json({ ok: false, error: 'Dossier introuvable' }, { status: 404 })
  }
}
