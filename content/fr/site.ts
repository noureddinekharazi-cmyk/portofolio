import type { SiteContent } from '@/lib/content-types';

export const fr: SiteContent = {
  hero: {
    tagline:
      'Data, SEO, automatisation : je transforme des process marketing en systèmes qui tournent seuls.',
    highlights: ['Data', 'SEO', 'automatisation'],
    lede: "Je construis mes propres outils — pipelines automatisés, dashboards, systèmes en production. Cinq résultats mesurables, pour des organisations structurées : ETI et grands groupes.",
  },

  metrics: [
    {
      id: 'roi',
      prefix: '+',
      value: 18,
      suffix: ' %',
      label: 'ROI des campagnes multicanales',
      measure: 'Email, SEA et social ads chez dormakaba — mesure avant / après.',
      caseSlug: 'automatisation-workflows',
    },
    {
      id: 'organic',
      prefix: '+',
      value: 45,
      suffix: ' %',
      label: 'Trafic organique',
      measure: 'Comparaison de la période de travail avec la même période N-1 (SYCON).',
      caseSlug: 'seo-technique',
    },
    {
      id: 'leads',
      prefix: '+',
      value: 30,
      suffix: ' %',
      label: 'Leads qualifiés en 9 mois',
      measure: 'Traçabilité jusqu’aux contrats signés, pas au volume de haut de funnel.',
      caseSlug: 'acquisition-b2b',
    },
    {
      id: 'cycle',
      prefix: '−',
      value: 20,
      suffix: ' %',
      label: 'Cycle de conversion',
      measure: 'Délais de traitement des leads, avant / après mise en production.',
      caseSlug: 'automatisation-workflows',
    },
    {
      id: 'dashboards',
      value: 8,
      label: 'Dashboards KPI en temps réel',
      measure: 'LinkedIn, Search Console, GA4, Leads, Emailing, reporting global.',
      caseSlug: 'dashboards-looker',
    },
    {
      id: 'pipeline',
      value: 2,
      suffix: '×',
      label: 'Pipeline SEO autonome, par semaine',
      measure: 'Exécutions planifiées lundi et vendredi, en production (GitHub Actions).',
      caseSlug: 'seo-operating-system',
    },
  ],

  stackFamilies: [
    {
      id: 'data',
      title: 'Data & Analytics',
      description: 'Mesurer, unifier les sources, transformer la donnée en décision.',
      tools: [
        { name: 'GA4', level: 3 },
        { name: 'Google Tag Manager', level: 3 },
        { name: 'Looker Studio', level: 3 },
        { name: 'Search Console', level: 3 },
        { name: 'Power BI', level: 2 },
        { name: 'Tableau', level: 2 },
        { name: 'SQL', level: 2 },
        { name: 'Python', level: 2 },
      ],
    },
    {
      id: 'growth',
      title: 'Growth & Acquisition',
      description: 'SEO technique, acquisition B2B, analyse comportementale.',
      tools: [
        { name: 'SEO technique', level: 3 },
        { name: 'SEMrush', level: 3 },
        { name: 'LinkedIn Sales Navigator', level: 3 },
        { name: 'Hotjar', level: 2 },
        { name: 'Meta Ads', level: 2 },
        { name: 'TikTok Ads', level: 2 },
      ],
    },
    {
      id: 'crm',
      title: 'CRM & Automation',
      description: 'Connecter les outils, orchestrer les workflows, faire circuler la donnée.',
      tools: [
        { name: 'N8N', level: 3 },
        { name: 'HubSpot', level: 3 },
        { name: 'Odoo', level: 3 },
        { name: 'Make', level: 2 },
        { name: 'Zapier', level: 2 },
        { name: 'Salesforce', level: 2 },
        { name: 'Contentful', level: 2 },
      ],
    },
    {
      id: 'ai',
      title: 'IA & Outils',
      description: 'IA générative en production : prompt engineering, GEO, pipelines de contenu.',
      tools: [
        { name: 'Claude Code', level: 3 },
        { name: 'ChatGPT · Claude · Gemini', level: 3 },
        { name: 'GEO', level: 3 },
        { name: 'Notion', level: 3 },
        { name: 'Webflow', level: 2 },
        { name: 'WordPress', level: 2 },
        { name: 'Figma', level: 2 },
      ],
    },
  ],

  timeline: [
    {
      kind: 'work',
      period: '10/2025 — Aujourd’hui',
      title: 'Digital / Data Marketing Manager',
      org: 'dormakaba France',
      location: 'Paris',
      points: [
        'Campagnes multicanales (email, SEA, social ads) : +18 % de ROI.',
        'Écosystème de 8 dashboards KPI Looker Studio en suivi temps réel.',
        'Automatisation des workflows (N8N, HubSpot) : cycle de conversion −20 %.',
        'Système SEO autonome en production (Claude Code, GitHub Actions), incluant le monitoring GEO.',
        'Coordination avec les équipes Espagne, Suisse, Allemagne et Australie. Gestion du CMS Contentful.',
      ],
    },
    {
      kind: 'work',
      period: '11/2024 — 09/2025',
      title: 'Chargé de projet Digital & Growth (alternance)',
      org: 'SYCON',
      location: 'Paris',
      points: [
        'Acquisition B2B (LinkedIn Sales Navigator + email automation) : +30 % de leads qualifiés en 9 mois.',
        'Audit SEO technique complet d’un site neuf : +45 % de trafic organique.',
        'Analyse comportementale Hotjar / GA4 : +20 % d’engagement.',
        'Implémentation et administration du CRM Odoo. Reportings acquisition / conversion / rétention.',
      ],
    },
    {
      kind: 'education',
      period: '2025 — 2026',
      title: 'MSc Data Marketing Manager',
      org: 'INSEEC Paris — OMNES Education',
      points: [],
    },
    {
      kind: 'education',
      period: '2024 — 2025',
      title: 'Master 2 Marketing Digital & E-Commerce',
      org: 'ISCID-CO Dunkerque',
      points: [],
    },
  ],

  certifications: [
    { name: 'Google Analytics 4 (GA4)', issuer: 'Google' },
    { name: 'HubSpot Marketing Hub', issuer: 'HubSpot' },
    { name: 'HubSpot Email Marketing', issuer: 'HubSpot' },
    { name: 'Meta Certified Digital Marketing Associate', issuer: 'Meta' },
    { name: 'SEO Fundamentals', issuer: 'SEMrush' },
  ],

  labs: [
    {
      id: 'n8n-make',
      tag: 'Automatisation',
      title: 'Automatisations marketing N8N / Make',
      body: 'Je conçois des workflows qui absorbent les tâches répétitives : nurturing, scoring de leads, synchronisation entre CRM, CMS et plateformes analytics. Le point dur n’est jamais l’outil, c’est l’interopérabilité — faire parler des systèmes qui ne sont pas conçus pour ça.',
      outcome: 'Des chaînes qui tournent seules, une fois branchées.',
      stack: ['N8N', 'Make', 'HubSpot', 'APIs'],
    },
    {
      id: 'ia-prod',
      tag: 'IA générative',
      title: 'IA générative en production marketing',
      body: 'J’utilise l’IA générative comme un composant de production, pas comme un gadget : prompt engineering structuré, pipelines de contenu, et GEO (Generative Engine Optimization) — l’optimisation de la visibilité dans les réponses générées par IA. Très peu d’équipes marketing suivent aujourd’hui ce signal.',
      outcome: 'Une longueur d’avance sur la recherche générative.',
      stack: ['Claude Code', 'Prompt engineering', 'GEO', 'Python'],
    },
  ],

  contact: {
    intro:
      'Je cherche un poste de Digital Marketing Specialist en CDI. Si vous construisez une organisation marketing où data, SEO et automatisation comptent, parlons-en.',
    availability:
      'Disponible en septembre 2026. Basé à Paris, mobile en France et à l’international.',
  },
};
