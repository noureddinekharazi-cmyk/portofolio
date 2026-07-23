# Déploiement Vercel

Le projet est un Next.js 16 (App Router) standard — Vercel le détecte et le build
sans configuration particulière.

## 1. Importer le projet

1. Pousser la branche sur GitHub (déjà fait pour `claude/new-session-bu1j5i`).
2. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt
   `noureddinekharazi-cmyk/portofolio`.
3. Framework preset : **Next.js** (auto-détecté). Build command `next build`,
   output par défaut. Rien à changer.

## 2. Variable d'environnement

Une seule variable est nécessaire, pour les URLs absolues (canonical, hreflang,
sitemap, Open Graph) :

| Clé | Valeur | Portée |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://votre-domaine.com` (ou l'URL Vercel de prod) | Production |

- Sans domaine custom, mettre l'URL de production Vercel
  (`https://<projet>.vercel.app`).
- Avec un domaine custom, mettre l'URL finale — c'est elle qui doit apparaître dans
  le canonical et le sitemap.
- **Ne pas** inclure de `/` final (le code le normalise de toute façon).

## 3. Analytics

`@vercel/analytics` est intégré et **ne s'active que sur Vercel**
(`process.env.VERCEL`). En local, aucun script analytics n'est chargé. Activer
**Web Analytics** dans l'onglet Analytics du projet Vercel — sans cookie, donc pas
de bandeau RGPD requis.

## 4. Après déploiement — vérifications

- Rejouer Lighthouse mobile sur l'URL de production : le SEO doit passer à 100
  (le `canonical` correspond alors au domaine réel — cf. `lighthouse-summary.md`).
- Vérifier `/{sitemap.xml}`, `/robots.txt`, `/manifest.webmanifest`.
- Vérifier les cartes Open Graph (partage LinkedIn) sur `/` et `/en`.
- Tester le sélecteur de langue et le téléchargement du CV.

## 5. Domaine et i18n

- FR est servi à la racine (`/`), EN sous `/en`.
- `hreflang` FR/EN + `x-default` sont émis automatiquement sur toutes les pages.
