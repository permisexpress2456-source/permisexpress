'use client'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function PanierPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <main className="panier__empty">
        <div className="container">
          <div className="panier__empty-inner">
            <div className="panier__empty-icon">🛒</div>
            <h1 className="panier__empty-title">Votre panier est vide</h1>
            <p className="panier__empty-text">Ajoutez des formations pour commencer.</p>
            <Link href="/tarifs" className="panier__empty-btn">Voir nos offres</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="panier">
      <div className="container">
        <h1 className="panier__title">Mon Panier</h1>

        <div className="panier__layout">
          {/* Articles */}
          <div className="panier__items">
            {items.map(item => (
              <div key={item.id} className="panier__item">
                <div className="panier__item-info">
                  <h3 className="panier__item-name">{item.title}</h3>
                  <p className="panier__item-price">{item.price.toLocaleString('fr-FR')} €</p>
                </div>

                <div className="qty-stepper">
                  <button className="qty-stepper__btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <input className="qty-stepper__input" type="text" value={item.qty} readOnly />
                  <button className="qty-stepper__btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>

                <div className="panier__item-total">
                  {(item.price * item.qty).toLocaleString('fr-FR')} €
                </div>

                <button className="panier__item-remove" onClick={() => removeItem(item.id)} aria-label="Supprimer">✕</button>
              </div>
            ))}

            <button className="panier__clear" onClick={clearCart}>Vider le panier</button>
          </div>

          {/* Récapitulatif */}
          <div className="panier__summary">
            <h2 className="panier__summary-title">Récapitulatif</h2>

            <div className="panier__summary-lines">
              {items.map(item => (
                <div key={item.id} className="panier__summary-line">
                  <span>{item.title} × {item.qty}</span>
                  <span>{(item.price * item.qty).toLocaleString('fr-FR')} €</span>
                </div>
              ))}
            </div>

            <div className="panier__summary-total">
              <span className="panier__summary-total-label">Total</span>
              <span className="panier__summary-total-amount">{total.toLocaleString('fr-FR')} €</span>
            </div>

            <div className="panier__installment">
              <span className="panier__installment-badge">3x</span>
              <span className="panier__installment-text">
                À partir de {(total / 3).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} € / mois
              </span>
            </div>

            <a href="https://wa.me/33757754774" target="_blank" rel="noopener noreferrer" className="panier__btn-wa">
              💬 Commander via WhatsApp
            </a>
            <a href="https://t.me/permis_fr3" target="_blank" rel="noopener noreferrer" className="panier__btn-tg">
              ✈️ Commander via Telegram
            </a>

            <p className="panier__secure">🔒 Paiement sécurisé — Réponse sous 24h</p>
          </div>
        </div>
      </div>
    </main>
  )
}
