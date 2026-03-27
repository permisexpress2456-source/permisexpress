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

export async function GET(req: NextRequest) {
  if (!await isAdmin(req)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  const { data, error } = await supabaseAdmin
    .from('inscriptions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ inscriptions: data })
}
