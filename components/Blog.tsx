import Image from 'next/image'
import Link from 'next/link'

const posts = [
  {
    title: 'Quels sont les différents permis 2 roues ?',
    href: 'https://opermis.fr/quels-sont-les-differents-permis-2-roues/',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=370&h=290&fit=crop',
    alt: 'Les différents permis deux roues',
    day: '13', month: 'Mar 2026',
  },
  {
    title: "Comment s'inscrire au permis dans notre auto-école à Montpellier ?",
    href: 'https://opermis.fr/comment-sinscrire-au-permis-dans-notre-auto-ecole-a-montpellier/',
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=370&h=290&fit=crop',
    alt: "Comment s'inscrire au permis de conduire",
    day: '02', month: 'Mar 2026',
  },
  {
    title: 'Fin du financement CPF pour le permis B en 2026 : ce qui change pour toi',
    href: 'https://opermis.fr/fin-du-financement-cpf-pour-le-permis-b-en-2026-ce-qui-change-pour-toi/',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=370&h=290&fit=crop',
    alt: 'Fin du financement CPF',
    day: '23', month: 'Fév 2026',
  },
  {
    title: "Auto-école à Montpellier : Pourquoi choisir Permisexpress.fr pour réussir ton permis ?",
    href: 'https://opermis.fr/auto-ecole-a-montpellier-pourquoi-choisir-Permisexpress.fr-pour-reussir-ton-permis/',
    img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=370&h=290&fit=crop',
    alt: "Auto-école à Montpellier",
    day: '16', month: 'Fév 2026',
  },
  {
    title: 'Nouvelle offre : Le permis moto A2 arrive à Montpellier',
    href: 'https://opermis.fr/nouvelle-offre-le-permis-moto-a2-arrive-a-montpellier/',
    img: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=370&h=290&fit=crop',
    alt: 'Permis A2',
    day: '17', month: 'Nov 2025',
  },
  {
    title: "Gérer le stress pendant l'examen du permis de conduire",
    href: 'https://opermis.fr/gerer-le-stress-pendant-lexamen-du-permis-de-conduire/',
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=370&h=290&fit=crop',
    alt: "Gérer le stress pendant l'examen",
    day: '01', month: 'Sep 2025',
  },
]

export default function Blog() {
  return (
    <section className="blog">
      <div className="container">
        <div className="sec-title">
          <p className="sec-title__tagline">Articles</p>
          <h2 className="sec-title__title">Nos Derniers<br />Articles</h2>
        </div>
        <div className="blog__grid">
          {posts.map(p => (
            <div className="blog-card" key={p.href}>
              <div className="blog-card__image">
                <Image src={p.img} alt={p.alt} width={370} height={200} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div className="blog-card__date">
                  <div className="blog-card__date-day">{p.day}</div>
                  <div className="blog-card__date-month">{p.month}</div>
                </div>
              </div>
              <div className="blog-card__content">
                <div className="blog-card__author">
                  <img src="https://secure.gravatar.com/avatar/0da3e78d05c0f50164439cdba15bcf18a4eb1936dc6ce7a6fe44d74ba49f7075?s=31&d=mm&r=g" alt="Permisexpress.fr Mtp" />
                  <span className="blog-card__author-name">Permisexpress.fr Mtp</span>
                </div>
                <h3 className="blog-card__title"><Link href={p.href} target="_blank">{p.title}</Link></h3>
                <Link href={p.href} target="_blank" className="blog-card__link">Je Découvre</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
