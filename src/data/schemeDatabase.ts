import { Scheme, SchemeSource, SchemeUpdateRecord, UserProfile } from '../types';
import { csvSchemes } from '../csvSchemes';

export const initialSources: SchemeSource[] = [
  // 🏛️ 1. India Government Sources
  {
    id: 'src-myscheme',
    name: 'myScheme.gov.in',
    url: 'https://www.myscheme.gov.in/',
    country: 'India',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T04:30:00Z',
    verificationStatus: 'verified',
    schemesCount: 42,
    description: 'National single-window government scheme aggregator for Central and State/UT schemes across India.',
  },
  {
    id: 'src-startupindia',
    name: 'Startup India (DPIIT)',
    url: 'https://www.startupindia.gov.in/',
    country: 'India',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T04:15:00Z',
    verificationStatus: 'verified',
    schemesCount: 18,
    description: 'Ministry of Commerce & Industry official portal for Seed Fund (SISFS), tax exemptions, and IPR facilitation.',
  },
  {
    id: 'src-momsme',
    name: 'Ministry of MSME & Champions Portal',
    url: 'https://champions.gov.in/',
    country: 'India',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T03:50:00Z',
    verificationStatus: 'verified',
    schemesCount: 26,
    description: 'Credit-linked subsidies, technology upgradation (PMEGP, MSME Champions, ZED Certification).',
  },
  {
    id: 'src-birac',
    name: 'BIRAC (Dept of Biotechnology, Govt of India)',
    url: 'https://birac.nic.in/',
    country: 'India',
    sourceType: 'Government Agency',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T03:10:00Z',
    verificationStatus: 'verified',
    schemesCount: 12,
    description: 'Public sector enterprise for Biotech, HealthTech, AI diagnostics, and MedTech non-dilutive grants (BIG, SPARSH).',
  },
  {
    id: 'src-dst',
    name: 'Department of Science & Technology (DST NIDHI)',
    url: 'https://dst.gov.in/',
    country: 'India',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-30T22:00:00Z',
    verificationStatus: 'verified',
    schemesCount: 9,
    description: 'National Initiative for Developing and Harnessing Innovations (NIDHI-PRAYAS, NIDHI-EIR).',
  },
  {
    id: 'src-sidbi',
    name: 'SIDBI & Stand-Up Mitra',
    url: 'https://www.standupmitra.in/',
    country: 'India',
    sourceType: 'Financial Institution',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T02:45:00Z',
    verificationStatus: 'verified',
    schemesCount: 14,
    description: 'Stand-Up India composite loans and SME credit guarantees under Ministry of Finance.',
  },
  {
    id: 'src-meity',
    name: 'MeitY Startup Hub (SAMRIDH / TIDE 2.0)',
    url: 'https://meitystartuphub.in/',
    country: 'India',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T01:20:00Z',
    verificationStatus: 'verified',
    schemesCount: 11,
    description: 'Ministry of Electronics & IT acceleration grants for software products, AI, and cybersecurity.',
  },
  {
    id: 'src-karnataka',
    name: 'Startup Karnataka & Elevate 100',
    url: 'https://startup.karnataka.gov.in/',
    country: 'India',
    sourceType: 'State Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T03:30:00Z',
    verificationStatus: 'verified',
    schemesCount: 8,
    description: 'Department of Electronics, IT, BT and S&T, Government of Karnataka innovation grants.',
  },
  {
    id: 'src-maharashtra',
    name: 'Maharashtra State Innovation Society (MSInS)',
    url: 'https://msins.in/',
    country: 'India',
    sourceType: 'State Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-30T19:00:00Z',
    verificationStatus: 'verified',
    schemesCount: 6,
    description: 'Government of Maharashtra seed grants, patent reimbursement, and public procurement access.',
  },

  // 🏛️ 2. United States Government Sources
  {
    id: 'src-grants-gov',
    name: 'Grants.gov (US Federal Government)',
    url: 'https://www.grants.gov/',
    country: 'United States',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T04:20:00Z',
    verificationStatus: 'verified',
    schemesCount: 50,
    description: 'Central portal for all US Federal competitive grants across 26 federal grant-making agencies.',
  },
  {
    id: 'src-sbir-gov',
    name: 'SBIR.gov (America\'s Seed Fund - NSF / NIH / DoD)',
    url: 'https://www.sbir.gov/',
    country: 'United States',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T04:05:00Z',
    verificationStatus: 'verified',
    schemesCount: 22,
    description: 'Non-dilutive R&D federal funding for high-tech commercialization and scientific innovation.',
  },
  {
    id: 'src-sba-gov',
    name: 'U.S. Small Business Administration (SBA.gov)',
    url: 'https://www.sba.gov/',
    country: 'United States',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T03:40:00Z',
    verificationStatus: 'verified',
    schemesCount: 16,
    description: 'Federal SBA 7(a) loan guarantees, microloans, and disaster recovery capital for American businesses.',
  },
  {
    id: 'src-calseed',
    name: 'CalSEED (California Energy Commission)',
    url: 'https://calseed.fund/',
    country: 'United States',
    sourceType: 'State Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-30T21:00:00Z',
    verificationStatus: 'verified',
    schemesCount: 4,
    description: 'State of California clean tech innovation fund providing non-dilutive equity-free grants.',
  },

  // 🏛️ 3. United Kingdom Government Sources
  {
    id: 'src-innovate-uk',
    name: 'Innovate UK (UK Research and Innovation - UKRI)',
    url: 'https://www.ukri.org/councils/innovate-uk/',
    country: 'United Kingdom',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T03:15:00Z',
    verificationStatus: 'verified',
    schemesCount: 18,
    description: 'UK national innovation agency driving productivity and economic growth through R&D Smart Grants.',
  },
  {
    id: 'src-british-business-bank',
    name: 'British Business Bank Start Up Loans',
    url: 'https://www.startuploans.co.uk/',
    country: 'United Kingdom',
    sourceType: 'Financial Institution',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-30T23:00:00Z',
    verificationStatus: 'verified',
    schemesCount: 5,
    description: 'Government-backed personal loans and free business mentoring for UK early-stage entrepreneurs.',
  },

  // 🏛️ 4. Canada Government Sources
  {
    id: 'src-nrc-irap',
    name: 'National Research Council Canada (NRC IRAP)',
    url: 'https://nrc.canada.ca/en/support-technology-innovation',
    country: 'Canada',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T02:50:00Z',
    verificationStatus: 'verified',
    schemesCount: 12,
    description: 'Canada Industrial Research Assistance Program providing non-repayable tech commercialization contributions.',
  },
  {
    id: 'src-sdtc-canada',
    name: 'Sustainable Development Technology Canada (SDTC)',
    url: 'https://www.sdtc.ca/',
    country: 'Canada',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-30T19:30:00Z',
    verificationStatus: 'verified',
    schemesCount: 6,
    description: 'Federal climate tech and clean innovation funding supporting Canadian environmental breakthroughs.',
  },

  // 🏛️ 5. Australia Government Sources
  {
    id: 'src-business-gov-au',
    name: 'Business.gov.au Grants & Programs Finder',
    url: 'https://business.gov.au/grants-and-programs',
    country: 'Australia',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T01:40:00Z',
    verificationStatus: 'verified',
    schemesCount: 14,
    description: 'Australian Commonwealth Government central portal for Industry Growth Program and commercialization grants.',
  },

  // 🏛️ 6. Germany & EU Government Sources
  {
    id: 'src-bmwk-de',
    name: 'Federal Ministry for Economic Affairs and Climate Action (BMWK / EXIST)',
    url: 'https://www.exist.de/',
    country: 'Germany',
    sourceType: 'Central Government Portal',
    type: 'government',
    isActive: true,
    lastSuccessfulSync: '2026-08-30T18:15:00Z',
    verificationStatus: 'verified',
    schemesCount: 8,
    description: 'German federal program supporting university spin-offs and deep tech startups with non-repayable grants.',
  },

  // 🏢 7. Verified Private & Global Sources
  {
    id: 'src-google',
    name: 'Google for Startups Official',
    url: 'https://startup.google.com/',
    country: 'Global',
    sourceType: 'Corporate Foundation',
    type: 'private',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T04:00:00Z',
    verificationStatus: 'verified',
    schemesCount: 8,
    description: 'Global equity-free accelerator, Google Cloud compute grants, and Gemini AI researcher mentorship.',
  },
  {
    id: 'src-microsoft',
    name: 'Microsoft for Startups Founders Hub',
    url: 'https://www.microsoft.com/startups',
    country: 'Global',
    sourceType: 'Corporate Foundation',
    type: 'private',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T03:45:00Z',
    verificationStatus: 'verified',
    schemesCount: 4,
    description: 'Up to $150,000 in Azure compute, GitHub Enterprise, and OpenAI API credits.',
  },
  {
    id: 'src-aws',
    name: 'AWS Activate Founders Program',
    url: 'https://aws.amazon.com/activate/',
    country: 'Global',
    sourceType: 'Corporate Foundation',
    type: 'private',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T02:15:00Z',
    verificationStatus: 'verified',
    schemesCount: 4,
    description: 'Cloud infrastructure credits and technical architecture guidance for bootstrapped startups.',
  },
  {
    id: 'src-ycombinator',
    name: 'Y Combinator Startup Accelerator',
    url: 'https://www.ycombinator.com/apply',
    country: 'United States',
    sourceType: 'Verified Incubator / Accelerator',
    type: 'private',
    isActive: true,
    lastSuccessfulSync: '2026-08-31T01:00:00Z',
    verificationStatus: 'verified',
    schemesCount: 2,
    description: '$500,000 standard SAFE investment and worldwide founder network for early-stage companies.',
  },
  {
    id: 'src-tata',
    name: 'Tata Social Enterprise Challenge',
    url: 'https://tatasechal.org/',
    country: 'India',
    sourceType: 'Corporate Foundation',
    type: 'private',
    isActive: true,
    lastSuccessfulSync: '2026-08-30T21:10:00Z',
    verificationStatus: 'verified',
    schemesCount: 2,
    description: 'Tata Sons and IIM Calcutta joint initiative for early-stage social impact innovations in India.',
  },
  {
    id: 'src-hdfc',
    name: 'HDFC Bank SmartUp Grants',
    url: 'https://www.hdfcbank.com/personal/resources/learning-centre/sme/smartup-grants',
    country: 'India',
    sourceType: 'Financial Institution',
    type: 'private',
    isActive: true,
    lastSuccessfulSync: '2026-08-30T20:30:00Z',
    verificationStatus: 'verified',
    schemesCount: 3,
    description: 'CSR social innovation grants for Indian startups working in EdTech, HealthTech, and Agritech.',
  },
];

export const initialCentralSchemes: Scheme[] = [
  ...csvSchemes,
  // =================================================================
  // 🇮🇳 INDIA — GOVERNMENT SCHEMES
  // =================================================================
  {
    id: 'scheme-startup-india-seed-fund',
    title: 'Startup India Seed Fund Scheme (SISFS)',
    type: 'government',
    providerName: 'Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry',
    providerType: 'Official Government Website',
    governmentLevel: 'Central Government',
    country: 'India',
    stateRestriction: 'All India',
    description: 'Financial assistance to early-stage DPIIT-recognized startups for proof of concept, prototype development, product trials, market entry, and commercialization.',
    fullOverview: 'The Startup India Seed Fund Scheme (SISFS) was launched to support DPIIT-recognized startups with up to ₹20 Lakhs for validation of proof of concept and prototype development, and up to ₹50 Lakhs for market entry and scaling via convertible debentures/debt.',
    matchScore: 96,
    matchReasons: [
      'DPIIT recognized entity in tech & AI sector (+30% match)',
      'Incorporated within 2-year eligibility window (+25% match)',
      'Seed capital requirement aligns with up to ₹50L cap (+20% match)',
      'Aadhaar, PAN, and Bank KYC documents verified in vault (+21% match)',
    ],
    whyRecommended: 'Top recommendation for Indian seed-stage innovative ventures with DPIIT registration seeking non-dilutive POC grants.',
    amount: 5000000,
    amountFormatted: 'Up to ₹50 Lakhs',
    fundingNature: 'Grant / Subsidy',
    deadline: '2026-12-31',
    deadlineRelative: 'Applications Open Round-the-Year',
    category: 'AI & Technology',
    targetBeneficiaries: ['DPIIT Recognized Startups', 'Early-Stage Tech Founders', 'MSME Innovators'],
    businessCategory: ['catStartup', 'catSmallBusiness'],
    eligibility: [
      'Recognized by DPIIT as an active startup with DPIIT certificate',
      'Incorporated not more than 2 years ago at time of application',
      'Must have a business idea with commercial potential, tech focus, or social impact',
      'Should not have received more than ₹10 Lakhs of monetary support under any other Central/State Govt scheme',
      'Indian promoter shareholding must be at least 51% in the startup entity',
    ],
    ageRequirements: 'Promoters 18+ years',
    incomeRequirements: 'Annual turnover less than ₹100 Crore',
    locationRequirements: 'Any State / Union Territory of India',
    benefits: [
      'Up to ₹20 Lakhs as grant for validation of Proof of Concept, prototype development, or trials',
      'Up to ₹50 Lakhs of investment for market entry, commercialization, or scaling through convertible debentures or debt',
      'Mentorship and incubator workspace at empanelled central and state incubators',
    ],
    otherBenefits: [
      'Exemption from prior turnover and experience in government procurement tenders',
      'Access to Startup India Hub mentoring network and investor matchmaking',
    ],
    requiredDocs: [
      'DPIIT Startup Recognition Certificate',
      'Certificate of Incorporation (CIN / ROC)',
      'Pitch Deck & Business Plan with 3-year financial projections',
      'Bank Account Statement (Past 6 Months)',
      'Promoter Aadhaar & PAN Card (KYC)',
    ],
    documentReadiness: {
      score: 80,
      available: ['Promoter Aadhaar & PAN', 'DPIIT Startup Certificate', 'Certificate of Incorporation'],
      missing: ['12-Month Audited Cashflow Projection'],
    },
    applicationProcess: '1. Log in to official seedfund.startupindia.gov.in portal. 2. Select up to 3 empanelled incubators. 3. Submit online project proposal. 4. Attend Incubator Seed Management Committee (ISMC) evaluation.',
    importantConditions: [
      'Must apply exclusively via official DPIIT portal',
      'Funds are disbursed in tranches linked to verifiable milestone completion',
    ],
    officialWebsiteUrl: 'https://seedfund.startupindia.gov.in/',
    officialSourceWebsite: 'https://www.startupindia.gov.in/',
    sourceName: 'Startup India (DPIIT)',
    sourceType: 'Central Government Portal',
    officialWebsiteLabel: 'Apply on Official Government Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English', 'Hindi'],
    userDecision: 'none',
    saved: true,
  },
  {
    id: 'scheme-birac-big-india',
    title: 'Biotechnology Ignition Grant (BIRAC BIG)',
    type: 'government',
    providerName: 'Biotechnology Industry Research Assistance Council (BIRAC), Department of Biotechnology, Govt of India',
    providerType: 'Official Government Website',
    governmentLevel: 'Central Government',
    country: 'India',
    stateRestriction: 'All India',
    description: 'Flagship non-dilutive grant-in-aid of up to ₹50 Lakhs for biotechnology, AI diagnostics, healthcare analytics, and MedTech pioneers to establish proof of concept.',
    fullOverview: 'BIRAC BIG Call 26 provides non-dilutive grants of up to ₹50 Lakhs for 18 months to researchers, clinicians, and biotech/health AI startups across India.',
    matchScore: 94,
    matchReasons: [
      'AI healthcare analytics domain directly matches BIRAC biotechnology mandate (+30% match)',
      'Grant is 100% non-dilutive with no equity dilution (+25% match)',
      'Promoter holds research qualification and Indian citizenship (+20% match)',
      'KYC and project outline verified in MatchWise Vault (+19% match)',
    ],
    whyRecommended: 'Ideal for healthcare, AI diagnostics, biomedical hardware, and life sciences innovators.',
    amount: 5000000,
    amountFormatted: 'Up to ₹50 Lakhs',
    fundingNature: 'Non-Dilutive Seed',
    deadline: '2026-09-15',
    deadlineRelative: 'Closing in 2 Weeks (Call 26)',
    category: 'AI & Technology',
    targetBeneficiaries: ['Biotech Startups', 'AI Health Diagnostics Innovators', 'Individual Researchers & Clinicians'],
    businessCategory: ['catStartup', 'catResearcher', 'catSmallBusiness'],
    eligibility: [
      'Registered Indian Biotech/HealthTech startup incorporated under 5 years, OR Indian individual innovator',
      'Startups must have minimum 51% Indian shareholding by resident citizens',
      'The project must possess novel scientific invention or clear IP potential',
    ],
    ageRequirements: 'Promoters 21+ years',
    incomeRequirements: 'Turnover under ₹25 Crore',
    locationRequirements: 'All India',
    benefits: [
      'Grant-in-aid up to ₹50 Lakhs for 18-month POC development (100% non-dilutive)',
      'Access to BIG Partner incubators (C-CAMP, IKP, FITT IIT Delhi, Venture Center Pune)',
      'Hands-on regulatory guidance and clinical trial advisory',
    ],
    otherBenefits: ['Pre-incubation lab vouchers', 'Fast-track patent filing assistance'],
    requiredDocs: [
      'Detailed Technical Project Proposal & Gantt Milestone Chart',
      'Proof of Indian Citizenship (Aadhaar / Passport)',
      'Company Incorporation Certificate / Partnership Deed',
      'Freedom to Operate (FTO) Search Report or Provisional Patent Application',
    ],
    documentReadiness: {
      score: 75,
      available: ['Promoter Aadhaar & Passport', 'Company Certificate of Incorporation'],
      missing: ['Freedom to Operate (FTO) IP Search Report'],
    },
    applicationProcess: '1. Register on birac.nic.in. 2. Submit Call 26 online proposal. 3. Technical Expert Committee review. 4. Final presentation before BIRAC panel.',
    importantConditions: [
      'All submissions must take place through the official BIRAC online portal',
      'Promoter must commit at least 50% time to the project',
    ],
    officialWebsiteUrl: 'https://birac.nic.in/big.php',
    officialSourceWebsite: 'https://birac.nic.in/',
    sourceName: 'BIRAC Portal',
    sourceType: 'Government Agency',
    officialWebsiteLabel: 'Apply on Official Government Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English', 'Hindi'],
    userDecision: 'none',
    saved: false,
  },
  {
    id: 'scheme-pmegp-india',
    title: 'Prime Minister\'s Employment Generation Programme (PMEGP)',
    type: 'government',
    providerName: 'Khadi and Village Industries Commission (KVIC), Ministry of MSME, Govt of India',
    providerType: 'Official Government Website',
    governmentLevel: 'Central Government',
    country: 'India',
    stateRestriction: 'All India',
    description: 'Credit-linked capital subsidy scheme providing up to ₹50 Lakhs for manufacturing projects and ₹20 Lakhs for service/tech units with 15% to 35% government subsidy.',
    fullOverview: 'PMEGP is administered by KVIC to stimulate self-employment across urban and rural India. Beneficiaries receive bank loans with upfront government margin money subsidy.',
    matchScore: 89,
    matchReasons: [
      'Udyam micro-enterprise registration verified (+25% match)',
      'Eligible for 25% - 35% non-repayable government subsidy (+25% match)',
      'Promoter education and identity documents complete (+20% match)',
      'Bank branch selection available across India (+19% match)',
    ],
    whyRecommended: 'High-subsidy credit scheme for Indian micro enterprises expanding facilities or service capacity.',
    amount: 2000000,
    amountFormatted: 'Up to ₹20 Lakhs (Service) / ₹50 Lakhs (Mfg)',
    fundingNature: 'Grant / Subsidy',
    deadline: '2026-12-31',
    deadlineRelative: 'Round-the-Year Portal Open',
    category: 'Small Business',
    targetBeneficiaries: ['Micro Enterprises', 'First-Generation Entrepreneurs', 'Women & SC/ST Promoters'],
    businessCategory: ['catSmallBusiness', 'catStartup', 'catIndividual'],
    eligibility: [
      'Any individual aged 18+ with minimum 8th standard pass for projects above ₹10L in manufacturing or ₹5L in service',
      'Self Help Groups (SHGs) and registered proprietary/partnership entities',
      'Existing units that have not availed other central subsidy',
    ],
    ageRequirements: '18+ years',
    incomeRequirements: 'No income ceiling',
    locationRequirements: 'All India (Urban & Rural)',
    benefits: [
      '15% to 35% upfront capital subsidy (Margin Money) from Central Government',
      'Bank term loan and working capital with subsidized interest',
      'Mandatory EDP entrepreneurship training funded by Ministry of MSME',
    ],
    requiredDocs: [
      'Aadhaar Card & PAN Card',
      'Detailed Project Report (DPR)',
      'Educational Qualification Certificate (8th Pass or higher)',
      'Category Certificate (if claiming special category subsidy)',
      'Rural Area Certificate from local authority (if applicable)',
    ],
    documentReadiness: {
      score: 85,
      available: ['Promoter Aadhaar & PAN Card', 'Educational Certificate'],
      missing: ['Bank-Formatted Detailed Project Report (DPR)'],
    },
    applicationProcess: '1. Apply online at kviconline.gov.in/pmegpeportal. 2. Application routed to District Level Taskforce Committee. 3. Bank sanctions loan. 4. KVIC releases subsidy to escrow.',
    importantConditions: [
      'Must apply through official KVIC e-portal',
      'Promoter contribution is 5% for special categories and 10% for general categories',
    ],
    officialWebsiteUrl: 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
    officialSourceWebsite: 'https://msme.gov.in/',
    sourceName: 'KVIC & Ministry of MSME',
    sourceType: 'Central Government Portal',
    officialWebsiteLabel: 'Apply on Official Government Website',
    lastUpdatedDate: '2026-08-30',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English', 'Hindi', 'Regional Languages'],
    userDecision: 'none',
    saved: false,
  },
  {
    id: 'scheme-karnataka-elevate',
    title: 'State Innovation & Idea2PoC Grant (Elevate 100 Karnataka)',
    type: 'government',
    providerName: 'Department of Electronics, IT, BT and S&T, Government of Karnataka',
    providerType: 'Official Government Website',
    governmentLevel: 'State Government',
    country: 'India',
    stateRestriction: 'Karnataka',
    description: 'Government of Karnataka flagship equity-free innovation grant of up to ₹50 Lakhs for startups registered and operating in Karnataka.',
    fullOverview: 'Elevate 100 provides financial grants, incubation support, subsidized cloud credits, and government market access to early-stage startups in Bengaluru and across Karnataka.',
    matchScore: 95,
    matchReasons: [
      'Registered office situated in Bengaluru, Karnataka (+30% match)',
      'Deep tech & AI focus meets state priority sector (+25% match)',
      'Entity incorporated under 10 years (+20% match)',
      'Startup Karnataka registration active (+20% match)',
    ],
    whyRecommended: 'High-value state government grant for Karnataka-based technology innovators.',
    amount: 5000000,
    amountFormatted: 'Up to ₹50 Lakhs (Equity-Free)',
    fundingNature: 'Grant / Subsidy',
    deadline: '2026-10-31',
    deadlineRelative: 'Applications Open for 2026 Cohort',
    category: 'AI & Technology',
    targetBeneficiaries: ['Karnataka Registered Startups', 'Women Tech Founders', 'Tier-2/3 City Innovators'],
    businessCategory: ['catStartup'],
    eligibility: [
      'Registered with Startup Karnataka Cell with active registration ID',
      'Entity registered in Karnataka with minimum 50% workforce in Karnataka',
      'Less than 10 years from date of incorporation',
      'Annual turnover not exceeding ₹100 Crore in any preceding year',
    ],
    ageRequirements: '18+ years',
    locationRequirements: 'Registered and operating in Karnataka, India',
    benefits: [
      'Non-dilutive grant-in-aid up to ₹50 Lakhs disbursed milestone-wise',
      'Subsidized incubation space at K-tech Innovation Hubs',
      'Access to Karnataka state public procurement challenge funds',
    ],
    requiredDocs: [
      'Startup Karnataka Registration Certificate',
      'Certificate of Incorporation (Karnataka registered office)',
      'Audited Financial Statements / CA Turnover Certificate',
      'Detailed Pitch Deck & Milestone Gantt Chart',
    ],
    documentReadiness: {
      score: 85,
      available: ['Certificate of Incorporation', 'Startup Karnataka Registration'],
      missing: ['CA Turnover Certificate'],
    },
    applicationProcess: '1. Apply at startup.karnataka.gov.in. 2. Online shortlisting by sector experts. 3. Jury pitch session in Bengaluru. 4. Award notification and MoU signing.',
    importantConditions: [
      'Applications accepted exclusively on official Startup Karnataka portal',
      'Must maintain headquarters in Karnataka during grant utilization period',
    ],
    officialWebsiteUrl: 'https://startup.karnataka.gov.in/',
    officialSourceWebsite: 'https://startup.karnataka.gov.in/',
    sourceName: 'Startup Karnataka Official',
    sourceType: 'State Government Portal',
    officialWebsiteLabel: 'Apply on Official Government Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English', 'Kannada'],
    userDecision: 'none',
    saved: false,
  },

  // =================================================================
  // 🇮🇳 INDIA — PRIVATE SCHEMES
  // =================================================================
  {
    id: 'scheme-google-startups-india',
    title: 'Google for Startups Accelerator: India & AI First',
    type: 'private',
    providerName: 'Google for Startups India & Google Cloud',
    providerType: 'Official Organization Website',
    country: 'India',
    stateRestriction: 'All India',
    description: '3-month equity-free acceleration program for Indian AI, deep tech, and healthcare startups, providing up to $350,000 in Google Cloud and Gemini API credits.',
    fullOverview: 'Google for Startups Accelerator: India brings the best of Google\'s programs, products, people, and technology to seed-to-Series A tech startups based in India.',
    matchScore: 95,
    matchReasons: [
      'Multilingual AI and health technology fit Google AI-First criteria (+30% match)',
      'Substantial compute credits for high-throughput LLM training (+25% match)',
      'Indian incorporated entity with early revenue (+20% match)',
      'Architecture & Pitch Deck ready (+20% match)',
    ],
    whyRecommended: 'Premier private tech acceleration and compute grant for Indian generative AI startups.',
    amount: 29000000,
    amountFormatted: 'Up to $350,000 (Cloud & Gemini Credits)',
    fundingNature: 'Corporate Support',
    deadline: '2026-09-30',
    deadlineRelative: 'Cohort 9 Applications Open',
    category: 'AI & Technology',
    targetBeneficiaries: ['AI-First Startups', 'Healthcare & Enterprise Tech Founders'],
    businessCategory: ['catStartup'],
    eligibility: [
      'Early-stage technology startup based in India with working prototype or live product',
      'Leveraging AI, Machine Learning, or DeepTech in core product architecture',
      'Founding team of at least 2 full-time members with technical leadership',
    ],
    benefits: [
      'Up to $350,000 in Google Cloud and Gemini API compute credits over 2 years',
      '1-on-1 technical and product mentorship from Google AI researchers',
      'Access to Google global investor showcase and global alumni network',
    ],
    requiredDocs: [
      'Company Overview & Pitch Deck (PDF)',
      'Product Architecture & Tech Stack Summary',
      'Founder Profiles & LinkedIn Handles',
      'Demo Video Link (Loom / YouTube Unlisted)',
    ],
    documentReadiness: {
      score: 90,
      available: ['Pitch Deck', 'Product Architecture', 'Founder Profiles'],
      missing: ['Product Demo Video'],
    },
    applicationProcess: '1. Apply on startup.google.com/programs/accelerator/india/. 2. Technical screening. 3. Video interview with Google leads. 4. Cohort induction.',
    importantConditions: [
      'Equity-free program; Google does not take company shares for accelerator participation',
      'Must apply directly on Google official portal',
    ],
    officialWebsiteUrl: 'https://startup.google.com/programs/accelerator/india/',
    officialSourceWebsite: 'https://startup.google.com/',
    sourceName: 'Google for Startups Official',
    sourceType: 'Corporate Foundation',
    officialWebsiteLabel: 'Apply on Official Organization Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English'],
    userDecision: 'none',
    saved: true,
  },
  {
    id: 'scheme-tata-social-enterprise',
    title: 'Tata Social Enterprise Challenge & Venture Grant',
    type: 'private',
    providerName: 'Tata Sons & IIM Calcutta Innovation Park',
    providerType: 'Official Organization Website',
    country: 'India',
    stateRestriction: 'All India',
    description: 'Joint initiative of the Tata Group and IIM Calcutta to find and support India\'s most promising social enterprises solving healthcare, agriculture, and digital inclusion challenges.',
    fullOverview: 'The Tata Social Enterprise Challenge offers cash grants up to ₹10 Lakhs, mentorship from Tata leadership, and direct seed investment facilitation up to ₹1 Crore.',
    matchScore: 93,
    matchReasons: [
      'Strong societal impact targeting tier-2/3 Indian healthcare (+30% match)',
      'Cash prize is 100% grant funding with zero dilution (+25% match)',
      'Incubation support via IIM Calcutta Innovation Park (+20% match)',
      'Founder profile and enterprise details verified (+18% match)',
    ],
    whyRecommended: 'Top CSR and social impact challenge for Indian startups solving foundational health & inclusion needs.',
    amount: 1000000,
    amountFormatted: 'Up to ₹10 Lakhs Grant + ₹1 Cr Seed Access',
    fundingNature: 'Innovation Prize',
    deadline: '2026-10-15',
    deadlineRelative: 'Submissions Open for 2026 Edition',
    category: 'Community',
    targetBeneficiaries: ['Social Impact Startups', 'Healthcare & Education Innovators'],
    businessCategory: ['catStartup', 'catNonProfit', 'catSmallBusiness'],
    eligibility: [
      'Early-stage for-profit or non-profit entity registered in India',
      'Demonstrated measurable social impact in healthcare, education, or agriculture',
      'Scalable technology-driven delivery model',
    ],
    benefits: [
      'Cash grant awards up to ₹10 Lakhs for top 3 winners',
      'Incubation at IIM Calcutta Innovation Park',
      'Mentorship from senior Tata leaders and industry executives',
    ],
    requiredDocs: [
      'Executive Summary & Social Impact Metric Report',
      'Pitch Presentation Deck',
      'Certificate of Incorporation / Registration Proof',
    ],
    documentReadiness: {
      score: 80,
      available: ['Pitch Presentation Deck', 'Certificate of Incorporation'],
      missing: ['Quantified Social Impact Metric Report'],
    },
    applicationProcess: '1. Register at tatasechal.org. 2. Submit impact business proposal. 3. Regional round presentations. 4. Grand finale pitch at IIM Calcutta.',
    importantConditions: [
      'Apply exclusively via tatasechal.org',
      'Finalists must present in person at the grand finale event',
    ],
    officialWebsiteUrl: 'https://tatasechal.org/',
    officialSourceWebsite: 'https://tatasechal.org/',
    sourceName: 'Tata Group & IIM Calcutta',
    sourceType: 'Corporate Foundation',
    officialWebsiteLabel: 'Apply on Official Organization Website',
    lastUpdatedDate: '2026-08-30',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English', 'Hindi'],
    userDecision: 'none',
    saved: false,
  },

  // =================================================================
  // 🇺🇸 UNITED STATES — GOVERNMENT SCHEMES
  // =================================================================
  {
    id: 'scheme-us-sbir-phase1',
    title: 'America\'s Seed Fund (NSF / NIH / DoD SBIR Phase I)',
    type: 'government',
    providerName: 'National Science Foundation (NSF) & National Institutes of Health (NIH), US Federal Government',
    providerType: 'Official Government Website',
    governmentLevel: 'Central Government',
    country: 'United States',
    stateRestriction: 'All US',
    description: 'Highly prestigious non-dilutive US Federal R&D grant providing up to $275,000 (Phase I) and $1,000,000+ (Phase II) for cutting-edge scientific innovation and technology commercialization.',
    fullOverview: 'Small Business Innovation Research (SBIR) is a highly competitive US Federal program that enables small businesses to explore their technological potential and provides the incentive to profit from commercialization.',
    matchScore: 97,
    matchReasons: [
      'US small business entity in AI, computing, or biomedical diagnostics (+30% match)',
      '100% non-dilutive federal capital with zero equity surrender (+25% match)',
      'SAM.gov and SBIR registry ready (+22% match)',
      'Commercial potential and research methodology verified (+20% match)',
    ],
    whyRecommended: 'The gold-standard US Federal government non-dilutive research grant for technology ventures.',
    amount: 275000,
    amountFormatted: 'Up to $275,000 (Phase I) / $1,000,000+ (Phase II)',
    fundingNature: 'Non-Dilutive Seed',
    deadline: '2026-11-04',
    deadlineRelative: 'Window Closes in Nov 2026',
    category: 'AI & Technology',
    targetBeneficiaries: ['US Small Tech Businesses', 'Scientific Founders', 'DeepTech Researchers'],
    businessCategory: ['catStartup', 'catSmallBusiness', 'catResearcher'],
    eligibility: [
      'For-profit business located in the United States with principal place of business in the US',
      'More than 50% owned and controlled by US citizens or permanent residents',
      'Fewer than 500 employees including all affiliates',
      'Principal Investigator (PI) must spend primary employment (>50%) with the small business',
    ],
    ageRequirements: '18+ years',
    incomeRequirements: 'Small Business (<500 employees)',
    locationRequirements: 'United States',
    benefits: [
      'Up to $275,000 non-dilutive grant for 6 to 12-month Phase I feasibility research',
      'Fast-track eligibility for Phase II funding up to $1,000,000 to $2,000,000',
      'Retention of 100% data rights and intellectual property',
    ],
    otherBenefits: ['Commercialization assistance (TABA funds up to $6,500)', 'Federal procurement preference'],
    requiredDocs: [
      'SAM.gov Unique Entity Identifier (UEI) and Active CAGE Code',
      'SBIR.gov Company Registration Profile',
      'Project Description, Specific Aims & Research Plan (15 pages max)',
      'Biographical Sketches of Principal Investigator and Key Personnel',
      'Detailed Budget & Justification (Form SF-424 R&R)',
    ],
    documentReadiness: {
      score: 80,
      available: ['SBIR.gov Registration', 'Founder Bio Sketches', 'Draft Research Aims'],
      missing: ['SAM.gov Active UEI Registration'],
    },
    applicationProcess: '1. Register at SAM.gov and Grants.gov. 2. Submit Project Pitch to NSF/NIH. 3. Receive official invitation to submit full proposal. 4. Complete peer-review evaluation.',
    importantConditions: [
      'Applications must be submitted via official Grants.gov / Research.gov portals',
      'Funding cannot be used for foreign work or sales/marketing activities',
    ],
    officialWebsiteUrl: 'https://www.sbir.gov/',
    officialSourceWebsite: 'https://www.grants.gov/',
    sourceName: 'SBIR.gov & Grants.gov',
    sourceType: 'Central Government Portal',
    officialWebsiteLabel: 'Apply on Official Government Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English'],
    userDecision: 'none',
    saved: true,
  },
  {
    id: 'scheme-us-sba-7a',
    title: 'SBA 7(a) Small Business Loan Guarantee & Working Capital',
    type: 'government',
    providerName: 'U.S. Small Business Administration (SBA)',
    providerType: 'Official Government Website',
    governmentLevel: 'Central Government',
    country: 'United States',
    stateRestriction: 'All US',
    description: 'US Federal Government loan guarantee program providing up to $5,000,000 for small business expansion, equipment purchase, working capital, and refinancing.',
    fullOverview: 'The 7(a) Loan Program is the SBA\'s primary program for providing financial assistance to small businesses across all 50 US states with favorable interest rates and federal backing up to 85%.',
    matchScore: 92,
    matchReasons: [
      'US registered business entity with operating history (+25% match)',
      'Low interest rates backed by federal government guarantee (+25% match)',
      'Flexible use for tech infrastructure, payroll, and scaling (+22% match)',
      'Credit readiness profile aligned (+20% match)',
    ],
    whyRecommended: 'Premier federal loan guarantee program for American small businesses seeking low-cost expansion debt.',
    amount: 5000000,
    amountFormatted: 'Up to $5,000,000 (Guaranteed)',
    fundingNature: 'Soft Loan / Credit',
    deadline: '2026-12-31',
    deadlineRelative: 'Applications Accepted Year-Round',
    category: 'Small Business',
    targetBeneficiaries: ['Small Businesses', 'Growing Enterprises', 'Minority/Women Founders'],
    businessCategory: ['catSmallBusiness', 'catStartup'],
    eligibility: [
      'Operate for profit in the United States or its territories',
      'Be defined as a small business under SBA size standards',
      'Demonstrate reasonable invested equity and genuine need for credit',
      'No delinquent debts owed to the US Federal Government',
    ],
    benefits: [
      'Up to $5,000,000 loan amount with up to 85% federal government guarantee',
      'Long repayment terms (up to 10 years for working capital, 25 years for real estate)',
      'Capped interest rates pegged to the prime rate',
    ],
    requiredDocs: [
      'SBA Form 1919 (Borrower Information Form)',
      'Personal Financial Statements (SBA Form 413) for all 20%+ owners',
      '3 Years of Business and Personal Federal Tax Returns',
      'Year-to-Date Balance Sheet and Profit & Loss Statement',
      'Detailed Business Plan with 12-Month Financial Projections',
    ],
    documentReadiness: {
      score: 75,
      available: ['Business Plan', 'Founder ID Proof'],
      missing: ['3 Years Tax Returns / Year-to-Date P&L'],
    },
    applicationProcess: '1. Use SBA Lender Match tool at sba.gov/lendermatch. 2. Match with participating SBA-approved lenders. 3. Submit application package. 4. Receive loan disbursement.',
    importantConditions: [
      'Must apply through SBA-approved lending partner institutions',
      'Personal guarantee required for all owners holding 20% or greater equity',
    ],
    officialWebsiteUrl: 'https://www.sba.gov/funding-programs/loans/7a-loans',
    officialSourceWebsite: 'https://www.sba.gov/',
    sourceName: 'U.S. Small Business Administration',
    sourceType: 'Central Government Portal',
    officialWebsiteLabel: 'Apply on Official Government Website',
    lastUpdatedDate: '2026-08-30',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English', 'Spanish'],
    userDecision: 'none',
    saved: false,
  },
  {
    id: 'scheme-us-calseed',
    title: 'California Clean Energy Seed Grant (CalSEED Concept)',
    type: 'government',
    providerName: 'California Energy Commission (CEC) & New Energy Nexus',
    providerType: 'Official Government Website',
    governmentLevel: 'State Government',
    country: 'United States',
    stateRestriction: 'California',
    description: 'State of California equity-free grant of $150,000 (Concept Award) plus $450,000 follow-on Prototype funding for early-stage clean tech, climate, and energy innovations.',
    fullOverview: 'CalSEED provides non-dilutive capital to early-stage clean energy entrepreneurs in California to build prototypes, test innovations, and support clean energy justice.',
    matchScore: 94,
    matchReasons: [
      'California business presence or operational testbed (+30% match)',
      '100% equity-free state government funding (+25% match)',
      'Innovative hardware/software energy efficiency focus (+20% match)',
      'Founder readiness and project proposal verified (+19% match)',
    ],
    whyRecommended: 'Top state government non-dilutive grant for California-based climate tech and clean innovation startups.',
    amount: 150000,
    amountFormatted: '$150,000 (Concept) + $450,000 (Prototype)',
    fundingNature: 'Grant / Subsidy',
    deadline: '2026-10-30',
    deadlineRelative: 'Cohort 9 Applications Open',
    category: 'CleanTech',
    targetBeneficiaries: ['California CleanTech Startups', 'Climate Innovators', 'Diverse Founders'],
    businessCategory: ['catStartup', 'catSmallBusiness', 'catResearcher'],
    eligibility: [
      'Must have registered entity or significant operations in the State of California',
      'Innovation must benefit California electric rate-payers (clean energy, battery storage, AI grid management)',
      'Early technology readiness level (TRL 2-4)',
    ],
    benefits: [
      '$150,000 non-dilutive grant for initial concept validation',
      'Exclusive eligibility for CalSEED Prototype Awards ($450,000 additional grant)',
      'Access to California clean energy investor network and testing facilities',
    ],
    requiredDocs: [
      'Detailed Technology Concept & California Impact Narrative',
      'California Secretary of State Entity Certificate',
      'Milestone Budget Breakdown & Gantt Schedule',
    ],
    documentReadiness: {
      score: 85,
      available: ['Entity Certificate', 'Milestone Budget Breakdown'],
      missing: ['California Energy Impact Narrative'],
    },
    applicationProcess: '1. Apply online at calseed.fund. 2. Technical expert review. 3. Finalist selection and live pitch. 4. Award agreement execution.',
    importantConditions: [
      'Must apply via official calseed.fund portal',
      'Grant proceeds must be expended in California on eligible project milestones',
    ],
    officialWebsiteUrl: 'https://calseed.fund/',
    officialSourceWebsite: 'https://www.energy.ca.gov/',
    sourceName: 'California Energy Commission',
    sourceType: 'State Government Portal',
    officialWebsiteLabel: 'Apply on Official Government Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English'],
    userDecision: 'none',
    saved: false,
  },

  // =================================================================
  // 🇺🇸 UNITED STATES — PRIVATE SCHEMES
  // =================================================================
  {
    id: 'scheme-us-ycombinator',
    title: 'Y Combinator Accelerator & Seed SAFE Investment',
    type: 'private',
    providerName: 'Y Combinator',
    providerType: 'Official Organization Website',
    country: 'United States',
    stateRestriction: 'All US',
    description: 'The world\'s most renowned startup accelerator providing $500,000 in standard seed funding, intensive 3-month mentorship in San Francisco, and global investor demo day.',
    fullOverview: 'Y Combinator invests $500,000 on standard SAFE terms ($125k for 7% plus $375k uncapped MFN) and hosts batches in San Francisco, providing direct access to top venture capital.',
    matchScore: 96,
    matchReasons: [
      'High-growth technology and AI scalability align with YC thesis (+30% match)',
      '$500k standard funding with top-tier tier-1 VC demo day (+25% match)',
      'Early revenue or high technical conviction (+21% match)',
      'Founder profile and vision ready (+20% match)',
    ],
    whyRecommended: 'The premier global seed accelerator program for US-incorporated high-growth technology startups.',
    amount: 500000,
    amountFormatted: '$500,000 (Standard SAFE Investment)',
    fundingNature: 'Corporate Support',
    deadline: '2026-10-10',
    deadlineRelative: 'Winter Batch Submissions Open',
    category: 'AI & Technology',
    targetBeneficiaries: ['Tech Founders', 'Software & AI Innovators', 'Early-Stage Teams'],
    businessCategory: ['catStartup'],
    eligibility: [
      'Early-stage founding team with working code, prototype, or early traction',
      'Delaware C-Corp or ability to form one upon acceptance',
      'Founders must participate in person in San Francisco during batch',
    ],
    benefits: [
      '$500,000 total investment ($125,000 for 7% + $375,000 on uncapped MFN SAFE)',
      'Weekly 1-on-1 office hours with YC partners and industry luminaries',
      'Exclusive YC Bookface network of 10,000+ alumni founders and Demo Day access',
    ],
    requiredDocs: [
      'YC Online Application Form',
      '1-Minute Founder Introduction Video (Unlisted YouTube)',
      'Live Product Demo Link or Testflight URL',
    ],
    documentReadiness: {
      score: 90,
      available: ['Founder Profiles', 'Product Architecture'],
      missing: ['1-Minute Founder Introduction Video'],
    },
    applicationProcess: '1. Submit written application at ycombinator.com/apply. 2. Receive 10-minute partner interview invite. 3. Same-day decision notification.',
    importantConditions: [
      'Apply exclusively through ycombinator.com/apply',
      'All co-founders must be present for the interview',
    ],
    officialWebsiteUrl: 'https://www.ycombinator.com/apply',
    officialSourceWebsite: 'https://www.ycombinator.com/',
    sourceName: 'Y Combinator',
    sourceType: 'Verified Incubator / Accelerator',
    officialWebsiteLabel: 'Apply on Official Organization Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English'],
    userDecision: 'none',
    saved: true,
  },

  // =================================================================
  // 🇬🇧 UNITED KINGDOM — GOVERNMENT SCHEMES
  // =================================================================
  {
    id: 'scheme-uk-innovate-smart',
    title: 'Innovate UK Smart Grants (UK Research and Innovation)',
    type: 'government',
    providerName: 'Innovate UK (UKRI), Department for Science, Innovation and Technology',
    providerType: 'Official Government Website',
    governmentLevel: 'Central Government',
    country: 'United Kingdom',
    stateRestriction: 'All UK',
    description: 'UK Government flagship competitive R&D grant providing up to £500,000 (for 6-18 month projects) and £2,000,000 (for 19-36 month projects) for disruptive innovations.',
    fullOverview: 'Innovate UK Smart Grants invest in game-changing and commercially viable R&D innovations that can make a significant economic impact on the UK economy.',
    matchScore: 95,
    matchReasons: [
      'UK registered company with technology focus (+30% match)',
      'Up to 70% non-repayable grant contribution for micro/small businesses (+25% match)',
      'R&D plan meets UKRI commercial impact criteria (+20% match)',
      'Companies House registration verified (+20% match)',
    ],
    whyRecommended: 'Top UK Government R&D grant for disruptive technology innovations with high commercial potential.',
    amount: 500000,
    amountFormatted: 'Up to £500,000 – £2,000,000 Grant',
    fundingNature: 'Grant / Subsidy',
    deadline: '2026-10-21',
    deadlineRelative: 'Autumn Competition Round Open',
    category: 'AI & Technology',
    targetBeneficiaries: ['UK R&D Startups', 'SME Innovators', 'Academic-Industry Consortia'],
    businessCategory: ['catStartup', 'catSmallBusiness', 'catResearcher'],
    eligibility: [
      'Be a UK registered business of any size (SMEs receive up to 70% funding rate)',
      'Project work must be carried out within the United Kingdom',
      'Must exploit the results from or in the United Kingdom',
    ],
    benefits: [
      'Up to 70% non-repayable grant contribution for eligible small business R&D expenditure',
      'Dedicated Innovation and Growth Specialist assigned from Innovate UK EDGE',
    ],
    requiredDocs: [
      'Innovation Funding Service (IFS) Online Application',
      'Detailed Work Package & Project Plan Gantt Chart',
      'Risk Register & Mitigation Strategy',
      'Full Project Finance Spreadsheet with Justification of Costs',
    ],
    documentReadiness: {
      score: 80,
      available: ['Companies House Certificate', 'Project Plan'],
      missing: ['IFS Finance Spreadsheet Justification'],
    },
    applicationProcess: '1. Register on Innovation Funding Service (apply-for-innovation-funding.service.gov.uk). 2. Complete 10 application questions. 3. Independent assessors review. 4. Grant offer letter.',
    importantConditions: [
      'Must submit through official UK Government Innovation Funding Service',
      'Applicants must show proof of match-funding for the remaining project balance',
    ],
    officialWebsiteUrl: 'https://www.ukri.org/councils/innovate-uk/',
    officialSourceWebsite: 'https://www.gov.uk/government/organisations/innovate-uk',
    sourceName: 'Innovate UK (UKRI)',
    sourceType: 'Central Government Portal',
    officialWebsiteLabel: 'Apply on Official Government Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English'],
    userDecision: 'none',
    saved: true,
  },
  {
    id: 'scheme-uk-startup-loans',
    title: 'British Business Bank Government-Backed Start Up Loan',
    type: 'government',
    providerName: 'British Business Bank, UK Department for Business and Trade',
    providerType: 'Official Government Website',
    governmentLevel: 'Central Government',
    country: 'United Kingdom',
    stateRestriction: 'All UK',
    description: 'UK Government-backed personal loan of up to £25,000 per co-founder (up to £100,000 per business) with a fixed 6% p.a. interest rate and 12 months free mentoring.',
    fullOverview: 'The Start Up Loans scheme is a UK government initiative designed to help early-stage entrepreneurs start or grow their business with affordable capital and support.',
    matchScore: 92,
    matchReasons: [
      'UK resident entrepreneur and business entity (+25% match)',
      'Fixed low-interest rate with no early repayment penalties (+25% match)',
      'Includes 12 months free 1-on-1 business mentoring (+22% match)',
      'Business plan ready in vault (+20% match)',
    ],
    whyRecommended: 'Accessible government-backed financing for UK founders launching or scaling within their first 3 years.',
    amount: 25000,
    amountFormatted: 'Up to £25,000 per founder (up to £100k)',
    fundingNature: 'Soft Loan / Credit',
    deadline: '2026-12-31',
    deadlineRelative: 'Applications Open Year-Round',
    category: 'Small Business',
    targetBeneficiaries: ['UK Early-Stage Founders', 'Small Business Owners'],
    businessCategory: ['catStartup', 'catSmallBusiness', 'catIndividual'],
    eligibility: [
      'UK resident aged 18 or older with right to work in the UK',
      'Trading for less than 36 months (3 years) at time of application',
      'Pass standard credit check and afford loan repayments',
    ],
    benefits: [
      'Unsecured personal loan up to £25,000 per founder at fixed 6% annual interest',
      'Repayment term between 1 to 5 years with zero early repayment fees',
      '12 months of complimentary 1-on-1 mentoring and commercial partner discounts',
    ],
    requiredDocs: [
      'Proof of Identity (UK Passport or Driving Licence)',
      'Proof of Address (Utility bill or bank statement past 3 months)',
      'Business Plan & 12-Month Cashflow Forecast',
      'Personal Budget Sheet',
    ],
    documentReadiness: {
      score: 85,
      available: ['Founder ID Proof', 'Business Plan'],
      missing: ['12-Month Cashflow Forecast'],
    },
    applicationProcess: '1. Register at startuploans.co.uk. 2. Assigned a dedicated Business Support Partner. 3. Submit business plan and cash flow. 4. Loan approved and disbursed.',
    importantConditions: [
      'Apply exclusively through startuploans.co.uk',
      'This is an unsecured personal loan for business purposes',
    ],
    officialWebsiteUrl: 'https://www.startuploans.co.uk/',
    officialSourceWebsite: 'https://www.british-business-bank.co.uk/',
    sourceName: 'British Business Bank',
    sourceType: 'Financial Institution',
    officialWebsiteLabel: 'Apply on Official Government Website',
    lastUpdatedDate: '2026-08-30',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English'],
    userDecision: 'none',
    saved: false,
  },

  // =================================================================
  // 🇨🇦 CANADA — GOVERNMENT SCHEMES
  // =================================================================
  {
    id: 'scheme-canada-nrc-irap',
    title: 'NRC IRAP Technology Innovation & R&D Grant',
    type: 'government',
    providerName: 'National Research Council Canada (NRC IRAP), Government of Canada',
    providerType: 'Official Government Website',
    governmentLevel: 'Central Government',
    country: 'Canada',
    stateRestriction: 'All Canada',
    description: 'Canada\'s premier innovation assistance program providing non-repayable contributions up to CA$500,000 to CA$1,000,000+ to cover eligible salary and technical contractor costs.',
    fullOverview: 'NRC IRAP helps Canadian small and medium-sized businesses increase their innovation capacity and take ideas to market through financial assistance and technical advisory services.',
    matchScore: 96,
    matchReasons: [
      'Incorporated Canadian business with technology R&D focus (+30% match)',
      'Non-repayable financial contributions for internal salaries (+25% match)',
      'Industrial Technology Advisor (ITA) support included (+21% match)',
      'Canadian incorporation verified (+20% match)',
    ],
    whyRecommended: 'The leading Canadian federal government non-repayable R&D contribution program.',
    amount: 500000,
    amountFormatted: 'Up to CA$500,000 – CA$1,000,000+',
    fundingNature: 'Grant / Subsidy',
    deadline: '2026-12-31',
    deadlineRelative: 'Applications Evaluated Continuously',
    category: 'AI & Technology',
    targetBeneficiaries: ['Canadian Tech Startups', 'Innovative SMEs', 'CleanTech & AI Pioneers'],
    businessCategory: ['catStartup', 'catSmallBusiness'],
    eligibility: [
      'Incorporated, for-profit small or medium-sized business in Canada',
      'Have 500 or fewer full-time equivalent employees',
      'Aim to grow and generate profit through technology-driven new or improved products',
    ],
    benefits: [
      'Non-repayable funding covering up to 60%-80% of internal technical salaries and contractor fees',
      'Dedicated Industrial Technology Advisor (ITA) providing expert technical and business guidance',
    ],
    requiredDocs: [
      'Certificate of Canadian Incorporation (Federal or Provincial)',
      'Company Financial Statements (Past 2 Years) or Pro-Forma Cashflow',
      'R&D Project Description, Objectives & Milestone Budget',
    ],
    documentReadiness: {
      score: 80,
      available: ['Incorporation Certificate', 'Project Description'],
      missing: ['Pro-Forma Cashflow Model'],
    },
    applicationProcess: '1. Call NRC IRAP toll-free or register online. 2. Meet with assigned local ITA. 3. Prepare project proposal. 4. Formal contribution agreement signed.',
    importantConditions: [
      'Connect directly through nrc.canada.ca official portal',
      'Contributions are paid as reimbursement for incurred and claimed salary expenses',
    ],
    officialWebsiteUrl: 'https://nrc.canada.ca/en/support-technology-innovation/financial-support-technology-innovation-through-nrc-irap',
    officialSourceWebsite: 'https://nrc.canada.ca/',
    sourceName: 'National Research Council Canada',
    sourceType: 'Central Government Portal',
    officialWebsiteLabel: 'Apply on Official Government Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English', 'French'],
    userDecision: 'none',
    saved: true,
  },

  // =================================================================
  // 🇦🇺 AUSTRALIA — GOVERNMENT SCHEMES
  // =================================================================
  {
    id: 'scheme-australia-growth-program',
    title: 'Industry Growth Program (Commercialisation & Growth Grants)',
    type: 'government',
    providerName: 'Department of Industry, Science and Resources, Australian Government',
    providerType: 'Official Government Website',
    governmentLevel: 'Central Government',
    country: 'Australia',
    stateRestriction: 'All Australia',
    description: 'Australian Commonwealth Government matched grants of AU$50,000 to AU$250,000 (Early-Stage Commercialisation) and AU$100,000 to AU$5,000,000 (Commercialisation and Growth).',
    fullOverview: 'The Industry Growth Program supports innovative Australian startups and SMEs in priority areas of the National Reconstruction Fund to commercialize novel intellectual property.',
    matchScore: 94,
    matchReasons: [
      'Australian registered company with active ACN and ABN (+30% match)',
      'Priority alignment with digital, AI, and advanced manufacturing (+25% match)',
      'Matched grant model with commercial advisory (+20% match)',
      'Business documents verified (+19% match)',
    ],
    whyRecommended: 'Top Australian Federal Government commercialisation grant for scalable innovation ventures.',
    amount: 250000,
    amountFormatted: 'AU$50,000 – AU$5,000,000 Matched Grant',
    fundingNature: 'Grant / Subsidy',
    deadline: '2026-11-30',
    deadlineRelative: 'Applications Open Continuous Cycle',
    category: 'AI & Technology',
    targetBeneficiaries: ['Australian Startups', 'Scaleups & SMEs', 'National Reconstruction Priority Ventures'],
    businessCategory: ['catStartup', 'catSmallBusiness'],
    eligibility: [
      'Non-tax exempt company incorporated under the Corporations Act 2001 (Australia)',
      'Combined annual turnover less than AU$20 million for each of the 3 preceding financial years',
      'Have novel intellectual property with commercial potential in priority sectors',
    ],
    benefits: [
      'Matched grant funding up to 50% of eligible project expenditure',
      'Specialist commercialisation advisory services from industry advisers',
    ],
    requiredDocs: [
      'Australian Company Number (ACN) and Business Number (ABN)',
      'Audited Financial Statements or Accountant-Certified Turnover',
      'Detailed Project Commercialisation Plan and Budget Breakdown',
    ],
    documentReadiness: {
      score: 85,
      available: ['ABN & ACN Registration', 'Project Plan'],
      missing: ['Accountant-Certified Turnover Proof'],
    },
    applicationProcess: '1. Apply for advisory services at business.gov.au/igp. 2. Receive Advisory Report. 3. Submit matched grant application. 4. Merit assessment committee review.',
    importantConditions: [
      'Must apply exclusively via official business.gov.au portal',
      'Must co-fund at least 50% of total eligible project costs',
    ],
    officialWebsiteUrl: 'https://business.gov.au/grants-and-programs/industry-growth-program',
    officialSourceWebsite: 'https://business.gov.au/',
    sourceName: 'Business.gov.au',
    sourceType: 'Central Government Portal',
    officialWebsiteLabel: 'Apply on Official Government Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English'],
    userDecision: 'none',
    saved: true,
  },

  // =================================================================
  // 🇩🇪 GERMANY — GOVERNMENT SCHEMES
  // =================================================================
  {
    id: 'scheme-germany-exist-seed',
    title: 'EXIST Business Start-up Grant (EXIST-Gründungsstipendium)',
    type: 'government',
    providerName: 'Federal Ministry for Economic Affairs and Climate Action (BMWK), Germany',
    providerType: 'Official Government Website',
    governmentLevel: 'Central Government',
    country: 'Germany',
    stateRestriction: 'All Germany',
    description: 'German federal grant supporting scientists, university graduates, and students preparing technology and knowledge-based startups with up to €150,000 non-repayable stipend funding.',
    fullOverview: 'EXIST supports university and research spin-offs in Germany by financing living stipends up to €3,000/month per founder plus €30,000 for equipment and €5,000 for coaching.',
    matchScore: 95,
    matchReasons: [
      'Technology or deep tech innovation linked to German academic/research base (+30% match)',
      '100% non-repayable grant including personal living stipends (+25% match)',
      'University incubator hosting provided (+20% match)',
      'Team qualifications aligned (+20% match)',
    ],
    whyRecommended: 'The gold-standard German Federal grant for university spin-offs and deep tech founders.',
    amount: 150000,
    amountFormatted: 'Up to €150,000 Non-Repayable Grant',
    fundingNature: 'Grant / Subsidy',
    deadline: '2026-12-31',
    deadlineRelative: 'Applications Accepted Year-Round',
    category: 'AI & Technology',
    targetBeneficiaries: ['German DeepTech Founders', 'University Spin-Offs', 'Researchers & Graduates'],
    businessCategory: ['catStartup', 'catResearcher'],
    eligibility: [
      'Founding team of up to 3 persons (graduates, scientists, or students)',
      'Innovative technology-oriented or knowledge-based product idea',
      'Application submitted through a German university or non-university research institute',
    ],
    benefits: [
      'Monthly living stipends up to €3,000/month per founder for 12 months',
      'Up to €30,000 for material and equipment expenditures (lab access, compute, patents)',
      'Up to €5,000 for startup coaching and mentoring',
    ],
    requiredDocs: [
      'Detailed Business Plan & Technology Feasibility Roadmap',
      'Endorsement Letter from German University or Research Institute Incubator',
      'Academic Degrees & CVs of Founding Team Members',
    ],
    documentReadiness: {
      score: 80,
      available: ['Team CVs', 'Technology Feasibility Roadmap'],
      missing: ['University Incubator Endorsement Letter'],
    },
    applicationProcess: '1. Contact university startup transfer center. 2. Prepare 25-page EXIST proposal. 3. University submits to Project Management Jülich (PtJ). 4. Grant approval.',
    importantConditions: [
      'Must be submitted via authorized German university transfer office',
      'Startup must not be formally incorporated before application submission',
    ],
    officialWebsiteUrl: 'https://www.exist.de/EXIST/Navigation/EN/Funding-Programs/EXIST-Business-Startup-Grant/exist-business-startup-grant.html',
    officialSourceWebsite: 'https://www.exist.de/',
    sourceName: 'BMWK & PtJ Germany',
    sourceType: 'Central Government Portal',
    officialWebsiteLabel: 'Apply on Official Government Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['German', 'English'],
    userDecision: 'none',
    saved: true,
  },

  // =================================================================
  // 🌍 GLOBAL / MULTI-COUNTRY — VERIFIED PRIVATE SCHEMES
  // =================================================================
  {
    id: 'scheme-aws-activate-global',
    title: 'AWS Activate Founders & Portfolio Tier (Global)',
    type: 'private',
    providerName: 'Amazon Web Services (AWS)',
    providerType: 'Official Organization Website',
    country: 'Global',
    stateRestriction: 'Available in All Supported Countries',
    description: 'Up to $100,000 in AWS Cloud promotional credits, technical architecture reviews, and AWS business support for technology startups worldwide.',
    fullOverview: 'AWS Activate provides eligible startups with free AWS promotional credits, business support, and resources to build and scale cloud and AI infrastructure.',
    matchScore: 94,
    matchReasons: [
      'Global availability across India, US, UK, Canada, Australia, and EU (+30% match)',
      'Substantial cloud infrastructure credits for production hosting (+25% match)',
      'Self-serve online application with fast 7-day turnaround (+20% match)',
      'Entity documentation ready (+19% match)',
    ],
    whyRecommended: 'Essential global cloud infrastructure grant for technology and AI product builders.',
    amount: 100000,
    amountFormatted: 'Up to $100,000 in AWS Cloud Credits',
    fundingNature: 'Corporate Support',
    deadline: '2026-12-31',
    deadlineRelative: 'Rolling Year-Round Applications',
    category: 'AI & Technology',
    targetBeneficiaries: ['Tech Startups', 'AI Engineers', 'SaaS Founders Globally'],
    businessCategory: ['catStartup'],
    eligibility: [
      'Self-funded or venture-backed tech startup incorporated under 10 years',
      'Active company website and public domain email address',
      'Have not previously received lifetime maximum AWS Activate credits',
    ],
    benefits: [
      'Up to $100,000 in AWS Cloud credits valid for 1-2 years',
      'Up to $10,000 in AWS Business Support with 24/7 cloud engineer access',
      'Pre-built infrastructure templates and architectural review guidance',
    ],
    requiredDocs: [
      'Active AWS Account ID (Root/Admin)',
      'Company Website & LinkedIn URL',
      'Incubator / VC Partner Organization ID (if applying for Portfolio tier)',
    ],
    documentReadiness: {
      score: 95,
      available: ['Company Website', 'Founder Profile', 'AWS Account ID'],
      missing: [],
    },
    applicationProcess: '1. Sign in to AWS Console. 2. Navigate to aws.amazon.com/activate. 3. Submit company details. 4. Credits applied within 7-10 business days.',
    importantConditions: [
      'Apply exclusively through aws.amazon.com/activate',
      'Credits expire 12 to 24 months from issuance date',
    ],
    officialWebsiteUrl: 'https://aws.amazon.com/activate/',
    officialSourceWebsite: 'https://aws.amazon.com/',
    sourceName: 'Amazon Web Services',
    sourceType: 'Corporate Foundation',
    officialWebsiteLabel: 'Apply on Official Organization Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English', 'Spanish', 'Japanese', 'German', 'French'],
    userDecision: 'none',
    saved: false,
  },
  {
    id: 'scheme-microsoft-founders-hub-global',
    title: 'Microsoft for Startups Founders Hub (Global)',
    type: 'private',
    providerName: 'Microsoft Corporation & OpenAI',
    providerType: 'Official Organization Website',
    country: 'Global',
    stateRestriction: 'Available in All Supported Countries',
    description: 'Open to all founders with no funding required, providing up to $150,000 in Azure Cloud credits, $2,500 in OpenAI API credits, GitHub Enterprise, and Microsoft 365.',
    fullOverview: 'Microsoft for Startups Founders Hub meets founders where they are, offering free Azure credits that scale as the product grows, plus access to top AI models like GPT-4o and Claude.',
    matchScore: 95,
    matchReasons: [
      'Global availability with zero investor verification needed (+30% match)',
      'Access to Azure OpenAI and foundational LLM endpoints (+25% match)',
      'Free developer tools including GitHub Enterprise & VS Code (+20% match)',
      'Verified startup profile (+20% match)',
    ],
    whyRecommended: 'Most founder-friendly global cloud and AI grant with no institutional funding required.',
    amount: 150000,
    amountFormatted: 'Up to $150,000 Azure + $2,500 OpenAI Credits',
    fundingNature: 'Corporate Support',
    deadline: '2026-12-31',
    deadlineRelative: 'Immediate Rolling Access',
    category: 'AI & Technology',
    targetBeneficiaries: ['Early-Stage Founders', 'AI Builders', 'Bootstrapped Startups Globally'],
    businessCategory: ['catStartup', 'catIndividual'],
    eligibility: [
      'Building a software-based product or service',
      'Privately held, for-profit business entity',
      'Not yet raised Series C or above venture capital',
    ],
    benefits: [
      'Up to $150,000 in Azure compute credits unlocked in milestones',
      '$2,500 in direct OpenAI API credits for production AI integrations',
      'Free GitHub Enterprise and Microsoft 365 Business licenses',
    ],
    requiredDocs: [
      'LinkedIn Profile and Company Website or Demo Link',
      'Description of Core Software Architecture',
    ],
    documentReadiness: {
      score: 100,
      available: ['LinkedIn Profile', 'Company Website', 'Software Architecture'],
      missing: [],
    },
    applicationProcess: '1. Apply at microsoft.com/startups with LinkedIn account. 2. Instant review in 3-5 days. 3. Access Azure portal immediately upon approval.',
    importantConditions: [
      'Apply exclusively via microsoft.com/startups',
      'Tier advancement requires demonstrating product usage milestones',
    ],
    officialWebsiteUrl: 'https://www.microsoft.com/startups',
    officialSourceWebsite: 'https://www.microsoft.com/',
    sourceName: 'Microsoft Corporation',
    sourceType: 'Corporate Foundation',
    officialWebsiteLabel: 'Apply on Official Organization Website',
    lastUpdatedDate: '2026-08-31',
    lastVerifiedDate: '2026-08-31',
    status: 'active',
    verificationStatus: 'verified',
    languageAvailability: ['English', 'German', 'French', 'Spanish', 'Japanese', 'Hindi'],
    userDecision: 'none',
    saved: false,
  },
];

export const initialUpdateHistory: SchemeUpdateRecord[] = [
  {
    id: 'upd-1',
    schemeId: 'scheme-startup-india-seed-fund',
    schemeTitle: 'Startup India Seed Fund Scheme (SISFS)',
    changeType: 'updated',
    fieldChanged: 'Eligibility & Incubator Empanelled List',
    previousValue: '95 Empanelled Incubator Partners',
    newValue: '112 Empanelled Incubator Partners with expanded tier-2 coverage',
    updateDate: '2026-08-31T04:15:00Z',
    sourceName: 'Startup India (DPIIT)',
    sourceUrl: 'https://seedfund.startupindia.gov.in/',
    changeDescription: 'Verified updated incubator partner roster on official Startup India portal. Refreshed application guidelines.',
  },
  {
    id: 'upd-2',
    schemeId: 'scheme-us-sbir-phase1',
    schemeTitle: 'America\'s Seed Fund (NSF / NIH / DoD SBIR Phase I)',
    changeType: 'updated',
    fieldChanged: 'Submission Window & Guidelines',
    previousValue: 'Previous submission cycle',
    newValue: 'Autumn 2026 Solicitation Window Active',
    updateDate: '2026-08-31T04:05:00Z',
    sourceName: 'SBIR.gov & Grants.gov',
    sourceUrl: 'https://www.sbir.gov/',
    changeDescription: 'Verified updated solicitation guidelines for high-performance computing, AI diagnostics, and non-dilutive phase I grants.',
  },
  {
    id: 'upd-3',
    schemeId: 'scheme-birac-big-india',
    schemeTitle: 'Biotechnology Ignition Grant (BIRAC BIG)',
    changeType: 'updated',
    fieldChanged: 'Deadline & Call Number',
    previousValue: 'Call 25 Closed',
    newValue: 'Call 26 Active (Deadline: 15 Sept 2026)',
    updateDate: '2026-08-31T03:10:00Z',
    sourceName: 'BIRAC Portal',
    sourceUrl: 'https://birac.nic.in/big.php',
    changeDescription: 'Automated sync ingested Call 26 notification from birac.nic.in with updated guidelines for AI health diagnostics.',
  },
  {
    id: 'upd-4',
    schemeId: 'scheme-uk-innovate-smart',
    schemeTitle: 'Innovate UK Smart Grants',
    changeType: 'updated',
    fieldChanged: 'Competition Round',
    previousValue: 'Summer 2026 Round',
    newValue: 'Autumn 2026 Competition Round Open',
    updateDate: '2026-08-31T03:15:00Z',
    sourceName: 'Innovate UK (UKRI)',
    sourceUrl: 'https://www.ukri.org/councils/innovate-uk/',
    changeDescription: 'Updated IFS application questions and match-funding threshold guidelines for UK SMEs.',
  },
  {
    id: 'upd-5',
    schemeId: 'scheme-google-startups-india',
    schemeTitle: 'Google for Startups India AI Accelerator & Cloud Grant',
    changeType: 'updated',
    fieldChanged: 'Benefits & Compute Credits',
    previousValue: 'Up to $200,000 Cloud Credits',
    newValue: 'Up to $350,000 (Expanded Gemini 1.5 Pro & Flash API access)',
    updateDate: '2026-08-31T04:00:00Z',
    sourceName: 'Google for Startups Official',
    sourceUrl: 'https://startup.google.com/programs/accelerator/india/',
    changeDescription: 'Corporate benefits upgraded to include high-volume Gemini tokens and TPU compute grants.',
  },
];

// Deduplication Helper Function
export function checkSchemeDuplicate(
  candidate: Partial<Scheme>,
  existingSchemes: Scheme[]
): { isDuplicate: boolean; matchedScheme?: Scheme; matchField?: string } {
  const normCandidateName = (candidate.title || '').trim().toLowerCase();
  const normCandidateUrl = (candidate.officialWebsiteUrl || '').trim().toLowerCase();
  const normCandidateOrg = (candidate.providerName || '').trim().toLowerCase();
  const candidateId = candidate.id;

  for (const existing of existingSchemes) {
    if (candidateId && existing.id === candidateId) {
      return { isDuplicate: true, matchedScheme: existing, matchField: 'Scheme ID' };
    }

    const normExistUrl = existing.officialWebsiteUrl.trim().toLowerCase();
    if (normCandidateUrl && normExistUrl && (normCandidateUrl === normExistUrl || normExistUrl.includes(normCandidateUrl) || normCandidateUrl.includes(normExistUrl))) {
      return { isDuplicate: true, matchedScheme: existing, matchField: 'Official URL' };
    }

    const normExistName = existing.title.trim().toLowerCase();
    const normExistOrg = existing.providerName.trim().toLowerCase();

    // High name similarity check
    if (normCandidateName && normExistName) {
      if (normCandidateName === normExistName) {
        return { isDuplicate: true, matchedScheme: existing, matchField: 'Scheme Name' };
      }
      if (
        normCandidateName.length > 8 &&
        normExistName.length > 8 &&
        (normCandidateName.includes(normExistName) || normExistName.includes(normCandidateName)) &&
        normCandidateOrg === normExistOrg
      ) {
        return { isDuplicate: true, matchedScheme: existing, matchField: 'Scheme Name & Organization' };
      }
    }
  }

  return { isDuplicate: false };
}

// Rigorous MatchWise AI Score Calculation prioritizing user's Country
export function calculateMatchWiseScore(
  scheme: Scheme,
  profile: UserProfile
): { score: number; reasons: string[]; caveats: string[] } {
  let score = 50; // baseline
  const reasons: string[] = [];
  const caveats: string[] = [];

  if (scheme.status === 'expired') {
    return {
      score: 0,
      reasons: ['Scheme has expired and is archived.'],
      caveats: ['Not accepting applications.'],
    };
  }

  // 1. Country & State Location Matching (PRIMARY FILTER)
  const userCountry = (profile.country || 'India').trim().toLowerCase();
  const schemeCountry = (scheme.country || '').trim().toLowerCase();
  const userState = (profile.stateRegion || '').trim().toLowerCase();

  const isExactCountryMatch = schemeCountry === userCountry;
  const isGlobalScheme = schemeCountry === 'global';

  if (isExactCountryMatch || isGlobalScheme) {
    score += 20;
    if (isGlobalScheme) {
      reasons.push(`Global availability across all registered ventures in ${profile.country || 'India'} (+20% match)`);
    } else {
      reasons.push(`Primary country match: Verified official scheme for ${profile.country || 'India'} (+20% match)`);
    }

    // State restriction evaluation
    const stateRestr = (scheme.stateRestriction || '').toLowerCase();
    if (
      !stateRestr ||
      stateRestr.includes('all') ||
      stateRestr.includes('available in all')
    ) {
      score += 10;
      reasons.push(`National availability across all provinces/states in ${profile.country} (+10% match)`);
    } else if (userState && (stateRestr.includes(userState) || userState.includes(stateRestr))) {
      score += 15;
      reasons.push(`Exact state/region match for registered ${profile.stateRegion} headquarters (+25% match)`);
    } else {
      score -= 5;
      caveats.push(`State-specific scheme for ${scheme.stateRestriction}; confirm eligibility for ${profile.stateRegion}.`);
    }
  } else {
    // Cross-country mismatch penalty: Schemes from other countries drop severely
    score -= 45;
    caveats.push(`Geographic mismatch: Scheme belongs to ${scheme.country}, while your venture profile is registered in ${profile.country}.`);
  }

  // 2. Business Category Matching
  const userCat = profile.userCategory || 'catStartup';
  if (scheme.businessCategory && scheme.businessCategory.length > 0) {
    if (scheme.businessCategory.includes(userCat)) {
      score += 15;
      reasons.push(`Business classification matched: ${userCat.replace('cat', '')} (+15% match)`);
    } else {
      caveats.push(`Targeted primarily for ${scheme.targetBeneficiaries?.join(', ') || 'specific entity types'}`);
    }
  }

  // 3. Industry & Sector Alignment
  const userIndustry = (profile.industry || '').toLowerCase();
  const schemeCategory = (scheme.category || '').toLowerCase();
  const schemeDesc = (scheme.description + ' ' + (scheme.fullOverview || '')).toLowerCase();

  if (
    schemeCategory.includes(userIndustry) ||
    userIndustry.includes(schemeCategory) ||
    schemeDesc.includes(userIndustry) ||
    (userIndustry.includes('ai') && (schemeDesc.includes('artificial intelligence') || schemeDesc.includes('ai') || schemeDesc.includes('software'))) ||
    (userIndustry.includes('tech') && schemeDesc.includes('technology')) ||
    (userIndustry.includes('health') && (schemeDesc.includes('health') || schemeDesc.includes('biotech') || schemeDesc.includes('diagnostics')))
  ) {
    score += 15;
    reasons.push(`High domain alignment in ${profile.industry || 'Technology'} (+15% match)`);
  }

  // 4. Document Readiness Matching
  const docScore = scheme.documentReadiness?.score || 75;
  if (docScore >= 80) {
    score += 10;
    reasons.push(`Strong document readiness: ${docScore}% verified (+10% match)`);
  } else {
    caveats.push(`Document readiness at ${docScore}%. Upload missing documents to maximize match.`);
  }

  // Cap score between 25 and 99
  const finalScore = Math.min(99, Math.max(25, score));

  return {
    score: finalScore,
    reasons,
    caveats,
  };
}
