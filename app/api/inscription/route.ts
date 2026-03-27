import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ ok: false, error: 'Supabase non configuré' }, { status: 500 })
    }

    const fd = await req.formData()

    const permis = fd.get('permis') as string
    const slug = fd.get('slug') as string
    const nom = fd.get('nom') as string
    const prenom = fd.get('prenom') as string
    const email = fd.get('email') as string
    const tel = fd.get('tel') as string
    const message = fd.get('message') as string
    const transcash = fd.get('transcash') as string

    // Create unique folder name
    const timestamp = Date.now()
    const folderName = `${slug}_${nom}_${prenom}_${timestamp}`.replace(/[^a-zA-Z0-9_-]/g, '_')

    // Upload files to Supabase Storage
    const uploadedFiles: string[] = []
    const entries = Array.from(fd.entries())

    for (const [key, value] of entries) {
      if (value instanceof File && value.size > 0) {
        const bytes = await value.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const safeName = key.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100)
        const ext = value.name.split('.').pop() ?? 'bin'
        const filePath = `${folderName}/${safeName}.${ext}`

        const { error } = await supabaseAdmin.storage
          .from('inscriptions')
          .upload(filePath, buffer, {
            contentType: value.type || 'application/octet-stream',
            upsert: true,
          })

        if (!error) {
          uploadedFiles.push(`${safeName}.${ext}`)
        }
      }
    }

    // Save metadata in inscriptions table
    const { error: dbError } = await supabaseAdmin
      .from('inscriptions')
      .insert({
        folder: folderName,
        permis,
        slug,
        nom,
        prenom,
        email,
        tel,
        message,
        transcash,
        documents: uploadedFiles,
      })

    if (dbError) {
      console.error('DB insert error:', dbError)
    }

    return NextResponse.json({ ok: true, folder: folderName })
  } catch (err) {
    console.error('Inscription error:', err)
    return NextResponse.json({ ok: false, error: 'Erreur serveur' }, { status: 500 })
  }
}
