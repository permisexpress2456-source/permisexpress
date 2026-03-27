'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type Inscription = {
  id: string
  created_at: string
  folder: string
  permis: string
  slug: string
  nom: string
  prenom: string
  email: string
  tel: string
  message: string
  transcash: string
  documents: string[]
  status: string
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  en_attente: { label: 'En attente', color: '#92400e', bg: '#fffbeb' },
  validee: { label: 'Validée', color: '#166534', bg: '#f0fdf4' },
  refusee: { label: 'Refusée', color: '#991b1b', bg: '#fef2f2' },
}

export default function AdminPage() {
  const { user, loading } = useAuth()
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [error, setError] = useState('')
  const [fetching, setFetching] = useState(true)
  const [selected, setSelected] = useState<Inscription | null>(null)

  async function getToken() {
    if (!supabase) return ''
    const { data } = await supabase.auth.getSession()
    return data.session?.access_token || ''
  }

  async function fetchInscriptions() {
    const token = await getToken()
    const res = await fetch('/api/admin/inscriptions', {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) { setError('Accès refusé. Vous n\'êtes pas administrateur.'); setFetching(false); return }
    const data = await res.json()
    setInscriptions(data.inscriptions || [])
    setFetching(false)
  }

  async function updateStatus(id: string, status: string) {
    const token = await getToken()
    await fetch(`/api/admin/inscriptions/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchInscriptions()
    if (selected?.id === id) setSelected({ ...selected, status })
  }

  async function deleteInscription(id: string) {
    if (!confirm('Supprimer cette inscription définitivement ?')) return
    const token = await getToken()
    await fetch(`/api/admin/inscriptions/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setSelected(null)
    fetchInscriptions()
  }

  useEffect(() => {
    if (!loading && user) fetchInscriptions()
    if (!loading && !user) { setError('Veuillez vous connecter.'); setFetching(false) }
  }, [loading, user])

  if (loading || fetching) return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: '16px', color: 'var(--text)' }}>Chargement...</p>
    </main>
  )

  if (error) return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '48px' }}>🔒</div>
      <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--dark)' }}>{error}</p>
      <Link href="/connexion" style={{ color: 'var(--blue)', fontWeight: 600 }}>Se connecter →</Link>
    </main>
  )

  return (
    <main style={{ padding: '32px 0 80px', background: 'var(--off-white)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--dark)', margin: '0 0 4px' }}>🛡️ Administration</h1>
            <p style={{ fontSize: '13px', color: 'var(--text)', margin: 0 }}>{inscriptions.length} inscription(s)</p>
          </div>
          <button onClick={() => fetchInscriptions()} style={{ background: 'var(--blue)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
            🔄 Actualiser
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '24px' }}>
          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {inscriptions.map(ins => {
              const st = STATUS_LABELS[ins.status] || STATUS_LABELS.en_attente
              const isActive = selected?.id === ins.id
              return (
                <div key={ins.id} onClick={() => setSelected(ins)}
                  style={{ background: isActive ? 'var(--blue-pale)' : 'var(--white)', border: `2px solid ${isActive ? 'var(--blue)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', padding: '16px 20px', cursor: 'pointer', transition: 'all .15s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <p style={{ fontWeight: 800, fontSize: '15px', color: 'var(--dark)', margin: '0 0 2px' }}>{ins.prenom} {ins.nom}</p>
                      <p style={{ fontSize: '12px', color: 'var(--text)', margin: 0 }}>{ins.permis}</p>
                    </div>
                    <span style={{ background: st.bg, color: st.color, padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>{st.label}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text)' }}>
                    <span>📧 {ins.email}</span>
                    <span>📱 {ins.tel}</span>
                    <span>📅 {new Date(ins.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              )
            })}
            {inscriptions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text)' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
                <p style={{ fontWeight: 700 }}>Aucune inscription pour le moment</p>
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', position: 'sticky', top: '100px', alignSelf: 'start' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--blue-dark), var(--blue))', padding: '20px 24px', color: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '18px', fontWeight: 900, margin: '0 0 4px' }}>{selected.prenom} {selected.nom}</p>
                    <p style={{ fontSize: '13px', opacity: .8, margin: 0 }}>{selected.permis}</p>
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background: 'rgba(255,255,255,.2)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px' }}>✕</button>
                </div>
              </div>

              <div style={{ padding: '20px 24px' }}>
                {/* Info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <Detail label="Email" value={selected.email} />
                  <Detail label="Téléphone" value={selected.tel} />
                  <Detail label="Date" value={new Date(selected.created_at).toLocaleString('fr-FR')} />
                  <Detail label="Dossier" value={selected.folder} />
                </div>
                {selected.message && (
                  <div style={{ marginBottom: '20px' }}>
                    <Detail label="Message" value={selected.message} />
                  </div>
                )}

                {/* Transcash */}
                {selected.transcash && (
                  <div style={{ background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: 'var(--radius)', padding: '12px', marginBottom: '20px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#92400e', marginBottom: '6px' }}>💳 CODES TRANSCASH</p>
                    <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '13px', color: '#78350f', whiteSpace: 'pre-wrap' }}>{selected.transcash}</pre>
                  </div>
                )}

                {/* Documents */}
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>📋 Documents ({selected.documents?.length || 0})</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {(selected.documents || []).map((doc, i) => (
                      <a key={i} href={`/api/dossier/${selected.folder}/${doc}`} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--off-white)', borderRadius: 'var(--radius)', fontSize: '12px', color: 'var(--blue)', fontWeight: 600, textDecoration: 'none' }}>
                        📄 {doc}
                      </a>
                    ))}
                  </div>
                  <a href={`/dossier/${selected.folder}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', marginTop: '10px', fontSize: '12px', color: 'var(--blue)', fontWeight: 700 }}>
                    🔗 Voir le dossier complet →
                  </a>
                </div>

                {/* Status actions */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Changer le statut</p>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    {Object.entries(STATUS_LABELS).map(([key, val]) => (
                      <button key={key} onClick={() => updateStatus(selected.id, key)}
                        style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius)', border: selected.status === key ? '2px solid var(--blue)' : '1px solid var(--border)', background: val.bg, color: val.color, fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
                        {val.label}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => deleteInscription(selected.id)}
                    style={{ width: '100%', padding: '10px', background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                    🗑️ Supprimer cette inscription
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>{label}</p>
      <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dark)', margin: 0, wordBreak: 'break-all' }}>{value}</p>
    </div>
  )
}
