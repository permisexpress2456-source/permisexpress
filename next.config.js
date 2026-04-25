/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'opermis.fr' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'logo.clearbit.com' },
    ],
  },
  async redirects() {
    return [
      // Rediriger /produits/* et /offres/* vers /nos-offres/*
      { source: '/produits/:slug', destination: '/nos-offres/:slug', permanent: true },
      { source: '/offres/:slug', destination: '/nos-offres/:slug', permanent: true },
      // Rediriger /login vers /connexion
      { source: '/login', destination: '/connexion', permanent: false },
    ]
  },
}

module.exports = nextConfig
