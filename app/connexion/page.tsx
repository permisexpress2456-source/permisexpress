'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ConnexionPage() {
  const { user, signIn, signUp, signOut } = useAuth()
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ email: '', password: '', nom: '', prenom: '', tel: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (mode === 'login') {
      const { error } = await signIn(form.email, form.password)
      if (error) { setError(error); setLoading(false); return }
      router.push('/')
    } else {
      if (!form.nom || !form.prenom || !form.tel) {
        setError('Veuillez remplir tous les champs.')
        setLoading(false)
        return
      }
      const { error } = await signUp(form.email, form.password, {
        nom: form.nom,
        prenom: form.prenom,
        tel: form.tel,
      })
      if (error) { setError(error); setLoading(false); return }
      setSuccess('Compte créé ! Vérifiez votre email si la confirmation est activée, sinon vous êtes connecté.')
    }
    setLoading(false)
  }

  if (user) {
    return (
      <main className="connexion-page">
        <div className="container" style={{ maxWidth: 480 }}>
          <div className="connexion-card">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>👤</div>
              <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--dark)', marginBottom: 8 }}>
                Vous êtes connecté
              </h1>
              <p style={{ color: 'var(--text)', fontSize: 14, marginBottom: 24 }}>{user.email}</p>
              <button onClick={() => signOut()} className="connexion-btn connexion-btn--outline">
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="connexion-page">
      <div className="container" style={{ maxWidth: 480 }}>
        <div className="connexion-card">
          <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--dark)', textAlign: 'center', marginBottom: 4 }}>
            {mode === 'login' ? 'Connexion' : 'Créer un compte'}
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--text)', fontSize: 14, marginBottom: 28 }}>
            {mode === 'login'
              ? 'Connectez-vous pour pré-remplir vos inscriptions.'
              : 'Inscrivez-vous pour gagner du temps lors de vos démarches.'}
          </p>

          <div className="connexion-tabs">
            <button className={`connexion-tab ${mode === 'login' ? 'connexion-tab--active' : ''}`} onClick={() => { setMode('login'); setError(''); setSuccess('') }}>
              Connexion
            </button>
            <button className={`connexion-tab ${mode === 'register' ? 'connexion-tab--active' : ''}`} onClick={() => { setMode('register'); setError(''); setSuccess('') }}>
              Inscription
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <>
                <div className="inscription-form__row">
                  <div className="form-group">
                    <label htmlFor="nom">Nom *</label>
                    <input id="nom" name="nom" type="text" required value={form.nom} onChange={handle} placeholder="Dupont" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prenom">Prénom *</label>
                    <input id="prenom" name="prenom" type="text" required value={form.prenom} onChange={handle} placeholder="Jean" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="tel">Téléphone *</label>
                  <input id="tel" name="tel" type="tel" required value={form.tel} onChange={handle} placeholder="+33 6 00 00 00 00" />
                </div>
              </>
            )}
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handle} placeholder="jean@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe *</label>
              <input id="password" name="password" type="password" required value={form.password} onChange={handle} placeholder="Min. 6 caractères" minLength={6} />
            </div>

            {error && <p style={{ color: 'var(--red)', fontWeight: 600, fontSize: 13, marginBottom: 12 }}>{error}</p>}
            {success && <p style={{ color: '#15803d', fontWeight: 600, fontSize: 13, marginBottom: 12 }}>{success}</p>}

            <button type="submit" className="connexion-btn" disabled={loading} style={{ width: '100%', marginTop: 8 }}>
              {loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text)', marginTop: 20 }}>
            <Link href="/" style={{ color: 'var(--blue)', fontWeight: 600 }}>← Retour à l&apos;accueil</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
