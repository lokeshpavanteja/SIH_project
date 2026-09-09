import { Scheme, UserProfile, SectorType, OrgType, SchemeEligibility } from '../types';

export interface MatchResult {
  score: number;
  reasons: string[];
}

/**
 * Frontend matching engine for prototype.
 * Computes an estimated eligibility match percentage based on user profile
 * and scheme eligibility rules. Designed to be replaceable by a backend engine.
 */
export function computeMatchScore(profile: UserProfile, scheme: Scheme): MatchResult {
  const reasons: string[] = [];
  let totalWeight = 0;
  let earnedWeight = 0;

  const rules: SchemeEligibility = scheme.eligibilityRules || {};

  // Age match (weight: 15)
  if (rules.minAge !== undefined || rules.maxAge !== undefined) {
    totalWeight += 15;
    const age = profile.age || 30;
    const minOk = rules.minAge === undefined || age >= rules.minAge;
    const maxOk = rules.maxAge === undefined || age <= rules.maxAge;
    if (minOk && maxOk) {
      earnedWeight += 15;
      reasons.push('matchReasonAge');
    }
  }

  // State/Location match (weight: 20)
  if (rules.states && rules.states.length > 0) {
    totalWeight += 20;
    const userState = normalizeState(profile.stateRegion);
    const stateMatch = rules.states.some(s =>
      s.toLowerCase() === 'all india' ||
      s.toLowerCase() === 'all states' ||
      normalizeState(s) === userState
    );
    if (stateMatch) {
      earnedWeight += 20;
      reasons.push('matchReasonLocation');
    }
  }

  // Sector match (weight: 20)
  if (rules.sectors && rules.sectors.length > 0) {
    totalWeight += 20;
    const userSector = profile.sector || mapIndustryToSector(profile.industry);
    if (userSector && rules.sectors.includes(userSector)) {
      earnedWeight += 20;
      reasons.push('matchReasonSector');
    }
  }

  // Org type match (weight: 15)
  if (rules.orgTypes && rules.orgTypes.length > 0) {
    totalWeight += 15;
    const userOrg = (profile.orgType || mapCategoryToOrgType(profile.userCategory)) as OrgType | undefined;
    if (userOrg && rules.orgTypes.includes(userOrg)) {
      earnedWeight += 15;
      reasons.push('matchReasonOrg');
    }
  }

  // Income match (weight: 15)
  if (rules.maxIncome !== undefined) {
    totalWeight += 15;
    const income = parseIndianAmount(profile.annualIncome || profile.annualRevenue || '0');
    if (income <= rules.maxIncome || rules.maxIncome === 0) {
      earnedWeight += 15;
      reasons.push('matchReasonIncome');
    }
  }

  // Education match (weight: 10)
  if (rules.education && rules.education.length > 0) {
    totalWeight += 10;
    if (profile.education && rules.education.includes(profile.education)) {
      earnedWeight += 10;
      reasons.push('matchReasonEducation');
    }
  }

  // Turnover match (weight: 5)
  if (rules.maxTurnover !== undefined) {
    totalWeight += 5;
    const turnover = parseIndianAmount(profile.annualTurnover || '0');
    if (turnover <= rules.maxTurnover || rules.maxTurnover === 0) {
      earnedWeight += 5;
    }
  }

  // If no rules defined, use the scheme's existing matchScore
  if (totalWeight === 0) {
    return {
      score: scheme.matchScore || 70,
      reasons: scheme.matchReasons || [],
    };
  }

  const score = Math.round((earnedWeight / totalWeight) * 100);

  // Clamp between 30-98 for realistic display
  const clampedScore = Math.max(30, Math.min(98, score));

  return { score: clampedScore, reasons };
}

function normalizeState(state: string): string {
  return state
    .toLowerCase()
    .replace(/\s*\(.*\)\s*/g, '')
    .trim();
}

function mapIndustryToSector(industry: string): SectorType | undefined {
  const i = (industry || '').toLowerCase();
  if (i.includes('agri')) return 'agriculture';
  if (i.includes('software') || i.includes('ai') || i.includes('tech') || i.includes('it')) return 'software_it';
  if (i.includes('manufactur')) return 'manufacturing';
  if (i.includes('health') || i.includes('medical')) return 'healthcare';
  if (i.includes('education') || i.includes('academic')) return 'education';
  if (i.includes('retail')) return 'retail';
  if (i.includes('food')) return 'food';
  if (i.includes('handicraft') || i.includes('textile') || i.includes('handloom')) return 'handicrafts';
  if (i.includes('civil') || i.includes('construction')) return 'civil';
  if (i.includes('mechanical')) return 'mechanical';
  if (i.includes('service')) return 'services';
  return 'other';
}

function mapCategoryToOrgType(category: string): string | undefined {
  const c = (category || '').toLowerCase();
  if (c.includes('startup')) return 'existing_startup';
  if (c.includes('small') || c.includes('business') || c.includes('msme')) return 'existing_business';
  if (c.includes('ngo') || c.includes('non-profit') || c.includes('nonprofit')) return 'existing_ngo';
  if (c.includes('individual') || c.includes('student') || c.includes('artisan')) return 'individual';
  if (c.includes('researcher')) return 'individual';
  return 'individual';
}

function parseIndianAmount(str: string): number {
  if (!str) return 0;
  const cleaned = str.replace(/[₹$,\s]/g, '').replace(/lakhs?/i, '00000').replace(/crores?/i, '0000000');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Batch compute match scores for all schemes against a user profile.
 */
export function computeAllMatches(profile: UserProfile, schemes: Scheme[]): Scheme[] {
  return schemes.map(scheme => {
    const { score, reasons } = computeMatchScore(profile, scheme);
    return {
      ...scheme,
      matchScore: score,
      matchReasons: reasons.length > 0 ? reasons : scheme.matchReasons,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
