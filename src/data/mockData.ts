import { Scheme, ReadinessTask, UpcomingDeadline, DocumentRecord, UserProfile, InvestorInfo, SchemeSource, SchemeUpdateRecord } from '../types';
import { initialCentralSchemes, initialSources, initialUpdateHistory } from './schemeDatabase';

export { initialSources, initialUpdateHistory };

export const INDIAN_STATES: Record<string, string[]> = {
  'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
  'Arunachal Pradesh': ['Itanagar', 'Tawang', 'West Kameng', 'East Kameng', 'Papum Pare', 'Lower Subansiri', 'Upper Subansiri'],
  'Assam': ['Guwahati', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Silchar', 'Tezpur', 'Tinsukia', 'Kamrup', 'Darrang'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Arrah', 'Begusarai', 'Nalanda'],
  'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Korba', 'Rajnandgaon', 'Jagdalpur', 'Raigarh'],
  'Goa': ['North Goa', 'South Goa'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Kutch'],
  'Haryana': ['Gurgaon', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Hisar', 'Rohtak', 'Sonipat'],
  'Himachal Pradesh': ['Shimla', 'Mandi', 'Kangra', 'Kullu', 'Solan', 'Una', 'Hamirpur'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Deoghar', 'Giridih'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli-Dharwad', 'Mangaluru', 'Belgaum', 'Gulbarga', 'Davangere', 'Bellary', 'Shimoga'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha', 'Kannur', 'Malappuram'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Dewas', 'Satna'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Amravati', 'Nanded'],
  'Manipur': ['Imphal East', 'Imphal West', 'Bishnupur', 'Thoubal', 'Churachandpur'],
  'Meghalaya': ['East Khasi Hills', 'West Khasi Hills', 'Ri-Bhoi', 'West Jaintia Hills', 'East Jaintia Hills'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Mon'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Berhampur', 'Rourkela', 'Sambalpur', 'Puri', 'Balasore'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Pathankot'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Bharatpur'],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Mahabubnagar', 'Rangareddy'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailasahar'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Ghaziabad', 'Noida', 'Bareilly', 'Aligarh'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Haldwani', 'Roorkee', 'Rishikesh'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Malda', 'Jalpaiguri'],
  'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'],
  'Jammu & Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur'],
  'Ladakh': ['Leh', 'Kargil'],
  'Chandigarh': ['Chandigarh'],
  'Puducherry': ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
};

export const EDUCATION_LEVELS = [
  { key: 'no_formal', icon: 'school', labelKey: 'eduNoFormal' },
  { key: 'school', icon: 'menu_book', labelKey: 'eduSchool' },
  { key: 'intermediate', icon: 'auto_stories', labelKey: 'eduIntermediate' },
  { key: 'diploma', icon: 'workspace_premium', labelKey: 'eduDiploma' },
  { key: 'undergraduate', icon: 'school', labelKey: 'eduUndergraduate' },
  { key: 'postgraduate', icon: 'psychology', labelKey: 'eduPostgraduate' },
  { key: 'phd', icon: 'biotech', labelKey: 'eduPhd' },
  { key: 'other', icon: 'more_horiz', labelKey: 'eduOther' },
] as const;

export const SECTORS = [
  { key: 'agriculture', icon: 'agriculture', labelKey: 'sectorAgriculture' },
  { key: 'civil', icon: 'engineering', labelKey: 'sectorCivil' },
  { key: 'mechanical', icon: 'precision_manufacturing', labelKey: 'sectorMechanical' },
  { key: 'software_it', icon: 'code', labelKey: 'sectorSoftwareIt' },
  { key: 'manufacturing', icon: 'factory', labelKey: 'sectorManufacturing' },
  { key: 'healthcare', icon: 'health_and_safety', labelKey: 'sectorHealthcare' },
  { key: 'education', icon: 'school', labelKey: 'sectorEducation' },
  { key: 'retail', icon: 'storefront', labelKey: 'sectorRetail' },
  { key: 'food', icon: 'restaurant', labelKey: 'sectorFood' },
  { key: 'handicrafts', icon: 'brush', labelKey: 'sectorHandicrafts' },
  { key: 'services', icon: 'support_agent', labelKey: 'sectorServices' },
  { key: 'other', icon: 'more_horiz', labelKey: 'sectorOther' },
] as const;

export const ORG_TYPES = [
  { key: 'individual', icon: 'person', labelKey: 'orgIndividual' },
  { key: 'planning_startup', icon: 'lightbulb', labelKey: 'orgPlanningStartup' },
  { key: 'existing_startup', icon: 'rocket_launch', labelKey: 'orgExistingStartup' },
  { key: 'existing_business', icon: 'business', labelKey: 'orgExistingBusiness' },
  { key: 'planning_ngo', icon: 'volunteer_activism', labelKey: 'orgPlanningNgo' },
  { key: 'existing_ngo', icon: 'diversity_3', labelKey: 'orgExistingNgo' },
  { key: 'other', icon: 'more_horiz', labelKey: 'orgOther' },
] as const;

export const SCHEME_CATEGORIES_GOV = [
  'Central Government Schemes', 'State Government Schemes', 'Agriculture Schemes',
  'Startup Schemes', 'MSME Schemes', 'Education Schemes', 'Entrepreneurship Schemes',
  'NGO Schemes', 'Business Loans', 'Subsidies', 'Grants', 'Other Government Programs',
];

export const SCHEME_CATEGORIES_PRIVATE = [
  'Private Loans', 'Startup Funding', 'Private Grants', 'Business Funding',
  'NGO Funding', 'CSR Programs', 'Other Private Support',
];

export const initialUserProfile: UserProfile = {
  id: 'usr_aditya_verma',
  email: 'aditya.verma@indusaitech.in',
  password: '123456',
  phoneNumber: '+91 98765 43210',
  phoneCountryCode: '+91',
  phoneDigits: '9876543210',
  name: 'Aditya Verma',
  title: 'Founder & CEO',
  companyName: 'Indus AI Innovations Pvt Ltd',
  country: 'India',
  stateRegion: 'Karnataka',
  district: 'Bengaluru',
  age: 28,
  education: 'postgraduate',
  sector: 'software_it',
  orgType: 'existing_startup',
  annualIncome: '₹12,00,000',
  annualTurnover: '₹28,00,000',
  existingLoans: false,
  userCategory: 'catStartup',
  tagline: 'Accessible multilingual AI diagnostics & enterprise automation for Indian MSMEs and healthcare',
  industry: 'Enterprise AI & Healthcare Analytics',
  stage: 'Early Revenue (Seed Stage)',
  foundedYear: 2024,
  teamSize: '5 full-time engineers, 2 domain advisors',
  annualRevenue: '₹28,00,000 ARR',
  location: 'Bengaluru, Karnataka, India',
  certifications: ['DPIIT Recognized Startup', 'MSME / Udyam Registered', 'ISO 27001 Certified'],
  targetFunding: '₹50,00,000 (Non-dilutive grants & seed capital)',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: 'Aditya is a machine learning researcher building multilingual generative AI models.',
  aiFocusArea: 'Indic NLP, Clinical Decision Support',
  businessIdNumber: 'DIPP123456 / UDYAM-KR-03-0012345',
  dunsNumber: '65-948-3829',
  preferredLanguage: 'en',
};

export const sampleUsers: UserProfile[] = [
  initialUserProfile,
  {
    id: 'usr_priya_sharma',
    email: 'priya@sharmatextiles.in',
    password: '123456',
    phoneNumber: '+91 94221 87654',
    phoneCountryCode: '+91',
    phoneDigits: '9422187654',
    name: 'Priya Sharma',
    title: 'Managing Partner',
    companyName: 'Sharma Eco-Textiles MSME',
    country: 'India',
    stateRegion: 'Maharashtra',
    district: 'Pune',
    age: 35,
    education: 'undergraduate',
    sector: 'handicrafts',
    orgType: 'existing_business',
    annualIncome: '₹8,00,000',
    annualTurnover: '₹65,00,000',
    existingLoans: true,
    loanType: 'Business Loan',
    loanAmount: '₹10,00,000',
    userCategory: 'catSmallBusiness',
    tagline: 'Sustainable organic handloom weaving & eco-friendly dye technology',
    industry: 'Manufacturing & Eco-Textiles',
    stage: 'Growth / Profitable Small Business',
    foundedYear: 2022,
    teamSize: '12 artisanal weavers and operators',
    annualRevenue: '₹65,00,000',
    location: 'Pune, Maharashtra, India',
    certifications: ['Udyam Registered Micro Enterprise', 'ZED Bronze Certified'],
    targetFunding: '₹25,00,000',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Championing rural women artisan empowerment through modern solar looms.',
    aiFocusArea: 'Supply Chain Tracking',
    businessIdNumber: 'UDYAM-MH-26-0045678',
    dunsNumber: '89-223-1144',
    preferredLanguage: 'hi',
  },
];

export const initialSchemes: Scheme[] = initialCentralSchemes;

export const sampleInvestors: InvestorInfo[] = [
  {
    id: 'inv-1',
    companyName: 'Blume Ventures',
    investorName: 'Sanjay Nath & Karthik Reddy',
    email: 'contact@blume.vc',
    contactNumber: '+91 80412 34567',
    focusArea: 'DeepTech, AI, SaaS, FinTech, Agritech in India',
    ticketSize: '₹3 Cr – ₹15 Cr (Seed & Pre-Series A)',
    receptionDesk: 'Bengaluru Tech Desk',
    officialWebsiteUrl: 'https://blume.vc',
  },
];

export const initialDeadlines: UpcomingDeadline[] = [
  {
    id: 'deadline-1',
    title: 'BIRAC BIG Call 26 Proposal Deadline',
    subtitle: 'Review checklist before applying on BIRAC portal',
    badgeText: 'Closing in 2 weeks',
    badgeType: 'warning',
    icon: 'timer',
    dueDate: 'Sep 15, 2026',
    schemeId: 'scheme-birac-big-india',
  },
  {
    id: 'deadline-2',
    title: 'Udyam / MSME Registration Certificate',
    subtitle: 'Verify document in Vault to maximize match score',
    badgeText: 'Action Required',
    badgeType: 'neutral',
    icon: 'description',
    dueDate: 'Sep 20, 2026',
    isDocumentRequired: true,
  },
];

export const initialReadinessTasks: ReadinessTask[] = [
  {
    id: 'task-1',
    title: 'Verify Aadhaar & PAN Card',
    subtitle: 'Essential for all Government and Private schemes',
    category: 'Compliance',
    points: 10,
    completed: true,
    actionLabel: 'Verified',
  },
  {
    id: 'task-2',
    title: 'Upload Udyam / MSME Registration Certificate',
    subtitle: 'Unlocks MSME capital subsidies',
    category: 'Compliance',
    points: 10,
    completed: true,
    actionLabel: 'Verified',
    requiredDocType: 'Udyam Registration Certificate',
  },
];

export const initialDocuments: DocumentRecord[] = [
  {
    id: 'doc-1',
    name: 'Promoter Aadhaar & PAN Verification.pdf',
    category: 'Identity',
    status: 'verified',
    lastUpdated: 'Aug 20, 2026',
    fileSize: '1.2 MB',
    aiVerificationScore: 100,
    feedback: 'Promoter KYC verified.',
  },
  {
    id: 'doc-2',
    name: 'DPIIT Startup Recognition Certificate.pdf',
    category: 'Certifications',
    status: 'verified',
    lastUpdated: 'Aug 22, 2026',
    fileSize: '850 KB',
    aiVerificationScore: 98,
    feedback: 'DPIIT verified active.',
  },
];

// Backwards compatibility
export const initialGrants = initialSchemes;
