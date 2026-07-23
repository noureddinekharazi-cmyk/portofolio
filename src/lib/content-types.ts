import type { CaseSlug } from './site';

export type Pillar = 'data' | 'seo' | 'automation';

export interface HeroContent {
  /** Positioning phrase — displayed verbatim (Annexe C). */
  tagline: string;
  /** Words in the tagline to highlight with the accent color. */
  highlights: string[];
  lede: string;
}

export interface Metric {
  id: string;
  prefix?: string;
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  measure: string;
  caseSlug: CaseSlug;
}

export interface StackTool {
  name: string;
  level: 1 | 2 | 3;
}

export interface StackFamily {
  id: string;
  title: string;
  description: string;
  tools: StackTool[];
}

export interface TimelineItem {
  kind: 'work' | 'education';
  period: string;
  title: string;
  org: string;
  location?: string;
  points: string[];
}

export interface LabItem {
  id: string;
  tag: string;
  title: string;
  body: string;
  outcome: string;
  stack: string[];
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface ContactContent {
  intro: string;
  availability: string;
}

export interface SiteContent {
  hero: HeroContent;
  metrics: Metric[];
  stackFamilies: StackFamily[];
  timeline: TimelineItem[];
  certifications: Certification[];
  labs: LabItem[];
  contact: ContactContent;
}
