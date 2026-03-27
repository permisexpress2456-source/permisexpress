'use client'
import { useState } from 'react'
import Link from 'next/link'
import AddToCartBtn from './AddToCartBtn'

interface Feature {
  title: string
  items: string[]
}

interface ProductPageProps {
  title: string
  price: string
  image: string
  breadcrumb: string
  subtitle?: string
  features: Feature[]
  contactOnly?: boolean
  inscriptionSlug?: string
}

export default function ProductPage({ title, price, image, breadcrumb, subtitle, features, contactOnly, inscriptionSlug }: ProductPageProps) {
  const [qty, setQty] = useState(1)
  const priceNum = parseFloat(price.replace(/[€\s]/g, '').replace(',', '.'))
  const installment = isNaN(priceNum) ? null : (priceNum / 3).toFixed(2)
  const slug = inscriptionSlug ?? title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  return (
    <main style={{ padding: '60px 0', background: 'var(--off-white)', minHeight: '100vh' }}>
      <div className="container">
        <div className="product-breadcrumb">
          <Link href="/">Permisexpress.fr</Link>
          {' / '}
          <Link href="/tarifs">Nos Offres</Link>
          {' / '}
          <span style={{ color: 'var(--blue)', fontWeight: 600 }}>{breadcrumb}</span>
        </div>

        <div className="product-layout">
          {/* Image */}
          <div>
            <img
              src={image}
              alt={title}
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', display: 'block' }}
            />
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 className="product-title">{title}</h1>
              {subtitle && <p className="product-subtitle">{subtitle}</p>}
              <div className="product-price">{price}</div>
            </div>

            <div className="product-features">
              {features.map((f, i) => (
                <div key={i} className={`product-feature${i > 0 ? ' product-feature' : ''}`}>
                  <strong className="product-feature-title">{f.title}</strong>
                  <ul>
                    {f.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Inscription CTA */}
            <Link
              href={`/inscription/${slug}`}
              style={{ display: 'block', background: 'var(--red)', color: '#fff', padding: '16px', borderRadius: 'var(--radius)', fontWeight: 900, fontSize: '16px', textDecoration: 'none', textAlign: 'center', marginBottom: '8px' }}>
              ✅ S&apos;inscrire &amp; Payer
            </Link>

            {contactOnly ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="https://wa.me/33757754774" target="_blank" rel="noopener noreferrer" className="panier__btn-wa">
                  💬 Contacter sur WhatsApp
                </a>
                <a href="https://t.me/permis_fr3" target="_blank" rel="noopener noreferrer" className="panier__btn-tg">
                  ✈️ Telegram : @permis_fr3
                </a>
              </div>
            ) : (
              <>
                <div>
                  <div style={{ marginBottom: '8px', fontWeight: 700, fontSize: '13px', color: 'var(--dark)' }}>Quantité</div>
                  <div className="qty-stepper">
                    <button className="qty-stepper__btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                    <input className="qty-stepper__input" type="text" value={qty} readOnly />
                    <button className="qty-stepper__btn" onClick={() => setQty(qty + 1)}>+</button>
                  </div>
                </div>

                <AddToCartBtn
                  id={title.toLowerCase().replace(/\s+/g, '-')}
                  title={title}
                  price={priceNum || 0}
                  qty={qty}
                />

                {installment && (
                  <div className="panier__installment">
                    <span className="panier__installment-badge">3x</span>
                    <span className="panier__installment-text">À partir de {installment} € / mois</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
