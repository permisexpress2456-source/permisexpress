import Link from 'next/link'

const tarifs = [
  { categorie: 'Permis de Conduire', items: [
    { label: 'Permis B', prix: '850€' },
    { label: 'Permis Moto A2', prix: '600€' },
    { label: 'Permis Moto A3', prix: '1 300€' },
    { label: 'Permis AM (Cyclomoteur)', prix: 'Nous contacter' },
    { label: 'Permis 125', prix: '1 300€' },
    { label: 'Permis BE', prix: '1 000€' },
    { label: 'Permis B96', prix: '1 500€' },
    { label: 'Code de la Route', prix: '250€' },
  ]},
  { categorie: 'Permis Poids Lourds', items: [
    { label: 'Permis Poids Lourd (C)', prix: '1 500€' },
    { label: 'Super Poids Lourd (CE)', prix: '2 000€' },
    { label: 'Permis CE', prix: '1 700€' },
  ]},
  { categorie: 'Permis Nautiques & Chasse', items: [
    { label: 'Permis Bateau Côtier et Fluvial', prix: '1 800€' },
    { label: 'Permis Hauturier', prix: '500€' },
    { label: 'Permis de Chasse', prix: '700€' },
  ]},
  { categorie: 'Documents & Administratif', items: [
    { label: "Pièce d'identité", prix: '1 500€' },
    { label: 'Titre de séjour', prix: '1 200€' },
    { label: 'Carte VTC & Taxi', prix: '1 200€' },
    { label: 'Carte Grise', prix: '1 000€' },
    { label: 'Récupération de points perdus', prix: '40€ / point' },
  ]},
]

export default function TarifsPage() {
  return (
    <main>
      {/* Hero */}
      <div
        className="page-header"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&h=600&fit=crop)' }}
      >
        <div className="container">
          <h1 className="page-header__title">Nos Services & Tarifs</h1>
          <p className="page-header__breadcrumbs">
            <Link href="/">Accueil</Link>
            <span>/</span>
            Tarifs
          </p>
        </div>
      </div>

      {/* Intro */}
      <section style={{ padding: '60px 0 20px', background: 'var(--light-bg)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <p className="sec-title__tagline">Transparence</p>
          <h2 className="sec-title__title">Des tarifs clairs pour chaque besoin</h2>
          <p style={{ marginTop: '16px', color: 'var(--text)', fontSize: '15px', lineHeight: '1.7' }}>
            Retrouvez ci-dessous l'ensemble de nos prestations et leurs tarifs. Pour toute question ou demande personnalisée, n'hésitez pas à nous contacter directement.
          </p>
        </div>
      </section>

      {/* Grille des tarifs */}
      <section style={{ padding: '40px 0 80px', background: 'var(--light-bg)' }}>
        <div className="container">
          <div className="tarifs__grid">
            {tarifs.map(cat => (
              <div className="tarifs__card" key={cat.categorie}>
                <div className="tarifs__card-header">
                  <h3>{cat.categorie}</h3>
                </div>
                <ul className="tarifs__list">
                  {cat.items.map(item => (
                    <li key={item.label} className="tarifs__item">
                      <span className="tarifs__item-label">{item.label}</span>
                      <span className="tarifs__item-price">{item.prix}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA contact */}
          <div className="tarifs__cta">
            <p>📌 Contactez-nous pour plus d'informations ou pour toute prestation non listée.</p>
            <div className="tarifs__cta-btns">
              <a href="https://wa.me/33757754774" target="_blank" rel="noopener noreferrer" className="tarifs__btn tarifs__btn--whatsapp">
                💬 WhatsApp : +33 7 57 75 47 74
              </a>
              <a href="https://t.me/permis_fr3" target="_blank" rel="noopener noreferrer" className="tarifs__btn tarifs__btn--telegram">
                ✈️ Telegram : @permis_fr3
              </a>
              <Link href="/contact" className="tarifs__btn tarifs__btn--contact">
                📩 Formulaire de contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
