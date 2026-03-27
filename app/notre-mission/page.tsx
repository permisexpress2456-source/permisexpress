'use client'

export default function NotreMissionPage() {
    return (
        <main className="notre-mission" style={{ padding: '80px 0', background: '#fafafa', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>

                {/* Breadcrumb */}
                <div style={{ marginBottom: '40px', fontSize: '14px', color: '#6d7076', fontFamily: 'var(--drivschol-font, sans-serif)' }}>
                    <a href="/" style={{ color: '#111117', textDecoration: 'none', fontWeight: 600 }}>Accueil</a> / <span style={{ color: '#aaa' }}>L'Auto-École</span> / <span style={{ color: 'var(--drivschol-primary, #ec2526)', fontWeight: 700 }}>Notre Mission</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px', alignItems: 'center' }}>

                    {/* Left Column: Image with Overlay */}
                    <div style={{ position: 'relative' }}>
                        <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
                            <img
                                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80"
                                alt="Notre Mission Instructor"
                                style={{ width: '100%', display: 'block', objectFit: 'cover', height: '100%', aspectRatio: '4/3' }}
                            // Note: Standard image reference for clean fallback framing.
                            />
                        </div>

                        {/* Red Overlay Box */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-25px',
                            left: '25px',
                            background: 'var(--drivschol-primary, #ec2526)',
                            color: '#fff',
                            padding: '25px 30px',
                            borderRadius: '8px',
                            boxShadow: '0 10px 30px rgba(236,37,38,0.2)',
                            maxWidth: '320px',
                            display: 'flex',
                            gap: '15px',
                            alignItems: 'center'
                        }}>
                            <div style={{ fontSize: '32px' }}>🏆</div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Auto-école numéro 1 à Montpellier</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.9, fontWeight: 500 }}>98% de réussite au code de la route.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Text and Progress Bars */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div>
                            <span style={{
                                color: 'var(--drivschol-primary, #ec2526)',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                fontSize: '13px',
                                letterSpacing: '1.5px',
                                display: 'block',
                                marginBottom: '8px'
                            }}>Notre Mission</span>
                            <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#111117', margin: 0, lineHeight: '1.2' }}>Chez Permisexpress.fr, Votre Réussite est Notre Engagement</h1>
                        </div>

                        <p style={{ color: '#6d7076', fontSize: '16px', lineHeight: '1.8', margin: 0 }}>
                            Chez Permisexpress.fr, notre engagement envers la sécurité routière et la satisfaction de nos élèves est au cœur de notre mission. Forts de notre expérience, nous avons formé des milliers de conducteurs responsables et compétents. L'approche personnalisée et la passion de nos moniteurs garantissent un apprentissage serein et efficace pour chaque candidat.
                        </p>

                        {/* Progress Bars */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '15px', fontWeight: 700, color: '#111117' }}>
                                    <span>Approche pédagogique personnalisée</span>
                                    <span>90%</span>
                                </div>
                                <div style={{ height: '8px', background: '#e9ebed', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: '90%', height: '100%', background: 'var(--drivschol-primary, #ec2526)', borderRadius: '4px' }}></div>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '15px', fontWeight: 700, color: '#111117' }}>
                                    <span>Suivi personnalisé</span>
                                    <span>95%</span>
                                </div>
                                <div style={{ height: '8px', background: '#e9ebed', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: '95%', height: '100%', background: 'var(--drivschol-primary, #ec2526)', borderRadius: '4px' }}></div>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '15px', fontWeight: 700, color: '#111117' }}>
                                    <span>Véhicules modernes</span>
                                    <span>95%</span>
                                </div>
                                <div style={{ height: '8px', background: '#e9ebed', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: '95%', height: '100%', background: 'var(--drivschol-primary, #ec2526)', borderRadius: '4px' }}></div>
                                </div>
                            </div>

                        </div>

                        <button style={{
                            background: '#111117',
                            color: '#fff',
                            border: 'none',
                            padding: '16px 35px',
                            fontSize: '15px',
                            fontWeight: 700,
                            borderRadius: '4px',
                            cursor: 'pointer',
                            width: 'max-content',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            transition: 'background 0.2s',
                            marginTop: '10px'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'var(--drivschol-primary, #ec2526)'}
                            onMouseOut={(e) => e.currentTarget.style.background = '#111117'}
                        >
                            Contactez-Nous
                        </button>

                    </div>

                </div>

                {/* Bottom Statistics Group */}
                <div style={{
                    marginTop: '80px',
                    borderTop: '1px solid #e9ebed',
                    paddingTop: '50px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '30px',
                    textAlign: 'center'
                }}>
                    <div>
                        <div style={{ fontSize: '42px', fontWeight: 800, color: '#111117' }}>97%</div>
                        <p style={{ color: '#6d7076', fontSize: '14px', margin: '5px 0 0', fontWeight: 600 }}>Taux de Réussite au Code</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '42px', fontWeight: 800, color: '#111117' }}>2000+</div>
                        <p style={{ color: '#6d7076', fontSize: '14px', margin: '5px 0 0', fontWeight: 600 }}>Permis Obtenus en 9 Ans</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '42px', fontWeight: 800, color: '#111117' }}>986+</div>
                        <p style={{ color: '#6d7076', fontSize: '14px', margin: '5px 0 0', fontWeight: 600 }}>Avis Utilisateurs Satisfaits</p>
                    </div>
                </div>

            </div>
        </main>
    )
}
