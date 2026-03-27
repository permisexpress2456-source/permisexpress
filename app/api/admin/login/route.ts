import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { setAdminToken } from '@/lib/adminAuth'
import { randomBytes } from 'crypto'

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase non configuré' }, { status: 500 })
  }

  const { email, password } = await req.json()

  const { data, error } = await supabaseAdmin
    .from('admins')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
  }

  const { data: match } = await supabaseAdmin.rpc('verify_admin_password', {
    input_password: password,
    hashed_password: data.password,
  })

  if (!match) {
    return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
  }

  const token = randomBytes(32).toString('hex')
  setAdminToken(token, { email: data.email, isSuper: data.is_super })

  return NextResponse.json({ ok: true, token, admin: { email: data.email, nom: data.nom, isSuper: data.is_super } })
}
