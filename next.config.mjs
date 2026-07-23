import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // CV shortcuts served from /public/cv
      { source: '/cv', destination: '/cv/nour-eddine-kharazi-fr.pdf', permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
