export interface CountryInfo {
  name: string;
  code: string;
  flag: string;
  currencySymbol: string;
  currencyCode: string;
  defaultFunding: string;
  states: string[];
}

export const SUPPORTED_COUNTRIES: CountryInfo[] = [
  {
    name: 'India',
    code: 'IN',
    flag: '🇮🇳',
    currencySymbol: '₹',
    currencyCode: 'INR',
    defaultFunding: '₹50,00,000',
    states: [
      'Karnataka (Bengaluru)',
      'Maharashtra (Mumbai/Pune)',
      'Delhi NCR',
      'Tamil Nadu (Chennai)',
      'Telangana (Hyderabad)',
      'Gujarat',
      'Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Kerala',
      'Madhya Pradesh',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Tripura',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
    ],
  },
  {
    name: 'United States',
    code: 'US',
    flag: '🇺🇸',
    currencySymbol: '$',
    currencyCode: 'USD',
    defaultFunding: '$250,000',
    states: [
      'California (Silicon Valley / SF / LA)',
      'Texas (Austin / Dallas)',
      'New York (NYC)',
      'Massachusetts (Boston)',
      'Washington (Seattle)',
      'Colorado (Denver / Boulder)',
      'Illinois (Chicago)',
      'Florida (Miami / Orlando)',
      'Georgia (Atlanta)',
      'North Carolina (Research Triangle)',
      'Pennsylvania',
      'Virginia',
      'Ohio',
      'Michigan',
      'New Jersey',
      'Arizona',
      'Oregon',
      'Utah (Salt Lake City)',
      'Minnesota',
      'Maryland',
    ],
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    currencySymbol: '£',
    currencyCode: 'GBP',
    defaultFunding: '£150,000',
    states: [
      'Greater London',
      'South East England (Oxford / Cambridge)',
      'North West (Manchester)',
      'Scotland (Edinburgh / Glasgow)',
      'West Midlands (Birmingham)',
      'South West (Bristol / Bath)',
      'Yorkshire and the Humber (Leeds)',
      'Wales (Cardiff)',
      'Northern Ireland (Belfast)',
      'East Midlands (Nottingham)',
      'North East (Newcastle)',
    ],
  },
  {
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    currencySymbol: 'CA$',
    currencyCode: 'CAD',
    defaultFunding: 'CA$200,000',
    states: [
      'Ontario (Toronto / Waterloo / Ottawa)',
      'Quebec (Montreal / Quebec City)',
      'British Columbia (Vancouver / Victoria)',
      'Alberta (Calgary / Edmonton)',
      'Manitoba',
      'Saskatchewan',
      'Nova Scotia (Halifax)',
      'New Brunswick',
      'Newfoundland and Labrador',
    ],
  },
  {
    name: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    currencySymbol: 'A$',
    currencyCode: 'AUD',
    defaultFunding: 'A$180,000',
    states: [
      'New South Wales (Sydney)',
      'Victoria (Melbourne)',
      'Queensland (Brisbane)',
      'Western Australia (Perth)',
      'South Australia (Adelaide)',
      'Australian Capital Territory (Canberra)',
      'Tasmania (Hobart)',
    ],
  },
  {
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    currencySymbol: '€',
    currencyCode: 'EUR',
    defaultFunding: '€200,000',
    states: [
      'Berlin',
      'Bavaria (Munich)',
      'Baden-Württemberg (Stuttgart)',
      'North Rhine-Westphalia (Cologne / Düsseldorf)',
      'Hesse (Frankfurt)',
      'Hamburg',
      'Saxony (Dresden / Leipzig)',
      'Lower Saxony (Hanover)',
      'Rhineland-Palatinate',
    ],
  },
  {
    name: 'France',
    code: 'FR',
    flag: '🇫🇷',
    currencySymbol: '€',
    currencyCode: 'EUR',
    defaultFunding: '€180,000',
    states: [
      'Île-de-France (Paris Region)',
      'Auvergne-Rhône-Alpes (Lyon)',
      'Provence-Alpes-Côte d\'Azur (Marseille / Nice)',
      'Occitanie (Toulouse)',
      'Nouvelle-Aquitaine (Bordeaux)',
      'Grand Est (Strasbourg)',
    ],
  },
  {
    name: 'Singapore',
    code: 'SG',
    flag: '🇸🇬',
    currencySymbol: 'S$',
    currencyCode: 'SGD',
    defaultFunding: 'S$250,000',
    states: [
      'Central Region',
      'Jurong Innovation District',
      'One-North Tech Hub',
      'East Region',
      'North Region',
    ],
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    flag: '🇦🇪',
    currencySymbol: 'AED',
    currencyCode: 'AED',
    defaultFunding: 'AED 350,000',
    states: [
      'Dubai (DIFC / Dubai Future District)',
      'Abu Dhabi (Hub71 / ADGM)',
      'Sharjah (SRTI Park)',
      'Ras Al Khaimah',
      'Ajman',
    ],
  },
  {
    name: 'Japan',
    code: 'JP',
    flag: '🇯🇵',
    currencySymbol: '¥',
    currencyCode: 'JPY',
    defaultFunding: '¥25,000,000',
    states: [
      'Tokyo (Shibuya / Otemachi)',
      'Osaka / Kansai Hub',
      'Aichi (Nagoya)',
      'Fukuoka Innovation Zone',
      'Kanagawa (Yokohama)',
      'Kyoto',
    ],
  },
];

export function getCountryFlag(countryName: string): string {
  const match = SUPPORTED_COUNTRIES.find(
    (c) => c.name.toLowerCase() === (countryName || '').toLowerCase()
  );
  if (match) return match.flag;
  if ((countryName || '').toLowerCase().includes('india')) return '🇮🇳';
  if ((countryName || '').toLowerCase().includes('united states') || (countryName || '').toLowerCase().includes('usa')) return '🇺🇸';
  if ((countryName || '').toLowerCase().includes('united kingdom') || (countryName || '').toLowerCase().includes('uk')) return '🇬🇧';
  if ((countryName || '').toLowerCase().includes('canada')) return '🇨🇦';
  if ((countryName || '').toLowerCase().includes('australia')) return '🇦🇺';
  if ((countryName || '').toLowerCase().includes('germany')) return '🇩🇪';
  if ((countryName || '').toLowerCase().includes('france')) return '🇫🇷';
  if ((countryName || '').toLowerCase().includes('singapore')) return '🇸🇬';
  if ((countryName || '').toLowerCase().includes('uae') || (countryName || '').toLowerCase().includes('emirates')) return '🇦🇪';
  if ((countryName || '').toLowerCase().includes('japan')) return '🇯🇵';
  return '🌍';
}

export function getCountryInfo(countryName: string): CountryInfo {
  const match = SUPPORTED_COUNTRIES.find(
    (c) => c.name.toLowerCase() === (countryName || '').toLowerCase()
  );
  return match || SUPPORTED_COUNTRIES[0];
}

/**
 * Filter schemes strictly based on user's country
 * - Government schemes: MUST strictly match the user's country
 * - Private schemes: MUST match the user's country OR be Global
 */
export function filterSchemesByCountry(schemes: any[], userCountry: string): any[] {
  const targetCountry = (userCountry || 'India').trim().toLowerCase();
  
  return schemes.filter((scheme) => {
    const schemeCountry = (scheme.country || '').trim().toLowerCase();
    
    if (scheme.type === 'government') {
      // Government schemes must strictly match user's country
      return schemeCountry === targetCountry;
    }
    
    if (scheme.type === 'private') {
      // Private schemes must belong to country or be Global
      return schemeCountry === targetCountry || schemeCountry === 'global';
    }
    
    return schemeCountry === targetCountry;
  });
}
