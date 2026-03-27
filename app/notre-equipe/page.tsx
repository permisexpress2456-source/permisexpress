import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notre Equipe — Permisexpress.fr',
  description: 'Decouvrez l equipe de moniteurs et conseillers de Permisexpress.fr a Montpellier.',
}

const moniteurs = [
  {
    name: 'Alexandra',
    role: 'Monitrice de conduite',
    photo: 'https://opermis.fr/wp-content/uploads/2021/07/ALEXANDRA-570x760.png',
    quote: 'La patience est la cle de la reussite.',
  },
  {
    name: 'Souad',
    role: 'Monitrice de conduite',
    photo: 'https://opermis.fr/wp-content/uploads/2021/07/SOUAD-1-570x760.jpg.webp',
    quote: 'Chaque eleve a son propre rythme, je m adapte.',
  },
  {
    name: 'Steeve',
    role: 'Moniteur de conduite',
    photo: 'https://opermis.fr/wp-content/uploads/2021/07/STEEVE-570x760.jpg.webp',
    quote: 'La securite routiere, c est mon engagement quotidien.',
  },
  {
    name: 'Olivier',
    role: 'Moniteur de conduite',
    photo: 'https://opermis.fr/wp-content/uploads/2021/07/OLIVIER-1-570x760.jpg.webp',
    quote: 'Conduire, ca s apprend avec confiance.',
  },
]

const organisation = [
  {
    name: 'Amel',
    role: 'Manager',
    photo: 'https://opermis.fr/wp-content/uploads/2021/07/OPermis_Moniteur_Amel-min-570x810.jpg.webp',
    quote: 'Je coordonne tout pour que votre parcours soit fluide.',
  },
  {
    name: 'Siham',
    role: 'Secretaire',
    photo: 'https://opermis.fr/wp-content/uploads/2021/07/OPermis_Moniteur_Siham-min-570x810.jpg.webp',
    quote: 'Je suis la pour repondre a toutes vos questions.',
  },
  {
    name: 'Mary',
    role: 'Secretaire',
    photo: 'https://opermis.fr/wp-content/uploads/2021/07/Moniteur_Mary_1-min-570x810.jpg.webp',
    quote: 'Votre dossier est entre de bonnes mains.',
  },
  {
    name: 'Alizee',
    role: 'Community Manager',
    photo: 'https://opermis.fr/wp-content/uploads/2021/07/OPermis_Moniteur_8-min-570x810.jpg.webp',
    quote: 'Je partage votre succes sur les reseaux.',
  },
  {
    name: 'Sarah',
    role: 'Boss Lady',
    photo: 'https://opermis.fr/wp-content/uploads/2021/07/OPermis_Moniteur_9-min-570x810.jpg.webp',
    quote: 'L excellence est notre standard.',
  },
  {
    name: 'Ilias',
    role: 'Big Boss',
    photo: 'https://opermis.fr/wp-content/uploads/2021/07/OPermis_Moniteur_15-min-570x810.jpg.webp',
    quote: 'Nous construisons la meilleure auto-ecole de France.',
  },
]

const stats = [
  { value: '2 000+', label: 'Permis obtenus' },
  { value: '97%', label: 'Taux de reussite code' },
  { value: '9 ans', label: "D experience" },
  { value: '3', label: 'Agences a Montpellier' },
]

function TeamCard({ member }: { member: { name: string; role: string; photo: string; quote: string } }) {
  return (
    <div style={{
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      background: 'var(--white)',
      border: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
        <img
          src={member.photo}
          alt={member.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
        />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(26,58,143,0.92) 0%, transparent 100%)',
          padding: '40px 20px 20px',
        }}>
          <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 900, margin: 0 }}>{member.name}</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '1px' }}>{member.role}</p>
        </div>
      </div>
      <div style={{ padding: '20px', borderTop: '3px solid var(--red)', flex: 1 }}>
        <p style={{ fontSize: '14px', color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
          &ldquo;{member.quote}&rdquo;
        </p>
      </div>
    </div>
  )
}

export default function NotreEquipePage() {
  return (
    <main>
      <section className="page-header" style={{ backgroundImage: 'url("https://opermis.fr/wp-content/uploads/2021/07/contact-bg.jpg")' }}>
        <div className="container">
          <h1 className="page-header__title">Notre Equipe</h1>
          <div className="page-header__breadcrumbs">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <Link href="/notre-mission">L Auto-Ecole</Link>
            <span>/</span>
            <span>Notre Equipe</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '70px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <p className="sec-title__tagline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', color: 'var(--blue)', fontSize: '12px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '14px' }}>
              <span style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg,var(--blue),var(--red))', display: 'inline-block', borderRadius: '2px' }} />
              Permisexpress.fr Montpellier
              <span style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg,var(--blue),var(--red))', display: 'inline-block', borderRadius: '2px' }} />
            </p>
            <h2 style={{ fontSize: '34px', fontWeight: 900, color: 'var(--dark)', marginBottom: '20px', lineHeight: 1.25 }}>
              Des professionnels a votre service
            </h2>
            <p style={{ color: 'var(--text)', fontSize: '16px', lineHeight: 1.8 }}>
              Notre equipe de moniteurs diplomes et de conseillers experimentes met tout en oeuvre pour vous accompagner vers la reussite.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 70px', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: 'linear-gradient(135deg, var(--blue-dark), var(--blue))', borderRadius: 'var(--radius-lg)', padding: '32px 20px', textAlign: 'center', color: '#fff' }}>
                <div style={{ fontSize: '40px', fontWeight: 900, marginBottom: '8px' }}>{s.value}</div>
                <div style={{ fontSize: '13px', opacity: 0.8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '70px 0', background: 'var(--off-white)' }}>
        <div className="container">
          <div className="sec-title">
            <p className="sec-title__tagline">Sur la route</p>
            <h2 className="sec-title__title">Nos Moniteurs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px' }}>
            {moniteurs.map(m => <TeamCard key={m.name} member={m} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: '70px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="sec-title">
            <p className="sec-title__tagline">En coulisses</p>
            <h2 className="sec-title__title">Nos As de l Organisation</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px' }}>
            {organisation.map(m => <TeamCard key={m.name} member={m} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, var(--blue-dark), var(--blue))', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, var(--blue-dark) 33.3%, #fff 33.3%, #fff 66.6%, var(--red) 66.6%)' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>Rejoignez nos eleves</h2>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '16px', marginBottom: '28px' }}>Notre equipe est prete a vous accompagner vers la reussite.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/33757754774" target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '14px 32px', borderRadius: 'var(--radius)', fontWeight: 800, fontSize: '15px', textDecoration: 'none' }}>
              WhatsApp
            </a>
            <Link href="/inscription-en-ligne"
              style={{ background: 'var(--red)', color: '#fff', padding: '14px 32px', borderRadius: 'var(--radius)', fontWeight: 800, fontSize: '15px', textDecoration: 'none' }}>
              S inscrire
            </Link>
            <Link href="/contact"
              style={{ background: 'rgba(255,255,255,.15)', color: '#fff', padding: '14px 32px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '15px', textDecoration: 'none', border: '1px solid rgba(255,255,255,.3)' }}>
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
