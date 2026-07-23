import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { MetricsBand } from '@/components/sections/MetricsBand';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  // Sections built in later lots — anchors kept so the nav resolves.
  const stubs = [
    { id: 'cases', key: 'cases' },
    { id: 'stack', key: 'stack' },
    { id: 'labs', key: 'labs' },
    { id: 'path', key: 'path' },
    { id: 'contact', key: 'contact' },
  ] as const;

  return (
    <>
      <Hero locale={locale} />
      <MetricsBand locale={locale} />
      {stubs.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="container-x scroll-mt-24 py-16"
        >
          <div className="hairline" />
          <p className="eyebrow mt-8">{t(`nav.${s.key}`)}</p>
        </section>
      ))}
    </>
  );
}
