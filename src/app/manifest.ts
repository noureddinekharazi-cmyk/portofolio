import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nour Eddine Kharazi — Digital Marketing Specialist',
    short_name: 'N. E. Kharazi',
    description:
      'Data, SEO, automation: marketing processes turned into systems that run themselves.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0b0d',
    theme_color: '#0a0b0d',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
