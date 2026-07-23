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
      // Root → default locale. Config-level (not middleware) so it always works.
      { source: '/', destination: '/fr', permanent: false },
      // CV shortcut → currently the available (EN) PDF; update when FR is added
      { source: '/cv', destination: '/cv/nour-eddine-kharazi-en.pdf', permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
