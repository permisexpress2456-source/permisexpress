import ProductPage from '@/components/ProductPage'

export default function PermisA3Page() {
  return (
    <ProductPage
      title="Permis Moto A3 (Passerelle A)"
      price="1 300€"
      breadcrumb="Permis Moto A3"
      image="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=570&h=400&fit=crop"
      inscriptionSlug="passerelle-a"
      subtitle="Accédez au permis A (toutes cylindrées) depuis le permis A2"
      features={[
        {
          title: 'Conditions d\'accès',
          items: [
            'Être titulaire du permis A2 depuis au moins 2 ans',
            'Être âgé d\'au moins 20 ans',
          ],
        },
        {
          title: 'La formation (7h)',
          items: [
            '7h de formation pratique sur plateau et en circulation',
            'Pas d\'examen — attestation de formation délivrée',
            'Conduite de motos de forte cylindrée encadrée par un moniteur',
          ],
        },
        {
          title: 'Ce permis vous permet de',
          items: [
            'Conduire toutes les motos sans restriction de puissance',
            'Piloter des motos de plus de 35 kW (> 47 ch)',
            'Accéder aux plus grandes cylindrées dès 20 ans',
          ],
        },
        {
          title: 'Documents à fournir',
          items: [
            'Permis A2 en cours de validité (2 ans minimum)',
            'Carte d\'identité ou passeport',
            'Justificatif de domicile',
            'E-photo d\'identité',
          ],
        },
      ]}
    />
  )
}
