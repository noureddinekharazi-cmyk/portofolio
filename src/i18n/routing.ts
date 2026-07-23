import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  // Locales are always prefixed: /fr and /en are real, statically generated
  // pages that render WITHOUT relying on middleware. "/" is redirected to /fr
  // at the config level (next.config redirects) so the site is reachable on any
  // host even if edge middleware isn't invoked. FR stays the default.
  localePrefix: 'always',
  localeDetection: false,
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 60 * 60 * 24 * 365,
  },
});

export type Locale = (typeof routing.locales)[number];
