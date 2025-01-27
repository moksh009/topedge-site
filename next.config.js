/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // Add any other domains you'll use for images
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_EMAIL_USER: process.env.NEXT_PUBLIC_EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    NEXT_PUBLIC_ELEVEN_LABS_API_KEY: process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY,
  },
  // Ensure public directory is served correctly
  publicRuntimeConfig: {
    staticFolder: '/public',
  },
  // Configure asset prefix for static files
  assetPrefix: '',
  // Enable API routes
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

module.exports = nextConfig
