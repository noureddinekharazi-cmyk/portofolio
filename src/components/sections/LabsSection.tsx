import { getTranslations } from 'next-intl/server';
import { getSiteContent } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';
import { StackChips } from '@/components/case/CaseBits';

export async function LabsSection({ locale }: { locale: string }) {
  const t = await getTranslations();
  const { labs } = getSiteContent(locale);

  return (
    <section id="labs" className="container-x scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <header className="mb-12 flex max-w-2xl flex-col gap-4">
          <p className="eyebrow">{t('sections.labsKicker')}</p>
          <h2 className="text-3xl font-semibold text-gradient">
            {t('sections.labsTitle')}
          </h2>
          <p className="text-lg text-muted">{t('sections.labsIntro')}</p>
        </header>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {labs.map((lab, i) => (
          <Reveal key={lab.id} index={i}>
            <article className="flex h-full flex-col gap-5 rounded-2xl border border-line bg-surface/40 p-7">
              <span className="w-fit rounded-full border border-accent/40 bg-base px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent">
                {lab.tag}
              </span>
              <h3 className="text-xl font-semibold text-ink">{lab.title}</h3>
              <p className="text-muted">{lab.body}</p>
              <p className="text-sm text-accent">{lab.outcome}</p>
              <div className="mt-auto pt-2">
                <StackChips stack={lab.stack} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
