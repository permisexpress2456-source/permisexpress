'use client'

import { useState } from 'react'

export default function PermisA2Page() {
    const [qty, setQty] = useState(1)

    return (
        <main className="product-page" style={{ padding: '60px 0', background: '#f8f8f8', minHeight: '100vh', marginTop: '1px' }}>
            <div className="container">
                {/* Breadcrumb */}
                <div style={{ marginBottom: '30px', fontSize: '13px', color: '#777' }}>
                    <a href="/" style={{ color: '#555' }}>Permisexpress.fr Montpellier</a> / <span style={{ color: '#aaa' }}>Produits</span> / <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Permis A2 21h</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    {/* Left Column: Image */}
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=570&h=400&fit=crop"
                            alt="Permis A2 21h"
                            style={{ width: '100%', borderRadius: '8px', boxShadow: '0px 10px 30px rgba(0,0,0,0.04)' }}
                        />
                    </div>

                    {/* Right Column: Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                        <div>
                            <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px' }}>Permis A2 21h</h1>
                            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>730.00€</div>
                        </div>

                        <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0px 4px 20px rgba(0,0,0,0.02)' }}>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '18px', lineHeight: '1.7', color: '#444', fontSize: '15px' }}>
                                <li style={{ fontWeight: 700, color: 'var(--dark)' }}>21h de leçon</li>
                                <li>être âgé d’au moins 18 ans</li>
                                <li>avoir réussi l’épreuve théorique générale moto (code moto)</li>
                            </ul>

                            <div style={{ borderTop: '1px solid #f2f2f2', paddingTop: '15px' }}>
                                <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--dark)' }}>Vivez la moto !</strong>
                                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                                    Le Permis A2 permet de conduire une moto d’une puissance inférieure à 35 Kw (soit environ 47 chevaux) dès 18 ans.
                                </p>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div>
                            <div style={{ marginBottom: '8px', fontWeight: 700, fontSize: '13px', color: 'var(--dark)' }}>Quantité</div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    style={{ width: '38px', height: '38px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', borderRight: 0, borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}
                                >-</button>
                                <input
                                    type="text"
                                    value={qty}
                                    readOnly
                                    style={{ width: '45px', height: '38px', textAlign: 'center', border: '1px solid #ddd', fontWeight: 600, fontSize: '14px' }}
                                />
                                <button
                                    onClick={() => setQty(qty + 1)}
                                    style={{ width: '38px', height: '38px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', borderLeft: 0, borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}
                                >+</button>
                            </div>
                        </div>

                        <button style={{
                            background: 'var(--dark)',
                            color: 'var(--white)',
                            border: 'none',
                            padding: '16px 45px',
                            fontSize: '15px',
                            fontWeight: 800,
                            borderRadius: '4px',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            width: 'max-content',
                            letterSpacing: '0.5px',
                            transition: 'background 0.2s'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'var(--dark)'}
                        >
                            Ajouter Au Panier
                        </button>

                        <a href="/inscription/permis-a2-21h" style={{ display: 'block', background: 'var(--red)', color: '#fff', padding: '14px', borderRadius: 'var(--radius)', fontWeight: 900, fontSize: '15px', textDecoration: 'none', textAlign: 'center', marginTop: '10px' }}>
                          ✅ S&apos;inscrire &amp; Payer
                        </a>

                        {/* Alma Installment text placeholder */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '13px', color: '#555' }}>
                            <div style={{ padding: '3px 7px', background: '#e9e9e9', borderRadius: '4px', fontWeight: 800, fontSize: '11px', color: '#333' }}>3x</div>
                            <div>À partir de 100,00 €</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
