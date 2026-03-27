import ProductPage from '@/components/ProductPage'

export default function PermisCPage() {
  return (
    <ProductPage
      title="Permis Poids Lourd (C)"
      price="1 500€"
      breadcrumb="Permis Poids Lourd"
      image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80"
      inscriptionSlug="permis-c"
      subtitle="Conduire des véhicules de transport de marchandises de plus de 3,5 tonnes"
      features={[
        {
          title: 'Conditions d\'accès',
          items: [
            'Être âgé d\'au moins 18 ans (21 ans sans dérogation)',
            'Être titulaire du permis B',
            'Aptitude médicale obligatoire',
          ],
        },
        {
          title: 'Ce que vous apprendrez',
          items: [
            'Conduite de camions porteurs (PTAC > 3,5 t)',
            'Chargement et arrimage des marchandises',
            'Réglementation transport routier',
            'Conduite économique et sécuritaire',
          ],
        },
        {
          title: 'Documents à fournir',
          items: [
            'Permis B en cours de validité',
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
