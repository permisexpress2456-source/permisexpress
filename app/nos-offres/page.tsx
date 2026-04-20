import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { getFallbackOffers } from '@/lib/offers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const defaultImage = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80'

async function getAllOffers() {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('offers')
      .select('*')
      .eq('is_active', true)
      .order('title', { ascending: true })

    if (!error && data) return data
  }
  return getFallbackOffers().filter(o => o.is_active)
}

export default async function NosOffresPage() {
  const offers = await getAllOffers()

  return (
    <main>
      {/* Hero */}
      <div
        className="page-header"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&h=600&fit=crop)' }}
      >
        <div className="container">
          <h1 className="page-header__title">Nos Offres</h1>
          <p className="page-header__breadcrumbs">
            <Link href="/">Accueil</Link>
            <span>/</span>
            Nos Offres
          </p>
        </div>
      </div>

      {/* Intro */}
      <section style={{ padding: '60px 0 20px', background: 'var(--light-bg)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <p className="sec-title__tagline">Formations</p>
          <h2 className="sec-title__title">Toutes nos formations disponibles</h2>
          <p style={{ marginTop: '16px', color: 'var(--text)', fontSize: '15px', lineHeight: '1.7' }}>
            Découvrez l&apos;ensemble de nos offres de formation. Cliquez sur une offre pour voir les détails et vous inscrire.
          </p>
        </div>
      </section>

      {/* Grille des offres */}
      <section style={{ padding: '40px 0 80px', background: 'var(--light-bg)' }}>
        <div className="container">
          {offers.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text)', fontSize: '16px' }}>
              Aucune offre disponible pour le moment.
            </p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}>
              {offers.map((offer) => (
                <Link
                  key={offer.slug}
                  href={`/nos-offres/${offer.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{
                    background: '#fff',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-md)',
                    overflow: 'hidden',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.13)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'var(--shadow-md)'
                  }}
                  >
                    <img
                      src={offer.image_url || defaultImage}
                      alt={offer.title}
                      style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px', lineHeight: '1.3' }}>
                        {offer.title}
                      </h3>
                      {offer.description && (
                        <p style={{ fontSize: '13px', color: 'var(--text)', marginBottom: '12px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {offer.description}
                        </p>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 900, color: 'var(--blue)' }}>
                          {offer.price}
                        </span>
                        <span style={{
                          background: 'var(--red)',
                          color: '#fff',
                          padding: '8px 16px',
                          borderRadius: 'var(--radius)',
                          fontSize: '13px',
                          fontWeight: 700,
                        }}>
                          Voir l&apos;offre →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
