// Script pour vérifier l'offre FIMO dans la base de données
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Lire le fichier .env.local manuellement
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY
)

async function checkFimo() {
  console.log('🔍 Vérification de l\'offre FIMO...\n')

  // Chercher FIMO par slug
  const { data: bySlug, error: errorSlug } = await supabase
    .from('offers')
    .select('*')
    .eq('slug', 'fimo')
    .single()

  if (errorSlug && errorSlug.code !== 'PGRST116') {
    console.error('❌ Erreur lors de la recherche par slug:', errorSlug)
  } else if (bySlug) {
    console.log('✅ Offre trouvée par slug "fimo":')
    console.log(JSON.stringify(bySlug, null, 2))
  } else {
    console.log('⚠️  Aucune offre avec le slug "fimo"')
  }

  console.log('\n---\n')

  // Chercher FIMO par titre (case insensitive)
  const { data: byTitle, error: errorTitle } = await supabase
    .from('offers')
    .select('*')
    .ilike('title', '%fimo%')

  if (errorTitle) {
    console.error('❌ Erreur lors de la recherche par titre:', errorTitle)
  } else if (byTitle && byTitle.length > 0) {
    console.log(`✅ ${byTitle.length} offre(s) trouvée(s) avec "FIMO" dans le titre:`)
    byTitle.forEach(offer => {
      console.log(`\n- ID: ${offer.id}`)
      console.log(`  Slug: ${offer.slug}`)
      console.log(`  Titre: ${offer.title}`)
      console.log(`  Prix: ${offer.price}`)
      console.log(`  Active: ${offer.is_active ? '✅ OUI' : '❌ NON'}`)
      console.log(`  Créée le: ${offer.created_at}`)
    })
  } else {
    console.log('⚠️  Aucune offre avec "FIMO" dans le titre')
  }

  console.log('\n---\n')

  // Lister toutes les offres actives
  const { data: allActive, error: errorActive } = await supabase
    .from('offers')
    .select('slug, title, is_active')
    .eq('is_active', true)
    .order('title')

  if (errorActive) {
    console.error('❌ Erreur lors de la récupération des offres actives:', errorActive)
  } else {
    console.log(`📋 Toutes les offres actives (${allActive.length}):`)
    allActive.forEach(offer => {
      console.log(`  - ${offer.title} (${offer.slug})`)
    })
  }
}

checkFimo().then(() => {
  console.log('\n✅ Vérification terminée')
  process.exit(0)
}).catch(err => {
  console.error('\n❌ Erreur:', err)
  process.exit(1)
})
