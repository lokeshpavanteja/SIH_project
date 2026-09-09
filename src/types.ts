export type NavigationTab = 'recommended' | 'discovery' | 'my_schemes' | 'profile';

export type LanguageCode =
  | 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'ml'
  | 'mr' | 'bn' | 'gu' | 'pa' | 'or' | 'as' | 'ur';

export type SchemeType = 'government' | 'private';

export type GovernmentLevel = 'Central Government' | 'State Government' | 'Government Agency' | 'Government-Backed Program';

export type SchemeDecision = 'accepted' | 'rejected' | 'none';

export type VerificationStatus = 'verified' | 'needs_verification' | 'unverified' | 'expired';

export type SchemeStatus = 'active' | 'expired' | 'temporarily_closed';

export type SourceType =
  | 'Central Government Portal'
  | 'State Government Portal'
  | 'Government Agency'
  | 'Corporate Foundation'
  | 'Verified Incubator / Accelerator'
  | 'Financial Institution'
  | 'International Agency';

export type ApplicationStatus = 'started' | 'in_progress' | 'ready_to_apply';

export type EducationLevel =
  | 'no_formal'
  | 'school'
  | 'intermediate'
  | 'diploma'
  | 'undergraduate'
  | 'postgraduate'
  | 'phd'
  | 'other';

export type SectorType =
  | 'agriculture'
  | 'civil'
  | 'mechanical'
  | 'software_it'
  | 'manufacturing'
  | 'healthcare'
  | 'education'
  | 'retail'
  | 'food'
  | 'handicrafts'
  | 'services'
  | 'other';

export type OrgType =
  | 'individual'
  | 'planning_startup'
  | 'existing_startup'
  | 'existing_business'
  | 'planning_ngo'
  | 'existing_ngo'
  | 'other';

export interface DocumentReadinessInfo {
  score: number;
  available: string[];
  missing: string[];
}

export interface SchemeEligibility {
  minAge?: number;
  maxAge?: number;
  states?: string[];
  education?: EducationLevel[];
  sectors?: SectorType[];
  orgTypes?: OrgType[];
  maxIncome?: number;
  maxTurnover?: number;
  loansAllowed?: boolean;
}

export interface Scheme {
  id: string;
  title: string;
  type: SchemeType;
  providerName: string;
  providerType: 'Official Government Website' | 'Official Organization Website';
  governmentLevel?: GovernmentLevel;
  country: string;
  stateRestriction?: string;
  description: string;
  fullOverview?: string;
  matchScore: number;
  matchReasons: string[];
  whyRecommended: string;
  amount: number;
  amountFormatted: string;
  fundingNature: 'Grant / Subsidy' | 'Soft Loan / Credit' | 'Non-Dilutive Seed' | 'Innovation Prize' | 'Corporate Support' | 'Tax Incentive / Exemption';
  deadline: string;
  deadlineRelative: string;
  category: string;
  schemeCategory?: string;
  sectors?: SectorType[];
  applicableStates?: string[];

  targetBeneficiaries: string[];
  businessCategory: string[];
  eligibility: string[];
  eligibilityRules?: SchemeEligibility;
  ageRequirements?: string;
  incomeRequirements?: string;
  locationRequirements?: string;
  benefits: string[];
  otherBenefits?: string[];
  requiredDocs: string[];
  documentReadiness: DocumentReadinessInfo;
  applicationProcess?: string;
  applicationSteps?: string[];
  importantConditions: string[];

  officialWebsiteUrl: string;
  officialSourceWebsite: string;
  sourceName: string;
  sourceType: SourceType;
  officialWebsiteLabel: string;
  lastUpdatedDate: string;
  lastVerifiedDate: string;
  status: SchemeStatus;
  verificationStatus: VerificationStatus;
  languageAvailability: string[];

  userDecision: SchemeDecision;
  saved: boolean;
}

// Backwards compatibility alias
export type Grant = Scheme;

export interface StartedScheme {
  id: string;
  schemeId: string;
  status: ApplicationStatus;
  startedDate: string;
  progress: number;
  notes?: string;
}

export interface OnboardingProfile {
  fullName: string;
  age: number | '';
  state: string;
  district: string;
  education: EducationLevel | '';
  sector: SectorType | '';
  orgType: OrgType | '';
  orgName: string;
  annualIncome: string;
  annualTurnover: string;
  existingLoans: boolean;
  loanType: string;
  loanAmount: string;
}

export interface SchemeSource {
  id: string;
  name: string;
  url: string;
  country: string;
  sourceType: SourceType;
  type: SchemeType;
  isActive: boolean;
  lastSuccessfulSync: string;
  lastFailedSync?: string;
  verificationStatus: 'verified' | 'needs_verification' | 'unverified';
  schemesCount: number;
  description?: string;
}

export interface SchemeUpdateRecord {
  id: string;
  schemeId: string;
  schemeTitle: string;
  changeType: 'created' | 'updated' | 'verified' | 'expired' | 'archived';
  fieldChanged?: string;
  previousValue?: string;
  newValue?: string;
  updateDate: string;
  sourceName: string;
  sourceUrl: string;
  changeDescription: string;
}

export interface UserSchemeMatch {
  id: string;
  userId: string;
  schemeId: string;
  matchScore: number;
  matchReasons: string[];
  acceptedRejected: 'accepted' | 'rejected' | 'pending';
  matchDate: string;
}

export interface AdminDashboardStats {
  totalSchemes: number;
  governmentSchemes: number;
  privateSchemes: number;
  activeSchemes: number;
  expiredSchemes: number;
  verifiedSchemes: number;
  unverifiedSchemes: number;
  trustedSourcesCount: number;
  lastSyncTimestamp: string;
  recentUpdatesCount: number;
}

export interface InvestorInfo {
  id: string;
  companyName: string;
  investorName: string;
  email: string;
  contactNumber: string;
  focusArea: string;
  ticketSize: string;
  receptionDesk: string;
  officialWebsiteUrl: string;
}

export interface ReadinessTask {
  id: string;
  title: string;
  subtitle: string;
  category: 'Financial' | 'Compliance' | 'Pitch' | 'Impact';
  points: number;
  completed: boolean;
  actionLabel: string;
  requiredDocType?: string;
}

export interface UpcomingDeadline {
  id: string;
  title: string;
  subtitle: string;
  badgeText: string;
  badgeType: 'warning' | 'neutral' | 'urgent' | 'success';
  icon: 'timer' | 'description' | 'assignment' | 'verified';
  dueDate: string;
  schemeId?: string;
  grantId?: string;
  isDocumentRequired?: boolean;
}

export interface DocumentRecord {
  id: string;
  name: string;
  category: string;
  status: 'verified' | 'missing' | 'under_review' | 'action_required';
  lastUpdated?: string;
  fileSize?: string;
  aiVerificationScore?: number;
  feedback?: string;
}

export interface UserProfile {
  id?: string;
  email: string;
  password?: string;
  phoneNumber: string;
  phoneCountryCode: string;
  phoneDigits: string;
  name: string;
  title: string;
  companyName: string;
  country: string;
  stateRegion: string;
  district?: string;
  age?: number;
  education?: EducationLevel;
  sector?: SectorType;
  orgType?: OrgType;
  annualIncome?: string;
  annualTurnover?: string;
  existingLoans?: boolean;
  loanType?: string;
  loanAmount?: string;
  userCategory: string;
  tagline: string;
  industry: string;
  stage: string;
  foundedYear: number;
  teamSize: string;
  annualRevenue: string;
  location: string;
  certifications: string[];
  targetFunding: string;
  avatarUrl: string;
  bio: string;
  aiFocusArea: string;
  businessIdNumber?: string;
  dunsNumber?: string;
  preferredLanguage: LanguageCode;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendedSchemeIds?: string[];
  suggestedAction?: 'compare' | 'view_gov' | 'view_private' | 'improve_docs';
}
