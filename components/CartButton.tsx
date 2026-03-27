'use client'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartButton() {
  const { count } = useCart()
  return (
    <Link href="/panier" className="navbar__cart" aria-label="Panier" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      🛒
      {count > 0 && (
        <span style={{
          position: 'absolute',
          top: '-8px',
          right: '-10px',
          background: 'var(--red)',
          color: '#fff',
          borderRadius: '50%',
          width: '18px',
          height: '18px',
          fontSize: '11px',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
        }}>
          {count}
        </span>
      )}
    </Link>
  )
}
