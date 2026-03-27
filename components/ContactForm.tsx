'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', agency: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="contact">
      <div className="container">
        <div className="contact__inner">
          <div className="contact__image">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=674&h=1024&fit=crop"
              alt="Contact Permisexpress.fr"
              style={{ width: '100%', borderRadius: '12px' }}
            />
          </div>
          <div>
            <p className="contact__form-title">Contact</p>
            <h2 className="contact__form-heading">Écrivez-nous !</h2>
            {sent ? (
              <p style={{ color: 'green', fontWeight: 600 }}>Votre message a bien été envoyé. Nous vous répondrons rapidement.</p>
            ) : (
              <form onSubmit={submit}>
                <div className="form-group">
                  <label htmlFor="name">Nom et prénom *</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handle} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
E-mail *</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handle} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Téléphone *</label>
                  <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handle} />
                </div>
                <div className="form-group">
                  <label htmlFor="agency">Agence *</label>
                  <select id="agency" name="agency" required value={form.agency} onChange={handle}>
                    <option value="" disabled>- Choisissez votre agence Permisexpress.fr -</option>
                    <option value="Lemasson">Lemasson</option>
                    <option value="Port Marianne">Port Marianne</option>
                    <option value="Centre Boussairolles">Centre Boussairolles</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Objet *</label>
                  <select id="subject" name="subject" required value={form.subject} onChange={handle}>
                    <option value="" disabled>- Choisissez votre objet -</option>
                    <option>Renseignements</option>
                    <option>Financement CPF</option>
                    <option>Financement Pôle Emploi</option>
                    <option>Financement 1€ /jour</option>
                    <option>Réclamation(s)</option>
                    <option>Difficulté(s) rencontrée(s) durant la formation</option>
                    <option>Recrutement</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Écrivez votre message</label>
                  <textarea id="message" name="message" value={form.message} onChange={handle} />
                </div>
                <button type="submit" className="form__submit">Envoyer</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
