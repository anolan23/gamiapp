/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_MAPBOX: process.env.NEXT_PUBLIC_MAPBOX,
  },
  images: {
    domains: ['api.mapbox.com'],
  },
};

module.exports = nextConfig;
