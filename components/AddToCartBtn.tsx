'use client'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

interface Props {
  id: string
  title: string
  price: number
  qty: number
}

export default function AddToCartBtn({ id, title, price, qty }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem({ id, title, price })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className={`btn-add-cart${added ? ' btn-add-cart--added' : ''}`}
    >
      {added ? '✓ Ajouté au panier !' : 'Ajouter au panier'}
    </button>
  )
}
