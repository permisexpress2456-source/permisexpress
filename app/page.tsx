import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Partners from '@/components/Partners'
import ContactForm from '@/components/ContactForm'
import Blog from '@/components/Blog'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Partners />
      <ContactForm />
      <Blog />
      <CTA />
    </main>
  )
}
