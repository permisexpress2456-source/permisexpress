import { supabaseAdmin } from './supabaseAdmin'

export async function verifyAdminToken(token: string): Promise<{ email: string; isSuper: boolean } | null> {
  if (!supabaseAdmin || !token) return null

  const { data } = await supabaseAdmin
    .from('admin_sessions')
    .select('email, is_super, expires_at')
    .eq('token', token)
    .single()

  if (!data) return null
  if (new Date(data.expires_at) < new Date()) {
    await supabaseAdmin.from('admin_sessions').delete().eq('token', token)
    return null
  }

  return { email: data.email, isSuper: data.is_super }
}

export async function setAdminToken(token: string, data: { email: string; isSuper: boolean }) {
  if (!supabaseAdmin) return
  const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

  await supabaseAdmin.from('admin_sessions').insert({
    token,
    email: data.email,
    is_super: data.isSuper,
    expires_at,
  })
}
