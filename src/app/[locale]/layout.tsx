import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';

import { routing } from '@/i18n/routing';
import { Nav } from '@/components/ui/Nav';
import { Footer } from '@/components/ui/Footer';
import { SiteJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import '@/styles/globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0a0b0d',
  colorScheme: 'dark',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const languages = {
    fr: '/',
    en: '/en',
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: '%s · Nour Eddine Kharazi',
    },
    description: t('description'),
    alternates: {
      canonical: locale === 'fr' ? '/' : '/en',
      languages: { ...languages, 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: locale === 'fr' ? SITE_URL : `${SITE_URL}/en`,
      title: t('title'),
      description: t('description'),
      siteName: 'Nour Eddine Kharazi',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    authors: [{ name: 'Nour Eddine Kharazi' }],
    creator: 'Nour Eddine Kharazi',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Enable JS-gated reveal styles before first paint (no FOUC, no-JS safe) */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <NextIntlClientProvider>
          <a href="#main" className="skip-link">
            {locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <SiteJsonLd locale={locale} />
        </NextIntlClientProvider>
        {/* Vercel Analytics (cookieless) — only on Vercel, avoids a 404 off-platform */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
