import { PROFILE, SITE_URL } from './site';

const DESCRIPTIONS = {
  fr: 'Data, SEO, automatisation : je transforme des process marketing en systèmes qui tournent seuls.',
  en: 'Data, SEO, automation: I turn marketing processes into systems that run themselves.',
} as const;

/**
 * JSON-LD structured data: Person + WebSite.
 * Rendered once in the locale layout.
 */
export function SiteJsonLd({ locale }: { locale: string }) {
  const lang = locale === 'en' ? 'en' : 'fr';
  const url = lang === 'fr' ? SITE_URL : `${SITE_URL}/en`;

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    jobTitle: 'Digital Marketing Specialist',
    description: DESCRIPTIONS[lang],
    email: `mailto:${PROFILE.email}`,
    telephone: PROFILE.phone,
    url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    sameAs: [PROFILE.linkedin],
    knowsAbout: [
      'Digital Marketing',
      'Technical SEO',
      'Marketing Automation',
      'Data Analytics',
      'CRM',
      'Generative Engine Optimization',
    ],
    knowsLanguage: ['fr', 'en', 'ar'],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${PROFILE.name} — Digital Marketing Specialist`,
    url: SITE_URL,
    inLanguage: lang,
    author: { '@type': 'Person', name: PROFILE.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
