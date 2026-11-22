import KoreanNameClient from '@/components/KoreanNameClient';
import type { SiteLocale } from '@/lib/i18nRoutes';
import { generateKoreanNameJsonLd } from '@/lib/pageSeo';

export default function KoreanNamePageView({ locale }: { locale: SiteLocale }) {
  const schemas = generateKoreanNameJsonLd(locale);

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <KoreanNameClient />
    </>
  );
}
