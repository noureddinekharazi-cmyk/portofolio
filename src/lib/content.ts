import { fr } from '@content/fr/site';
import { en } from '@content/en/site';
import type { SiteContent } from './content-types';

const MAP: Record<string, SiteContent> = { fr, en };

export function getSiteContent(locale: string): SiteContent {
  return MAP[locale] ?? fr;
}
