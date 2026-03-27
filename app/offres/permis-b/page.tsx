import Link from 'next/link'

export default function PermisBPage() {
    return (
        <main className="permis-b-page">
            {/* Page Header */}
            <section className="page-header" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&h=600&fit=crop")'
            }}>
                <div className="container">
                    <h1 className="page-header__title">PERMIS VOITURE</h1>
                    <div className="page-header__breadcrumbs">
                        <Link href="/">Permisexpress.fr Montpellier</Link> <span>/</span>
                        <Link href="/offres">Nos Offres</Link> <span>/</span>
                        <span style={{ color: '#fff' }}>Permis Voiture</span>
                    </div>
                </div>
            </section>

            {/* Offers Catalog */}
            <section style={{ padding: '80px 0', background: '#f8f8f8' }}>
                <div className="container">
                    <div className="offer-cards-grid">

                        {/* Template Card 1 */}
                        <div className="offer-card">
                            <div className="offer-card__image" style={{
                                backgroundImage: 'url("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=500&q=80")'
                            }}></div>
                            <div className="offer-card__content">
                                <h3 className="offer-card__title">PERMIS B - TRADITIONNEL</h3>
                                <p className="offer-card__subtitle">Boîte Manuelle</p>

                                <div className="offer-card__footer">
                                    <span className="offer-card__hint">A partir de 17 ans</span>
                                    <button className="offer-card__btn">DÉCOUVRIR L'OFFRE</button>
                                </div>
                            </div>
                        </div>

                        {/* Template Card 2 */}
                        <div className="offer-card">
                            <div className="offer-card__image" style={{
                                backgroundImage: 'url("https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=500&q=80")'
                            }}></div>
                            <div className="offer-card__content">
                                <h3 className="offer-card__title">PERMIS B - TRADITIONNEL</h3>
                                <p className="offer-card__subtitle">Boîte Automatique</p>

                                <div className="offer-card__footer">
                                    <span className="offer-card__hint">A partir de 17 ans</span>
                                    <button className="offer-card__btn">DÉCOUVRIR L'OFFRE</button>
                                </div>
                            </div>
                        </div>

                        {/* Template Card 3 */}
                        <div className="offer-card">
                            <div className="offer-card__image" style={{
                                backgroundImage: 'url("https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=500&q=80")'
                            }}></div>
                            <div className="offer-card__content">
                                <h3 className="offer-card__title">PASSERELLE BA - BM 7H</h3>
                                <p className="offer-card__subtitle">En savoir plus</p>

                                <div className="offer-card__price">470€</div>

                                <div className="offer-card__footer">
                                    <span className="offer-card__hint">7 heures de formation</span>
                                    <button className="offer-card__btn">DÉCOUVRIR L'OFFRE</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section style={{ padding: '40px 0', background: 'var(--off-white)', textAlign: 'center' }}>
              <div className="container">
                <Link href="/inscription/permis-b"
                  style={{ display: 'inline-block', background: 'var(--red)', color: '#fff', padding: '18px 48px', borderRadius: 'var(--radius)', fontWeight: 900, fontSize: '18px', textDecoration: 'none' }}>
                  ✅ S&apos;inscrire &amp; Payer — Permis B
                </Link>
              </div>
            </section>
        </main>
    )
}
