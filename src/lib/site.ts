/**
 * Single source of truth for non-translated profile data
 * (contact details, URLs, structured constants).
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://nour-eddine-kharazi.vercel.app';

export const PROFILE = {
  name: 'Nour Eddine Kharazi',
  role: {
    fr: 'Digital Marketing Specialist',
    en: 'Digital Marketing Specialist',
  },
  email: 'noureddinekharazi@gmail.com',
  phone: '+33753303236',
  phoneDisplay: '+33 7 53 30 32 36',
  linkedin: 'https://www.linkedin.com/in/nour-eddine-kharazi',
  linkedinHandle: 'in/nour-eddine-kharazi',
  location: 'Paris, Île-de-France',
  cv: {
    fr: '/cv/nour-eddine-kharazi-fr.pdf',
    en: '/cv/nour-eddine-kharazi-en.pdf',
  },
  // Flip fr → true once the FR PDF is dropped into public/cv/ (see README).
  cvAvailable: {
    fr: false,
    en: true,
  },
} as const;

/** Best available CV for a locale — falls back to EN until the FR PDF is provided. */
export function resolveCv(locale: string): { href: string; lang: 'fr' | 'en' } {
  if (locale === 'fr' && PROFILE.cvAvailable.fr) {
    return { href: PROFILE.cv.fr, lang: 'fr' };
  }
  return { href: PROFILE.cv.en, lang: 'en' };
}

export const CASE_SLUGS = [
  'seo-operating-system',
  'automatisation-workflows',
  'dashboards-looker',
  'acquisition-b2b',
  'seo-technique',
] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];
