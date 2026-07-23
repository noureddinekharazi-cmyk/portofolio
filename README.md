# Portfolio — Nour Eddine Kharazi · Digital Marketing Specialist

Portfolio web bilingue (FR/EN) mettant en avant des résultats marketing mesurables (data, SEO technique, automatisation). Next.js (App Router) + TypeScript + Tailwind, déploiement Vercel.

> ⚠️ Projet en phase de cadrage. Voir **`PLAN.md`** (plan soumis à validation) et **`PROGRESS.md`** (avancement). Le code applicatif démarre après validation du plan.

## Sommaire (à compléter au fil des lots)

- **Installation** — `npm install` puis `npm run dev` _(disponible dès le lot 0)_.
- **Structure** — voir l'arborescence dans `PLAN.md` §2.
- **Ajouter une étude de cas** — créer `content/fr/cases/<slug>.mdx` + `content/en/cases/<slug>.mdx` au format Contexte → Problème → Approche → Exécution → L'obstacle → Résultat → Stack _(procédure détaillée au lot 2)_.
- **Mettre à jour le contenu bilingue** — éditer `content/fr/*` et `content/en/*` ; libellés d'interface dans `messages/{fr,en}.json`. Aucune chaîne en dur dans les composants.
- **Assets générés** — `public/generated/`, tracés dans `assets-manifest.json`.
- **CV PDF** — servis depuis `public/cv/` (FR + EN).
- **Déploiement Vercel** — _(instructions au lot 7)_.

## Recommandations (lettres de recommandation)

Le composant de citations est prévu mais **volontairement vide** : aucun verbatim n'est inventé. Pour l'activer, fournir 1–2 extraits courts (texte, nom, fonction, entreprise du signataire) + le PDF de la lettre dans `public/recommandations/`. Tant que le contenu n'est pas fourni, la section reste masquée.
