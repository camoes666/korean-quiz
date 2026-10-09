import { Question, QuizOption, getLocalizedText } from '@/types/quiz';
import { Language } from '@/lib/translations';

export function getCorrectOption(question: Question): QuizOption | undefined {
  return question.options.find((opt) => opt.id === question.correctAnswer);
}

export function getCorrectAnswerText(question: Question, lang: Language): string {
  const correctOpt = getCorrectOption(question);
  if (!correctOpt) return '';
  return getLocalizedText(correctOpt, 'text', lang);
}

export function getLevelBadge(level: number | undefined, lang: Language): { label: string; color: string } {
  switch (level) {
    case 1:
      return {
        label: lang === 'ko' ? '루키 (기초)' : lang === 'es' ? 'Novato Lv.1' : 'Rookie Lv.1',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    case 2:
      return {
        label: lang === 'ko' ? '팬 (중급)' : lang === 'es' ? 'Fan Lv.2' : 'Fan Lv.2',
        color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      };
    case 3:
      return {
        label: lang === 'ko' ? '하드코어 (고급)' : lang === 'es' ? 'Experto Lv.3' : 'Hardcore Lv.3',
        color: 'bg-rose-50 text-rose-700 border-rose-200',
      };
    default:
      return {
        label: lang === 'ko' ? '기본 상식' : lang === 'es' ? 'Básico' : 'General',
        color: 'bg-slate-100 text-slate-700 border-slate-200',
      };
  }
}

export function estimateGuideReadTime(questionCount: number): number {
  // Approximate reading time: ~20 seconds per question + explanation + fun fact
  return Math.max(3, Math.ceil((questionCount * 22) / 60));
}
