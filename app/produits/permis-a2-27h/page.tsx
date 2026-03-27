import ProductPage from '@/components/ProductPage'

export default function PermisA227hPage() {
  return (
    <ProductPage
      title="Permis A2 — 27h"
      price="600€"
      breadcrumb="Permis A2 27h"
      image="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=570&h=400&fit=crop"
      inscriptionSlug="permis-a2-27h"
      subtitle="Formation moto 27 heures — idéale pour les débutants"
      features={[
        {
          title: 'Inclus dans la formation (27h)',
          items: [
            '27h de leçons de conduite moto',
            'Être âgé d\'au moins 18 ans',
            'Avoir réussi l\'épreuve théorique générale moto (code moto)',
            'Plateau + circulation sur voies ouvertes',
          ],
        },
        {
          title: 'Le Permis A2',
          items: [
            'Conduite d\'une moto d\'une puissance inférieure à 35 kW (≈ 47 ch)',
            'Accessible dès 18 ans',
            'Passerelle vers le permis A possible après 2 ans',
          ],
        },
        {
          title: 'Documents à fournir',
          items: [
            'Carte d\'identité ou passeport',
            'Justificatif de domicile',
            'E-photo d\'identité',
            'Journée d\'appel (entre 17 et 25 ans)',
          ],
        },
      ]}
    />
  )
}
