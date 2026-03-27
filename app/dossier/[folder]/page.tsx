'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

type DocFile = { name: string; ext: string; isImage: boolean }
type Meta = {
  permis: string; slug: string; nom: string; prenom: string
  email: string; tel: string; message: string; transcash: string; created_at: string
}

export default function DossierPage() {
  const { folder } = useParams<{ folder: string }>()
  const [meta, setMeta] = useState<Meta | null>(null)
  const [documents, setDocuments] = useState<DocFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_token')
    if (!saved) { setError('Accès réservé aux administrateurs.'); setLoading(false); return }
    setToken(saved)

    fetch(`/api/dossier/${folder}`, { headers: { Authorization: `Bearer ${saved}` } })
      .then(r => r.json())
      .then(data => {
        if (!data.ok) { setError('Dossier introuvable ou accès refusé.'); return }
        setMeta(data.meta)
        setDocuments(data.documents)
      })
      .catch(() => setError('Erreur de chargement.'))
      .finally(() => setLoading(false))
  }, [folder])

  if (loading) return (
    <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: '16px', color: 'var(--text)' }}>Chargement du dossier...</p>
    </main>
  )

  if (error) return (
    <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '48px' }}>🔒</div>
      <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--dark)' }}>{error}</p>
      <Link href="/admin" style={{ color: 'var(--blue)', fontWeight: 600 }}>Se connecter en admin →</Link>
    </main>
  )

  const ticketDocs = documents.filter(d => d.name.startsWith('ticket_transcash'))
  const otherDocs = documents.filter(d => !d.name.startsWith('ticket_transcash'))

  const fileUrl = (name: string) => `/api/dossier/${folder}/${name}?token=${token}`

  return (
    <main style={{ padding: '40px 0 80px', background: 'var(--off-white)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '32px' }}>
          <Link href="/admin" style={{ color: 'var(--blue)', fontSize: '13px', fontWeight: 600 }}>← Retour à l&apos;admin</Link>
        </div>

        <div style={{ background: 'linear-gradient(135deg, var(--blue-dark), var(--blue))', borderRadius: 'var(--radius-lg)', padding: '32px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--blue-dark) 33.3%, #fff 33.3%, #fff 66.6%, var(--red) 66.6%)' }} />
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Dossier d&apos;inscription</p>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 900, margin: '0 0 6px' }}>{meta?.permis}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0 }}>
            {meta?.prenom} {meta?.nom} — {meta?.created_at ? new Date(meta.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
          </p>
        </div>

        {meta && (
          <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 900, color: 'var(--dark)', marginBottom: '16px' }}>👤 Informations client</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <InfoItem label="Nom" value={`${meta.prenom} ${meta.nom}`} />
              <InfoItem label="Email" value={meta.email} />
              <InfoItem label="Téléphone" value={meta.tel} />
              {meta.message && <InfoItem label="Message" value={meta.message} />}
            </div>
          </div>
        )}

        {meta?.transcash && (
          <div style={{ background: '#fffbeb', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px', border: '2px solid #f59e0b' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 900, color: '#92400e', marginBottom: '12px' }}>💳 Code(s) Transcash</h2>
            <pre style={{ background: '#fef3c7', padding: '14px', borderRadius: 'var(--radius)', fontFamily: 'monospace', fontSize: '14px', color: '#78350f', whiteSpace: 'pre-wrap', margin: 0 }}>
              {meta.transcash}
            </pre>
          </div>
        )}

        {ticketDocs.length > 0 && (
          <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 900, color: 'var(--dark)', marginBottom: '16px' }}>📸 Photos des tickets Transcash</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {ticketDocs.map(doc => (
                <a key={doc.name} href={fileUrl(doc.name)} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', textDecoration: 'none' }}>
                  {doc.isImage ? (
                    <img src={fileUrl(doc.name)} alt={doc.name} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--off-white)', fontSize: '40px' }}>📄</div>
                  )}
                  <div style={{ padding: '10px 12px', fontSize: '12px', color: 'var(--text)', fontWeight: 600 }}>{doc.name}</div>
                </a>
              ))}
            </div>
          </div>
        )}

        {otherDocs.length > 0 && (
          <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 900, color: 'var(--dark)', marginBottom: '16px' }}>📋 Documents uploadés</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {otherDocs.map(doc => (
                <a key={doc.name} href={fileUrl(doc.name)} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', textDecoration: 'none' }}>
                  {doc.isImage ? (
                    <img src={fileUrl(doc.name)} alt={doc.name} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--off-white)', fontSize: '40px' }}>📄</div>
                  )}
                  <div style={{ padding: '10px 12px', fontSize: '12px', color: 'var(--text)', fontWeight: 600 }}>{doc.name}</div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{label}</p>
      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dark)', margin: 0 }}>{value}</p>
    </div>
  )
}
