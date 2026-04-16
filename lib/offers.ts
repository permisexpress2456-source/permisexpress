import { Offer } from '@/types/offer'
import { permisData } from './permisData'

/**
 * Récupère les offres actives depuis l'API avec fallback sur permisData.ts
 * Exigences: 8.1, 8.2, 8.3
 */
export async function getActiveOffers(): Promise<Offer[]> {
  try {
    // Déterminer l'URL de base automatiquement
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin  // Côté client : utiliser l'origine actuelle
      : process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000'  // Côté serveur : essayer VERCEL_URL puis localhost
    
    const res = await fetch(`${baseUrl}/api/offers`, { 
      cache: 'no-store' // Désactiver le cache pour voir les nouvelles offres immédiatement
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
