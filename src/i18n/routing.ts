import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  // FR is served at "/", EN at "/en". Language choice persists in the URL and
  // the NEXT_LOCALE cookie via the switcher.
  localePrefix: 'as-needed',
  // Deterministic default: "/" always renders FR (no Accept-Language redirect).
  // Keeps the brand default stable and removes a redirect hop on the LCP path.
  localeDetection: false,
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 60 * 60 * 24 * 365,
  },
});

export type Locale = (typeof routing.locales)[number];
