import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyAdminToken } from '../../login/route'

function getAdmin(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return null
  return verifyAdminToken(token)
}

// Update password
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdmin(req)
  if (!admin?.isSuper) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })

  const { password } = await req.json()
  if (!password || password.length < 6) {
    return NextResponse.json({ error: 'Mot de passe trop court (min 6 caractères)' }, { status: 400 })
  }

  const { data: hash } = await supabaseAdmin.rpc('hash_password', { input_password: password })

  const { error } = await supabaseAdmin
    .from('admins')
    .update({ password: hash })
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// Delete admin
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdmin(req)
  if (!admin?.isSuper) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })

  // Prevent deleting yourself
  const { data: target } = await supabaseAdmin
    .from('admins')
    .select('email')
    .eq('id', params.id)
    .single()

  if (target?.email === admin.email) {
    return NextResponse.json({ error: 'Vous ne pouvez pas vous supprimer vous-même' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('admins').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
