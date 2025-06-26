/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable TypeScript plugin for better performance
    typedRoutes: true,
  },
  transpilePackages: [
    // Transpile monorepo packages
    "@recipe-roulette/shared",
    "@recipe-roulette/ui",
    "@recipe-roulette/db",
  ],
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Disable X-Powered-By header for security
  poweredByHeader: false,
  // Optimize images
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  // Enable SWC minification for better performance
  swcMinify: true,
}

module.exports = nextConfig