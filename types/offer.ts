/**
 * Types pour la gestion des offres
 * Exigences: 2.1, 3.1
 */

export interface Offer {
  id: string
  slug: string
  title: string
  price: string
  description: string
  documents: string[]
  image_url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateOfferInput {
  slug: string
  title: string
  price: string
  description?: string
  documents?: string[]
  image_url?: string
  is_active?: boolean
}

export interface UpdateOfferInput {
  slug?: string
  title?: string
  price?: string
  description?: string
  documents?: string[]
  image_url?: string
  is_active?: boolean
}

/**
 * Valide les données d'une offre avant création/modification
 * Exigences: 2.4
 * 
 * @param offer - Les données de l'offre à valider
 * @returns Un tableau d'erreurs (vide si valide)
 */
export function validateOffer(offer: CreateOfferInput): string[] {
  const errors: string[] = []

  if (!offer.slug?.trim()) {
    errors.push('Le slug est requis')
  } else if (!/^[a-z0-9-]+$/.test(offer.slug)) {
    errors.push('Le slug doit être en format kebab-case (lettres minuscules, chiffres, tirets)')
  }

  if (!offer.title?.trim()) {
    errors.push('Le titre est requis')
  } else if (offer.title.trim().length < 3) {
    errors.push('Le titre doit faire au moins 3 caractères')
  }

  if (!offer.price?.trim()) {
    errors.push('Le prix est requis')
  }

  return errors
}
