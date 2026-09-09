import fs from 'fs';

function parseCSVLine(line) {
  const result = [];
  let inQuotes = false;
  let currentVal = '';
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(currentVal.trim());
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  result.push(currentVal.trim());
  return result;
}

function processCSV() {
  const fileContent = fs.readFileSync('sih_entrepreneur_schemes_expanded.csv', 'utf-8');
  const lines = fileContent.split('\n').filter(l => l.trim().length > 0);
  
  // Headers: scheme_name,provider_type,coverage,category,target_beneficiary,sector,support_summary,state_applicability,is_entrepreneur_focused,match_fields,match_percentage,application_url,official_source_url,verification_status,last_verified,record_type,notes
  const headers = parseCSVLine(lines[0]);
  
  const schemes = [];
  
  for (let i = 1; i < lines.length; i++) {
    const vals = parseCSVLine(lines[i]);
    if (vals.length < 5) continue;
    
    const obj = {};
    headers.forEach((h, index) => {
      // Remove any trailing \r or BOM from header names
      const cleanHeader = h.replace(/[\r\n\uFEFF]/g, '');
      obj[cleanHeader] = vals[index] ? vals[index].replace(/^"|"$/g, '').replace(/""/g, '"') : '';
    });
    
    const isGov = (obj.provider_type || '').toLowerCase().includes('government');
    
    let mappedGovLevel = 'Central Government';
    const cov = (obj.coverage || '').toLowerCase();
    if (cov.includes('state')) mappedGovLevel = 'State Government';
    else if (cov.includes('agency')) mappedGovLevel = 'Government Agency';

    // Map sectors to valid SectorType
    const rawSectors = (obj.sector || '').split(';').map(s => s.trim().toLowerCase()).filter(s => s);
    const mappedSectors = [];
    rawSectors.forEach(s => {
      if (s.includes('tech') || s.includes('software') || s.includes('it') || s.includes('ai') || s.includes('cloud') || s.includes('saas') || s.includes('innovation')) mappedSectors.push('software_it');
      else if (s.includes('agri') || s.includes('farm')) mappedSectors.push('agriculture');
      else if (s.includes('health') || s.includes('med')) mappedSectors.push('healthcare');
      else if (s.includes('edu')) mappedSectors.push('education');
      else if (s.includes('manufactur') || s.includes('hardware')) mappedSectors.push('manufacturing');
      else if (s.includes('retail') || s.includes('commerce')) mappedSectors.push('retail');
      else if (s.includes('food')) mappedSectors.push('food');
      else if (s.includes('civil')) mappedSectors.push('civil');
      else if (s.includes('mech')) mappedSectors.push('mechanical');
      else if (s.includes('service')) mappedSectors.push('services');
    });
    if (mappedSectors.length === 0) {
       // if 'multiple' or others
       mappedSectors.push('other');
    }
    // De-duplicate
    const finalSectors = [...new Set(mappedSectors)];
    
    // Map to Scheme format
    const scheme = {
      id: `csv-scheme-${i}`,
      title: obj.scheme_name || 'Unknown Scheme',
      type: isGov ? 'government' : 'private',
      providerName: obj.provider_type || 'Unknown Provider',
      providerType: isGov ? 'Official Government Website' : 'Official Organization Website',
      governmentLevel: mappedGovLevel,
      country: 'India',
      stateRestriction: obj.state_applicability || 'All India',
      description: obj.support_summary || 'No description provided.',
      fullOverview: obj.support_summary || 'No overview provided.',
      matchScore: parseInt(obj.match_percentage) || 85,
      matchReasons: ['matchReasonSector', 'matchReasonLocation'],
      whyRecommended: 'This scheme matches your industry sector and location.',
      amount: 0, // Not provided
      amountFormatted: 'Funding Varies',
      fundingNature: obj.category && obj.category.includes('Credit') ? 'Soft Loan / Credit' : 'Grant / Subsidy',
      deadline: '2026-12-31',
      deadlineRelative: 'Applications Open',
      category: obj.category || 'General',
      schemeCategory: obj.category,
      sectors: finalSectors,
      applicableStates: obj.state_applicability === 'All India' ? [] : [obj.state_applicability],
      targetBeneficiaries: (obj.target_beneficiary || '').split(';').map(s => s.trim()).filter(s => s),
      businessCategory: ['catStartup', 'catSmallBusiness'],
      eligibility: ['Refer to official guidelines for detailed eligibility criteria.'],
      benefits: [obj.support_summary || 'Various support options.'],
      requiredDocs: ['Registration Certificate', 'Identity Proof'],
      documentReadiness: {
        score: 75,
        available: ['Registration Certificate'],
        missing: ['Detailed Project Report']
      },
      importantConditions: ['Must apply on official portal.'],
      officialWebsiteUrl: obj.official_source_url || obj.application_url || 'https://www.myscheme.gov.in',
      officialSourceWebsite: obj.official_source_url || obj.application_url || 'https://www.myscheme.gov.in',
      sourceName: obj.record_type || 'Official Portal',
      sourceType: isGov ? 'Central Government Portal' : 'Corporate Foundation',
      officialWebsiteLabel: 'Apply on Official Website',
      lastUpdatedDate: obj.last_verified || '2026-09-09',
      lastVerifiedDate: obj.last_verified || '2026-09-09',
      status: 'active',
      verificationStatus: obj.verification_status === 'requires_current_program_verification' ? 'needs_verification' : 'verified',
      languageAvailability: ['English', 'Hindi'],
      userDecision: 'none',
      saved: false
    };
    
    schemes.push(scheme);
  }
  
  const fileOutput = `import { Scheme } from './types';

export const csvSchemes: Scheme[] = ${JSON.stringify(schemes, null, 2)};
`;

  fs.writeFileSync('src/csvSchemes.ts', fileOutput);
  console.log(`Successfully generated src/csvSchemes.ts with ${schemes.length} schemes.`);
}

processCSV();
