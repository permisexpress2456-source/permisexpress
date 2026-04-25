import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import InscriptionForm from '@/components/InscriptionForm'

type Props = { params: { permis: string } }

async function getOffer(slug: string) {
  if (!supabaseAdmin) return null
  
  const { data, error } = await supabaseAdmin
    .from('offers')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) return null
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const offer = await getOffer(params.permis)
  if (!offer) return { title: 'Inscription — Permisexpress.fr' }
  return {
    title: `Inscription ${offer.title} — Permisexpress.fr`,
    description: offer.description || 'Inscription en ligne',
  }
}

export default async function InscriptionPermisPage({ params }: Props) {
  const offer = await getOffer(params.permis)
  if (!offer) notFound()

  const documents = (offer.documents as string[] | string | undefined)
  const docArray = Array.isArray(documents) ? documents : documents ? [documents] : []

  return (
    <main className="inscription-page">
      <div className="container inscription-page__container">

        {/* Breadcrumb */}
        <div className="product-breadcrumb" style={{ marginBottom: '32px' }}>
          <Link href="/">Accueil</Link>
          {' / '}
          <Link href="/tarifs">Nos Offres</Link>
          {' / '}
          <span style={{ color: 'var(--blue)', fontWeight: 600 }}>Inscription — {offer.title}</span>
        </div>

        {/* Header */}
        <div className="inscription-page__header">
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--blue-dark) 33.3%, #fff 33.3%, #fff 66.6%, var(--red) 66.6%)' }} />
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '8px' }}>Inscription en ligne</p>
          <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 900, margin: '0 0 8px' }}>{offer.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: '0 0 16px', lineHeight: 1.6 }}>{offer.description || ''}</p>
          <span style={{ background: 'var(--red)', color: '#fff', padding: '8px 20px', borderRadius: '30px', fontWeight: 900, fontSize: '20px' }}>
            {offer.price}
          </span>
        </div>

        <div className="inscription__layout">

          {/* Form */}
          <div className="inscription__form-card">
            <InscriptionForm 
              permis={{ 
                title: offer.title, 
                price: offer.price, 
                description: offer.description || '', 
                documents: docArray 
              }} 
              slug={params.permis} 
            />
          </div>

          {/* Sidebar */}
          <div className="inscription__sidebar">

            {/* Documents list */}
            {docArray.length > 0 && (
              <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: 'var(--dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📋 Documents requis
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {docArray.map((doc, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--blue)', fontWeight: 900, flexShrink: 0 }}>→</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Payment info */}
            <div style={{ background: '#fffbeb', borderRadius: 'var(--radius-lg)', padding: '24px', border: '2px solid #f59e0b' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#92400e', marginBottom: '12px' }}>✅ PAIEMENTS ACCEPTÉS</h3>
              
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontWeight: 800, color: 'var(--dark)', marginBottom: '6px' }}>➡️ RIB (Virement instantané)</p>
                <p style={{ fontSize: '13px', color: '#78350f', lineHeight: 1.6 }}>
                  Paiement par virement bancaire instantané
                </p>
              </div>

              <div>
                <p style={{ fontWeight: 800, color: 'var(--dark)', marginBottom: '6px' }}>️ RECHARGE TRANSCASH</p>
                <p style={{ fontSize: '13px', color: '#78350f', lineHeight: 1.6 }}>
                  En bureau de tabac — tickets de <strong>100€</strong> chacun.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', color: 'var(--text)', marginBottom: '14px' }}>Une question ? Contactez-nous directement</p>
              <a href="https://wa.me/33757754774" target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', background: '#25d366', color: '#fff', padding: '12px', borderRadius: 'var(--radius)', fontWeight: 800, fontSize: '14px', textDecoration: 'none', marginBottom: '10px' }}>
                💬 WhatsApp
              </a>
              <a href="https://t.me/permis_fr3" target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', background: '#229ed9', color: '#fff', padding: '12px', borderRadius: 'var(--radius)', fontWeight: 800, fontSize: '14px', textDecoration: 'none' }}>
                ✈️ Telegram @permis_fr3
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
