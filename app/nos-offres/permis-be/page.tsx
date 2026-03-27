import ProductPage from '@/components/ProductPage'

export default function PermisBeePage() {
  return (
    <ProductPage
      title="Permis BE"
      price="1 000€"
      breadcrumb="Permis BE"
      image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
      inscriptionSlug="permis-be"
      subtitle="Conduire un véhicule de catégorie B avec une remorque lourde"
      features={[
        {
          title: 'Conditions d\'accès',
          items: [
            'Être titulaire du permis B',
            'Être âgé d\'au moins 18 ans',
          ],
        },
        {
          title: 'Ce que vous apprendrez',
          items: [
            'Attelage et dételage d\'une remorque',
            'Conduite d\'un ensemble véhicule + remorque (PTAC > 750 kg)',
            'Manœuvres spécifiques (marche arrière, stationnement)',
            'Règles de sécurité liées au remorquage',
          ],
        },
        {
          title: 'Documents à fournir',
          items: [
            'Permis B en cours de validité',
            'Carte d\'identité ou passeport',
            'Justificatif de domicile',
            'E-photo d\'identité',
          ],
        },
      ]}
    />
  )
}
