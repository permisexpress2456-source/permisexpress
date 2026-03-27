'use client'
import Link from 'next/link'
import LogoPermisExpress from './LogoPermisExpress'

const menuLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Nos Agences', href: '/nos-agences' },
  { label: 'Notre Équipe', href: '/notre-equipe' },
  { label: 'Financement CPF', href: '/services/financement-cpf' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'WhatsApp', href: 'https://wa.me/33757754774' },
]

const serviceLinks = [
  { label: 'Documents Inscription', href: '/services/documents-inscription' },
  { label: 'Financement CPF', href: '/services/financement-cpf' },
  { label: 'Label', href: '/services/label' },
  { label: 'Questions 1er Secours', href: '/services/questions-1er-secours' },
  { label: 'Vérification Audi A1', href: '/services/verification-audi-a1' },
  { label: 'Boutique', href: '/boutique' },
]

const legalLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'CGV', href: '/conditions-generales-de-vente' },
  { label: 'Mentions Légales', href: '/mentions-legales' },
  { label: 'Politique de Confidentialité', href: '/politique-de-confidentialite' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <Link href="/" className="footer__logo">
          <LogoPermisExpress size={64} />
        </Link>
        <div className="footer__social">
          <a href="https://www.tiktok.com/@Permisexpress.fr7" target="_blank" rel="noopener noreferrer" aria-label="TikTok">TT</a>
          <a href="https://www.instagram.com/Permisexpress.fr_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
          <a href="https://www.snapchat.com/add/Permisexpress.fr" target="_blank" rel="noopener noreferrer" aria-label="Snapchat">SC</a>
          <a href="https://www.facebook.com/AutoecolePermisexpress.fr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
          <a href="https://www.youtube.com/@AutoEcolePermisexpress.frMontpellier" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
        </div>
      </div>

      <div className="footer__middle">
        <div>
          <h4 className="footer__col-title">Menu</h4>
          <ul className="footer__links">
            {menuLinks.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="footer__col-title">Services</h4>
          <ul className="footer__links">
            {serviceLinks.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="footer__col-title">Liens Utiles</h4>
          <ul className="footer__links">
            {legalLinks.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="footer__col-title">Contact</h4>
          <ul className="footer__info">
            <li>📍 <a href="https://maps.app.goo.gl/Y82Q9jczM3Z8SHTE7" target="_blank" rel="noopener noreferrer">392 Bd Pedro de Luna, Montpellier</a></li>
            <li>📍 <a href="https://maps.app.goo.gl/CrK6BPonqMMSurmc6" target="_blank" rel="noopener noreferrer">139 Rue Frimaire, Montpellier</a></li>
            <li>📍 <a href="https://maps.app.goo.gl/K3RrMzXEDUf6oPcU6" target="_blank" rel="noopener noreferrer">18 Rue Boussairolles, Montpellier</a></li>
            <li>💬 <a href="https://wa.me/33757754774" target="_blank" rel="noopener noreferrer">+33 7 57 75 47 74 (WhatsApp)</a></li>
          </ul>
          <form className="footer__newsletter" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Adresse e-mail" aria-label="Adresse e-mail" />
            <button type="submit">Je m'abonne</button>
          </form>
          <p className="footer__newsletter-hint">Entrez votre e-mail et recevez nos dernières offres</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>2025 PERMISEXPRESS.FR | Tous droits réservés</p>
      </div>
    </footer>
  )
}
