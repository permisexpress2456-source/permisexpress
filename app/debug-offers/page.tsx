'use client'
import { useEffect, useState } from 'react'

type Offer = {
  id: string
  slug: string
  title: string
  price: string
  is_active: boolean
  created_at: string
}

export default function DebugOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/offers', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setOffers(data.offers || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const fimoOffer = offers.find(o => 
    o.title.toLowerCase().includes('fimo') || o.slug.toLowerCase().includes('fimo')
  )

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'monospace' }}>
      <h1 style={{ marginBottom: '20px' }}>🔍 Debug - Offres API</h1>
      
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
      
      {!loading && !error && (
        <>
          <div style={{ 
            padding: '20px', 
            background: fimoOffer ? '#d4edda' : '#f8d7da', 
            border: `2px solid ${fimoOffer ? '#28a745' : '#dc3545'}`,
            borderRadius: '8px',
            marginBottom: '30px'
          }}>
            <h2 style={{ margin: '0 0 10px 0' }}>
              {fimoOffer ? '✅ FIMO trouvé!' : '❌ FIMO non trouvé'}
            </h2>
            {fimoOffer ? (
              <div>
                <p><strong>Titre:</strong> {fimoOffer.title}</p>
                <p><strong>Slug:</strong> {fimoOffer.slug}</p>
                <p><strong>Prix:</strong> {fimoOffer.price}</p>
                <p><strong>Active:</strong> {fimoOffer.is_active ? '✅ Oui' : '❌ Non'}</p>
                <p><strong>Créé le:</strong> {new Date(fimoOffer.created_at).toLocaleString('fr-FR')}</p>
              </div>
            ) : (
              <p>L'offre FIMO n'est pas retournée par l'API /api/offers</p>
            )}
          </div>

          <h2 style={{ marginBottom: '15px' }}>
            Toutes les offres actives ({offers.length})
          </h2>
          
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            background: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Titre</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Slug</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Prix</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Active</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Créé le</th>
              </tr>
            </thead>
            <tbody>
              {offers.map(offer => {
                const isFimo = offer.title.toLowerCase().includes('fimo') || offer.slug.toLowerCase().includes('fimo')
                return (
                  <tr 
                    key={offer.id}
                    style={{ 
                      borderBottom: '1px solid #dee2e6',
                      background: isFimo ? '#fff3cd' : 'white'
                    }}
                  >
                    <td style={{ padding: '12px' }}>
                      {isFimo && '🎯 '}
                      {offer.title}
                    </td>
                    <td style={{ padding: '12px', color: '#6c757d' }}>{offer.slug}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{offer.price}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {offer.is_active ? '✅' : '❌'}
                    </td>
                    <td style={{ padding: '12px', fontSize: '12px', color: '#6c757d' }}>
                      {new Date(offer.created_at).toLocaleString('fr-FR')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            background: '#e7f3ff', 
            borderRadius: '8px',
            border: '1px solid #b3d9ff'
          }}>
            <h3 style={{ marginTop: 0 }}>💡 Diagnostic</h3>
            <ul style={{ lineHeight: '1.8' }}>
              <li>Nombre total d'offres actives: <strong>{offers.length}</strong></li>
              <li>FIMO présent: <strong>{fimoOffer ? 'Oui ✅' : 'Non ❌'}</strong></li>
              {!fimoOffer && (
                <>
                  <li style={{ color: '#dc3545', fontWeight: 'bold' }}>
                    ⚠️ L'offre FIMO n'est pas visible car:
                    <ul>
                      <li>Elle n'existe pas dans la base de données, OU</li>
                      <li>Elle est marquée comme inactive (is_active = false)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Solution:</strong> Allez dans l'interface admin et vérifiez que l'offre FIMO est bien marquée comme "Active"
                  </li>
                </>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
