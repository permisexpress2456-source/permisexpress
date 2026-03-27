import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Documents d inscription - Permisexpress.fr",
  description: "Liste complete des documents obligatoires pour s inscrire a l auto-ecole Permisexpress.fr a Montpellier.",
}

const permisCategories = [
  {
    icon: '🚗',
    title: 'Permis B - Voiture',
    color: '#1a3a8f',
    docs: [
      { label: "Piece d identite en cours de validite", detail: "Carte nationale d identite ou passeport", required: true },
      { label: "Justificatif de domicile", detail: "Facture EDF, quittance de loyer - moins de 6 mois", required: true },
      { label: "E-photo d identite numerique (ANTS)", detail: "Code a 9 chiffres obtenu en mairie ou sur ants.gouv.fr", required: true },
      { label: "Attestation de recensement", detail: "Obligatoire si vous avez moins de 18 ans", required: false, condition: "Moins de 18 ans" },
      { label: "Attestation JAPD / JDC", detail: "Journee Defense et Citoyennete - entre 16 et 25 ans", required: false, condition: "16-25 ans" },
      { label: "Autorisation parentale", detail: "Signee par le representant legal si mineur", required: false, condition: "Mineur" },
    ],
  },
  {
    icon: '🏍️',
    title: 'Permis Moto (A, A2, AM)',
    color: '#d42b2b',
    docs: [
      { label: "Piece d identite en cours de validite", detail: "Carte nationale d identite ou passeport", required: true },
      { label: "Justificatif de domicile", detail: "Moins de 6 mois", required: true },
      { label: "E-photo d identite numerique (ANTS)", detail: "Code a 9 chiffres", required: true },
      { label: "Permis B en cours de validite", detail: "Pour les passerelles A1, A2 et A", required: false, condition: "Passerelle" },
      { label: "Attestation JAPD / JDC", detail: "Entre 16 et 25 ans", required: false, condition: "16-25 ans" },
    ],
  },
  {
    icon: '🚛',
    title: 'Permis Poids Lourd (C, CE)',
    color: '#0f2460',
    docs: [
      { label: "Piece d identite en cours de validite", detail: "Carte nationale d identite ou passeport", required: true },
      { label: "Justificatif de domicile", detail: "Moins de 6 mois", required: true },
      { label: "E-photo d identite numerique (ANTS)", detail: "Code a 9 chiffres", required: true },
      { label: "Permis B en cours de validite", detail: "Obligatoire pour passer le C ou CE", required: true },
      { label: "Visite medicale professionnelle", detail: "Medecin agree prefecture - obligatoire C/CE", required: true },
    ],
  },
  {
    icon: '⛵',
    title: 'Permis Bateau & Hauturier',
    color: '#1a6abf',
    docs: [
      { label: "Piece d identite en cours de validite", detail: "Carte nationale d identite ou passeport", required: true },
      { label: "Justificatif de domicile", detail: "Moins de 6 mois", required: true },
      { label: "Photo d identite recente", detail: "2 photos format 35x45 mm fond blanc", required: true },
      { label: "Certificat medical", detail: "Pour le permis hauturier uniquement", required: false, condition: "Hauturier" },
    ],
  },
  {
    icon: '🎯',
    title: 'Permis de Chasse',
    color: '#2d6a2d',
    docs: [
      { label: "Piece d identite en cours de validite", detail: "Carte nationale d identite ou passeport", required: true },
      { label: "Justificatif de domicile", detail: "Moins de 6 mois", required: true },
      { label: "Photo d identite recente", detail: "2 photos format 35x45 mm", required: true },
      { label: "Certificat medical", detail: "Aptitude physique et mentale", required: true },
    ],
  },
  {
    icon: '📄',
    title: 'Documents Administratifs',
    color: '#7c3aed',
    docs: [
      { label: "Piece d identite originale", detail: "Carte nationale d identite ou passeport en cours de validite", required: true },
      { label: "Justificatifs de domicile", detail: "Plusieurs documents selon le type de demarche", required: true },
      { label: "Photos d identite", detail: "Format officiel 35x45 mm fond blanc", required: true },
      { label: "Documents specifiques", detail: "Selon la demarche : acte de naissance, titre de sejour, etc.", required: false, condition: "Selon cas" },
    ],
  },
]

const steps = [
  { num: '01', title: 'Rassemblez vos documents', desc: 'Preparez tous les documents listes ci-dessous selon votre type de permis.' },
  { num: '02', title: 'Obtenez votre e-photo ANTS', desc: 'Rendez-vous sur ants.gouv.fr ou en mairie pour obtenir votre code e-photo a 9 chiffres.' },
  { num: '03', title: 'Contactez-nous', desc: 'Envoyez-nous vos documents par WhatsApp ou venez directement en agence.' },
  { num: '04', title: 'Signature du contrat', desc: "Nous finalisons votre inscription et vous ouvrons l acces a votre espace eleve." },
]

const casParticuliers = [
  { cas: 'Nationalite etrangere', doc: 'Titre de sejour en cours de validite' },
  { cas: 'Permis annule / suspendu', doc: 'Cerfa n14880*02 (avis medical)' },
  { cas: 'Deja titulaire d un permis', doc: 'Photocopie du permis existant' },
  { cas: 'Financement CPF', doc: 'Numero de securite sociale + compte CPF' },
]

export default function DocumentsInscriptionPage() {
  return (
    <main>
      <section className="page-header" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&h=600&fit=crop")' }}>
        <div className="container">
          <h1 className="page-header__title">Documents d Inscription</h1>
          <div className="page-header__breadcrumbs">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>Documents d inscription</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <p className="sec-title__tagline">Permisexpress.fr Montpellier</p>
            <h2 className="sec-title__title">Tout ce qu il faut pour s inscrire</h2>
            <p style={{ color: 'var(--text)', fontSize: '16px', lineHeight: 1.8, marginTop: '16px' }}>
              Retrouvez ci-dessous la liste complete des documents a fournir selon votre type de permis. En cas de doute, contactez-nous directement.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 60px', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {steps.map(s => (
              <div key={s.num} style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', padding: '28px 24px', borderTop: '4px solid var(--blue)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--blue-pale)', position: 'absolute', top: '8px', right: '16px', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--blue)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Etape {s.num}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: 'var(--off-white)' }}>
        <div className="container">
          <div className="sec-title">
            <p className="sec-title__tagline">Documents requis</p>
            <h2 className="sec-title__title">Par type de permis</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
            {permisCategories.map(cat => (
              <div key={cat.title} style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
                <div style={{ background: cat.color, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '28px' }}>{cat.icon}</span>
                  <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 800, margin: 0 }}>{cat.title}</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: '8px 0', margin: 0 }}>
                  {cat.docs.map((doc, i) => (
                    <li key={i} style={{ padding: '12px 24px', borderBottom: i < cat.docs.length - 1 ? '1px solid var(--off-white)' : 'none', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ marginTop: '2px', flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%', background: doc.required ? 'var(--blue)' : '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: doc.required ? '#fff' : '#2d6a2d', fontWeight: 700 }}>
                        {doc.required ? '✓' : '○'}
                      </span>
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--dark)', marginBottom: '2px' }}>
                          {doc.label}
                          {doc.condition && (
                            <span style={{ marginLeft: '8px', fontSize: '10px', background: '#fff3cd', color: '#856404', padding: '2px 7px', borderRadius: '10px', fontWeight: 600 }}>
                              {doc.condition}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text)' }}>{doc.detail}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '32px', display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text)' }}>
              <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#fff', fontWeight: 700 }}>✓</span>
              Document obligatoire
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text)' }}>
              <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#2d6a2d', fontWeight: 700 }}>○</span>
              Selon votre situation
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--blue-dark), var(--blue))', borderRadius: 'var(--radius-lg)', padding: '36px', color: '#fff' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>📸</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>E-photo ANTS</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, opacity: .85, marginBottom: '20px' }}>
                La photo d identite numerique est obligatoire pour toute demande de permis. Obtenez votre code a 9 chiffres en mairie ou via un photomaton agree ANTS.
              </p>
              <a href="https://ants.gouv.fr" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'var(--red)', color: '#fff', padding: '10px 22px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
                ants.gouv.fr →
              </a>
            </div>
            <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', padding: '36px', borderLeft: '4px solid var(--red)' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>⚠️</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--dark)', marginBottom: '12px' }}>Cas particuliers</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {casParticuliers.map(item => (
                  <li key={item.cas} style={{ fontSize: '13px', color: 'var(--text)', paddingLeft: '16px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--red)', fontWeight: 700 }}>›</span>
                    <strong style={{ color: 'var(--dark)' }}>{item.cas}</strong> : {item.doc}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', padding: '36px', borderLeft: '4px solid #25d366' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>💬</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--dark)', marginBottom: '12px' }}>Un doute ?</h3>
              <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.7, marginBottom: '20px' }}>
                Notre equipe repond a toutes vos questions. Contactez-nous gratuitement.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="https://wa.me/33757754774" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#25d366', color: '#fff', padding: '12px 20px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                  💬 WhatsApp : +33 7 57 75 47 74
                </a>
                <a href="https://t.me/permis_fr3" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#0088cc', color: '#fff', padding: '12px 20px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                  ✈️ Telegram : @permis_fr3
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, var(--blue-dark), var(--blue))', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, var(--blue-dark) 33.3%, #fff 33.3%, #fff 66.6%, var(--red) 66.6%)' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>Pret a vous inscrire ?</h2>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '16px', marginBottom: '28px' }}>Nos conseillers vous accompagnent de A a Z dans vos demarches.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/inscription-en-ligne" style={{ background: 'var(--red)', color: '#fff', padding: '14px 32px', borderRadius: 'var(--radius)', fontWeight: 800, fontSize: '15px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '.5px' }}>
              S inscrire maintenant
            </Link>
            <Link href="/contact" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', padding: '14px 32px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '15px', textDecoration: 'none', border: '1px solid rgba(255,255,255,.3)' }}>
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
