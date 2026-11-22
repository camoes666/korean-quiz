import { describe, it, expect } from 'vitest';
import {
  KOREAN_GIVEN_NAMES,
  KOREAN_SURNAMES,
  type NameGender,
  type NameVibe,
} from '../../data/koreanNames';
import {
  buildKoreanNameShareQuery,
  generateKoreanName,
  getBalancingElement,
  parseKoreanNameQuery,
} from '../koreanNameEngine';
import type { SajuElement } from '../../data/idolChemistry';

describe('koreanNames dataset integrity', () => {
  it('contains 20 surnames and 60 given names with complete 4-language Hanja data', () => {
    expect(KOREAN_SURNAMES).toHaveLength(20);
    expect(KOREAN_GIVEN_NAMES).toHaveLength(60);

    const elements: SajuElement[] = ['wood', 'fire', 'earth', 'metal', 'water'];
    for (const el of elements) {
      expect(KOREAN_SURNAMES.filter((s) => s.element === el)).toHaveLength(4);
      expect(KOREAN_GIVEN_NAMES.filter((g) => g.element === el)).toHaveLength(12);
    }

    for (const sur of KOREAN_SURNAMES) {
      expect(sur.hangul.length).toBeGreaterThanOrEqual(1);
      expect(sur.hanja.length).toBeGreaterThanOrEqual(1);
      expect(sur.famousIdols.length).toBeGreaterThanOrEqual(1);
      expect(sur.meaning.en).toBeTruthy();
      expect(sur.meaning.ko).toBeTruthy();
      expect(sur.meaning.es).toBeTruthy();
      expect(sur.meaning.pt).toBeTruthy();
    }

    for (const name of KOREAN_GIVEN_NAMES) {
      expect(name.hangul.length).toBe(2);
      expect(name.syllables).toHaveLength(2);
      expect(name.meaning.en).toBeTruthy();
      expect(name.meaning.ko).toBeTruthy();
      expect(name.meaning.es).toBeTruthy();
      expect(name.meaning.pt).toBeTruthy();
      expect(name.auraTag.es).toBeTruthy();
      expect(name.story.pt).toBeTruthy();
    }
  });
});

describe('koreanNameEngine', () => {
  it('maps every Saju element to its authentic nurturing resource element', () => {
    expect(getBalancingElement('wood')).toBe('water');
    expect(getBalancingElement('fire')).toBe('wood');
    expect(getBalancingElement('earth')).toBe('fire');
    expect(getBalancingElement('metal')).toBe('earth');
    expect(getBalancingElement('water')).toBe('metal');
  });

  it('produces identical deterministic outputs for identical inputs', () => {
    const input = {
      birthYear: 2002,
      birthMonth: 5,
      birthDay: 15,
      gender: 'female' as NameGender,
      vibe: 'idol' as NameVibe,
      realName: 'Sofia',
    };

    const a = generateKoreanName(input, 'es');
    const b = generateKoreanName(input, 'es');

    expect(a.serialCode).toBe(b.serialCode);
    expect(a.candidates.map((c) => c.fullHangul)).toEqual(
      b.candidates.map((c) => c.fullHangul)
    );
    expect(a.matchedIdol.member.id).toBe(b.matchedIdol.member.id);
    expect(a.matchedIdol.totalScore).toBe(b.matchedIdol.totalScore);
  });

  it('always returns 3 unique full names across all gender and vibe combinations', () => {
    const genders: NameGender[] = ['female', 'male', 'unisex'];
    const vibes: NameVibe[] = ['idol', 'soft', 'chic', 'classic'];

    for (const gender of genders) {
      for (const vibe of vibes) {
        const res = generateKoreanName({
          birthYear: 1999,
          birthMonth: 9,
          birthDay: 1,
          gender,
          vibe,
        });
        expect(res.candidates).toHaveLength(3);
        const hanguls = new Set(res.candidates.map((c) => c.fullHangul));
        expect(hanguls.size).toBe(3);

        // Female selection should never emit male-exclusive name, and vice versa
        for (const cand of res.candidates) {
          if (gender === 'female') {
            expect(cand.givenName.gender).not.toBe('male');
          } else if (gender === 'male') {
            expect(cand.givenName.gender).not.toBe('female');
          }
        }
        expect(res.matchedIdol.totalScore).toBeGreaterThanOrEqual(74);
        expect(res.matchedIdol.totalScore).toBeLessThanOrEqual(99);
      }
    }
  });

  it('round-trips URL query parameters accurately', () => {
    const query = buildKoreanNameShareQuery(
      {
        birthYear: 2004,
        birthMonth: 11,
        birthDay: 22,
        gender: 'unisex',
        vibe: 'chic',
        realName: 'Mateo',
      },
      2
    );

    const parsed = parseKoreanNameQuery(new URLSearchParams(query));
    expect(parsed.autoGenerate).toBe(true);
    expect(parsed.pickIndex).toBe(2);
    expect(parsed.input).toEqual({
      birthYear: 2004,
      birthMonth: 11,
      birthDay: 22,
      gender: 'unisex',
      vibe: 'chic',
      realName: 'Mateo',
    });

    const empty = parseKoreanNameQuery(new URLSearchParams(''));
    expect(empty.autoGenerate).toBe(false);
    expect(empty.pickIndex).toBe(0);
  });
});
