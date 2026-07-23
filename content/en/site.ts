import type { SiteContent } from '@/lib/content-types';

export const en: SiteContent = {
  hero: {
    tagline:
      'Data, SEO, automation: I turn marketing processes into systems that run themselves.',
    highlights: ['Data', 'SEO', 'automation'],
    lede: 'I build my own tools — automated pipelines, dashboards, systems in production. Five measurable results, for structured organizations: mid-market and enterprise.',
  },

  metrics: [
    {
      id: 'roi',
      prefix: '+',
      value: 18,
      suffix: ' %',
      label: 'ROI on multichannel campaigns',
      measure: 'Email, SEA and social ads at dormakaba — before / after.',
      caseSlug: 'automatisation-workflows',
    },
    {
      id: 'organic',
      prefix: '+',
      value: 45,
      suffix: ' %',
      label: 'Organic traffic',
      measure: 'Work period compared with the same period a year earlier (SYCON).',
      caseSlug: 'seo-technique',
    },
    {
      id: 'leads',
      prefix: '+',
      value: 30,
      suffix: ' %',
      label: 'Qualified leads in 9 months',
      measure: 'Traced through to signed contracts, not top-of-funnel volume.',
      caseSlug: 'acquisition-b2b',
    },
    {
      id: 'cycle',
      prefix: '−',
      value: 20,
      suffix: ' %',
      label: 'Conversion cycle',
      measure: 'Lead-handling times, before / after going to production.',
      caseSlug: 'automatisation-workflows',
    },
    {
      id: 'dashboards',
      value: 8,
      label: 'Real-time KPI dashboards',
      measure: 'LinkedIn, Search Console, GA4, Leads, Emailing, global reporting.',
      caseSlug: 'dashboards-looker',
    },
    {
      id: 'pipeline',
      value: 2,
      suffix: '×',
      label: 'Autonomous SEO pipeline, per week',
      measure: 'Scheduled runs Monday and Friday, in production (GitHub Actions).',
      caseSlug: 'seo-operating-system',
    },
  ],

  stackFamilies: [
    {
      id: 'data',
      title: 'Data & Analytics',
      description: 'Measure, unify the sources, turn data into decisions.',
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
      description: 'Technical SEO, B2B acquisition, behavioral analysis.',
      tools: [
        { name: 'Technical SEO', level: 3 },
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
      description: 'Connect the tools, orchestrate the workflows, keep the data moving.',
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
      title: 'AI & Tools',
      description: 'Generative AI in production: prompt engineering, GEO, content pipelines.',
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
      period: '10/2025 — Present',
      title: 'Digital / Data Marketing Manager',
      org: 'dormakaba France',
      location: 'Paris',
      points: [
        'Multichannel campaigns (email, SEA, social ads): +18% ROI.',
        'An ecosystem of 8 real-time Looker Studio KPI dashboards.',
        'Workflow automation (N8N, HubSpot): conversion cycle down 20%.',
        'Autonomous SEO system in production (Claude Code, GitHub Actions), including GEO monitoring.',
        'Coordination with the Spain, Switzerland, Germany and Australia teams. Contentful CMS ownership.',
      ],
    },
    {
      kind: 'work',
      period: '11/2024 — 09/2025',
      title: 'Digital & Growth Project Manager (apprenticeship)',
      org: 'SYCON',
      location: 'Paris',
      points: [
        'B2B acquisition (LinkedIn Sales Navigator + email automation): +30% qualified leads in 9 months.',
        'Full technical SEO audit of a brand-new site: +45% organic traffic.',
        'Behavioral analysis with Hotjar / GA4: +20% engagement.',
        'Odoo CRM implementation and administration. Acquisition / conversion / retention reporting.',
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
      title: 'Master 2 Digital Marketing & E-Commerce',
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
      tag: 'Automation',
      title: 'N8N / Make marketing automations',
      body: 'I build workflows that absorb repetitive work: nurturing, lead scoring, syncing between CRM, CMS and analytics platforms. The hard part is never the tool — it is interoperability, making systems talk that were never designed to.',
      outcome: 'Chains that run on their own, once wired.',
      stack: ['N8N', 'Make', 'HubSpot', 'APIs'],
    },
    {
      id: 'ia-prod',
      tag: 'Generative AI',
      title: 'Generative AI in marketing production',
      body: 'I treat generative AI as a production component, not a gadget: structured prompt engineering, content pipelines, and GEO (Generative Engine Optimization) — tracking visibility inside AI-generated answers. Very few marketing teams watch that signal today.',
      outcome: 'A head start on generative search.',
      stack: ['Claude Code', 'Prompt engineering', 'GEO', 'Python'],
    },
  ],

  contact: {
    intro:
      'I am looking for a permanent Digital Marketing Specialist role. If you are building a marketing organization where data, SEO and automation matter, let us talk.',
    availability:
      'Available September 2026. Based in Paris, open to France and international.',
  },
};
