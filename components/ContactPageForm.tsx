'use client'
import { useState } from 'react'

const agencies = ['Lemasson', 'Port Marianne', 'Centre Boussairolles']

export default function ContactPageForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', agency: '', message: '',
  })
  const [sent, setSent] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="contact-page">
      <div className="contact-page__hero">
        <div className="container">
          <h1 className="contact-page__title">Contact</h1>
          <p className="contact-page__subtitle">Nous sommes là pour répondre à toutes vos questions</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-page__inner">

          {/* Info cards */}
          <div className="contact-page__info">
            <div className="contact-info-card">
              <div className="contact-info-card__icon">📍</div>
              <h3>Nos Agences</h3>
              <ul>
                <li><a href="https://maps.app.goo.gl/Y82Q9jczM3Z8SHTE7" target="_blank" rel="noopener noreferrer">392 Bd Pedro de Luna, Montpellier</a></li>
                <li><a href="https://maps.app.goo.gl/CrK6BPonqMMSurmc6" target="_blank" rel="noopener noreferrer">139 Rue Frimaire, Montpellier</a></li>
                <li><a href="https://maps.app.goo.gl/K3RrMzXEDUf6oPcU6" target="_blank" rel="noopener noreferrer">18 Rue Boussairolles, Montpellier</a></li>
              </ul>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-card__icon">📞</div>
              <h3>Téléphone</h3>
              <a href="tel:+33757754774">+33 7 57 75 47 74</a>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-card__icon">✉</div>
              <h3>Email</h3>
              <a href="mailto:Permisexpress.frmtp@gmail.com">Permisexpress.frmtp@gmail.com</a>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-card__icon">🕐</div>
              <h3>Horaires</h3>
              <p>Lun à Ven : 10:00 - 19:00</p>
              <p>Sam : 10:00 - 17:00</p>
            </div>
          </div>

          {/* Form */}
          <div className="contact-page__form-wrap">
            <h2 className="contact-page__form-title">Écrivez-nous !</h2>
            {sent ? (
              <div className="contact-page__success">
                ✅ Votre message a bien été envoyé. Nous vous répondrons rapidement.
              </div>
            ) : (
              <form onSubmit={submit} className="contact-page__form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Prénom <span>*</span></label>
                    <input id="firstName" name="firstName" type="text" required value={form.firstName} onChange={handle} placeholder="Votre prénom" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Nom <span>*</span></label>
                    <input id="lastName" name="lastName" type="text" required value={form.lastName} onChange={handle} placeholder="Votre nom" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cp-email">E-mail <span>*</span></label>
                    <input id="cp-email" name="email" type="email" required value={form.email} onChange={handle} placeholder="votre@email.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cp-phone">Téléphone <span>*</span></label>
                    <input id="cp-phone" name="phone" type="tel" required value={form.phone} onChange={handle} placeholder="06 XX XX XX XX" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cp-agency">Agence <span>*</span></label>
                  <select id="cp-agency" name="agency" required value={form.agency} onChange={handle}>
                    <option value="" disabled>— Choisissez votre agence Permisexpress.fr —</option>
                    {agencies.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="cp-message">Votre message</label>
                  <textarea id="cp-message" name="message" value={form.message} onChange={handle} placeholder="Écrivez votre message ici..." rows={5} />
                </div>
                <button type="submit" className="form__submit">Envoyer le message</button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="contact-page__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.5!2d3.8767!3d43.6047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6af3a0a5c9b1f%3A0x1!2sMontpellier!5e0!3m2!1sfr!2sfr!4v1"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Permisexpress.fr Montpellier - Carte"
          />
        </div>
      </div>
    </section>
  )
}
