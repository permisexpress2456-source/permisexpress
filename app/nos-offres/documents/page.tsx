import ProductPage from '@/components/ProductPage'

export default function DocumentsPage() {
  return (
    <ProductPage
      title="Documents Administratifs"
      price="À partir de 1 000€"
      breadcrumb="Documents Administratifs"
      image="https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?auto=format&fit=crop&w=800&q=80"
      subtitle="Pièce d'identité, titre de séjour, carte grise, carte VTC & taxi"
      contactOnly
      features={[
        {
          title: 'Nos prestations',
          items: [
            "Pièce d'identité — 1 500€",
            'Titre de séjour — 1 200€',
            'Carte VTC & Taxi — 1 200€',
            'Carte Grise — 1 000€',
            'Récupération de points perdus — 40€ / point',
          ],
        },
        {
          title: 'Comment ça marche ?',
          items: [
            'Contactez-nous via WhatsApp ou Telegram',
            'Envoyez vos documents justificatifs',
            'Nous traitons votre dossier rapidement',
            'Livraison sécurisée du document',
          ],
        },
      ]}
    />
  )
}
