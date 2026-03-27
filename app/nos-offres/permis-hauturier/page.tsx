import ProductPage from '@/components/ProductPage'

export default function PermisHauturierPage() {
  return (
    <ProductPage
      title="Permis Hauturier"
      price="500€"
      breadcrumb="Permis Hauturier"
      image="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80"
      inscriptionSlug="permis-hauturier"
      subtitle="Extension du permis côtier pour naviguer en haute mer sans limite de distance"
      features={[
        {
          title: 'Conditions d\'accès',
          items: [
            'Être titulaire du permis côtier',
            'Être âgé d\'au moins 16 ans',
          ],
        },
        {
          title: 'La formation comprend',
          items: [
            'Navigation astronomique et électronique (GPS, radar)',
            'Météorologie avancée',
            'Réglementation internationale COLREG',
            'Gestion des situations d\'urgence en haute mer',
            'Préparation à l\'examen théorique hauturier',
          ],
        },
        {
          title: 'Ce permis vous permet de',
          items: [
            'Naviguer sans limite de distance des côtes',
            'Effectuer des traversées hauturières',
            'Piloter tout type de bateau de plaisance à moteur',
          ],
        },
        {
          title: 'Documents à fournir',
          items: [
            'Permis côtier en cours de validité',
            'Carte d\'identité ou passeport',
            'Photo d\'identité',
          ],
        },
      ]}
    />
  )
}
