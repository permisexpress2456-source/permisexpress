import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    title: 'Nos Tarifs',
    href: '/tarifs',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=730&h=461&fit=crop',
    alt: 'Tarifs Permisexpress.fr',
    badge: 'Dès 250€',
  },
  {
    title: 'Inscription',
    href: '/inscription-en-ligne',
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=730&h=461&fit=crop',
    alt: 'Inscription Permisexpress.fr',
    badge: null,
  },
  {
    title: 'Financement CPF',
    href: '/services/financement-cpf',
    img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=730&h=461&fit=crop',
    alt: 'Financement CPF Permisexpress.fr',
    badge: null,
  },
]

export default function Services() {
  return (
    <section className="services">
      <div className="container">
        <div className="sec-title">
          <p className="sec-title__tagline">Permisexpress.fr</p>
          <h2 className="sec-title__title">
            Plus d'Informations sur l'école de conduite Permisexpress.fr ?<br />
            Nous répondons à vos Questionnements &amp; Besoins
          </h2>
        </div>
        <div className="services__grid">
          {services.map(s => (
            <div className="service-card" key={s.href}>
              <Link href={s.href} style={{ position: 'relative', display: 'block' }}>
                <Image src={s.img} alt={s.alt} width={730} height={461} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                {s.badge && (
                  <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--primary)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontWeight: 800, fontSize: '13px' }}>
                    {s.badge}
                  </span>
                )}
              </Link>
              <div className="service-card__content">
                <h3 className="service-card__title"><Link href={s.href}>{s.title}</Link></h3>
              </div>
              <div className="service-card__btn">
                <Link href={s.href}>Je Découvre <span>+</span></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
