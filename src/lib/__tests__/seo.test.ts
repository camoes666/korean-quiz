import { describe, it, expect } from 'vitest';
import { getAllQuizzes, getQuizBySlug } from '../../data/quizzes';
import {
  generateQuizJsonLd,
  getQuizFaq,
  getQuizSeoData,
  getSampleQuestions,
  getSamplePersonalityQuestions,
} from '../seo';

describe('seo', () => {
  it('fills the question count into titles and leaves no placeholder', () => {
    for (const quiz of getAllQuizzes()) {
      const seo = getQuizSeoData(quiz);
      expect(seo.title).not.toContain('{n}');
      expect(seo.keywords.length).toBeGreaterThanOrEqual(8);
    }
    const bts = getQuizBySlug('bts-army-trivia')!;
    expect(getQuizSeoData(bts).title).toBe(
      `BTS Quiz: How Well Do You Know BTS? (${bts.questions.length} Questions) | K-Pulse`
    );
  });

  it('has tailored SEO metadata for which-korean-food-are-you', () => {
    const kfood = getQuizBySlug('which-korean-food-are-you')!;
    const seo = getQuizSeoData(kfood);
    expect(seo.title).toContain('Which Korean Food Are You?');
    expect(seo.keywords).toContain('which korean food are you');
  });

  it('has tailored SEO metadata for aespa, le sserafim, twice, and enhypen quizzes', () => {
    const aespa = getQuizBySlug('which-aespa-member-are-you')!;
    const aespaSeo = getQuizSeoData(aespa);
    expect(aespaSeo.title).toContain('Which aespa Member Are You?');
    expect(aespaSeo.keywords).toContain('which aespa member are you');

    const leSserafim = getQuizBySlug('which-le-sserafim-member-are-you')!;
    const lsfSeo = getQuizSeoData(leSserafim);
    expect(lsfSeo.title).toContain('Which LE SSERAFIM Member Are You?');
    expect(lsfSeo.keywords).toContain('which le sserafim member are you');

    const twice = getQuizBySlug('which-twice-member-are-you')!;
    const twiceSeo = getQuizSeoData(twice);
    expect(twiceSeo.title).toContain('Which TWICE Member Are You?');
    expect(twiceSeo.keywords).toContain('which twice member are you');
    expect(twiceSeo.keywords).toContain('what twice member are you');
    expect(Object.keys(twice.personalityResults!)).toHaveLength(9);

    const enhypen = getQuizBySlug('which-enhypen-member-are-you')!;
    const enhypenSeo = getQuizSeoData(enhypen);
    expect(enhypenSeo.title).toContain('Which ENHYPEN Member Are You?');
    expect(enhypenSeo.keywords).toContain('which enhypen member are you');
    expect(enhypenSeo.keywords).toContain('what enhypen member are you');
    expect(Object.keys(enhypen.personalityResults!)).toHaveLength(7);
  });

  it('targets soulmate searches with the dedicated BTS soulmate quiz', () => {
    const soulmate = getQuizBySlug('which-bts-member-is-your-soulmate')!;
    const seo = getQuizSeoData(soulmate);
    expect(seo.title).toContain('Which BTS Member Is Your Soulmate?');
    expect(seo.keywords).toContain('bts soulmate quiz');
    expect(Object.keys(soulmate.personalityResults!)).toHaveLength(7);
  });

  it('targets GSC query variants for BTS, BLACKPINK, and Stray Kids personality quizzes', () => {
    const bpSeo = getQuizSeoData(getQuizBySlug('which-blackpink-member-are-you')!);
    expect(bpSeo.keywords).toContain('what blackpink member are you');
    expect(bpSeo.keywords).toContain('blackpink which member are you');
    expect(bpSeo.keywords).toContain('which blackpink member are you quiz');

    const skzSeo = getQuizSeoData(getQuizBySlug('which-stray-kids-member-are-you')!);
    expect(skzSeo.keywords).toContain('which stray kids member are you');
    expect(skzSeo.keywords).toContain('what stray kids member are you');

    const btsFaq = getQuizFaq(getQuizBySlug('which-bts-member-are-you')!);
    expect(btsFaq.length).toBeGreaterThanOrEqual(5);
    expect(btsFaq.some((f) => f.question.toLowerCase().includes('soulmate'))).toBe(true);
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

  it('picks sample scenario questions for personality tests', () => {
    const pSamples = getSamplePersonalityQuestions(getQuizBySlug('which-blackpink-member-are-you')!, 3);
    expect(pSamples).toHaveLength(3);
    expect(pSamples[0].options.length).toBeGreaterThanOrEqual(4);
  });
});
