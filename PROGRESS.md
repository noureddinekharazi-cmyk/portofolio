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
| 1 — Hero + chiffres | ✅ Fait | 2026-07-23 |
| 2 — Études de cas | ✅ Fait (5 cas FR/EN, /case/[slug]) | 2026-07-23 |
| 3 — Stack / Parcours / Labs | ✅ Fait | 2026-07-23 |
| 4 — Contact | ✅ Fait | 2026-07-23 |
| 5 — Assets Higgsfield | ⏳ Schematics SVG en place ; génération Higgsfield à faire | — |
| 6+7 — SEO / perf / a11y | ✅ Fait — Lighthouse mobile ≥90 ×4 | 2026-07-23 |

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

### 2026-07-23 — Lots 1→7
- Lot 1 : hero SSR + bandeau 6 métriques cliquables + système de contenu FR/EN.
- Lot 2 : moteur MDX + 5 études de cas rédigées FR/EN + pages /case/[slug] +
  schematics SVG abstraits + badge « visualisation illustrative ».
- Lot 3 : stack (4 familles, meters), parcours (timeline + certifs), labs.
- Lot 4 : contact (coordonnées, CV EN, mailto), composant reco prêt mais vide.
- Lot 6+7 : SEO (sitemap, robots, manifest, JSON-LD, OG via next/og, hreflang,
  icon SVG), Vercel Analytics gated, perf/a11y.
  - **Lighthouse mobile : Accueil P93 A100 BP100 SEO92 · Cas P95 A100 BP100 SEO92.**
    Les 4 catégories ≥90. Seule déduction : `canonical` (faux négatif localhost,
    passe à 100 sur le domaine de prod). Détails : `docs/lighthouse-summary.md`.
  - Perf : retrait de framer-motion (reveals en transform pur), CLS = 0, TBT ≈ 50 ms.
  - Déploiement documenté : `docs/DEPLOY-VERCEL.md`. README complet.

## Décisions ouvertes / attentes
- **2 PNG des workflows n8n** à fournir (pour Cas 3 & 5 en vraies captures).
- CV FR (j'ai le PDF EN ; le bouton FR pointera vers un placeholder tant que le PDF FR n'est pas fourni).
- Photo (section contact/hero) — aucun portrait généré.
- Extraits de lettres de recommandation (+ PDF) — composant prévu, laissé vide.
