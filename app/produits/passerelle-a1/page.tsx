import ProductPage from '@/components/ProductPage'

export default function Permis125Page() {
  return (
    <ProductPage
      title="Permis 125 (Formation A1)"
      price="1 300€"
      breadcrumb="Permis 125"
      image="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=570&h=400&fit=crop"
      inscriptionSlug="passerelle-a1"
      features={[
        {
          title: 'Conditions d\'accès',
          items: [
            'Être titulaire du permis B depuis au moins 2 ans',
            'Être âgé d\'au moins 20 ans',
          ],
        },
        {
          title: 'La formation (7h)',
          items: [
            '3h de formation théorique (risques, équipements, réglementation)',
            '4h de formation pratique sur plateau et en circulation',
            'Pas d\'examen — attestation de formation délivrée',
          ],
        },
        {
          title: 'Ce permis vous permet de',
          items: [
            'Conduire une moto de 125 cm³ (11 kW max)',
            'Conduire un scooter 3 roues de plus de 50 cm³',
            'Circuler sur autoroute avec une 125 cm³',
          ],
        },
        {
          title: 'Documents à fournir',
          items: [
            'Permis B en cours de validité (2 ans minimum)',
            'Carte d\'identité ou passeport',
            'Justificatif de domicile',
            'E-photo d\'identité',
          ],
        },
      ]}
    />
  )
}
