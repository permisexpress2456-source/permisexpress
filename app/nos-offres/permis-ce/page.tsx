import ProductPage from '@/components/ProductPage'

export default function PermisCEPage() {
  return (
    <ProductPage
      title="Permis CE"
      price="1 700€"
      breadcrumb="Permis CE"
      image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80"
      inscriptionSlug="permis-ce"
      subtitle="Permis poids lourd avec remorque — transport longue distance"
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
            'Conduite d\'un ensemble camion + remorque (PTAC > 3,5 t)',
            'Attelage et dételage de remorques lourdes',
            'Manœuvres spécifiques en marche arrière',
            'Réglementation du transport routier de marchandises',
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
