# Portfolio — Nour Eddine Kharazi · Digital Marketing Specialist

Portfolio web bilingue (FR/EN) qui met en scène des résultats marketing mesurables :
**data, SEO technique, automatisation**. Le fil conducteur : un profil marketing qui
construit ses propres outils (pipelines, dashboards, systèmes en production).

- **Stack :** Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 ·
  next-intl · Geist (auto-hébergée). Déploiement **Vercel**.
- **Direction artistique :** « Signal » — fond quasi-noir, accent cyan unique,
  labels de données en monospace. WCAG AA vérifié.
- **Perf :** Lighthouse mobile ≥ 90 sur les 4 catégories (cf. `docs/`).

---

## Démarrer

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # build de production (0 warning TypeScript)
npm start              # sert le build de production
npm run typecheck      # tsc --noEmit
```

FR est servi à la racine (`/`), EN sous `/en`.

---

## Structure

```
content/                 # contenu bilingue (aucune chaîne en dur dans les composants)
  fr/site.ts · en/site.ts        # hero, métriques, stack, timeline, labs, contact
  fr/cases/*.mdx · en/cases/*.mdx # 5 études de cas (frontmatter structuré)
messages/ fr.json · en.json      # libellés d'interface (next-intl)
public/
  cv/                    # CV PDF servis en statique
  generated/             # visuels générés (Higgsfield) — voir assets-manifest.json
src/
  app/[locale]/          # layout + page (accueil) + case/[slug] (pages dédiées)
  app/{sitemap,robots,manifest}.ts · icon.svg   # SEO + PWA
  components/{sections,case,ui}   # sections, composants d'étude de cas, primitives
  i18n/                  # routing, navigation, request (next-intl)
  lib/                   # site (constantes), content (loader), cases (MDX), seo (JSON-LD)
  styles/globals.css     # design tokens "Signal" + utilitaires
docs/                    # rapport Lighthouse + guide de déploiement Vercel
```

---

## Ajouter une étude de cas

1. Créer `content/fr/cases/<slug>.mdx` **et** `content/en/cases/<slug>.mdx`.
2. Remplir le frontmatter (format constant, garantit la mise en page) :

   ```yaml
   ---
   slug: mon-cas
   order: 6                 # position (1 = le plus visible)
   pillar: data             # data | seo | automation  (fil rouge du site)
   company: Entreprise
   role: Intitulé du poste
   period: 2025 — 2026
   title: Titre du cas
   summary: Résumé en une phrase.
   metricDisplay: "+30 %"   # le grand chiffre
   metricLabel: Ce que mesure le chiffre
   illustration:
     variant: flow          # system | flow | dashboard | funnel | curve
     source: schematic      # schematic | genere_higgsfield | screenshot_reel
     alt: Description accessible de l'image.
     caption: Légende affichée sous l'image.
     # src: /generated/mon-cas.webp   # à renseigner pour une vraie image
   context: …
   problem: …
   approach: [ "étape 1", "étape 2" ]
   obstacle: …             # la section "L'obstacle" — ne pas la lisser
   result: …
   measure: …              # méthode de mesure, affichée en note discrète
   stack: [ Outil A, Outil B ]
   # aside: { title: "…", body: "…" }   # encadré optionnel (ex. travaux associés)
   ---
   ```
3. Ajouter le `slug` dans `CASE_SLUGS` (`src/lib/site.ts`) si une métrique de
   l'accueil doit pointer vers ce cas.
4. Le corps MDX (sous le frontmatter) est optionnel et rendu sous les sections
   structurées.

**Règle sur les visuels :** un visuel `schematic` ou `genere_higgsfield` porte
automatiquement le badge « visualisation illustrative ». N'utiliser
`screenshot_reel` que pour une vraie capture anonymisée (aucune donnée client,
montant ou volume propriétaire lisible).

---

## Mettre à jour le contenu bilingue

- Copie substantielle (hero, métriques, stack, timeline, labs, contact) :
  `content/fr/site.ts` et `content/en/site.ts`. Les deux fichiers sont typés par
  `src/lib/content-types.ts` — le build échoue si une clé manque.
- Libellés d'interface (nav, boutons, aria) : `messages/fr.json` / `messages/en.json`.
- Constantes non traduites (email, téléphone, LinkedIn, chemins CV) :
  `src/lib/site.ts`.

---

## À fournir / activer

Ces éléments sont câblés mais en attente de contenu (aucun placeholder trompeur
n'est affiché) :

- **CV français.** Déposer `public/cv/nour-eddine-kharazi-fr.pdf`, puis passer
  `PROFILE.cvAvailable.fr` à `true` dans `src/lib/site.ts`. Tant qu'il n'est pas
  fourni, les boutons servent le CV EN et une note l'indique. Le CV EN réel est
  déjà en place.
- **Screenshots n8n réels (Cas 3 & 5).** Déposer les PNG (aucune donnée sensible)
  dans `public/generated/`, puis dans le frontmatter du cas passer
  `illustration.source: screenshot_reel` et renseigner `illustration.src`.
- **Recommandations.** Le composant `src/components/ui/Recommendation.tsx` est prêt
  mais **non rendu tant qu'aucun contenu réel n'est fourni** (aucun verbatim n'est
  inventé). Pour l'activer : déposer le PDF de la lettre dans
  `public/recommandations/`, puis rendre `<Recommendation data={…} />` dans
  `ContactSection` avec `{ quote, name, role, company, letterHref }`.
- **Photo.** Aucun portrait n'est généré. Fournir une vraie photo pour l'ajouter en
  section contact.

---

## SEO & performance

- Métadonnées par page, `hreflang` FR/EN + `x-default`, Open Graph / Twitter Card
  (images générées à la volée via `next/og`), `sitemap.xml`, `robots.txt`,
  JSON-LD `Person` + `WebSite`.
- `NEXT_PUBLIC_SITE_URL` pilote toutes les URLs absolues (voir
  `docs/DEPLOY-VERCEL.md`).
- Rapport Lighthouse et notes : `docs/lighthouse-summary.md`.

---

## Déploiement

Voir **`docs/DEPLOY-VERCEL.md`**. En résumé : importer le dépôt sur Vercel, définir
`NEXT_PUBLIC_SITE_URL`, activer Web Analytics.
