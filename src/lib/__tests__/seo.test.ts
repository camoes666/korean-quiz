import { describe, it, expect } from 'vitest';
import { getAllQuizzes, getQuizBySlug } from '../../data/quizzes';
import { generateQuizJsonLd, getQuizFaq, getQuizSeoData, getSampleQuestions } from '../seo';

describe('seo', () => {
  it('fills the question count into titles and leaves no placeholder', () => {
    for (const quiz of getAllQuizzes()) {
      expect(getQuizSeoData(quiz).title).not.toContain('{n}');
    }
    const bts = getQuizBySlug('bts-army-trivia')!;
    expect(getQuizSeoData(bts).title).toBe(
      `BTS Quiz: How Well Do You Know BTS? (${bts.questions.length} Questions) | K-Pulse`
    );
  });

  it('emits no review ratings (there are no real reviews to mark up)', () => {
    for (const quiz of getAllQuizzes()) {
      expect(JSON.stringify(generateQuizJsonLd(quiz))).not.toContain('AggregateRating');
    }
  });

  it('builds FAQ structured data from the same FAQ shown on the page', () => {
    for (const quiz of getAllQuizzes()) {
      const faqSchema = generateQuizJsonLd(quiz).find((s) => s['@type'] === 'FAQPage') as {
        mainEntity: { name: string; acceptedAnswer: { text: string } }[];
      };
      expect(faqSchema.mainEntity.map((e) => [e.name, e.acceptedAnswer.text])).toEqual(
        getQuizFaq(quiz).map((f) => [f.question, f.answer])
      );
    }
  });

  it('lists every possible result in the personality FAQ', () => {
    const faq = getQuizFaq(getQuizBySlug('which-bts-member-are-you')!);
    expect(faq.find((f) => f.question === 'What results can I get?')?.answer).toContain('Jungkook');
  });

  it('picks one sample question per difficulty level', () => {
    const samples = getSampleQuestions(getQuizBySlug('stray-kids-stay-trivia')!);
    expect(samples.map((q) => q.level)).toEqual([1, 2, 3]);
  });
});
