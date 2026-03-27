import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData()

    const permis = fd.get('permis') as string
    const slug = fd.get('slug') as string
    const nom = fd.get('nom') as string
    const prenom = fd.get('prenom') as string
    const email = fd.get('email') as string
    const tel = fd.get('tel') as string
    const message = fd.get('message') as string
    const transcash = fd.get('transcash') as string

    // Create folder for this submission
    const timestamp = Date.now()
    const folderName = `${slug}_${nom}_${prenom}_${timestamp}`.replace(/[^a-zA-Z0-9_-]/g, '_')
    const uploadDir = path.join(process.cwd(), 'uploads', folderName)
    await mkdir(uploadDir, { recursive: true })

    // Save metadata
    const meta = {
      permis, slug, nom, prenom, email, tel, message, transcash,
      date: new Date().toISOString(),
    }
    await writeFile(path.join(uploadDir, '_info.json'), JSON.stringify(meta, null, 2), 'utf-8')

    // Save uploaded files
    const entries = Array.from(fd.entries())
    for (const [key, value] of entries) {
      if (value instanceof File && value.size > 0) {
        const bytes = await value.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const safeName = key.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100)
        const ext = value.name.split('.').pop() ?? 'bin'
        await writeFile(path.join(uploadDir, `${safeName}.${ext}`), buffer)
      }
    }

    return NextResponse.json({ ok: true, folder: folderName })
  } catch (err) {
    console.error('Inscription error:', err)
    return NextResponse.json({ ok: false, error: 'Erreur serveur' }, { status: 500 })
  }
}
