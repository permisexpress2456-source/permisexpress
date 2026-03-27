import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyAdminToken } from '@/lib/adminAuth'

function checkAdmin(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  return token ? verifyAdminToken(token) : null
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAdmin(req)) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })

  const { status } = await req.json()
  if (!['en_attente', 'validee', 'refusee'].includes(status)) {
    return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('inscriptions').update({ status }).eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAdmin(req)) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })

  const { data } = await supabaseAdmin.from('inscriptions').select('folder').eq('id', params.id).single()
  if (data?.folder) {
    const { data: files } = await supabaseAdmin.storage.from('inscriptions').list(data.folder)
    if (files?.length) {
      await supabaseAdmin.storage.from('inscriptions').remove(files.map(f => `${data.folder}/${f.name}`))
    }
  }

  const { error } = await supabaseAdmin.from('inscriptions').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
