import type { Metadata } from 'next'
import './globals.css'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppChat from '@/components/WhatsAppChat'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'

export const metadata: Metadata = {
  title: "Permisexpress.fr - Vos permis rapidement",
  description: "Permisexpress.fr — Permis B, moto, poids lourd, bateau, documents administratifs. Contactez-nous sur WhatsApp : +33 7 57 75 47 74",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <TopBar />
            <Navbar />
            {children}
            <Footer />
            <WhatsAppChat />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
