/**
 * Recommendation quote component — ready to receive 1–2 short extracts from the
 * candidate's reference letters (text, signatory name/role/company, PDF link).
 *
 * Intentionally NOT rendered while empty: no verbatim is fabricated and no fake
 * testimonial is shown as a placeholder (see README to activate).
 */
export interface RecommendationData {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Path to the reference letter PDF in /public/recommandations/. */
  letterHref?: string;
}

export function Recommendation({ data }: { data: RecommendationData }) {
  return (
    <figure className="rounded-2xl border border-line bg-surface/40 p-7">
      <blockquote className="text-lg leading-relaxed text-ink">
        “{data.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink">{data.name}</p>
          <p className="font-mono text-xs text-muted">
            {data.role} · {data.company}
          </p>
        </div>
        {data.letterHref && (
          <a
            href={data.letterHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent underline underline-offset-2"
          >
            PDF
          </a>
        )}
      </figcaption>
    </figure>
  );
}
