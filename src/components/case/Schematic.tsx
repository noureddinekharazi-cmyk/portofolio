import type { CaseIllustration } from '@/lib/cases';

/**
 * Abstract, on-brand schematic illustrations.
 * Deliberately carry no readable figures and imitate no brand interface —
 * they illustrate the *shape* of a deliverable, never its data.
 */
export function Schematic({
  variant,
  alt,
}: {
  variant: CaseIllustration['variant'];
  alt: string;
}) {
  return (
    <svg
      role="img"
      aria-label={alt}
      viewBox="0 0 640 360"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sig-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
        <pattern id="sig-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M32 0H0V32"
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="640" height="360" fill="var(--color-surface)" />
      <rect width="640" height="360" fill="url(#sig-grid)" opacity="0.5" />

      {variant === 'system' && <SystemArt />}
      {variant === 'flow' && <FlowArt />}
      {variant === 'dashboard' && <DashboardArt />}
      {variant === 'funnel' && <FunnelArt />}
      {variant === 'curve' && <CurveArt />}
    </svg>
  );
}

const NODE = 'var(--color-surface-2)';
const STROKE = 'var(--color-line-strong)';
const ACCENT = 'var(--color-accent)';

function Node({
  x,
  y,
  r = 18,
  active = false,
}: {
  x: number;
  y: number;
  r?: number;
  active?: boolean;
}) {
  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      fill={NODE}
      stroke={active ? ACCENT : STROKE}
      strokeWidth={active ? 2 : 1.5}
    />
  );
}

function Link({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={STROKE} strokeWidth="1.5" />;
}

function SystemArt() {
  return (
    <g>
      {/* scheduled trigger (dashed) → agents → outputs */}
      <Link d="M112 180 C 180 180, 200 96, 268 96" />
      <Link d="M112 180 C 180 180, 200 180, 268 180" />
      <Link d="M112 180 C 180 180, 200 264, 268 264" />
      <Link d="M312 96 C 380 96, 400 150, 468 150" />
      <Link d="M312 180 C 380 180, 400 165, 468 165" />
      <Link d="M312 264 C 380 264, 400 210, 468 210" />
      <rect
        x="70"
        y="150"
        width="42"
        height="60"
        rx="8"
        fill={NODE}
        stroke={ACCENT}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <Node x={290} y={96} />
      <Node x={290} y={180} active />
      <Node x={290} y={264} />
      <rect x="468" y="132" width="72" height="36" rx="8" fill={NODE} stroke={STROKE} strokeWidth="1.5" />
      <rect x="468" y="192" width="72" height="36" rx="8" fill={NODE} stroke={STROKE} strokeWidth="1.5" />
    </g>
  );
}

function FlowArt() {
  return (
    <g>
      <Link d="M96 180 H 208" />
      <Link d="M256 180 H 368" />
      <Link d="M416 180 H 528" />
      <Link d="M320 180 C 340 180, 360 96, 420 96" />
      <rect x="60" y="156" width="48" height="48" rx="10" fill={NODE} stroke={ACCENT} strokeWidth="2" />
      <rect x="208" y="156" width="48" height="48" rx="10" fill={NODE} stroke={STROKE} strokeWidth="1.5" />
      <rect x="368" y="156" width="48" height="48" rx="10" fill={NODE} stroke={STROKE} strokeWidth="1.5" />
      <rect x="528" y="156" width="48" height="48" rx="10" fill={NODE} stroke={STROKE} strokeWidth="1.5" />
      <rect x="420" y="72" width="48" height="48" rx="10" fill={NODE} stroke={STROKE} strokeWidth="1.5" />
    </g>
  );
}

function DashboardArt() {
  const panels = [
    { x: 64, y: 60 },
    { x: 336, y: 60 },
    { x: 64, y: 208 },
    { x: 336, y: 208 },
  ];
  return (
    <g>
      {panels.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width="240" height="92" rx="10" fill={NODE} stroke={STROKE} strokeWidth="1.5" />
          {i % 2 === 0 ? (
            <path
              d={`M${p.x + 16} ${p.y + 68} L${p.x + 70} ${p.y + 40} L${p.x + 120} ${p.y + 56} L${p.x + 170} ${p.y + 28} L${p.x + 224} ${p.y + 44}`}
              fill="none"
              stroke={ACCENT}
              strokeWidth="2"
            />
          ) : (
            [0, 1, 2, 3, 4].map((b) => (
              <rect
                key={b}
                x={p.x + 20 + b * 44}
                y={p.y + 30 + (b % 3) * 12}
                width="26"
                height={54 - (b % 3) * 12}
                rx="3"
                fill={b === 2 ? ACCENT : STROKE}
                opacity={b === 2 ? 0.8 : 0.5}
              />
            ))
          )}
        </g>
      ))}
    </g>
  );
}

function FunnelArt() {
  return (
    <g>
      <path d="M140 80 H500 L430 150 H210 Z" fill={NODE} stroke={STROKE} strokeWidth="1.5" />
      <path d="M210 170 H430 L378 240 H262 Z" fill={NODE} stroke={STROKE} strokeWidth="1.5" />
      <path d="M262 260 H378 L340 310 H300 Z" fill={NODE} stroke={ACCENT} strokeWidth="2" />
      <Node x={320} y={285} r={10} active />
    </g>
  );
}

function CurveArt() {
  const d = 'M60 300 C 180 300, 220 200, 320 180 S 480 90, 580 70';
  return (
    <g>
      <path d={`${d} L580 320 L60 320 Z`} fill="url(#sig-fade)" stroke="none" />
      <path d={d} fill="none" stroke={ACCENT} strokeWidth="2.5" />
      {[
        [60, 300],
        [320, 180],
        [580, 70],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={ACCENT} />
      ))}
    </g>
  );
}
