'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import LogoPermisExpress from './LogoPermisExpress'
import CartButton from './CartButton'
import { useAuth } from '@/context/AuthContext'

type SubItem = { label: string; href: string }
type MenuItem = {
  label: string
  href: string
  submenu?: (SubItem & { submenu?: SubItem[] })[]
}

type Offer = {
  slug: string
  title: string
  price: string
  is_active: boolean
}

const staticLinks: MenuItem[] = [
  { label: 'ACCUEIL', href: '/' },
  {
    label: "L'AUTO-ÉCOLE", href: '#',
    submenu: [
      { label: 'NOTRE MISSION', href: '/notre-mission' },
      { label: 'NOTRE ÉQUIPE', href: '/notre-equipe' },
      { label: 'OÙ NOUS TROUVER ?', href: '/nos-agences' },
    ],
  },
  // OFFRES sera injecté dynamiquement
  {
    label: 'SERVICES', href: '#',
    submenu: [
      { label: 'VÉRIFICATIONS AUDI A1', href: '/services/verification-audi-a1' },
      { label: 'QUESTIONS 1ER SECOURS', href: '/services/questions-1er-secours' },
    ],
  },
  {
    label: 'ESPACE ÉLÈVE', href: '#',
    submenu: [
      { label: 'DOCUMENTS INSCRIPTION', href: '/services/documents-inscription' },
      { label: 'INSCRIPTION', href: '/inscription-en-ligne' },
    ],
  },
  { label: 'TARIFS', href: '/tarifs' },
  { label: 'CONTACT', href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [offers, setOffers] = useState<Offer[]>([])
  const { user, profile, signOut } = useAuth()

  const loadOffers = () => {
    fetch('/api/offers', { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Offres chargées:', data.offers?.length || 0)
        setOffers(data.offers || [])
      })
      .catch(err => {
        console.error('Erreur chargement offres:', err)
        setOffers([])
      })
  }

  useEffect(() => {
    loadOffers()
    window.addEventListener('focus', loadOffers)
    window.addEventListener('offersUpdated', loadOffers)
    const onVisibility = () => { if (document.visibilityState === 'visible') loadOffers() }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('focus', loadOffers)
      window.removeEventListener('offersUpdated', loadOffers)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // Construire le menu OFFRES dynamiquement
  const offersSubmenu: SubItem[] = offers
    .filter(o => o.is_active)
    .map(o => ({
      label: `${o.title} — ${o.price}`,
      href: `/nos-offres/${o.slug}`
    }))
  offersSubmenu.push({ label: '→ TOUS LES TARIFS', href: '/tarifs' })

  const links: MenuItem[] = [
    staticLinks[0], // ACCUEIL
    staticLinks[1], // L'AUTO-ÉCOLE
    {
      label: 'OFFRES',
      href: '/tarifs',
      submenu: offersSubmenu.length > 1 ? offersSubmenu : [{ label: 'Chargement...', href: '/tarifs' }]
    },
    ...staticLinks.slice(2) // SERVICES, ESPACE ÉLÈVE, TARIFS, CONTACT
  ]

  function toggleSection(label: string) {
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar__inner">
          <Link href="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
            <LogoPermisExpress size={60} />
          </Link>

          {/* Desktop menu */}
          <ul className="navbar__menu">
            {links.map(l => (
              <li key={l.label} className={l.submenu ? 'dropdown' : ''}>
                {l.submenu ? (
                  <>
                    <Link href={l.href} className="dropdown-toggle">
                      {l.label} <span className="dropdown-arrow">▼</span>
                    </Link>
                    <ul className="dropdown-menu">
                      {l.submenu.map(sub => (
                        <li key={sub.label} className={(sub as SubItem & { submenu?: SubItem[] }).submenu ? 'has-sub-submenu' : ''}>
                          <Link href={sub.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                            {sub.label}
                            {(sub as SubItem & { submenu?: SubItem[] }).submenu && <span style={{ fontSize: '10px', color: '#aaa' }}>▶</span>}
                          </Link>
                          {(sub as SubItem & { submenu?: SubItem[] }).submenu && (
                            <ul className="sub-submenu">
                              {(sub as SubItem & { submenu?: SubItem[] }).submenu!.map(sc => (
                                <li key={sc.label}><Link href={sc.href}>{sc.label}</Link></li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link href={l.href}>{l.label}</Link>
                )}
              </li>
            ))}
          </ul>

          <div className="navbar__right">
            {user ? (
              <div className="navbar__account-wrap">
                <Link href="/connexion" className="navbar__account-btn" aria-label="Mon compte">
                  <span className="navbar__account-icon">👤</span>
                  <span className="navbar__account-name">{profile?.prenom || 'Compte'}</span>
                </Link>
                <div className="navbar__account-dropdown">
                  <p style={{ fontSize: 12, color: 'var(--text)', padding: '10px 16px 4px', margin: 0 }}>
                    {profile?.prenom} {profile?.nom}
                  </p>
                  <p style={{ fontSize: 11, color: '#aaa', padding: '0 16px 8px', margin: 0, borderBottom: '1px solid var(--border)' }}>
                    {user.email}
                  </p>
                  <button onClick={() => signOut()} className="navbar__account-logout">
                    Se déconnecter
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/connexion" className="navbar__login-btn" aria-label="Connexion">
                👤 Connexion
              </Link>
            )}
            <a href="https://wa.me/33757754774" className="navbar__phone" aria-label="WhatsApp">
              <span className="navbar__phone-icon">💬</span>
              <span>
                <span className="navbar__phone-label">WhatsApp</span>
                <span className="navbar__phone-number">+33 7 57 75 47 74</span>
              </span>
            </a>
            <CartButton />
          </div>

          {/* Mobile login button */}
          {user ? (
            <Link href="/connexion" className="navbar__mobile-login" onClick={() => setMenuOpen(false)}>
              👤 {profile?.prenom || 'Compte'}
            </Link>
          ) : (
            <Link href="/connexion" className="navbar__mobile-login" onClick={() => setMenuOpen(false)}>
              👤 Connexion
            </Link>
          )}

          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <a href="https://wa.me/33757754774" className="mobile-menu__wa" onClick={() => setMenuOpen(false)}>
              💬 WhatsApp : +33 7 57 75 47 74
            </a>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid var(--border)', background: '#f0fdf4' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)' }}>👤 {profile?.prenom} {profile?.nom}</span>
                <button onClick={() => { signOut(); setMenuOpen(false) }} style={{ background: 'none', border: 'none', color: 'var(--red)', fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link href="/connexion" className="mobile-menu__link" onClick={() => setMenuOpen(false)} style={{ background: 'var(--blue-pale)', color: 'var(--blue)', fontWeight: 800 }}>
                👤 CONNEXION / INSCRIPTION
              </Link>
            )}

            <ul className="mobile-menu__list">
              {links.map(l => (
                <li key={l.label} className="mobile-menu__item">
                  {l.submenu ? (
                    <>
                      <button
                        className="mobile-menu__section-btn"
                        onClick={() => toggleSection(l.label)}
                        aria-expanded={!!openSections[l.label]}
                      >
                        {l.label}
                        <span className={`mobile-menu__arrow${openSections[l.label] ? ' mobile-menu__arrow--open' : ''}`}>▼</span>
                      </button>
                      {openSections[l.label] && (
                        <ul className="mobile-menu__sub">
                          {l.submenu.map(sub => (
                            <li key={sub.label}>
                              {(sub as SubItem & { submenu?: SubItem[] }).submenu ? (
                                <>
                                  <button
                                    className="mobile-menu__section-btn mobile-menu__section-btn--sub"
                                    onClick={() => toggleSection(sub.label)}
                                    aria-expanded={!!openSections[sub.label]}
                                  >
                                    {sub.label}
                                    <span className={`mobile-menu__arrow${openSections[sub.label] ? ' mobile-menu__arrow--open' : ''}`}>▼</span>
                                  </button>
                                  {openSections[sub.label] && (
                                    <ul className="mobile-menu__subsub">
                                      {(sub as SubItem & { submenu?: SubItem[] }).submenu!.map(sc => (
                                        <li key={sc.label}>
                                          <Link href={sc.href} className="mobile-menu__link mobile-menu__link--deep" onClick={() => setMenuOpen(false)}>
                                            {sc.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </>
                              ) : (
                                <Link href={sub.href} className="mobile-menu__link mobile-menu__link--sub" onClick={() => setMenuOpen(false)}>
                                  {sub.label}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={l.href} className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
