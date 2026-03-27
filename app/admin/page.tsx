'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Inscription = {
  id: string; created_at: string; folder: string; permis: string; slug: string
  nom: string; prenom: string; email: string; tel: string; message: string
  transcash: string; documents: string[]; status: string
}
type Admin = { id: string; email: string; nom: string; is_super: boolean; created_at: string }

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  en_attente: { label: 'En attente', color: '#92400e', bg: '#fffbeb' },
  validee: { label: 'Validée', color: '#166534', bg: '#f0fdf4' },
  refusee: { label: 'Refusée', color: '#991b1b', bg: '#fef2f2' },
}

export default function AdminPage() {
  const [token, setToken] = useState('')
  const [adminInfo, setAdminInfo] = useState<{ email: string; nom: string; isSuper: boolean } | null>(null)
  const [tab, setTab] = useState<'inscriptions' | 'admins'>('inscriptions')
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [admins, setAdmins] = useState<Admin[]>([])
  const [selected, setSelected] = useState<Inscription | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Login form
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [showLoginPass, setShowLoginPass] = useState(false)

  // Add admin form
  const [newEmail, setNewEmail] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newNom, setNewNom] = useState('')

  // Change password
  const [editId, setEditId] = useState('')
  const [editPass, setEditPass] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_token')
    const savedInfo = sessionStorage.getItem('admin_info')
    if (saved && savedInfo) {
      setToken(saved)
      setAdminInfo(JSON.parse(savedInfo))
    }
  }, [])

  useEffect(() => {
    if (token) { fetchInscriptions(); if (adminInfo?.isSuper) fetchAdmins() }
  }, [token])

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setLoggingIn(true); setLoginError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPass }),
    })
    const data = await res.json()
    setLoggingIn(false)
    if (!res.ok) { setLoginError(data.error); return }
    setToken(data.token)
    setAdminInfo(data.admin)
    sessionStorage.setItem('admin_token', data.token)
    sessionStorage.setItem('admin_info', JSON.stringify(data.admin))
  }

  function logout() {
    setToken(''); setAdminInfo(null)
    sessionStorage.removeItem('admin_token')
    sessionStorage.removeItem('admin_info')
  }

  async function fetchInscriptions() {
    setLoading(true)
    const res = await fetch('/api/admin/inscriptions', { headers })
    if (res.ok) { const d = await res.json(); setInscriptions(d.inscriptions || []) }
    else { setError('Erreur de chargement'); logout() }
    setLoading(false)
  }

  async function fetchAdmins() {
    const res = await fetch('/api/admin/users', { headers })
    if (res.ok) { const d = await res.json(); setAdmins(d.admins || []) }
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/inscriptions/${id}`, { method: 'PATCH', headers, body: JSON.stringify({ status }) })
    fetchInscriptions()
    if (selected?.id === id) setSelected({ ...selected, status })
  }

  async function deleteInscription(id: string) {
    if (!confirm('Supprimer cette inscription ?')) return
    const res = await fetch(`/api/admin/inscriptions/${id}`, { method: 'DELETE', headers })
    const data = await res.json()
    if (!res.ok) { alert('Erreur: ' + (data.error || 'Suppression échouée')); return }
    setSelected(null); fetchInscriptions()
  }

  async function addAdmin(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/admin/users', { method: 'POST', headers, body: JSON.stringify({ email: newEmail, password: newPass, nom: newNom }) })
    const d = await res.json()
    if (!res.ok) { alert(d.error); return }
    setNewEmail(''); setNewPass(''); setNewNom(''); fetchAdmins()
  }

  async function changePassword(id: string) {
    if (!editPass || editPass.length < 6) { alert('Min 6 caractères'); return }
    await fetch(`/api/admin/users/${id}`, { method: 'PATCH', headers, body: JSON.stringify({ password: editPass }) })
    setEditId(''); setEditPass(''); alert('Mot de passe modifié')
  }

  async function deleteAdmin(id: string) {
    if (!confirm('Supprimer cet admin ?')) return
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE', headers })
    const d = await res.json()
    if (!res.ok) { alert(d.error); return }
    fetchAdmins()
  }

  // ── LOGIN SCREEN ──
  if (!token) return (
    <main style={{ minHeight: '100vh', background: 'var(--off-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={login} style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🛡️</div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--dark)', margin: '0 0 4px' }}>Administration</h1>
          <p style={{ fontSize: '13px', color: 'var(--text)', margin: 0 }}>Permisexpress.fr</p>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--dark)', display: 'block', marginBottom: '6px' }}>Email</label>
          <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required
            style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '14px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--dark)', display: 'block', marginBottom: '6px' }}>Mot de passe</label>
          <div style={{ position: 'relative' }}>
            <input type={showLoginPass ? 'text' : 'password'} value={loginPass} onChange={e => setLoginPass(e.target.value)} required
              style={{ width: '100%', padding: '12px', paddingRight: '44px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '14px', boxSizing: 'border-box' }} />
            <button type="button" onClick={() => setShowLoginPass(!showLoginPass)}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '4px' }}
              aria-label={showLoginPass ? 'Masquer' : 'Afficher'}>
              {showLoginPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        {loginError && <p style={{ color: 'var(--red)', fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>{loginError}</p>}
        <button type="submit" disabled={loggingIn}
          style={{ width: '100%', padding: '14px', background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontWeight: 800, fontSize: '15px', cursor: loggingIn ? 'not-allowed' : 'pointer' }}>
          {loggingIn ? 'Connexion...' : 'Se connecter'}
        </button>
        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px' }}>
          <Link href="/" style={{ color: 'var(--blue)' }}>← Retour au site</Link>
        </p>
      </form>
    </main>
  )

  // ── ADMIN DASHBOARD ──
  return (
    <main style={{ padding: '24px 0 80px', background: 'var(--off-white)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--dark)', margin: '0 0 4px' }}>🛡️ Administration</h1>
            <p style={{ fontSize: '12px', color: 'var(--text)', margin: 0 }}>Connecté : {adminInfo?.email}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={fetchInscriptions} style={{ background: 'var(--blue)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>🔄 Actualiser</button>
            <button onClick={logout} style={{ background: 'var(--off-white)', color: 'var(--dark)', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>Déconnexion</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: 'var(--white)', borderRadius: 'var(--radius)', padding: '4px', border: '1px solid var(--border)', width: 'fit-content' }}>
          <button onClick={() => setTab('inscriptions')}
            style={{ padding: '8px 20px', borderRadius: 'var(--radius)', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', background: tab === 'inscriptions' ? 'var(--blue)' : 'transparent', color: tab === 'inscriptions' ? '#fff' : 'var(--text)' }}>
            📋 Inscriptions ({inscriptions.length})
          </button>
          {adminInfo?.isSuper && (
            <button onClick={() => setTab('admins')}
              style={{ padding: '8px 20px', borderRadius: 'var(--radius)', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', background: tab === 'admins' ? 'var(--blue)' : 'transparent', color: tab === 'admins' ? '#fff' : 'var(--text)' }}>
              👥 Administrateurs ({admins.length})
            </button>
          )}
        </div>

        {loading && <p style={{ color: 'var(--text)' }}>Chargement...</p>}
        {error && <p style={{ color: 'var(--red)' }}>{error}</p>}

        {/* ── INSCRIPTIONS TAB ── */}
        {tab === 'inscriptions' && (
          <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {inscriptions.map(ins => {
                const st = STATUS_LABELS[ins.status] || STATUS_LABELS.en_attente
                const active = selected?.id === ins.id
                return (
                  <div key={ins.id} onClick={() => setSelected(ins)}
                    style={{ background: active ? 'var(--blue-pale)' : 'var(--white)', border: `2px solid ${active ? 'var(--blue)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', padding: '14px 18px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div>
                        <p style={{ fontWeight: 800, fontSize: '14px', color: 'var(--dark)', margin: '0 0 2px' }}>{ins.prenom} {ins.nom}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text)', margin: 0 }}>{ins.permis}</p>
                      </div>
                      <span style={{ background: st.bg, color: st.color, padding: '3px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 700 }}>{st.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text)', flexWrap: 'wrap' }}>
                      <span>📧 {ins.email}</span>
                      <span>📱 {ins.tel}</span>
                      <span>📅 {new Date(ins.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                )
              })}
              {inscriptions.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text)' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
                  <p style={{ fontWeight: 700 }}>Aucune inscription</p>
                </div>
              )}
            </div>

            {/* Detail panel */}
            {selected && (
              <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', position: 'sticky', top: '100px', alignSelf: 'start' }}>
                <div style={{ background: 'linear-gradient(135deg, var(--blue-dark), var(--blue))', padding: '18px 22px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 900, margin: '0 0 2px' }}>{selected.prenom} {selected.nom}</p>
                    <p style={{ fontSize: '12px', opacity: .8, margin: 0 }}>{selected.permis}</p>
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background: 'rgba(255,255,255,.2)', border: 'none', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                </div>
                <div style={{ padding: '18px 22px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                    <Detail label="Email" value={selected.email} />
                    <Detail label="Téléphone" value={selected.tel} />
                    <Detail label="Date" value={new Date(selected.created_at).toLocaleString('fr-FR')} />
                    <Detail label="Dossier" value={selected.folder} />
                  </div>
                  {selected.message && <div style={{ marginBottom: '16px' }}><Detail label="Message" value={selected.message} /></div>}
                  {selected.transcash && (
                    <div style={{ background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: 'var(--radius)', padding: '10px', marginBottom: '16px' }}>
                      <p style={{ fontSize: '10px', fontWeight: 700, color: '#92400e', marginBottom: '4px' }}>💳 CODES TRANSCASH</p>
                      <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '12px', color: '#78350f', whiteSpace: 'pre-wrap' }}>{selected.transcash}</pre>
                    </div>
                  )}
                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>📋 Documents ({selected.documents?.length || 0})</p>
                    {(selected.documents || []).map((doc, i) => (
                      <a key={i} href={`/api/dossier/${selected.folder}/${doc}`} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'block', padding: '6px 10px', background: 'var(--off-white)', borderRadius: 'var(--radius)', fontSize: '11px', color: 'var(--blue)', fontWeight: 600, textDecoration: 'none', marginBottom: '4px' }}>
                        📄 {doc}
                      </a>
                    ))}
                    <a href={`/dossier/${selected.folder}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'var(--blue)', fontWeight: 700, marginTop: '6px', display: 'inline-block' }}>🔗 Dossier complet →</a>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Statut</p>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                      {Object.entries(STATUS_LABELS).map(([key, val]) => (
                        <button key={key} onClick={() => updateStatus(selected.id, key)}
                          style={{ flex: 1, padding: '6px', borderRadius: 'var(--radius)', border: selected.status === key ? '2px solid var(--blue)' : '1px solid var(--border)', background: val.bg, color: val.color, fontWeight: 700, fontSize: '10px', cursor: 'pointer' }}>
                          {val.label}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => deleteInscription(selected.id)}
                      style={{ width: '100%', padding: '8px', background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ADMINS TAB ── */}
        {tab === 'admins' && adminInfo?.isSuper && (
          <div style={{ maxWidth: '700px' }}>
            {/* Add admin form */}
            <form onSubmit={addAdmin} style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '20px', border: '1px solid var(--border)', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--dark)', marginBottom: '14px' }}>➕ Ajouter un administrateur</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <input type="email" placeholder="Email *" value={newEmail} onChange={e => setNewEmail(e.target.value)} required
                  style={{ padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px' }} />
                <input type="password" placeholder="Mot de passe *" value={newPass} onChange={e => setNewPass(e.target.value)} required
                  style={{ padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px' }} />
                <input type="text" placeholder="Nom" value={newNom} onChange={e => setNewNom(e.target.value)}
                  style={{ padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px' }} />
              </div>
              <button type="submit" style={{ background: 'var(--blue)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                Ajouter
              </button>
            </form>

            {/* Admin list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {admins.map(a => (
                <div key={a.id} style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: editId === a.id ? '12px' : '0' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--dark)', margin: '0 0 2px' }}>
                        {a.nom || a.email}
                        {a.is_super && <span style={{ marginLeft: '8px', fontSize: '10px', background: '#fffbeb', color: '#92400e', padding: '2px 6px', borderRadius: '10px', fontWeight: 700 }}>Super Admin</span>}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--text)', margin: 0 }}>{a.email}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => { setEditId(editId === a.id ? '' : a.id); setEditPass('') }}
                        style={{ background: 'var(--off-white)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: 'var(--radius)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', color: 'var(--blue)' }}>
                        🔑 Mot de passe
                      </button>
                      {!a.is_super && (
                        <button onClick={() => deleteAdmin(a.id)}
                          style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '6px 12px', borderRadius: 'var(--radius)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', color: '#991b1b' }}>
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                  {editId === a.id && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="password" placeholder="Nouveau mot de passe (min 6)" value={editPass} onChange={e => setEditPass(e.target.value)}
                        style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px' }} />
                      <button onClick={() => changePassword(a.id)}
                        style={{ background: 'var(--blue)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                        Enregistrer
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
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
