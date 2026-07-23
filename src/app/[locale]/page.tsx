import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { MetricsBand } from '@/components/sections/MetricsBand';
import { CasesSection } from '@/components/sections/CasesSection';
import { StackSection } from '@/components/sections/StackSection';
import { LabsSection } from '@/components/sections/LabsSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <MetricsBand locale={locale} />
      <CasesSection locale={locale} />
      <StackSection locale={locale} />
      <LabsSection locale={locale} />
      <TimelineSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
