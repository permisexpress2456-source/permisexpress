import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { randomBytes } from 'crypto'

// Simple token store (in production, use Redis or DB)
// For now, tokens are stored in memory — they reset on redeploy
const tokens = new Map<string, { email: string; isSuper: boolean; expires: number }>()

export function verifyAdminToken(token: string) {
  const session = tokens.get(token)
  if (!session) return null
  if (Date.now() > session.expires) { tokens.delete(token); return null }
  return session
}

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

  // Verify password using pgcrypto
  const { data: match } = await supabaseAdmin.rpc('verify_admin_password', {
    input_password: password,
    hashed_password: data.password,
  })

  if (!match) {
    return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
  }

  // Generate token
  const token = randomBytes(32).toString('hex')
  tokens.set(token, {
    email: data.email,
    isSuper: data.is_super,
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24h
  })

  return NextResponse.json({ ok: true, token, admin: { email: data.email, nom: data.nom, isSuper: data.is_super } })
}
