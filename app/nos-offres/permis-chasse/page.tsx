import ProductPage from '@/components/ProductPage'

export default function PermisChassePage() {
  return (
    <ProductPage
      title="Permis de Chasse"
      price="700€"
      breadcrumb="Permis de Chasse"
      image="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80"
      inscriptionSlug="permis-chasse"
      subtitle="Obtenez votre permis de chasser et pratiquez en toute légalité"
      features={[
        {
          title: 'Conditions d\'accès',
          items: [
            'Être âgé d\'au moins 16 ans',
            'Aptitude physique et mentale',
            'Casier judiciaire vierge',
          ],
        },
        {
          title: 'La formation comprend',
          items: [
            'Préparation à l\'examen théorique (faune, flore, réglementation)',
            'Épreuve pratique de sécurité avec arme factice',
            'Épreuve de tir sur plateau (ball-trap)',
            'Accompagnement jusqu\'à la validation',
          ],
        },
        {
          title: 'Documents à fournir',
          items: [
            'Carte d\'identité ou passeport',
            'Justificatif de domicile',
            'Certificat médical',
            'Photo d\'identité',
          ],
        },
      ]}
    />
  )
}
