'use client'
import { useState, useRef, useEffect } from 'react'
import type { PermisInfo } from '@/lib/permisData'
import { useAuth } from '@/context/AuthContext'

const WA_NUMBER = '33757754774'

export default function InscriptionForm({ permis, slug }: { permis: PermisInfo; slug: string }) {
  const { user, profile } = useAuth()
  const [step, setStep] = useState<'form' | 'payment' | 'done'>('form')
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', tel: '', message: '' })
  const [files, setFiles] = useState<Record<string, File | null>>({})
  const [transcash, setTranscash] = useState('')
  const [ticketImages, setTicketImages] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [finalWaText, setFinalWaText] = useState('')

  // Pré-remplir les champs si l'utilisateur est connecté
  useEffect(() => {
    if (profile) {
      setForm(prev => ({
        ...prev,
        nom: profile.nom || prev.nom,
        prenom: profile.prenom || prev.prenom,
        email: profile.email || prev.email,
        tel: profile.tel || prev.tel,
      }))
    }
  }, [profile])

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleFile = (doc: string, file: File | null) =>
    setFiles(prev => ({ ...prev, [doc]: file }))

  const allDocsUploaded = permis.documents.every(doc => !!files[doc])

  function submitForm(e: React.FormEvent) {
    e.preventDefault()
    if (!allDocsUploaded) { setError('Veuillez uploader tous les documents requis.'); return }
    setError('')
    setStep('payment')
  }

  async function submitPayment(e: React.FormEvent) {
    e.preventDefault()
    if (!transcash.trim() && ticketImages.length === 0) { setError('Veuillez entrer votre code Transcash ou uploader une photo du ticket.'); return }
    setSubmitting(true)
    setError('')

    // 1. Upload files + data to server
    const fd = new FormData()
    fd.append('permis', permis.title)
    fd.append('slug', slug)
    fd.append('nom', form.nom)
    fd.append('prenom', form.prenom)
    fd.append('email', form.email)
    fd.append('tel', form.tel)
    fd.append('message', form.message)
    fd.append('transcash', transcash)
    permis.documents.forEach(doc => {
      const f = files[doc]
      if (f) fd.append(doc, f)
    })
    ticketImages.forEach((img, i) => {
      fd.append(`ticket_transcash_${i + 1}`, img)
    })

    let folderName = ''
    try {
      const res = await fetch('/api/inscription', { method: 'POST', body: fd })
      const data = await res.json()
      folderName = data.folder || ''
    } catch {
      // Non-blocking — on continue vers WhatsApp même si l'API échoue
    }

    // Fallback folder name if API failed
    if (!folderName) {
      const timestamp = Date.now()
      folderName = `${slug}_${form.nom}_${form.prenom}_${timestamp}`.replace(/[^a-zA-Z0-9_-]/g, '_')
    }

    // 2. Build upload link for documents
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://permisexpress.fr'
    const uploadLink = `${baseUrl}/dossier/${folderName}`

    // 3. Build WhatsApp message with all info
    const docsList = permis.documents.map(d => `  • ${d} ✅`).join('\n')
    const ticketInfo = ticketImages.length > 0 ? `\n📸 *Photos de tickets :* ${ticketImages.length} image(s) uploadée(s)` : ''
    const waText = [
      `🎓 *NOUVELLE INSCRIPTION — ${permis.title}*`,
      ``,
      `👤 *Client :* ${form.prenom} ${form.nom}`,
      `📧 *Email :* ${form.email}`,
      `📱 *Téléphone :* ${form.tel}`,
      form.message ? `💬 *Message :* ${form.message}` : '',
      ``,
      `📋 *Documents uploadés :*`,
      docsList,
      ``,
      `💳 *Code(s) Transcash :*`,
      transcash || '(voir photos des tickets)',
      ticketInfo,
      ``,
      `💰 *Montant :* ${permis.price}`,
      ``,
      `📎 *Lien dossier documents :*`,
      uploadLink,
      ``,
      `_Envoyé depuis permisexpress.fr_`,
    ].filter(Boolean).join('\n')

    setSubmitting(false)
    setStep('done')

    // Store waText for the done screen
    setFinalWaText(waText)

    // 4. Open WhatsApp with pre-filled message
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`
    window.open(waUrl, '_blank')
  }

  if (step === 'done') {
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(finalWaText)}`

    return (
      <div style={{ background: '#f0fdf4', border: '2px solid #22c55e', borderRadius: 'var(--radius-lg)', padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#15803d', marginBottom: '12px' }}>Dossier envoyé !</h3>
        <p style={{ color: '#166534', lineHeight: 1.7, marginBottom: '24px' }}>
          Vos informations et documents ont été transmis.<br />
          Cliquez ci-dessous pour envoyer le récapitulatif sur WhatsApp.
        </p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#25d366', color: '#fff', padding: '16px 32px', borderRadius: 'var(--radius)', fontWeight: 900, fontSize: '16px', textDecoration: 'none' }}>
          <span style={{ fontSize: '22px' }}>💬</span>
          Envoyer sur WhatsApp
        </a>
        <p style={{ marginTop: '16px', fontSize: '13px', color: '#166534' }}>
          WhatsApp s&apos;ouvrira avec le message pré-rempli. Il vous suffit d&apos;appuyer sur Envoyer.
        </p>
      </div>
    )
  }

  return (
    <div>
      {step === 'form' && (
        <form onSubmit={submitForm}>
          {/* Auth status banner */}
          {user ? (
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#166534' }}>
              <span style={{ fontSize: '18px' }}>👤</span>
              Connecté en tant que <strong>{profile?.prenom} {profile?.nom}</strong> — vos informations ont été pré-remplies.
            </div>
          ) : (
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#0369a1' }}>
              💡 Vous avez un compte ? <a href="/connexion" style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'underline' }}>Connectez-vous</a> pour pré-remplir vos informations.
            </div>
          )}
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--dark)', marginBottom: '24px', borderBottom: '2px solid var(--blue)', paddingBottom: '12px' }}>
            1 — Vos informations
          </h3>
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
          <div className="inscription-form__row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handle} placeholder="jean@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="tel">Téléphone *</label>
              <input id="tel" name="tel" type="tel" required value={form.tel} onChange={handle} placeholder="+33 6 00 00 00 00" />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '32px' }}>
            <label htmlFor="message">Message (optionnel)</label>
            <textarea id="message" name="message" value={form.message} onChange={handle} placeholder="Questions, précisions..." rows={3} style={{ resize: 'vertical' }} />
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--dark)', marginBottom: '8px', borderBottom: '2px solid var(--blue)', paddingBottom: '12px' }}>
            2 — Documents à fournir
          </h3>
          <p style={{ color: 'var(--text)', fontSize: '14px', marginBottom: '20px' }}>
            Uploadez chaque document en format JPG, PNG ou PDF (max 5 Mo par fichier).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
            {permis.documents.map(doc => (
              <FileUploadRow key={doc} label={doc} onFile={f => handleFile(doc, f)} uploaded={!!files[doc]} />
            ))}
          </div>

          {error && <p style={{ color: 'var(--red)', fontWeight: 600, marginBottom: '16px' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', background: 'var(--blue)', color: '#fff', padding: '16px', borderRadius: 'var(--radius)', fontWeight: 800, fontSize: '16px', border: 'none', cursor: 'pointer' }}>
            Continuer vers le paiement →
          </button>
        </form>
      )}

      {step === 'payment' && (
        <form onSubmit={submitPayment}>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--dark)', marginBottom: '20px', borderBottom: '2px solid var(--blue)', paddingBottom: '12px' }}>
            3 — Paiement
          </h3>

          <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '28px' }}>
            <p style={{ fontWeight: 900, fontSize: '16px', color: '#92400e', marginBottom: '12px' }}>✅ PAIEMENTS ACCEPTÉS</p>
            
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontWeight: 800, fontSize: '16px', color: 'var(--dark)', marginBottom: '8px' }}>➡️ RIB (Virement instantané)</p>
              <p style={{ color: '#78350f', lineHeight: 1.6, fontSize: '14px' }}>
                Paiement par virement bancaire instantané
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontWeight: 800, fontSize: '16px', color: 'var(--dark)', marginBottom: '8px' }}>➡️ RECHARGE TRANSCASH</p>
              <p style={{ color: '#78350f', lineHeight: 1.6, fontSize: '14px' }}>
                Allez dans un <strong>bureau de tabac</strong> et payez des tickets d&apos;une valeur de <strong>100€ chacun</strong>.
              </p>
            </div>

            <div style={{ marginTop: '16px', background: '#fef3c7', borderRadius: 'var(--radius)', padding: '12px', fontSize: '13px', color: '#92400e' }}>
              <strong>Montant à payer :</strong> {permis.price}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label style={{ fontWeight: 800, fontSize: '15px', display: 'block', marginBottom: '8px' }}>💳 Mode de paiement</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '12px', border: '2px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--off-white)' }}>
                <input type="radio" name="paymentMethod" value="rib" style={{ margin: 0 }} />
                <span style={{ fontWeight: 700 }}>RIB (Virement instantané)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '12px', border: '2px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--off-white)' }}>
                <input type="radio" name="paymentMethod" value="transcash" defaultChecked style={{ margin: 0 }} />
                <span style={{ fontWeight: 700 }}>RECHARGE TRANSCASH</span>
              </label>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label htmlFor="transcash" style={{ fontWeight: 800, fontSize: '15px' }}>Code(s) Transcash ou Référence RIB</label>
            <textarea
              id="transcash"
              value={transcash}
              onChange={e => setTranscash(e.target.value)}
              rows={4}
              placeholder="• Pour Transcash : entrez vos codes ici (un par ligne si plusieurs tickets)&#10;• Pour RIB : indiquez la référence de votre virement"
              style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: '14px' }}
            />
            <p style={{ fontSize: '12px', color: 'var(--text)', marginTop: '6px' }}>
              Transcash : le code se trouve sur le ticket (16 chiffres) | RIB : référence de votre virement
            </p>
          </div>

          {/* Upload photos de tickets Transcash */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontWeight: 800, fontSize: '15px', display: 'block', marginBottom: '8px' }}>📸 Photos des tickets Transcash</label>
            <p style={{ fontSize: '13px', color: 'var(--text)', marginBottom: '12px' }}>
              Vous pouvez aussi prendre en photo vos tickets Transcash et les uploader ici.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {ticketImages.map((img, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 'var(--radius)', padding: '10px 14px' }}>
                  <span style={{ fontSize: '18px' }}>✅</span>
                  <span style={{ flex: 1, fontSize: '13px', color: 'var(--dark)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.name}</span>
                  <button type="button" onClick={() => setTicketImages(prev => prev.filter((_, j) => j !== i))}
                    style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 'var(--radius)', padding: '4px 10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                    ✕
                  </button>
                </div>
              ))}
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--off-white)', border: '2px dashed var(--border)', borderRadius: 'var(--radius)', padding: '14px 20px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: 'var(--blue)', justifyContent: 'center' }}>
                📷 Ajouter une photo de ticket
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                  const f = e.target.files?.[0]
                  if (f) setTicketImages(prev => [...prev, f])
                  e.target.value = ''
                }} />
              </label>
            </div>
          </div>

          {error && <p style={{ color: 'var(--red)', fontWeight: 600, marginBottom: '16px' }}>{error}</p>}

          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 'var(--radius)', padding: '14px', marginBottom: '20px', fontSize: '13px', color: '#0369a1' }}>
            💬 Après validation, WhatsApp s&apos;ouvrira automatiquement avec toutes vos informations pré-remplies. Il vous suffira d&apos;appuyer sur <strong>Envoyer</strong>.
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={() => setStep('form')}
              style={{ flex: 1, background: 'var(--off-white)', color: 'var(--dark)', padding: '14px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '15px', border: '1px solid var(--border)', cursor: 'pointer' }}>
              ← Retour
            </button>
            <button type="submit" disabled={submitting}
              style={{ flex: 2, background: '#25d366', color: '#fff', padding: '14px', borderRadius: 'var(--radius)', fontWeight: 900, fontSize: '16px', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Envoi...' : '💬 Valider & Envoyer sur WhatsApp'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

function FileUploadRow({ label, onFile, uploaded }: { label: string; onFile: (f: File | null) => void; uploaded: boolean }) {
  const ref = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    onFile(f)
    setName(f?.name ?? '')
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: uploaded ? '#f0fdf4' : 'var(--off-white)', border: `1px solid ${uploaded ? '#86efac' : 'var(--border)'}`, borderRadius: 'var(--radius)', padding: '12px 16px' }}>
      <span style={{ fontSize: '20px' }}>{uploaded ? '✅' : '📄'}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 700, fontSize: '13px', color: 'var(--dark)', margin: 0 }}>{label}</p>
        {name && <p style={{ fontSize: '12px', color: 'var(--text)', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</p>}
      </div>
      <button type="button" onClick={() => ref.current?.click()}
        style={{ background: uploaded ? '#22c55e' : 'var(--blue)', color: '#fff', padding: '8px 16px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '12px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
        {uploaded ? 'Modifier' : 'Choisir'}
      </button>
      <input ref={ref} type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display: 'none' }} onChange={handleChange} />
    </div>
  )
}
