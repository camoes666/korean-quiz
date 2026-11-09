import { describe, it, expect } from 'vitest';
import { IDOL_GROUPS, getIdolGroupById, getIdolMemberById } from '../../data/idolChemistry';
import {
  analyzeIdolChemistry,
  getGroupChemistryRanking,
  getMbtiChemistry,
  getSajuElementFromBirthDate,
  getSajuRelation,
  getZodiacFromMonthDay,
} from '../chemistryEngine';

describe('Idol Chemistry Database & K-Saju × MBTI Engine', () => {
  it('contains all 7 K-Pop groups and 44 verified members', () => {
    expect(IDOL_GROUPS).toHaveLength(7);
    const totalMembers = IDOL_GROUPS.reduce((acc, g) => acc + g.members.length, 0);
    expect(totalMembers).toBe(44);

    for (const group of IDOL_GROUPS) {
      expect(group.members.length).toBeGreaterThan(0);
      for (const member of group.members) {
        expect(member.birthDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(member.charmEn.length).toBeGreaterThanOrEqual(3);
        expect(member.charmKo.length).toBeGreaterThanOrEqual(3);
        expect(member.dateScenarioKo.length).toBeGreaterThan(10);
      }
    }
  });

  it('calculates Western zodiac signs accurately from month and day', () => {
    expect(getZodiacFromMonthDay(9, 1)).toBe('virgo'); // Jungkook
    expect(getZodiacFromMonthDay(12, 30)).toBe('capricorn'); // V
    expect(getZodiacFromMonthDay(3, 27)).toBe('aries'); // Lisa
    expect(getZodiacFromMonthDay(2, 18)).toBe('aquarius'); // j-hope
  });

  it('calculates K-Saju Five Elements deterministically from birth dates', () => {
    const el1 = getSajuElementFromBirthDate(2002, 5, 15);
    const el2 = getSajuElementFromBirthDate(2002, 5, 15);
    expect(el1).toBe(el2);
    expect(['wood', 'fire', 'earth', 'metal', 'water']).toContain(el1);
  });

  it('identifies Saju Sangsaeng (mutual generation) and Twin Flame relationships', () => {
    expect(getSajuRelation('wood', 'fire').type).toBe('harmony_feed');
    expect(getSajuRelation('fire', 'wood').type).toBe('harmony_receive');
    expect(getSajuRelation('water', 'water').type).toBe('twin_flame');
    expect(getSajuRelation('water', 'fire').type).toBe('magnetic_spark');
  });

  it('handles MBTI golden pairs, mirrors, and UNKNOWN fallback', () => {
    expect(getMbtiChemistry('ENFP', 'INFJ').category).toBe('soulmate_pair');
    expect(getMbtiChemistry('INTP', 'INTP').category).toBe('mirror_twin');
    expect(getMbtiChemistry('UNKNOWN', 'INTP').rawScore).toBeGreaterThanOrEqual(80);
  });

  it('produces deterministic compatibility scores within 74-99% and localized stories', () => {
    const bts = getIdolGroupById('bts')!;
    const jungkook = getIdolMemberById('bts', 'jungkook')!;

    const input = {
      nickname: '보라해',
      birthYear: 2001,
      birthMonth: 9,
      birthDay: 12,
      mbti: 'ENFP' as const,
    };

    const resKo = analyzeIdolChemistry(input, bts, jungkook, 'ko');
    const resEn = analyzeIdolChemistry(input, bts, jungkook, 'en');

    expect(resKo.totalScore).toBe(resEn.totalScore);
    expect(resKo.totalScore).toBeGreaterThanOrEqual(74);
    expect(resKo.totalScore).toBeLessThanOrEqual(99);
    expect(resKo.sajuDetail).toContain('보라해');
    expect(resEn.sajuDetail).toContain('Jungkook');
  });

  it('ranks all members of a group in descending score order', () => {
    const skz = getIdolGroupById('stray-kids')!;
    const ranking = getGroupChemistryRanking(
      {
        birthYear: 2003,
        birthMonth: 7,
        birthDay: 20,
        mbti: 'INFP',
      },
      skz,
      'ko'
    );

    expect(ranking).toHaveLength(8);
    for (let i = 1; i < ranking.length; i++) {
      expect(ranking[i - 1].totalScore).toBeGreaterThanOrEqual(ranking[i].totalScore);
    }
  });
});
