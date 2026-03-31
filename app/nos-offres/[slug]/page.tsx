import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { permisData } from '@/lib/permisData'
import ProductPage from '@/components/ProductPage'
import { notFound } from 'next/navigation'

// Images par défaut pour chaque type d'offre
const defaultImages: Record<string, string> = {
  'permis-b': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
  'permis-am': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
  'passerelle-a1': 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80',
  'permis-a2-21h': 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80',
  'permis-a2-27h': 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80',
  'passerelle-a': 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80',
  'permis-be': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
  'permis-b96': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
  'permis-c': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
  'permis-ce': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
  'permis-ce-super': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
  'code': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
  'permis-chasse': 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=800&q=80',
  'permis-bateau': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
  'permis-hauturier': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
}

const defaultImage = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80'

async function getOffer(slug: string) {
  // Essayer de récupérer depuis Supabase
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from('offers')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
    
    if (data) return data
  }
  
  // Fallback sur permisData
  const staticData = permisData[slug]
  if (staticData) {
    return {
      slug,
      title: staticData.title,
      price: staticData.price,
      description: staticData.description,
      documents: staticData.documents,
      is_active: true
    }
  }
  
  return null
}

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const offer = await getOffer(slug)
  
  if (!offer) {
    notFound()
  }

  const features = [
    {
      title: 'Description',
      items: [offer.description || 'Formation complète avec accompagnement personnalisé.']
    },
    {
      title: 'Documents à fournir',
      items: offer.documents?.length ? offer.documents : ['Pièce d\'identité', 'Justificatif de domicile', '2 photos d\'identité']
    }
  ]

  // Utiliser l'image de la BDD si disponible, sinon fallback
  const imageUrl = offer.image_url || defaultImages[slug] || defaultImage

  return (
    <ProductPage
      title={offer.title}
      price={offer.price}
      breadcrumb={offer.title}
      image={imageUrl}
      inscriptionSlug={slug}
      features={features}
    />
  )
}

export async function generateStaticParams() {
  // Générer les pages statiques pour les offres connues
  const slugs = Object.keys(permisData)
  return slugs.map(slug => ({ slug }))
}

export const dynamic = 'force-dynamic'
export const revalidate = 0 // Toujours récupérer les données fraîches
