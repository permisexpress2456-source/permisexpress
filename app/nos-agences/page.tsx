import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nos Agences — Permisexpress.fr Montpellier',
  description: 'Retrouvez nos 3 agences Permisexpress.fr à Montpellier : Lemasson, Port Marianne et Centre Boussairolles.',
}

const agences = [
  {
    name: 'Agence Lemasson',
    address: '392 Bd Pedro de Luna, 34070 Montpellier',
    mapLink: 'https://maps.app.goo.gl/Y82Q9jczM3Z8SHTE7',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888!2d3.8567!3d43.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s392+Bd+Pedro+de+Luna!5e0!3m2!1sfr!2sfr!4v1',
    hours: 'Lun–Ven : 10h–19h · Sam : 10h–17h',
    phone: '+33 7 57 75 47 74',
  },
  {
    name: 'Agence Port Marianne',
    address: '139 Rue Frimaire, 34000 Montpellier',
    mapLink: 'https://maps.app.goo.gl/CrK6BPonqMMSurmc6',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888!2d3.8967!3d43.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s139+Rue+Frimaire!5e0!3m2!1sfr!2sfr!4v1',
    hours: 'Lun–Ven : 10h–19h · Sam : 10h–17h',
    phone: '+33 7 57 75 47 74',
  },
  {
    name: 'Agence Centre Boussairolles',
    address: '18 Rue Boussairolles, 34000 Montpellier',
    mapLink: 'https://maps.app.goo.gl/K3RrMzXEDUf6oPcU6',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888!2d3.88!3d43.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s18+Rue+Boussairolles!5e0!3m2!1sfr!2sfr!4v1',
    hours: 'Lun–Ven : 10h–19h · Sam : 10h–17h',
    phone: '+33 7 57 75 47 74',
  },
]

export default function NosAgencesPage() {
  return (
    <main>
      {/* Hero */}
      <div className="contact-page__hero">
        <div className="container">
          <h1 className="contact-page__title">Nos Agences</h1>
          <p className="contact-page__subtitle">3 agences à Montpellier pour vous accueillir</p>
        </div>
      </div>

      <section className="agences-section">
        <div className="container">
          {/* Breadcrumb */}
          <div className="product-breadcrumb" style={{ marginBottom: 32 }}>
            <Link href="/">Accueil</Link>{' / '}
            <span style={{ color: 'var(--blue)', fontWeight: 600 }}>Nos Agences</span>
          </div>

          <div className="agences-grid">
            {agences.map(a => (
              <div key={a.name} className="agence-card">
                <div className="agence-card__map">
                  <iframe
                    src={a.mapEmbed}
                    width="100%"
                    height="200"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={a.name}
                  />
                </div>
                <div className="agence-card__body">
                  <h2 className="agence-card__name">{a.name}</h2>
                  <p className="agence-card__address">📍 {a.address}</p>
                  <p className="agence-card__hours">🕐 {a.hours}</p>
                  <p className="agence-card__phone">📞 <a href={`tel:${a.phone.replace(/\s/g, '')}`}>{a.phone}</a></p>
                  <a href={a.mapLink} target="_blank" rel="noopener noreferrer" className="agence-card__btn">
                    Voir sur Google Maps →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="agences-cta">
            <p>Une question ? Contactez-nous directement</p>
            <div className="agences-cta__btns">
              <a href="https://wa.me/33757754774" target="_blank" rel="noopener noreferrer" className="tarifs__btn tarifs__btn--whatsapp">💬 WhatsApp</a>
              <a href="https://t.me/permis_fr3" target="_blank" rel="noopener noreferrer" className="tarifs__btn tarifs__btn--telegram">✈️ Telegram</a>
              <Link href="/contact" className="tarifs__btn tarifs__btn--contact">Formulaire de contact</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
