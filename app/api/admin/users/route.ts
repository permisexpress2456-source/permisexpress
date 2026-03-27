import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyAdminToken } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

async function getAdmin(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return null
  return await verifyAdminToken(token)
}

export async function GET(req: NextRequest) {
  const admin = await getAdmin(req)
  if (!admin?.isSuper) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })

  const { data } = await supabaseAdmin
    .from('admins')
    .select('id, email, nom, is_super, created_at')
    .order('created_at')

  return NextResponse.json({ admins: data || [] })
}

export async function POST(req: NextRequest) {
  const admin = await getAdmin(req)
  if (!admin?.isSuper) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })

  const { email, password, nom } = await req.json()
  if (!email || !password) return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 })

  const { data: hash } = await supabaseAdmin.rpc('hash_password', { input_password: password })

  const { error } = await supabaseAdmin
    .from('admins')
    .insert({ email: email.toLowerCase().trim(), password: hash, nom: nom || '' })

  if (error) {
    if (error.code === '23505') return NextResponse.json({ error: 'Cet email existe déjà' }, { status: 400 })
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
