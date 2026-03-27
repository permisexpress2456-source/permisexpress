import ProductPage from '@/components/ProductPage'

export default function PermisCESuperPage() {
  return (
    <ProductPage
      title="Super Poids Lourd (CE)"
      price="2 000€"
      breadcrumb="Super Poids Lourd"
      image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80"
      inscriptionSlug="permis-ce-super"
      subtitle="Conduire des ensembles articulés (semi-remorques) sans limite de tonnage"
      features={[
        {
          title: 'Conditions d\'accès',
          items: [
            'Être titulaire du permis C',
            'Être âgé d\'au moins 21 ans',
            'Aptitude médicale obligatoire',
          ],
        },
        {
          title: 'Ce que vous apprendrez',
          items: [
            'Conduite de semi-remorques et trains routiers',
            'Attelage / dételage de semi-remorques',
            'Gestion des charges lourdes et arrimage',
            'Réglementation spécifique aux ensembles articulés',
          ],
        },
        {
          title: 'Documents à fournir',
          items: [
            'Permis C en cours de validité',
            'Carte d\'identité ou passeport',
            'Justificatif de domicile',
            'Certificat médical d\'aptitude',
            'E-photo d\'identité',
          ],
        },
      ]}
    />
  )
}
