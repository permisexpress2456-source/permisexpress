'use client'
import { useState, useEffect, useCallback } from 'react'

const partners = [
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_Audi-min.png', alt: 'Audi' },
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_CNPA-min.png.webp', alt: 'CNPA' },
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_DriveUp-min.png.webp', alt: 'DriveUp' },
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_CodeRousseau-min.png.webp', alt: 'Code Rousseau' },
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_France3Occi-min.png.webp', alt: 'France 3 Occitanie' },
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_Mounki-min.png.webp', alt: 'Mounki' },
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_EcoleConduiteQualite-min.png.webp', alt: 'École Conduite Qualité' },
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_Qualiopi-min.png.webp', alt: 'Qualiopi' },
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_Google-min.png.webp', alt: 'Google' },
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_Total-min.png.webp', alt: 'Total' },
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_SGS-min.png.webp', alt: 'SGS' },
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_AXA-min.png.webp', alt: 'AXA' },
  { src: 'https://opermis.fr/wp-content/uploads/2024/03/Brands2_VroumVroum-min.png.webp', alt: 'VroumVroum' },
]

export default function Partners() {
  const [offset, setOffset] = useState(0)
  const [paused, setPaused] = useState(false)

  const items = [...partners, ...partners]

  const advance = useCallback(() => {
    setOffset(prev => {
      const next = prev + 1
      return next >= partners.length ? 0 : next
    })
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(advance, 3000)
    return () => clearInterval(id)
  }, [paused, advance])

  return (
    <section className="partners">
      <div className="container">
        <h3 className="partners__title">
          Partenaires Officiels De Permisexpress.fr, Auto Ecole Montpellier
        </h3>
      </div>
      <div
        className="partners__track-wrapper"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="partners__track"
          style={{ transform: `translateX(-${offset * 194}px)` }}
        >
          {items.map((p, i) => (
            <div className="partners__item" key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt} width={134} height={66} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
