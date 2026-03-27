const tokens = new Map<string, { email: string; isSuper: boolean; expires: number }>()

export function verifyAdminToken(token: string) {
  const session = tokens.get(token)
  if (!session) return null
  if (Date.now() > session.expires) { tokens.delete(token); return null }
  return session
}

export function setAdminToken(token: string, data: { email: string; isSuper: boolean }) {
  tokens.set(token, { ...data, expires: Date.now() + 24 * 60 * 60 * 1000 })
}
