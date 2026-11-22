import KpopMapClient from '@/components/map/KpopMapClient';
import type { SiteLocale } from '@/lib/i18nRoutes';
import { generateMapJsonLd } from '@/lib/pageSeo';

export default function MapPageView({ locale }: { locale: SiteLocale }) {
  const itemListSchema = generateMapJsonLd(locale);

  return (
    <main className="min-h-screen bg-slate-50/60 pb-16">
      <link rel="stylesheet" href="/vendor/leaflet.css" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <KpopMapClient />
    </main>
  );
}
