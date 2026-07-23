import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Pillar } from './content-types';

export type IllustrationSource =
  | 'schematic'
  | 'genere_higgsfield'
  | 'screenshot_reel';

export interface CaseIllustration {
  /** Coded schematic variant used when no bitmap asset is provided. */
  variant: 'system' | 'flow' | 'dashboard' | 'funnel' | 'curve';
  alt: string;
  caption: string;
  source: IllustrationSource;
  /** Present when a real screenshot or generated bitmap replaces the schematic. */
  src?: string;
}

export interface CaseAside {
  title: string;
  body: string;
}

export interface CaseFrontmatter {
  slug: string;
  order: number;
  pillar: Pillar;
  company: string;
  role: string;
  period: string;
  title: string;
  summary: string;
  metricDisplay: string;
  metricLabel: string;
  illustration: CaseIllustration;
  context: string;
  problem: string;
  approach: string[];
  obstacle: string;
  result: string;
  measure: string;
  stack: string[];
  aside?: CaseAside;
}

export interface CaseDoc {
  frontmatter: CaseFrontmatter;
  /** Optional free-form MDX body (rendered below the structured sections). */
  body: string;
}

function casesDir(locale: string) {
  return path.join(process.cwd(), 'content', locale, 'cases');
}

export async function getCaseSlugs(locale: string): Promise<string[]> {
  try {
    const files = await fs.readdir(casesDir(locale));
    return files
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx$/, ''));
  } catch {
    return [];
  }
}

export async function getCase(
  locale: string,
  slug: string,
): Promise<CaseDoc | null> {
  try {
    const file = path.join(casesDir(locale), `${slug}.mdx`);
    const raw = await fs.readFile(file, 'utf8');
    const { data, content } = matter(raw);
    return { frontmatter: data as CaseFrontmatter, body: content.trim() };
  } catch {
    return null;
  }
}

export async function getAllCases(locale: string): Promise<CaseDoc[]> {
  const slugs = await getCaseSlugs(locale);
  const docs = await Promise.all(slugs.map((s) => getCase(locale, s)));
  return docs
    .filter((d): d is CaseDoc => d !== null)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export async function getAdjacentCases(locale: string, slug: string) {
  const all = await getAllCases(locale);
  const idx = all.findIndex((d) => d.frontmatter.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1]!.frontmatter : null,
    next: idx >= 0 && idx < all.length - 1 ? all[idx + 1]!.frontmatter : null,
  };
}
