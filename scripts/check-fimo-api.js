// Script pour vérifier l'offre FIMO via l'API
const http = require('http')

function checkAPI() {
  console.log('🔍 Vérification des offres via l\'API /api/offers...\n')

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/offers',
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache'
    }
  }

  const req = http.request(options, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      try {
        const json = JSON.parse(data)
        console.log(`✅ API répond avec ${json.offers?.length || 0} offres actives:\n`)
        
        if (json.offers && json.offers.length > 0) {
          json.offers.forEach(offer => {
            const isFimo = offer.title.toLowerCase().includes('fimo') || offer.slug.toLowerCase().includes('fimo')
            const marker = isFimo ? '🎯' : '  '
            console.log(`${marker} - ${offer.title} (${offer.slug}) - ${offer.price}`)
            if (isFimo) {
              console.log(`     ✅ is_active: ${offer.is_active}`)
              console.log(`     📅 created_at: ${offer.created_at}`)
            }
          })

          const fimoOffer = json.offers.find(o => 
            o.title.toLowerCase().includes('fimo') || o.slug.toLowerCase().includes('fimo')
          )

          if (fimoOffer) {
            console.log('\n✅ FIMO est présent dans l\'API!')
          } else {
            console.log('\n❌ FIMO n\'est PAS présent dans l\'API!')
            console.log('   Vérifiez que l\'offre est bien marquée comme active (is_active = true)')
          }
        } else {
          console.log('⚠️  Aucune offre retournée par l\'API')
        }
      } catch (err) {
        console.error('❌ Erreur de parsing JSON:', err.message)
        console.log('Réponse brute:', data)
      }
    })
  })

  req.on('error', (err) => {
    console.error('❌ Erreur de connexion à l\'API:', err.message)
    console.log('\n💡 Assurez-vous que le serveur Next.js est démarré (npm run dev)')
  })

  req.end()
}

checkAPI()
