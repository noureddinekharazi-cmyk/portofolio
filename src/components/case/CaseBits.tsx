import Image from 'next/image';
import type { CaseIllustration } from '@/lib/cases';
import type { Pillar } from '@/lib/content-types';
import { Schematic } from './Schematic';

const PILLAR_LABEL: Record<Pillar, { fr: string; en: string }> = {
  data: { fr: 'Data', en: 'Data' },
  seo: { fr: 'SEO', en: 'SEO' },
  automation: { fr: 'Automatisation', en: 'Automation' },
};

export function PillarTag({
  pillar,
  locale,
}: {
  pillar: Pillar;
  locale: string;
}) {
  const label = PILLAR_LABEL[pillar][locale === 'en' ? 'en' : 'fr'];
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      {label}
    </span>
  );
}

export function StackChips({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((tool) => (
        <li
          key={tool}
          className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted"
        >
          {tool}
        </li>
      ))}
    </ul>
  );
}

/**
 * Case illustration with a mandatory, honest label.
 * Generated / schematic renderings are flagged "illustrative" so no viewer can
 * mistake them for an authentic screenshot; real screenshots are flagged as such.
 */
export function CaseIllustration({
  illustration,
  badgeLabel,
  badgeNote,
  priority = false,
}: {
  illustration: CaseIllustration;
  badgeLabel: string;
  badgeNote?: string;
  priority?: boolean;
}) {
  const isReal = illustration.source === 'screenshot_reel';

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-base">
      <div className="relative aspect-[16/9] w-full">
        {illustration.src ? (
          <Image
            src={illustration.src}
            alt={illustration.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 760px"
            className="object-cover"
          />
        ) : (
          <Schematic variant={illustration.variant} alt={illustration.alt} />
        )}

        <span
          className={[
            'absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider backdrop-blur-sm',
            isReal
              ? 'border-accent/40 bg-base/70 text-accent'
              : 'border-line-strong bg-base/70 text-muted',
          ].join(' ')}
        >
          <span
            className={[
              'h-1.5 w-1.5 rounded-full',
              isReal ? 'bg-accent' : 'bg-muted',
            ].join(' ')}
            aria-hidden
          />
          {badgeLabel}
        </span>
      </div>
      <figcaption className="flex flex-col gap-1 border-t border-line px-4 py-3">
        <span className="text-sm text-muted">{illustration.caption}</span>
        {!isReal && badgeNote && (
          <span className="text-xs text-faint">{badgeNote}</span>
        )}
      </figcaption>
    </figure>
  );
}
