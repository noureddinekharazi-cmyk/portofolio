import { getTranslations } from 'next-intl/server';
import { getSiteContent } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';
import type { StackTool } from '@/lib/content-types';

function LevelMeter({ level }: { level: StackTool['level'] }) {
  return (
    <span className="flex gap-0.5" aria-hidden>
      {[1, 2, 3].map((seg) => (
        <span
          key={seg}
          className={[
            'h-1 w-3 rounded-full',
            seg <= level ? 'bg-accent' : 'bg-line-strong',
          ].join(' ')}
        />
      ))}
    </span>
  );
}

export async function StackSection({ locale }: { locale: string }) {
  const t = await getTranslations();
  const { stackFamilies } = getSiteContent(locale);

  return (
    <section id="stack" className="container-x scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <header className="mb-12 flex max-w-2xl flex-col gap-4">
          <p className="eyebrow">{t('sections.stackKicker')}</p>
          <h2 className="text-3xl font-semibold text-gradient">
            {t('sections.stackTitle')}
          </h2>
          <p className="text-lg text-muted">{t('sections.stackIntro')}</p>
        </header>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {stackFamilies.map((family, i) => (
          <Reveal key={family.id} index={i}>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-6">
              <div className="mb-5">
                <h3 className="font-mono text-sm uppercase tracking-wider text-accent">
                  {family.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{family.description}</p>
              </div>
              <ul className="flex flex-col divide-y divide-line">
                {family.tools.map((tool) => (
                  <li
                    key={tool.name}
                    className="flex items-center justify-between gap-4 py-2.5"
                  >
                    <span className="text-sm text-ink">{tool.name}</span>
                    <LevelMeter level={tool.level} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-6 flex items-center gap-2 font-mono text-xs text-faint">
          <span className="flex gap-0.5" aria-hidden>
            <span className="h-1 w-3 rounded-full bg-accent" />
            <span className="h-1 w-3 rounded-full bg-accent" />
            <span className="h-1 w-3 rounded-full bg-accent" />
          </span>
          {t('labels.level')}
        </p>
      </Reveal>
    </section>
  );
}
