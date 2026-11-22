import KoreanNamePageView from '@/components/pages/KoreanNamePageView';
import { getKoreanNameMetadata } from '@/lib/pageSeo';

export const dynamic = 'force-static';
export const metadata = getKoreanNameMetadata('en');

export default function KoreanNamePage() {
  return <KoreanNamePageView locale="en" />;
}
