import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg-shapes">
        <div className="hero__shape hero__shape--left" />
        <div className="hero__shape hero__shape--right" />
      </div>
      <div className="hero__content">
        <div className="hero__text">
          <p className="hero__eyebrow">🇫🇷 Vos permis rapidement</p>
          <h1 className="hero__title">
            Permis<br />
            <span>Express</span>
          </h1>
          <div className="hero__underline" />
          <p className="hero__desc">Permis B, moto, poids lourd, bateau, documents administratifs — accompagnement rapide et sécurisé.</p>
          <div className="hero__actions">
            <Link href="/tarifs" className="hero__btn">Voir nos tarifs</Link>
            <a href="https://wa.me/33757754774" className="hero__btn hero__btn--outline" target="_blank" rel="noopener noreferrer">
              💬 WhatsApp
            </a>
          </div>
        </div>
        <div className="hero__image">
          <Image
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=830&h=1024&fit=crop&crop=top"
            alt="Permisexpress.fr"
            width={500}
            height={520}
            priority
            style={{ objectFit: 'cover', objectPosition: 'top', borderRadius: '16px 16px 0 0' }}
          />
        </div>
      </div>
    </section>
  )
}
