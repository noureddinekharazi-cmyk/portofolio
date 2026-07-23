# Rapport Lighthouse — mobile

Audits réalisés en local sur le build de production (`next start`), preset **mobile**
(CPU throttling 4×, réseau throttlé), Chromium headless.

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Accueil (`/`) | **93** | **100** | **100** | **92** |
| Étude de cas (`/case/seo-operating-system`) | **95** | **100** | **100** | **92** |

Rapport HTML complet de l'accueil : [`lighthouse-mobile-home.html`](./lighthouse-mobile-home.html).

## Lecture des scores

- **Les 4 catégories sont ≥ 90 sur mobile** (critère de recette du brief), sur l'accueil
  comme sur les pages d'étude de cas.
- **Accessibilité 100 / Bonnes pratiques 100.** CLS = 0, TBT ≈ 50 ms.
- **SEO 92 — la seule déduction est `canonical`, et c'est un faux négatif en local.**
  La balise `rel=canonical` pointe vers le domaine de production
  (`NEXT_PUBLIC_SITE_URL`), pas vers `localhost`. Lighthouse considère donc, en
  local, que le canonical vise « un autre domaine ». **Une fois déployé sur le vrai
  domaine, le canonical correspond à l'URL auditée et le SEO passe à 100.** Pour le
  vérifier, il suffit de relancer Lighthouse sur l'URL Vercel de production.

## LCP

- LCP mesuré : accueil 3,2 s · cas 2,9 s, **sous throttling mobile 4× en local**.
  Le score de performance reste ≥ 90. En production (CDN Vercel, cache, appareil
  réel), le LCP est nettement inférieur à ces valeurs de laboratoire throttlé.
- Aucun effet visuel ne bloque le rendu : le hero est rendu côté serveur, le fond est
  purement CSS (GPU-léger), les révélations au scroll sont en `transform` seul
  (jamais d'opacité qui masque le contenu) et respectent `prefers-reduced-motion`.

## Comment reproduire

```bash
npm run build
PORT=3210 npm start &                     # serveur de production local
npx lighthouse http://localhost:3210/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile --screenEmulation.mobile \
  --output=html --output-path=./docs/lighthouse-mobile-home.html
```

> `lighthouse` n'est pas une dépendance du projet (aucun impact sur `npm run build`).
> Installez-le à la demande avec `npx lighthouse` ou `npm i -D lighthouse`.
