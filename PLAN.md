# PLAN — Portfolio « Digital Marketing Specialist » · Nour Eddine Kharazi

> Document de cadrage soumis à validation. **Aucun code applicatif n'est écrit avant ton feu vert** (cf. §0 du brief).
> Statut : en attente de validation.

---

## 0. Ce qui est en main / ce qui manque

| Élément | Statut |
|---|---|
| Contenu CV (chiffres, stack, parcours, contact) | ✅ Fourni (brief §2 + 2 PDF) |
| Contenu détaillé des 5 études de cas | ✅ Fourni (annexe A) |
| Voix / ton / phrase de positionnement FR+EN | ✅ Fourni (annexe C) |
| **Screenshots `./assets/raw/`** | ❌ **Absents** — le dossier n'existe pas dans le repo |
| Photo du candidat (contact/hero) | ❌ Non fournie |
| CV PDF FR + EN à servir depuis `/public/cv/` | ⚠️ 2 PDF EN reçus en pièce jointe ; **version FR à fournir** |
| Lettres de recommandation (extraits + PDF) | ❌ Non fournies → composant prévu **vide et documenté**, aucun verbatim inventé |
| Accès MCP Higgsfield | ✅ Disponible (génération des visuels) |

**Conséquence directe pour les études de cas :** sans screenshots, chaque cas s'appuiera par défaut sur un **visuel généré Higgsfield stylisé**, étiqueté « visualisation illustrative » (règles §5 du brief). Dès que tu me fournis des captures anonymisables, elles reprennent la priorité (une vraie preuve > un joli rendu). Le `assets-manifest.json` tracera pour chaque image `source: screenshot_reel | genere_higgsfield`.

**Points à trancher avant / pendant le build :**
1. **Direction artistique** — je recommande la n°1 ci-dessous, à valider ou arbitrer.
2. **Screenshots** — me les fournir (anonymisés) ou valider le recours aux visuels générés.
3. **CV FR** — me le fournir, ou j'affiche seulement le bouton EN en attendant.
4. **Photo** — la fournir pour la section contact, sinon contact sans portrait (aucun portrait généré, cf. brief).

---

## 1. Stack technique retenue

- **Next.js 15 (App Router) + TypeScript strict + Tailwind CSS v4**, déploiement **Vercel**.
- **i18n : `next-intl`**, locales `fr` (défaut) / `en`, routing `/[locale]/…`, sélecteur persistant (cookie `NEXT_LOCALE`). Contenu dans `/content/fr` et `/content/en` — zéro chaîne en dur dans les composants.
- **Études de cas en MDX** (`/content/{locale}/cases/*.mdx`) → ajout d'un cas sans toucher au code.
- **Animations : Framer Motion**, transitions 150–400 ms, `prefers-reduced-motion` respecté partout.
- **3D (si direction 1 validée) : React Three Fiber en `dynamic import`, `ssr:false`**, jamais dans le bundle initial, désactivé < 768 px et sous reduced-motion → fallback image statique.
- **Assets Higgsfield en statique** dans `/public/generated/` (aucun appel API au runtime), manifeste `assets-manifest.json`.
- **SEO :** metadata par page, OG + Twitter Card (images générées), `hreflang` FR/EN, `sitemap.ts`, `robots.ts`, JSON-LD `Person` + `WebSite`, URLs propres.
- **Analytics : Vercel Analytics** (sans cookie, pas de bandeau requis). Si tu veux GA4, je l'ajoute **avec** bandeau de consentement RGPD — pas sans.
- **Perf (critère de recette) : Lighthouse ≥ 90 sur les 4 catégories en mobile, LCP < 2,5 s.** Tout effet qui fait chuter sous le seuil passe en chargement différé ou dégage.
- **A11y :** navigation clavier complète, landmarks sémantiques, `alt` rédigés, focus visible, contrastes WCAG AA vérifiés.

---

## 2. Arborescence cible

```
portofolio/
├─ PLAN.md                      # ce document
├─ PROGRESS.md                  # journal d'avancement, tenu à jour par lot
├─ README.md                    # install, structure, ajout d'un cas, contenu bilingue, déploiement
├─ assets-manifest.json         # prompt/modèle/date/usage/source de chaque asset généré
├─ next.config.mjs · tsconfig.json · tailwind + postcss · .eslintrc
├─ content/
│  ├─ fr/ { hero, metrics, stack, timeline, labs, contact, ui } .ts|.json
│  │  └─ cases/ cas-1..5.mdx
│  └─ en/ { … miroir … }
│     └─ cases/ case-1..5.mdx
├─ messages/ fr.json · en.json   # libellés d'interface next-intl
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ layout.tsx · page.tsx        # page unique scrollée + sections ancrées
│  │  │  └─ case/[slug]/page.tsx         # page dédiée par étude de cas
│  │  ├─ sitemap.ts · robots.ts · opengraph-image.tsx
│  ├─ components/
│  │  ├─ sections/ Hero · MetricsBand · CaseGrid · StackExpertise · Labs · Timeline · Contact
│  │  ├─ case/ CaseHeader · CaseBody · MetricNote · StackChips · IllustrativeBadge
│  │  ├─ ui/ Nav · LangSwitcher · Button · Section · Reveal · CountUp · Quote(recos)
│  │  └─ three/ HeroScene.tsx (dynamic, ssr:false) + fallback
│  ├─ lib/ i18n · content-loader · seo · analytics
│  └─ styles/ tokens.css (design tokens) · globals.css
└─ public/
   ├─ cv/ nour-eddine-kharazi-fr.pdf · -en.pdf
   ├─ generated/ (visuels Higgsfield + poster/webm/mp4)
   └─ og/ (images Open Graph)
```

---

## 3. Architecture des pages (mappée au brief §3)

Page unique scrollée + pages dédiées `/case/[slug]` (SEO + partage de lien précis).

1. **Hero** — nom + « Digital Marketing Specialist — CRM, SEO technique, automatisation », phrase de positionnement (annexe C, mot pour mot), dispo **CDI septembre 2026**, mobilité France & international, 2 CTA : *Voir les résultats* / *Télécharger le CV*. Nom + poste lisibles **avant** toute animation (rendus côté serveur, pas d'attente).
2. **Bandeau chiffres** — 5 métriques animées au scroll : **+18 % ROI · +45 % trafic organique · +30 % leads qualifiés · −20 % cycle de conversion · 8 dashboards**. Chaque chiffre cliquable → l'étude de cas liée. `CountUp` respecte reduced-motion (valeur finale affichée directement).
3. **Études de cas (5)** — format constant Contexte → Problème → Approche → Exécution → L'obstacle → Résultat (+ méthode de mesure en note discrète) → Stack. Hiérarchie de lecture : **cas 5 (SEO Operating System) en pièce maîtresse, puis cas 3 (automatisation N8N)** les plus visibles — ils portent le différenciateur « construit ses propres outils ».
4. **Stack & expertise** — 4 familles : *Data & Analytics · Growth & Acquisition · CRM & Automation · IA & Outils*, niveau de maîtrise, traitement visuel (pas une liste à puces). Logos outils = icônes officielles / noms simples uniquement (pas d'imitation d'UI).
5. **Labs** — 2 études : automatisations N8N/Make ; IA générative en production (prompt engineering, GEO, pipelines). Traitées comme des cas, pas une liste. **Aucun outil de recherche d'emploi** (annexe C).
6. **Parcours** — timeline expériences (dormakaba, SYCON) + formations (INSEEC/OMNES, ISCID-CO) + certifications (GA4, HubSpot ×2, Meta, SEMrush).
7. **Contact** — email, téléphone, LinkedIn, CV PDF (FR + EN), `mailto:` (pas de backend). Photo réelle si fournie. Composant recommandations prêt mais vide tant que le contenu n'est pas fourni.

**Fil rouge (annexe C) :** chaque cas se rattache à data / SEO / automatisation + idée de « système ». Une puce discrète (data · SEO · auto) le matérialise sur chaque cas.

---

## 4. Trois directions artistiques + recommandation

Contrainte transverse (les 3) : 2 polices max, échelle modulaire, WCAG AA, grille et rythme cohérents, transitions 150–400 ms, mobile aussi soigné que desktop. **À éviter (brief §4) :** dégradé violet-bleu générique, cartes flottantes sans hiérarchie, curseur custom gênant, scrolljacking, texte gris clair fin sur fond sombre, animation d'entrée sur chaque paragraphe.

### ▸ Direction 1 — « Signal » — console / systèmes (dark, précis) — **RECOMMANDÉE**
- **Idée :** fond quasi-noir, une seule couleur d'accent « signal », labels de données en monospace, fines lignes de grille, motifs de flux de données discrets entre sections, un objet 3D sobre au hero (topographie/flux abstrait). Registre Linear / Vercel.
- **Typo :** *General Sans* (display + UI, auto-hébergée) + *JetBrains Mono* (labels data, chiffres techniques).
- **Palette :** base `#0A0B0D` · surface `#15181D` · texte `#E9ECF1` · muted `#A6ADB8` (≥ AA sur base) · accent unique (signal lime `#C6F24E` **ou** cyan `#5EE6FF`, à trancher). Aucun dégradé multicolore.
- **Pourquoi elle sert la double audience :** RH → chiffres énormes, lisibles, accessibles sans attendre ; Manager → l'esthétique « outil/système » incarne visuellement le différenciateur « je construis des systèmes qui tournent seuls ». C'est la seule des trois où la forme raconte déjà le fond.
- **Risque maîtrisé :** la 3D est en dynamic import + fallback statique < 768 px et sous reduced-motion → pas d'impact LCP.

### ▸ Direction 2 — « Éditorial » — clair, typographique, contrastes forts
- **Idée :** fond clair, typographie éditoriale de grande taille, chiffres traités comme des titres, blancs généreux, animation minimale. Registre presse premium / rapport annuel.
- **Pour :** lisibilité RH maximale, crédibilité « ETI / grand groupe », performance imbattable (peu d'effets).
- **Contre :** sous-exploite l'angle « futuriste » et « construit ses outils » ; risque de ressembler à un CV bien mis en page plutôt qu'à une démonstration.

### ▸ Direction 3 — « Spatial » — glassmorphism néon, 3D orbes
- **Idée :** fond sombre, panneaux en verre, halos néon, éléments 3D flottants.
- **Pour :** effet « waouh » immédiat.
- **Contre :** frôle précisément ce que le brief bannit (dégradés génériques, cartes flottantes) ; coût perf plus lourd, contraste plus difficile à tenir en AA. Le plus risqué pour la lisibilité RH.

**Recommandation argumentée :** **Direction 1 « Signal »**, en intégrant le meilleur de la 2 (traitement éditorial des chiffres : gros, en display, lisibles au premier coup d'œil). Elle satisfait « futuriste + haut de gamme », respecte l'arbitrage « si conflit, la lisibilité RH gagne », et surtout elle est la seule dont l'identité visuelle *démontre* le positionnement au lieu de juste le décrire. Décision d'accent (lime vs cyan) à trancher avec toi.

---

## 5. Mapping screenshots → études de cas

Screenshots **absents à ce jour**. Colonne « visuel par défaut » = ce qui sera généré via Higgsfield (stylisé, abstrait, étiqueté « visualisation illustrative ») tant que tu ne fournis pas de capture anonymisable.

| Cas | Preuve idéale (screenshot réel) | Visuel par défaut si non fourni | `source` manifeste |
|---|---|---|---|
| **1 — Refonte SEO technique (SYCON)** | Courbe de trafic organique GSC/GA4 (période vs N-1) | Courbe de croissance abstraite, sans chiffre lisible | `genere_higgsfield` |
| **2 — Acquisition B2B (SYCON)** | Vue funnel/scoring, séquences email (anonymisées) | Schéma de funnel + nœuds de séquence stylisés | `genere_higgsfield` |
| **3 — Automatisation N8N (dormakaba)** | Canvas de workflow N8N | Arborescence de workflow abstraite (nœuds + liens), pas l'UI N8N | `genere_higgsfield` |
| **4 — Écosystème dashboards Looker (dormakaba)** | Un dashboard Looker anonymisé | Structure de dashboard schématique (blocs + formes de courbes), pas l'UI Looker | `genere_higgsfield` |
| **5 — SEO Operating System (dormakaba)** ⭐ | Diagramme d'architecture (Skills/Subagents/Routines), extrait de reporting | Diagramme d'architecture système stylisé maison (le plus travaillé) | `genere_higgsfield` |

**Règle appliquée à chaque image :** aucune donnée chiffrée dans l'image, aucune imitation d'UI de marque, légende obligatoire, badge « visualisation illustrative ». Les vrais chiffres vivent dans le texte, avec méthode de mesure.

---

## 6. Assets Higgsfield — charte de prompt unifiée

**Charte commune (réutilisée sur tous les visuels, pour une identité et non un moodboard) :**
- **Palette :** fond quasi-noir `#0A0B0D`, un seul accent (l'accent retenu en §4), neutres froids. Pas de multicolore.
- **Matière / éclairage :** studio sombre, matériaux mats + reflets verre discrets, une source lumineuse d'accent, faible profondeur de champ, grain fin.
- **Niveau d'abstraction :** schématique / topographique. **Aucun texte lisible, aucun chiffre, aucune UI de marque, aucune personne.**
- **Format :** cadrages cohérents (illustrations d'ouverture 16:9 et 1:1), exports WebP/AVIF multi-tailles.

**Liste d'assets à générer (à valider) :**
1. **Fond hero** — boucle abstraite « flux de signal / topographie de données ». Vidéo ≤ 2 Mo WebM + fallback MP4, `poster`, `muted playsinline loop`, **désactivée mobile + reduced-motion**. (Alternative : image statique + parallax léger si on veut zéro vidéo.)
2. **5 illustrations d'ouverture** d'études de cas (voir tableau §5), même style.
3. **4 pictos de famille** pour Stack & expertise (Data / Growth / CRM-Auto / IA) — abstraits, cohérents.
4. **2 visuels Labs** (automatisation N8N/Make ; IA générative/GEO).
5. **Textures de séparation** entre sections (fines, discrètes).
6. **Images Open Graph** FR + EN (nom + positionnement, dérivées de la charte).

Chaque fichier → entrée `assets-manifest.json` : `{ file, prompt, model, date, usage, source, replaces? }`. Le modèle Higgsfield sera choisi via `models_explore` au lot 5 ; balance créditée à vérifier avant génération.

---

## 7. Découpage en lots (points de contrôle)

Chaque lot finit par un `PROGRESS.md` à jour, un `npm run build` vert, et un point de contrôle visuel.

| Lot | Contenu | Livrable de contrôle |
|---|---|---|
| **0 — Fondations** | Next.js + TS strict + Tailwind + next-intl + tokens + polices + Nav/LangSwitcher + build CI | Squelette bilingue qui build |
| **1 — Hero + chiffres** | Hero (SSR, phrase annexe C) + bandeau 5 métriques cliquables + système de contenu FR/EN | Rendu hero + chiffres desktop/mobile |
| **2 — Études de cas** | Moteur MDX + 5 cas rédigés FR/EN + pages `/case/[slug]` + grille | 5 cas lisibles en 60–90 s |
| **3 — Stack / Parcours / Labs** | 4 familles d'expertise + timeline + 2 Labs | Sections complètes |
| **4 — Contact** | Coordonnées + CV FR/EN + `mailto:` + composant recos (vide, documenté) + photo si fournie | Section contact |
| **5 — Assets Higgsfield** | Génération selon charte + intégration statique + manifeste + optimisation images | Visuels intégrés + manifeste |
| **6 — SEO / analytics** | metadata, OG, hreflang, sitemap, robots, JSON-LD, Vercel Analytics (+ bandeau si GA4) | Audit SEO on-page |
| **7 — Perf / a11y / recette** | Passe Lighthouse mobile, focus/clavier, alt, reduced-motion, doc déploiement Vercel | Rapport Lighthouse ≥ 90 ×4 + README complet |

---

## 8. Ce que j'attends de toi pour lancer

1. **Valider ou arbitrer la Direction 1 « Signal »** (et trancher l'accent : lime `#C6F24E` ou cyan `#5EE6FF`).
2. Confirmer le **recours aux visuels générés** pour les cas (par défaut) — et m'envoyer les **screenshots anonymisés** si tu veux des preuves réelles.
3. M'indiquer si je pars sur **Vercel Analytics** (recommandé, sans bandeau) ou **GA4 + bandeau RGPD**.
4. (Optionnel mais utile) me fournir **CV FR**, **photo**, **extraits de recommandation + PDF**.

Dès validation, j'attaque le **Lot 0**.
