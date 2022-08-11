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
    NEXT_PUBLIC_BGA_CLIENT_ID: process.env.NEXT_PUBLIC_BGA_CLIENT_ID,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_S3_BUCKET_DOMAIN: process.env.NEXT_PUBLIC_S3_BUCKET_DOMAIN,
  },
  images: {
    domains: [
      'api.mapbox.com',
      's3-us-west-1.amazonaws.com',
      'cdn.shopify.com',
      'gamiapp-bucket.s3.us-east-2.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
