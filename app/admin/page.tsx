'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Inscription = {
  id: string; created_at: string; folder: string; permis: string; slug: string
  nom: string; prenom: string; email: string; tel: string; message: string
  transcash: string; documents: string[]; status: string
}
type Admin = { id: string; email: string; nom: string; is_super: boolean; created_at: string }

// Type Offer - Exigences: 1.1, 2.1, 3.1
type Offer = {
  id: string
  slug: string
  title: string
  price: string
  description: string
  documents: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  en_attente: { label: 'En attente', color: '#92400e', bg: '#fffbeb' },
  validee: { label: 'Validée', color: '#166534', bg: '#f0fdf4' },
  refusee: { label: 'Refusée', color: '#991b1b', bg: '#fef2f2' },
}

function normalizeStatus(raw: string): string {
  const s = raw.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  if (s.includes('valid')) return 'validee'
  if (s.includes('refus')) return 'refusee'
  return 'en_attente'
}

export default function AdminPage() {
  const [token, setToken] = useState('')
  const [adminInfo, setAdminInfo] = useState<{ email: string; nom: string; isSuper: boolean } | null>(null)
  const [tab, setTab] = useState<'inscriptions' | 'admins' | 'offers'>('inscriptions')
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [admins, setAdmins] = useState<Admin[]>([])
  const [selected, setSelected] = useState<Inscription | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Offers state - Exigences: 1.1
  const [offers, setOffers] = useState<Offer[]>([])
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [showOfferForm, setShowOfferForm] = useState(false)
  const [offerFormData, setOfferFormData] = useState({ slug: '', title: '', price: '', description: '', documents: [''], is_active: true })
  const [offerSortBy, setOfferSortBy] = useState<'title' | 'created_at'>('created_at')
  const [offerSortOrder, setOfferSortOrder] = useState<'asc' | 'desc'>('desc')
  const [editingOffer, setEditingOffer] = useState(false)
  const [editOfferData, setEditOfferData] = useState({ slug: '', title: '', price: '', description: '', documents: [''], is_active: true })

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
    const saved = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token')
    const savedInfo = localStorage.getItem('admin_info') || sessionStorage.getItem('admin_info')
    if (saved && savedInfo) {
      setToken(saved)
      setAdminInfo(JSON.parse(savedInfo))
      // Migrate from sessionStorage to localStorage
      localStorage.setItem('admin_token', saved)
      localStorage.setItem('admin_info', savedInfo)
      sessionStorage.removeItem('admin_token')
      sessionStorage.removeItem('admin_info')
    }
  }, [])

  useEffect(() => {
    if (token) { fetchInscriptions(); fetchOffers(); if (adminInfo?.isSuper) fetchAdmins() }
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
    localStorage.setItem('admin_token', data.token)
    localStorage.setItem('admin_info', JSON.stringify(data.admin))
  }

  function logout() {
    setToken(''); setAdminInfo(null)
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_info')
    sessionStorage.removeItem('admin_token')
    sessionStorage.removeItem('admin_info')
  }

  async function fetchInscriptions() {
    setLoading(true)
    const res = await fetch('/api/admin/inscriptions', { headers, cache: 'no-store' })
    if (res.ok) { const d = await res.json(); setInscriptions(d.inscriptions || []) }
    else { setError('Erreur de chargement'); logout() }
    setLoading(false)
  }

  async function fetchAdmins() {
    const res = await fetch('/api/admin/users', { headers })
    if (res.ok) { const d = await res.json(); setAdmins(d.admins || []) }
  }

  // Offers CRUD - Exigences: 6.1, 6.2, 6.3, 6.4
  async function fetchOffers() {
    const res = await fetch(`/api/admin/offers?sortBy=${offerSortBy}&sortOrder=${offerSortOrder}`, { headers, cache: 'no-store' })
    if (res.ok) { const d = await res.json(); setOffers(d.offers || []) }
  }

  async function createOffer(e: React.FormEvent) {
    e.preventDefault()
    const docs = offerFormData.documents.filter(d => d.trim())
    const res = await fetch('/api/admin/offers', {
      method: 'POST', headers,
      body: JSON.stringify({ ...offerFormData, documents: docs })
    })
    const d = await res.json()
    if (!res.ok) { alert(d.error); return }
    setShowOfferForm(false)
    resetOfferForm()
    fetchOffers()
  }

  async function updateOffer(id: string, data: Partial<Offer>) {
    const res = await fetch(`/api/admin/offers/${id}`, { method: 'PATCH', headers, body: JSON.stringify(data) })
    const d = await res.json()
    if (!res.ok) { alert(d.error); return }
    fetchOffers()
    if (selectedOffer?.id === id) setSelectedOffer({ ...selectedOffer, ...data })
  }

  async function deleteOffer(id: string) {
    if (!confirm('Supprimer cette offre ?')) return
    const res = await fetch(`/api/admin/offers/${id}`, { method: 'DELETE', headers })
    const d = await res.json()
    if (!res.ok) { alert(d.error); return }
    setSelectedOffer(null)
    fetchOffers()
  }

  function resetOfferForm() {
    setOfferFormData({ slug: '', title: '', price: '', description: '', documents: [''], is_active: true })
  }

  function addDocumentField() {
    setOfferFormData({ ...offerFormData, documents: [...offerFormData.documents, ''] })
  }

  function removeDocumentField(index: number) {
    const docs = offerFormData.documents.filter((_, i) => i !== index)
    setOfferFormData({ ...offerFormData, documents: docs.length ? docs : [''] })
  }

  function updateDocumentField(index: number, value: string) {
    const docs = [...offerFormData.documents]
    docs[index] = value
    setOfferFormData({ ...offerFormData, documents: docs })
  }

  function startEditOffer(offer: Offer) {
    setEditOfferData({
      slug: offer.slug,
      title: offer.title,
      price: offer.price,
      description: offer.description || '',
      documents: offer.documents?.length ? [...offer.documents] : [''],
      is_active: offer.is_active
    })
    setEditingOffer(true)
  }

  function cancelEditOffer() {
    setEditingOffer(false)
  }

  async function saveEditOffer(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedOffer) return
    const docs = editOfferData.documents.filter(d => d.trim())
    const res = await fetch(`/api/admin/offers/${selectedOffer.id}`, {
      method: 'PATCH', headers,
      body: JSON.stringify({ ...editOfferData, documents: docs })
    })
    const d = await res.json()
    if (!res.ok) { alert(d.error); return }
    setEditingOffer(false)
    fetchOffers()
    setSelectedOffer({ ...selectedOffer, ...editOfferData, documents: docs })
  }

  function addEditDocumentField() {
    setEditOfferData({ ...editOfferData, documents: [...editOfferData.documents, ''] })
  }

  function removeEditDocumentField(index: number) {
    const docs = editOfferData.documents.filter((_, i) => i !== index)
    setEditOfferData({ ...editOfferData, documents: docs.length ? docs : [''] })
  }

  function updateEditDocumentField(index: number, value: string) {
    const docs = [...editOfferData.documents]
    docs[index] = value
    setEditOfferData({ ...editOfferData, documents: docs })
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
          <button onClick={() => setTab('offers')}
            style={{ padding: '8px 20px', borderRadius: 'var(--radius)', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', background: tab === 'offers' ? 'var(--blue)' : 'transparent', color: tab === 'offers' ? '#fff' : 'var(--text)' }}>
            🏷️ Offres ({offers.length})
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
                const st = STATUS_LABELS[normalizeStatus(ins.status)]
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
                          style={{ flex: 1, padding: '6px', borderRadius: 'var(--radius)', border: normalizeStatus(selected.status) === key ? '2px solid var(--blue)' : '1px solid var(--border)', background: val.bg, color: val.color, fontWeight: 700, fontSize: '10px', cursor: 'pointer' }}>
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

        {/* ── OFFERS TAB ── */}
        {tab === 'offers' && (
          <div>
            {/* Toolbar: Add button + Sort */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <button onClick={() => { resetOfferForm(); setShowOfferForm(true); setSelectedOffer(null) }}
                style={{ background: 'var(--blue)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                ➕ Ajouter une offre
              </button>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--text)' }}>Trier par:</span>
                <button onClick={() => { setOfferSortBy('title'); fetchOffers() }}
                  style={{ padding: '6px 12px', borderRadius: 'var(--radius)', border: offerSortBy === 'title' ? '2px solid var(--blue)' : '1px solid var(--border)', background: 'var(--white)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  Titre
                </button>
                <button onClick={() => { setOfferSortBy('created_at'); fetchOffers() }}
                  style={{ padding: '6px 12px', borderRadius: 'var(--radius)', border: offerSortBy === 'created_at' ? '2px solid var(--blue)' : '1px solid var(--border)', background: 'var(--white)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  Date
                </button>
                <button onClick={() => { setOfferSortOrder(offerSortOrder === 'asc' ? 'desc' : 'asc'); fetchOffers() }}
                  style={{ padding: '6px 10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--white)', fontSize: '12px', cursor: 'pointer' }}>
                  {offerSortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>

            {/* Offer Form Modal */}
            {showOfferForm && (
              <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--border)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--dark)', margin: 0 }}>➕ Nouvelle offre</h3>
                  <button onClick={() => setShowOfferForm(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: 'var(--text)' }}>✕</button>
                </div>
                <form onSubmit={createOffer}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '4px' }}>Slug *</label>
                      <input type="text" value={offerFormData.slug} onChange={e => setOfferFormData({ ...offerFormData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} required placeholder="permis-b"
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '4px' }}>Titre *</label>
                      <input type="text" value={offerFormData.title} onChange={e => setOfferFormData({ ...offerFormData, title: e.target.value })} required placeholder="Permis B — Voiture"
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '4px' }}>Prix *</label>
                      <input type="text" value={offerFormData.price} onChange={e => setOfferFormData({ ...offerFormData, price: e.target.value })} required placeholder="850€"
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '20px' }}>
                      <input type="checkbox" id="is_active" checked={offerFormData.is_active} onChange={e => setOfferFormData({ ...offerFormData, is_active: e.target.checked })} />
                      <label htmlFor="is_active" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dark)' }}>Offre active</label>
                    </div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '4px' }}>Description</label>
                    <textarea value={offerFormData.description} onChange={e => setOfferFormData({ ...offerFormData, description: e.target.value })} rows={3} placeholder="Description de l'offre..."
                      style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical' }} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>Documents requis</label>
                    {offerFormData.documents.map((doc, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <input type="text" value={doc} onChange={e => updateDocumentField(i, e.target.value)} placeholder="Document requis..."
                          style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '12px' }} />
                        <button type="button" onClick={() => removeDocumentField(i)} style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '8px 12px', borderRadius: 'var(--radius)', color: '#991b1b', cursor: 'pointer' }}>✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={addDocumentField} style={{ background: 'var(--off-white)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: 'var(--radius)', fontSize: '11px', fontWeight: 600, cursor: 'pointer', color: 'var(--blue)' }}>
                      + Ajouter un document
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="submit" style={{ background: 'var(--blue)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                      Créer l'offre
                    </button>
                    <button type="button" onClick={() => setShowOfferForm(false)} style={{ background: 'var(--off-white)', color: 'var(--dark)', border: '1px solid var(--border)', padding: '10px 24px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Offers List + Detail */}
            <div style={{ display: 'grid', gridTemplateColumns: selectedOffer ? '1fr 1fr' : '1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {offers.map(offer => {
                  const active = selectedOffer?.id === offer.id
                  return (
                    <div key={offer.id} onClick={() => { setSelectedOffer(offer); setShowOfferForm(false) }}
                      style={{ background: active ? 'var(--blue-pale)' : 'var(--white)', border: `2px solid ${active ? 'var(--blue)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', padding: '14px 18px', cursor: 'pointer' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                        <div>
                          <p style={{ fontWeight: 800, fontSize: '14px', color: 'var(--dark)', margin: '0 0 2px' }}>{offer.title}</p>
                          <p style={{ fontSize: '12px', color: 'var(--text)', margin: 0 }}>{offer.slug}</p>
                        </div>
                        <span style={{ background: offer.is_active ? '#f0fdf4' : '#fef2f2', color: offer.is_active ? '#166534' : '#991b1b', padding: '3px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 700 }}>
                          {offer.is_active ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text)', flexWrap: 'wrap' }}>
                        <span>💰 {offer.price}</span>
                        <span>📅 {new Date(offer.created_at).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  )
                })}
                {offers.length === 0 && !loading && (
                  <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text)' }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏷️</div>
                    <p style={{ fontWeight: 700 }}>Aucune offre</p>
                    <p style={{ fontSize: '12px' }}>Cliquez sur "Ajouter une offre" pour commencer</p>
                  </div>
                )}
              </div>

              {/* Offer Detail Panel */}
              {selectedOffer && (
                <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', position: 'sticky', top: '100px', alignSelf: 'start' }}>
                  <div style={{ background: 'linear-gradient(135deg, var(--blue-dark), var(--blue))', padding: '18px 22px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: 900, margin: '0 0 2px' }}>{selectedOffer.title}</p>
                      <p style={{ fontSize: '12px', opacity: .8, margin: 0 }}>{selectedOffer.slug}</p>
                    </div>
                    <button onClick={() => { setSelectedOffer(null); setEditingOffer(false) }} style={{ background: 'rgba(255,255,255,.2)', border: 'none', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                  </div>
                  <div style={{ padding: '18px 22px' }}>
                    {/* Mode édition */}
                    {editingOffer ? (
                      <form onSubmit={saveEditOffer}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                          <div>
                            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '4px' }}>Slug *</label>
                            <input type="text" value={editOfferData.slug} onChange={e => setEditOfferData({ ...editOfferData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} required
                              style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px', boxSizing: 'border-box' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '4px' }}>Titre *</label>
                            <input type="text" value={editOfferData.title} onChange={e => setEditOfferData({ ...editOfferData, title: e.target.value })} required
                              style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px', boxSizing: 'border-box' }} />
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                          <div>
                            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '4px' }}>Prix *</label>
                            <input type="text" value={editOfferData.price} onChange={e => setEditOfferData({ ...editOfferData, price: e.target.value })} required
                              style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px', boxSizing: 'border-box' }} />
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '20px' }}>
                            <input type="checkbox" id="edit_is_active" checked={editOfferData.is_active} onChange={e => setEditOfferData({ ...editOfferData, is_active: e.target.checked })} />
                            <label htmlFor="edit_is_active" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dark)' }}>Offre active</label>
                          </div>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '4px' }}>Description</label>
                          <textarea value={editOfferData.description} onChange={e => setEditOfferData({ ...editOfferData, description: e.target.value })} rows={3}
                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical' }} />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>Documents requis</label>
                          {editOfferData.documents.map((doc, i) => (
                            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                              <input type="text" value={doc} onChange={e => updateEditDocumentField(i, e.target.value)} placeholder="Document requis..."
                                style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '12px' }} />
                              <button type="button" onClick={() => removeEditDocumentField(i)} style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '8px 12px', borderRadius: 'var(--radius)', color: '#991b1b', cursor: 'pointer' }}>✕</button>
                            </div>
                          ))}
                          <button type="button" onClick={addEditDocumentField} style={{ background: 'var(--off-white)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: 'var(--radius)', fontSize: '11px', fontWeight: 600, cursor: 'pointer', color: 'var(--blue)' }}>
                            + Ajouter un document
                          </button>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button type="submit" style={{ background: 'var(--blue)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                            💾 Enregistrer
                          </button>
                          <button type="button" onClick={cancelEditOffer} style={{ background: 'var(--off-white)', color: 'var(--dark)', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                            Annuler
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        {/* Mode affichage */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                          <Detail label="Prix" value={selectedOffer.price} />
                          <Detail label="Statut" value={selectedOffer.is_active ? 'Actif' : 'Inactif'} />
                          <Detail label="Créé le" value={new Date(selectedOffer.created_at).toLocaleString('fr-FR')} />
                          <Detail label="Modifié le" value={new Date(selectedOffer.updated_at).toLocaleString('fr-FR')} />
                        </div>
                        {selectedOffer.description && (
                          <div style={{ marginBottom: '16px' }}>
                            <Detail label="Description" value={selectedOffer.description} />
                          </div>
                        )}
                        <div style={{ marginBottom: '16px' }}>
                          <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>📋 Documents requis ({selectedOffer.documents?.length || 0})</p>
                          {(selectedOffer.documents || []).map((doc, i) => (
                            <p key={i} style={{ padding: '6px 10px', background: 'var(--off-white)', borderRadius: 'var(--radius)', fontSize: '11px', color: 'var(--dark)', marginBottom: '4px' }}>
                              📄 {doc}
                            </p>
                          ))}
                          {(!selectedOffer.documents || selectedOffer.documents.length === 0) && (
                            <p style={{ fontSize: '11px', color: 'var(--text)', fontStyle: 'italic' }}>Aucun document requis</p>
                          )}
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                          <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Actions</p>
                          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                            <button onClick={() => startEditOffer(selectedOffer)}
                              style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--blue)', color: '#fff', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
                              ✏️ Modifier
                            </button>
                            <button onClick={() => updateOffer(selectedOffer.id, { is_active: !selectedOffer.is_active })}
                              style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: selectedOffer.is_active ? '#fef2f2' : '#f0fdf4', color: selectedOffer.is_active ? '#991b1b' : '#166534', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
                              {selectedOffer.is_active ? '🔴 Désactiver' : '🟢 Activer'}
                            </button>
                          </div>
                          <button onClick={() => deleteOffer(selectedOffer.id)}
                            style={{ width: '100%', padding: '8px', background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
                            🗑️ Supprimer
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
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
