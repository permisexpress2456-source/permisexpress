import Image from 'next/image'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__inner">
          <div>
            <h2 className="cta__title">Réservez vos leçons de conduite aujourd'hui !</h2>
            <Link href="/inscription-en-ligne" className="cta__btn">S'inscrire</Link>
          </div>
          <div className="cta__image">
            <Image
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=380&h=181&fit=crop"
              alt="Réservez vos leçons"
              width={380}
              height={181}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
