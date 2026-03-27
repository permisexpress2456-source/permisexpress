import ProductPage from '@/components/ProductPage'

export default function PermisBateauPage() {
  return (
    <ProductPage
      title="Permis Bateau Côtier & Fluvial"
      price="1 800€"
      breadcrumb="Permis Bateau"
      image="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80"
      inscriptionSlug="permis-bateau"
      subtitle="Naviguez en mer et sur les voies fluviales en toute sécurité"
      features={[
        {
          title: 'Conditions d\'accès',
          items: [
            'Être âgé d\'au moins 16 ans',
            'Savoir nager (attestation requise)',
          ],
        },
        {
          title: 'La formation comprend',
          items: [
            'Cours théoriques : météo, navigation, réglementation maritime',
            'Pratique en mer et/ou sur voies fluviales',
            'Manœuvres d\'accostage, de mouillage et de sécurité',
            'Préparation complète à l\'examen officiel',
          ],
        },
        {
          title: 'Ce permis vous permet de',
          items: [
            'Naviguer jusqu\'à 6 milles nautiques d\'un abri (côtier)',
            'Conduire sur toutes les voies navigables intérieures (fluvial)',
            'Piloter des bateaux à moteur de plaisance',
          ],
        },
        {
          title: 'Documents à fournir',
          items: [
            'Carte d\'identité ou passeport',
            'Justificatif de domicile',
            'Attestation de natation',
            'Photo d\'identité',
          ],
        },
      ]}
    />
  )
}
