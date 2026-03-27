import Link from 'next/link'

export default function InscriptionContent() {
  return (
    <section style={{ padding: '60px 0', background: 'var(--off-white)', minHeight: '60vh' }}>
      <div className="container">
        <div className="sec-title">
          <p className="sec-title__tagline">Inscription en ligne</p>
          <h1 className="sec-title__title">Inscrivez-vous a Permisexpress.fr</h1>
        </div>
        <div style={{ maxWidth: '640px', margin: '0 auto', background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '40px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text)', marginBottom: '28px', fontSize: '15px', lineHeight: '1.7' }}>
            Pour vous inscrire, contactez-nous directement via WhatsApp ou Telegram. Nous vous guiderons dans les demarches et vous fournirons la liste des documents necessaires.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <a href="https://wa.me/33757754774" target="_blank" rel="noopener noreferrer" className="panier__btn-wa">
              WhatsApp : +33 7 57 75 47 74
            </a>
            <a href="https://t.me/permis_fr3" target="_blank" rel="noopener noreferrer" className="panier__btn-tg">
              Telegram : @permis_fr3
            </a>
            <Link href="/contact" className="hero__btn" style={{ textAlign: 'center', padding: '14px' }}>
              Formulaire de contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
