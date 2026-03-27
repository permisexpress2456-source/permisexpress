import ProductPage from '@/components/ProductPage'

export default function PermisB96Page() {
  return (
    <ProductPage
      title="Permis B96"
      price="1 500€"
      breadcrumb="Permis B96"
      image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
      inscriptionSlug="permis-b96"
      subtitle="Extension du permis B pour remorques jusqu'à 4 250 kg"
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
            'Conduite d\'un ensemble dont le PTAC dépasse 3 500 kg (jusqu\'à 4 250 kg)',
            'Attelage et dételage de remorques lourdes',
            'Manœuvres spécifiques et sécurité routière',
            '7 heures de formation obligatoire',
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
