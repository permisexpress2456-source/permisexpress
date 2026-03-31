import { Offer } from '@/types/offer'
import { permisData } from './permisData'

/**
 * Récupère les offres actives depuis l'API avec fallback sur permisData.ts
 * Exigences: 8.1, 8.2, 8.3
 */
export async function getActiveOffers(): Promise<Offer[]> {
  try {
    // Utiliser une URL absolue pour les appels côté serveur
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/offers`, { 
      next: { revalidate: 60 } // Cache avec revalidation toutes les 60 secondes
    })
    
    if (!res.ok) throw new Error('API error')
    
    const data = await res.json()
    return data.offers
  } catch {
    // Fallback sur permisData.ts si la base de données est inaccessible
    return getFallbackOffers()
  }
}

/**
 * Convertit les données statiques de permisData.ts en format Offer
 * Exigences: 8.2
 */
export function getFallbackOffers(): Offer[] {
  return Object.entries(permisData).map(([slug, data]) => ({
    id: slug,
    slug,
    title: data.title,
    price: data.price,
    description: data.description,
    documents: data.documents,
    image_url: '',
    is_active: true,
    created_at: '',
    updated_at: ''
  }))
}

/**
 * Récupère une offre par son slug
 */
export async function getOfferBySlug(slug: string): Promise<Offer | null> {
  const offers = await getActiveOffers()
  return offers.find(o => o.slug === slug) || null
}
