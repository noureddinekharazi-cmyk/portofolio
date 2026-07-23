import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const sections = ['results', 'cases', 'stack', 'labs', 'path', 'contact'];

  return (
    <>
      <section className="container-x flex min-h-[60vh] flex-col justify-center py-32">
        <p className="eyebrow">{t('labels.role')}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-gradient">
          {locale === 'fr'
            ? 'Data, SEO, automatisation : je transforme des process marketing en systèmes qui tournent seuls.'
            : 'Data, SEO, automation: I turn marketing processes into systems that run themselves.'}
        </h1>
      </section>
      {sections.map((id) => (
        <section key={id} id={id} className="container-x scroll-mt-24 py-20">
          <div className="hairline" />
          <p className="eyebrow mt-8">{t(`nav.${id}`)}</p>
        </section>
      ))}
    </>
  );
}
