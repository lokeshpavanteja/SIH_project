/**
 * Phone Number Utilities for MatchWise AI
 * Strict Indian Phone Number Support (+91 XXXXX XXXXX) with 10 digits validation
 */

export interface CountryCodeOption {
  code: string;
  country: string;
  flag: string;
  digitLength: number;
}

export const COUNTRY_CODES: CountryCodeOption[] = [
  { code: '+91', country: 'India', flag: '🇮🇳', digitLength: 10 },
  { code: '+1', country: 'United States / Canada', flag: '🇺🇸', digitLength: 10 },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧', digitLength: 10 },
  { code: '+49', country: 'Germany', flag: '🇩🇪', digitLength: 10 },
  { code: '+33', country: 'France', flag: '🇫🇷', digitLength: 9 },
  { code: '+81', country: 'Japan', flag: '🇯🇵', digitLength: 10 },
  { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪', digitLength: 9 },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', digitLength: 8 },
  { code: '+61', country: 'Australia', flag: '🇦🇺', digitLength: 9 },
];

/**
 * Strips all non-digit characters from string
 */
export function extractDigits(raw: string): string {
  return raw.replace(/\D/g, '');
}

/**
 * Formats a 10-digit Indian phone number as: +91 XXXXX XXXXX
 */
export function formatIndianPhoneNumber(digits: string, countryCode = '+91'): string {
  const cleanDigits = extractDigits(digits).slice(0, 10);
  if (cleanDigits.length === 0) return '';
  if (cleanDigits.length <= 5) {
    return `${countryCode} ${cleanDigits}`;
  }
  return `${countryCode} ${cleanDigits.slice(0, 5)} ${cleanDigits.slice(5, 10)}`;
}

/**
 * Validates whether the digits represent a valid 10-digit phone number
 * For India (+91), must be 10 digits and traditionally starts with 6, 7, 8, or 9
 */
export function isValidIndianPhoneNumber(digits: string): { isValid: boolean; error?: string } {
  const clean = extractDigits(digits);
  if (clean.length === 0) {
    return { isValid: false, error: 'Phone number is required.' };
  }
  if (clean.length !== 10) {
    return { isValid: false, error: `Indian phone number must be exactly 10 digits (currently ${clean.length}/10).` };
  }
  if (!/^[6-9]/.test(clean)) {
    return { isValid: false, error: 'Valid Indian mobile numbers start with 6, 7, 8, or 9.' };
  }
  return { isValid: true };
}

/**
 * Parses a phone string like "+91 98765 43210" or "9876543210" into components
 */
export function parsePhoneNumber(phoneStr: string, defaultCode = '+91') {
  if (!phoneStr) return { countryCode: defaultCode, digits: '', formatted: '' };
  
  let code = defaultCode;
  let digits = phoneStr;

  for (const item of COUNTRY_CODES) {
    if (phoneStr.startsWith(item.code)) {
      code = item.code;
      digits = phoneStr.slice(item.code.length);
      break;
    }
  }

  const cleanDigits = extractDigits(digits).slice(0, 10);
  const formatted = formatIndianPhoneNumber(cleanDigits, code);

  return { countryCode: code, digits: cleanDigits, formatted };
}
