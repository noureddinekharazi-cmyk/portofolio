import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getCaseSlugs } from '@/lib/cases';
import { SITE_URL } from '@/lib/site';

function localizedUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = localizedUrl(locale, path);
  }
  languages['x-default'] = localizedUrl(routing.defaultLocale, path);
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getCaseSlugs(routing.defaultLocale);
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Home (per locale)
  for (const locale of routing.locales) {
    entries.push({
      url: localizedUrl(locale, '/'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: alternates('/'),
    });
  }

  // Case pages (per locale)
  for (const slug of slugs) {
    for (const locale of routing.locales) {
      entries.push({
        url: localizedUrl(locale, `/case/${slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: alternates(`/case/${slug}`),
      });
    }
  }

  return entries;
}
