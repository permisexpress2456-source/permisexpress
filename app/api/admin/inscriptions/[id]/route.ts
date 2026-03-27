import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())

async function isAdmin(req: NextRequest): Promise<boolean> {
  if (!supabaseAdmin) return false
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return false
  const { data: { user } } = await supabaseAdmin.auth.getUser(token)
  if (!user?.email) return false
  return ADMIN_EMAILS.includes(user.email.toLowerCase())
}

// Update status
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await isAdmin(req)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  const body = await req.json()
  const { status } = body

  if (!['en_attente', 'validee', 'refusee'].includes(status)) {
    return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('inscriptions')
    .update({ status })
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// Delete inscription
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await isAdmin(req)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  // Get folder name to delete storage files
  const { data } = await supabaseAdmin
    .from('inscriptions')
    .select('folder')
    .eq('id', params.id)
    .single()

  if (data?.folder) {
    const { data: files } = await supabaseAdmin.storage
      .from('inscriptions')
      .list(data.folder)

    if (files?.length) {
      await supabaseAdmin.storage
        .from('inscriptions')
        .remove(files.map(f => `${data.folder}/${f.name}`))
    }
  }

  const { error } = await supabaseAdmin
    .from('inscriptions')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
