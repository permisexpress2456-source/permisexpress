import ProductPage from '@/components/ProductPage'

export default function CodeRoutePage() {
  return (
    <ProductPage
      title="Code de la Route"
      price="250€"
      breadcrumb="Code de la Route"
      image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
      inscriptionSlug="code"
      subtitle="Préparez et réussissez l'épreuve théorique générale"
      features={[
        {
          title: 'Ce qui est inclus',
          items: [
            'Accès illimité à la plateforme d\'entraînement en ligne',
            'Séances de révision en salle avec moniteur',
            'Passages illimités à l\'examen jusqu\'à la réussite',
            'Suivi personnalisé de votre progression',
          ],
        },
        {
          title: 'L\'épreuve théorique',
          items: [
            '40 questions à choix multiples',
            'Seuil de réussite : 35 bonnes réponses sur 40',
            'Durée : 30 minutes',
            'Valable pour tous les permis (B, moto, poids lourd…)',
          ],
        },
        {
          title: 'Documents à fournir',
          items: [
            'Carte d\'identité ou passeport',
            'Justificatif de domicile',
            'E-photo d\'identité',
          ],
        },
      ]}
    />
  )
}
