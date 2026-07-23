# PROGRESS — Portfolio Nour Eddine Kharazi

Journal d'avancement, tenu à jour lot par lot (cf. `PLAN.md` §7).

## Décisions validées (2026-07-23)

- **Direction artistique : « Signal »** (dark, near-black `#0A0B0D`).
- **Accent : Cyan `#5EE6FF`**.
- **Visuels : hybride** — vrais screenshots n8n (Cas 3 & 5, aucune donnée sensible) + visuels Higgsfield stylisés pour les 3 dashboards à volumes propriétaires (LinkedIn/Databloo, GA4 dormakaba, Synthèse Exécutive).
- **Analytics : Vercel Analytics** (sans cookie, pas de bandeau RGPD).
- **Typo : Geist Sans + Geist Mono** (auto-hébergées, 0 requête externe — référence Vercel/Linear).

## État global

| Lot | Statut | Date |
|---|---|---|
| Cadrage / PLAN.md | ✅ Validé | 2026-07-23 |
| 0 — Fondations | ✅ Fait — build vert, 0 warning | 2026-07-23 |
| 1 — Hero + chiffres | ⏳ En cours | — |
| 2 — Études de cas | ⏳ | — |
| 3 — Stack / Parcours / Labs | ⏳ | — |
| 4 — Contact | ⏳ | — |
| 5 — Assets Higgsfield | ⏳ | — |
| 6+7 — SEO / perf / a11y | ⏳ | — |

## Journal

### 2026-07-23 — Lot 0 (Fondations)
- Stack installée : **Next.js 16.2.11 · React 19.2 · TypeScript strict · Tailwind CSS v4 · next-intl 4.13 · Framer Motion 11 · Geist**.
  - Note : `next` porté à la version patchée (CVE-2025-66478 sur 15.5.4 → ligne 16.x).
- i18n `next-intl` : routing `/[locale]` FR (défaut, sans préfixe) / EN (`/en`), cookie `NEXT_LOCALE` persistant, convention Next 16 `proxy.ts`.
- Design system **« Signal »** : tokens CSS (`@theme`), palette WCAG AA vérifiée, échelle typo modulaire fluide, utilitaires (`container-x`, `eyebrow`, `data-label`, `grid-backdrop`, `hairline`, skip-link).
- Chrome : `Nav` (sticky, menu mobile, ancres), `LangSwitcher` (préserve la route), `Footer`.
- Primitives : `Reveal` (respecte `prefers-reduced-motion`), `Section`, `Button`.
- SEO amorcé : `generateMetadata` (hreflang FR/EN, OG/Twitter), JSON-LD `Person` + `WebSite`, Vercel Analytics câblés.
- `npm run build` : vert, `/fr` et `/en` prérendus, aucun warning.

## Décisions ouvertes / attentes
- **2 PNG des workflows n8n** à fournir (pour Cas 3 & 5 en vraies captures).
- CV FR (j'ai le PDF EN ; le bouton FR pointera vers un placeholder tant que le PDF FR n'est pas fourni).
- Photo (section contact/hero) — aucun portrait généré.
- Extraits de lettres de recommandation (+ PDF) — composant prévu, laissé vide.
