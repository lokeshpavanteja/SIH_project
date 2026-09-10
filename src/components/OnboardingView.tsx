import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, LanguageCode, EducationLevel, SectorType, OrgType, OnboardingProfile } from '../types';
import { getTranslation } from '../i18n/translations';
import { INDIAN_STATES, EDUCATION_LEVELS, SECTORS, ORG_TYPES } from '../data/mockData';
import { 
  ArrowLeft, ArrowRight, Save, Search, ChevronDown, Check,
  GraduationCap, Briefcase, User, Building2, Landmark, Shield
} from 'lucide-react';

interface OnboardingViewProps {
  currentLanguage: LanguageCode;
  onComplete: (profile: UserProfile) => void;
  onBackToLanguage: () => void;
}

const TOTAL_STEPS = 5;

// Helper to map mockData icons to Lucide icons
const IconMap: Record<string, React.FC<any>> = {
  'school': GraduationCap,
  'menu_book': GraduationCap,
  'auto_stories': GraduationCap,
  'workspace_premium': Shield,
  'psychology': GraduationCap,
  'biotech': GraduationCap,
  'more_horiz': Building2,
  'agriculture': Landmark,
  'engineering': Building2,
  'precision_manufacturing': Building2,
  'code': User,
  'factory': Building2,
  'health_and_safety': Shield,
  'storefront': Building2,
  'restaurant': Building2,
  'brush': User,
  'support_agent': User,
  'person': User,
  'lightbulb': Building2,
  'rocket_launch': Building2,
  'business': Building2,
  'volunteer_activism': Shield,
  'diversity_3': Shield,
};

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  currentLanguage,
  onComplete,
  onBackToLanguage,
}) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<OnboardingProfile>(() => {
    try {
      const saved = localStorage.getItem('matchwise_onboarding_draft');
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return {
      fullName: '',
      age: '',
      state: '',
      district: '',
      education: '',
      sector: '',
      orgType: '',
      orgName: '',
      annualIncome: '',
      annualTurnover: '',
      existingLoans: false,
      loanType: '',
      loanAmount: '',
    };
  });

  const [stateSearch, setStateSearch] = useState('');
  const [districtSearch, setDistrictSearch] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  const t = (key: string) => getTranslation(key, currentLanguage);

  const stateNames = Object.keys(INDIAN_STATES);
  const filteredStates = useMemo(() => {
    if (!stateSearch.trim()) return stateNames;
    return stateNames.filter(s => s.toLowerCase().includes(stateSearch.toLowerCase()));
  }, [stateSearch]);

  const districts = form.state ? INDIAN_STATES[form.state] || [] : [];
  const filteredDistricts = useMemo(() => {
    if (!districtSearch.trim()) return districts;
    return districts.filter(d => d.toLowerCase().includes(districtSearch.toLowerCase()));
  }, [districtSearch, districts]);

  const updateField = <K extends keyof OnboardingProfile>(key: K, value: OnboardingProfile[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  };

  const saveDraft = () => {
    try {
      localStorage.setItem('matchwise_onboarding_draft', JSON.stringify(form));
    } catch { /* ignore */ }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!form.fullName.trim()) newErrors.fullName = t('requiredField');
      if (!form.age || Number(form.age) < 1 || Number(form.age) > 120) newErrors.age = t('requiredField');
      if (!form.state) newErrors.state = t('requiredField');
    }
    if (step === 2) {
      if (!form.education) newErrors.education = t('requiredField');
    }
    if (step === 3) {
      if (!form.sector) newErrors.sector = t('requiredField');
    }
    if (step === 4) {
      if (!form.orgType) newErrors.orgType = t('requiredField');
      if (['existing_startup', 'existing_business', 'existing_ngo'].includes(form.orgType) && !form.orgName.trim()) {
        newErrors.orgName = t('requiredField');
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateStep()) return;
    saveDraft();
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBackToLanguage();
    }
  };

  const handleSaveLater = () => {
    saveDraft();
    // Could show a toast here
  };

  const handleComplete = () => {
    saveDraft();
    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      email: '',
      phoneNumber: '',
      phoneCountryCode: '+91',
      phoneDigits: '',
      name: form.fullName.trim(),
      title: '',
      companyName: form.orgName || '',
      country: 'India',
      stateRegion: form.state,
      district: form.district,
      age: Number(form.age) || undefined,
      education: (form.education as EducationLevel) || undefined,
      sector: (form.sector as SectorType) || undefined,
      orgType: (form.orgType as OrgType) || undefined,
      annualIncome: form.annualIncome,
      annualTurnover: form.annualTurnover,
      existingLoans: form.existingLoans,
      loanType: form.loanType,
      loanAmount: form.loanAmount,
      userCategory: mapOrgTypeToCategory(form.orgType as OrgType),
      tagline: '',
      industry: mapSectorToIndustry(form.sector as SectorType),
      stage: '',
      foundedYear: new Date().getFullYear(),
      teamSize: '',
      annualRevenue: form.annualTurnover || '',
      location: `${form.district || ''}, ${form.state}, India`,
      certifications: [],
      targetFunding: '',
      avatarUrl: '',
      bio: '',
      aiFocusArea: '',
      preferredLanguage: currentLanguage,
    };
    try { localStorage.removeItem('matchwise_onboarding_draft'); } catch { /* ignore */ }
    onComplete(profile);
  };

  const stepLabels = [t('step1Title'), t('step2Title'), t('step3Title'), t('step4Title'), t('step5Title')];

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top bar */}
      <header className="border-b border-white/10 glass-nav sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all" aria-label="Back">
              <ArrowLeft size={18} className="text-on-surface-muted" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-xs font-black shadow-sm">M</div>
              <span className="font-extrabold text-white tracking-tight text-base hidden sm:inline">MatchWise <span className="text-white">AI</span></span>
            </div>
          </div>
          <button
            onClick={handleSaveLater}
            className="text-xs font-bold text-on-surface-muted hover:text-white px-3 py-1.5 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 flex items-center gap-1.5 transition-all"
          >
            <Save size={14} />
            <span className="hidden sm:inline">{t('saveContinueLater')}</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12 z-10">
        <div className="w-full max-w-2xl">
          {/* Step indicator */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <div key={i} className="flex-1">
                  <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                    i + 1 < step ? 'bg-white' : i + 1 === step ? 'bg-white shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'bg-white/10'
                  }`} />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-white uppercase tracking-widest">
                Step {step} of {TOTAL_STEPS}
              </p>
              <p className="text-sm font-semibold text-white">{stepLabels[step - 1]}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-panel border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{t('step1Title')}</h2>
                    <p className="text-sm text-on-surface-variant">{t('step1Subtitle')}</p>
                  </div>

                  <div className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-2">
                        {t('fullNameLabel')} <span className="text-error">*</span>
                      </label>
                      <input
                        id="input-fullname"
                        type="text"
                        value={form.fullName}
                        onChange={e => updateField('fullName', e.target.value)}
                        placeholder={t('fullNamePlaceholder')}
                        className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner ${errors.fullName ? 'border-error ring-1 ring-error' : 'border-white/10 focus:border-white'}`}
                      />
                      {errors.fullName && <p className="mt-1.5 text-xs font-medium text-error">{errors.fullName}</p>}
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-2">
                        {t('ageLabel')} <span className="text-error">*</span>
                      </label>
                      <input
                        id="input-age"
                        type="number"
                        min={1}
                        max={120}
                        value={form.age}
                        onChange={e => updateField('age', e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder={t('agePlaceholder')}
                        className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner ${errors.age ? 'border-error ring-1 ring-error' : 'border-white/10 focus:border-white'}`}
                      />
                      {errors.age && <p className="mt-1.5 text-xs font-medium text-error">{errors.age}</p>}
                    </div>

                    {/* State - Searchable */}
                    <div className="relative">
                      <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-2">
                        {t('stateLabel')} <span className="text-error">*</span>
                      </label>
                      <div className="relative group">
                        <input
                          id="input-state"
                          type="text"
                          value={showStateDropdown ? stateSearch : form.state}
                          onChange={e => { setStateSearch(e.target.value); setShowStateDropdown(true); }}
                          onFocus={() => { setShowStateDropdown(true); setStateSearch(''); }}
                          placeholder={t('statePlaceholder')}
                          className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner ${errors.state ? 'border-error ring-1 ring-error' : 'border-white/10 focus:border-white'}`}
                          autoComplete="off"
                        />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-muted pointer-events-none transition-transform group-focus-within:rotate-180" size={16} />
                      </div>
                      {showStateDropdown && (
                        <div className="absolute z-20 w-full mt-2 glass-panel border border-white/10 rounded-xl shadow-2xl max-h-56 overflow-y-auto py-1">
                          {filteredStates.map(s => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => {
                                updateField('state', s);
                                updateField('district', '');
                                setShowStateDropdown(false);
                                setStateSearch('');
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors font-medium ${form.state === s ? 'bg-white/10 text-white' : 'text-on-surface hover:bg-white/10 hover:text-white'}`}
                            >
                              {s}
                            </button>
                          ))}
                          {filteredStates.length === 0 && (
                            <p className="px-4 py-3 text-xs text-on-surface-muted text-center">No states found</p>
                          )}
                        </div>
                      )}
                      {errors.state && <p className="mt-1.5 text-xs font-medium text-error">{errors.state}</p>}
                    </div>

                    {/* District - Searchable */}
                    {form.state && (
                      <div className="relative">
                        <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-2">
                          {t('districtLabel')}
                        </label>
                        <div className="relative group">
                          <input
                            id="input-district"
                            type="text"
                            value={showDistrictDropdown ? districtSearch : form.district}
                            onChange={e => { setDistrictSearch(e.target.value); setShowDistrictDropdown(true); }}
                            onFocus={() => { setShowDistrictDropdown(true); setDistrictSearch(''); }}
                            placeholder={t('districtPlaceholder')}
                            className="w-full px-4 py-3 bg-surface-container-low border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-white transition-all shadow-inner"
                            autoComplete="off"
                          />
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-muted pointer-events-none transition-transform group-focus-within:rotate-180" size={16} />
                        </div>
                        {showDistrictDropdown && (
                          <div className="absolute z-20 w-full mt-2 glass-panel border border-white/10 rounded-xl shadow-2xl max-h-56 overflow-y-auto py-1">
                            {filteredDistricts.map(d => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => {
                                  updateField('district', d);
                                  setShowDistrictDropdown(false);
                                  setDistrictSearch('');
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors font-medium ${form.district === d ? 'bg-white/10 text-white' : 'text-on-surface hover:bg-white/10 hover:text-white'}`}
                              >
                                {d}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Education */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{t('step2Title')}</h2>
                    <p className="text-sm text-on-surface-variant">{t('step2Subtitle')}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {EDUCATION_LEVELS.map(edu => {
                      const isSelected = form.education === edu.key;
                      const IconObj = IconMap[edu.icon] || GraduationCap;
                      return (
                        <button
                          key={edu.key}
                          type="button"
                          onClick={() => updateField('education', edu.key as EducationLevel)}
                          className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                            isSelected
                              ? 'border-white bg-white/5 ring-1 ring-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.15)] scale-[1.02]'
                              : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/10 text-white' : 'bg-white/5 text-on-surface-muted'}`}>
                            <IconObj size={20} />
                          </div>
                          <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-on-surface-variant'}`}>
                            {t(edu.labelKey)}
                          </span>
                          {isSelected && (
                            <span className="ml-auto w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shadow-sm">
                              <Check size={12} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {errors.education && <p className="text-xs font-medium text-error">{errors.education}</p>}
                </div>
              )}

              {/* Step 3: Sector */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{t('step3Title')}</h2>
                    <p className="text-sm text-on-surface-variant">{t('step3Subtitle')}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SECTORS.map(sec => {
                      const isSelected = form.sector === sec.key;
                      const IconObj = IconMap[sec.icon] || Briefcase;
                      return (
                        <button
                          key={sec.key}
                          type="button"
                          onClick={() => updateField('sector', sec.key as SectorType)}
                          className={`flex flex-col items-center gap-3 p-4 rounded-xl border text-center transition-all duration-300 ${
                            isSelected
                              ? 'border-white bg-white/5 ring-1 ring-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.15)] scale-[1.02]'
                              : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className={`p-3 rounded-xl ${isSelected ? 'bg-white/10 text-white' : 'bg-white/5 text-on-surface-muted'}`}>
                            <IconObj size={24} />
                          </div>
                          <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-on-surface-variant'}`}>
                            {t(sec.labelKey)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.sector && <p className="text-xs font-medium text-error">{errors.sector}</p>}
                </div>
              )}

              {/* Step 4: Organization Type */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{t('step4Title')}</h2>
                    <p className="text-sm text-on-surface-variant">{t('step4Subtitle')}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ORG_TYPES.map(org => {
                      const isSelected = form.orgType === org.key;
                      const IconObj = IconMap[org.icon] || Building2;
                      return (
                        <button
                          key={org.key}
                          type="button"
                          onClick={() => updateField('orgType', org.key as OrgType)}
                          className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                            isSelected
                              ? 'border-white bg-white/5 ring-1 ring-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.15)] scale-[1.02]'
                              : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/10 text-white' : 'bg-white/5 text-on-surface-muted'}`}>
                            <IconObj size={20} />
                          </div>
                          <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-on-surface-variant'}`}>
                            {t(org.labelKey)}
                          </span>
                          {isSelected && (
                            <span className="ml-auto w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shadow-sm">
                              <Check size={12} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {errors.orgType && <p className="text-xs font-medium text-error">{errors.orgType}</p>}

                  {/* Conditional org name fields */}
                  {form.orgType === 'existing_startup' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                      <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-2">
                        {t('companyNameLabel')} <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.orgName}
                        onChange={e => updateField('orgName', e.target.value)}
                        placeholder={t('orgNamePlaceholder')}
                        className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-inner transition-all ${errors.orgName ? 'border-error' : 'border-white/10 focus:border-white'}`}
                      />
                      {errors.orgName && <p className="mt-1.5 text-xs font-medium text-error">{errors.orgName}</p>}
                    </motion.div>
                  )}
                  {form.orgType === 'existing_business' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                      <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-2">
                        {t('businessNameLabel')} <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.orgName}
                        onChange={e => updateField('orgName', e.target.value)}
                        placeholder={t('orgNamePlaceholder')}
                        className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-inner transition-all ${errors.orgName ? 'border-error' : 'border-white/10 focus:border-white'}`}
                      />
                      {errors.orgName && <p className="mt-1.5 text-xs font-medium text-error">{errors.orgName}</p>}
                    </motion.div>
                  )}
                  {form.orgType === 'existing_ngo' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                      <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-2">
                        {t('ngoNameLabel')} <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.orgName}
                        onChange={e => updateField('orgName', e.target.value)}
                        placeholder={t('orgNamePlaceholder')}
                        className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-inner transition-all ${errors.orgName ? 'border-error' : 'border-white/10 focus:border-white'}`}
                      />
                      {errors.orgName && <p className="mt-1.5 text-xs font-medium text-error">{errors.orgName}</p>}
                    </motion.div>
                  )}
                  {form.orgType === 'planning_startup' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                      <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-2">
                        {t('startupPlanLabel')}
                      </label>
                      <input
                        type="text"
                        value={form.orgName}
                        onChange={e => updateField('orgName', e.target.value)}
                        placeholder={t('startupPlanPlaceholder')}
                        className="w-full px-4 py-3 bg-surface-container-low border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-white shadow-inner"
                      />
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 5: Financial Information */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{t('step5Title')}</h2>
                    <p className="text-sm text-on-surface-variant">{t('step5Subtitle')}</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-2">{t('annualIncomeLabel')}</label>
                      <input
                        type="text"
                        value={form.annualIncome}
                        onChange={e => updateField('annualIncome', e.target.value)}
                        placeholder={t('annualIncomePlaceholder')}
                        className="w-full px-4 py-3 bg-surface-container-low border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-white shadow-inner transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-2">{t('annualTurnoverLabel')}</label>
                      <input
                        type="text"
                        value={form.annualTurnover}
                        onChange={e => updateField('annualTurnover', e.target.value)}
                        placeholder={t('annualTurnoverPlaceholder')}
                        className="w-full px-4 py-3 bg-surface-container-low border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-white shadow-inner transition-all"
                      />
                    </div>

                    {/* Existing Loans */}
                    <div className="pt-2 border-t border-white/5">
                      <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-3">{t('existingLoansLabel')}</label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => updateField('existingLoans', true)}
                          className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                            form.existingLoans
                              ? 'border-white bg-white/5 text-white shadow-[0_0_15px_rgba(139,92,246,0.15)] ring-1 ring-primary/30'
                              : 'border-white/10 bg-white/5 text-on-surface-muted hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {t('yesLabel')}
                        </button>
                        <button
                          type="button"
                          onClick={() => { updateField('existingLoans', false); updateField('loanType', ''); updateField('loanAmount', ''); }}
                          className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                            !form.existingLoans
                              ? 'border-white bg-white/5 text-white shadow-[0_0_15px_rgba(139,92,246,0.15)] ring-1 ring-primary/30'
                              : 'border-white/10 bg-white/5 text-on-surface-muted hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {t('noLabel')}
                        </button>
                      </div>
                    </div>

                    {form.existingLoans && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 pt-4 border-t border-white/5">
                        <div>
                          <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-2">{t('loanTypeLabel')}</label>
                          <input
                            type="text"
                            value={form.loanType}
                            onChange={e => updateField('loanType', e.target.value)}
                            placeholder={t('loanTypePlaceholder')}
                            className="w-full px-4 py-3 bg-surface-container-low border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-white shadow-inner"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-on-surface-muted uppercase tracking-wider mb-2">{t('loanAmountLabel')}</label>
                          <input
                            type="text"
                            value={form.loanAmount}
                            onChange={e => updateField('loanAmount', e.target.value)}
                            placeholder={t('loanAmountPlaceholder')}
                            className="w-full px-4 py-3 bg-surface-container-low border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-white shadow-inner"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-3 text-sm font-bold text-on-surface-muted border border-white/10 hover:text-white hover:bg-white/10 rounded-xl transition-all flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  {t('backButton')}
                </button>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="px-8 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
                >
                  {step === TOTAL_STEPS ? t('completeProfile') : t('continueBtn')}
                  {step === TOTAL_STEPS ? <Search size={16} /> : <ArrowRight size={16} />}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

function mapOrgTypeToCategory(orgType: OrgType | undefined): string {
  if (!orgType) return 'catIndividual';
  const map: Record<OrgType, string> = {
    individual: 'catIndividual',
    planning_startup: 'catStartup',
    existing_startup: 'catStartup',
    existing_business: 'catSmallBusiness',
    planning_ngo: 'catNonProfit',
    existing_ngo: 'catNonProfit',
    other: 'catIndividual',
  };
  return map[orgType] || 'catIndividual';
}

function mapSectorToIndustry(sector: SectorType | undefined): string {
  if (!sector) return '';
  const map: Record<SectorType, string> = {
    agriculture: 'Agriculture & Farming',
    civil: 'Civil Engineering & Construction',
    mechanical: 'Mechanical Engineering',
    software_it: 'Software & Information Technology',
    manufacturing: 'Manufacturing & Production',
    healthcare: 'Healthcare & Medical',
    education: 'Education & Training',
    retail: 'Retail & Commerce',
    food: 'Food & Beverage',
    handicrafts: 'Handicrafts & Artisanal',
    services: 'Services & Consulting',
    other: 'Other',
  };
  return map[sector] || '';
}
