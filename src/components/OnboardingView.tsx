import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, LanguageCode, EducationLevel, SectorType, OrgType, OnboardingProfile } from '../types';
import { getTranslation } from '../i18n/translations';
import { INDIAN_STATES, EDUCATION_LEVELS, SECTORS, ORG_TYPES } from '../data/mockData';

interface OnboardingViewProps {
  currentLanguage: LanguageCode;
  onComplete: (profile: UserProfile) => void;
  onBackToLanguage: () => void;
}

const TOTAL_STEPS = 5;

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button onClick={handleBack} className="p-1 rounded-lg hover:bg-surface-variant transition-colors" aria-label="Back">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center text-xs font-bold">M</div>
              <span className="font-bold text-on-surface tracking-tight text-sm">MatchWise <span className="text-primary">AI</span></span>
            </div>
          </div>
          <button
            onClick={handleSaveLater}
            className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">save</span>
            {t('saveContinueLater')}
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-xl">
          {/* Step indicator */}
          <div className="mb-6">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <div key={i} className="flex-1 flex items-center gap-1">
                  <div className={`h-1.5 flex-1 rounded-full transition-all ${
                    i + 1 < step ? 'bg-primary' : i + 1 === step ? 'bg-primary' : 'bg-outline-variant'
                  }`} />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-on-surface-variant">
                Step {step} of {TOTAL_STEPS}
              </p>
              <p className="text-xs text-on-surface-variant">{stepLabels[step - 1]}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 sm:p-7 shadow-ambient"
            >
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-on-surface mb-1">{t('step1Title')}</h2>
                    <p className="text-sm text-on-surface-variant">{t('step1Subtitle')}</p>
                  </div>

                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
                        {t('fullNameLabel')} <span className="text-error">*</span>
                      </label>
                      <input
                        id="input-fullname"
                        type="text"
                        value={form.fullName}
                        onChange={e => updateField('fullName', e.target.value)}
                        placeholder={t('fullNamePlaceholder')}
                        className={`w-full px-3.5 py-2.5 bg-surface border rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.fullName ? 'border-error' : 'border-outline-variant'}`}
                      />
                      {errors.fullName && <p className="mt-1 text-xs text-error">{errors.fullName}</p>}
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
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
                        className={`w-full px-3.5 py-2.5 bg-surface border rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.age ? 'border-error' : 'border-outline-variant'}`}
                      />
                      {errors.age && <p className="mt-1 text-xs text-error">{errors.age}</p>}
                    </div>

                    {/* State - Searchable */}
                    <div className="relative">
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
                        {t('stateLabel')} <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="input-state"
                          type="text"
                          value={showStateDropdown ? stateSearch : form.state}
                          onChange={e => { setStateSearch(e.target.value); setShowStateDropdown(true); }}
                          onFocus={() => { setShowStateDropdown(true); setStateSearch(''); }}
                          placeholder={t('statePlaceholder')}
                          className={`w-full px-3.5 py-2.5 bg-surface border rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.state ? 'border-error' : 'border-outline-variant'}`}
                          autoComplete="off"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                          expand_more
                        </span>
                      </div>
                      {showStateDropdown && (
                        <div className="absolute z-20 w-full mt-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg max-h-48 overflow-y-auto">
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
                              className={`w-full text-left px-3.5 py-2.5 text-sm hover:bg-surface-variant transition-colors ${form.state === s ? 'bg-primary/5 text-primary font-medium' : 'text-on-surface'}`}
                            >
                              {s}
                            </button>
                          ))}
                          {filteredStates.length === 0 && (
                            <p className="px-3.5 py-2.5 text-xs text-on-surface-variant">No states found</p>
                          )}
                        </div>
                      )}
                      {errors.state && <p className="mt-1 text-xs text-error">{errors.state}</p>}
                    </div>

                    {/* District - Searchable (dependent on state) */}
                    {form.state && (
                      <div className="relative">
                        <label className="block text-xs font-semibold text-on-surface mb-1.5">
                          {t('districtLabel')}
                        </label>
                        <div className="relative">
                          <input
                            id="input-district"
                            type="text"
                            value={showDistrictDropdown ? districtSearch : form.district}
                            onChange={e => { setDistrictSearch(e.target.value); setShowDistrictDropdown(true); }}
                            onFocus={() => { setShowDistrictDropdown(true); setDistrictSearch(''); }}
                            placeholder={t('districtPlaceholder')}
                            className="w-full px-3.5 py-2.5 bg-surface border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            autoComplete="off"
                          />
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                            expand_more
                          </span>
                        </div>
                        {showDistrictDropdown && (
                          <div className="absolute z-20 w-full mt-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg max-h-48 overflow-y-auto">
                            {filteredDistricts.map(d => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => {
                                  updateField('district', d);
                                  setShowDistrictDropdown(false);
                                  setDistrictSearch('');
                                }}
                                className={`w-full text-left px-3.5 py-2.5 text-sm hover:bg-surface-variant transition-colors ${form.district === d ? 'bg-primary/5 text-primary font-medium' : 'text-on-surface'}`}
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
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-on-surface mb-1">{t('step2Title')}</h2>
                    <p className="text-sm text-on-surface-variant">{t('step2Subtitle')}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {EDUCATION_LEVELS.map(edu => {
                      const isSelected = form.education === edu.key;
                      return (
                        <button
                          key={edu.key}
                          type="button"
                          onClick={() => updateField('education', edu.key as EducationLevel)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                              : 'border-outline-variant bg-surface hover:bg-surface-variant/50'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                            {edu.icon}
                          </span>
                          <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                            {t(edu.labelKey)}
                          </span>
                          {isSelected && (
                            <span className="ml-auto w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center">
                              <span className="material-symbols-outlined text-[13px]">check</span>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {errors.education && <p className="text-xs text-error">{errors.education}</p>}
                </div>
              )}

              {/* Step 3: Sector */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-on-surface mb-1">{t('step3Title')}</h2>
                    <p className="text-sm text-on-surface-variant">{t('step3Subtitle')}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {SECTORS.map(sec => {
                      const isSelected = form.sector === sec.key;
                      return (
                        <button
                          key={sec.key}
                          type="button"
                          onClick={() => updateField('sector', sec.key as SectorType)}
                          className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border text-center transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                              : 'border-outline-variant bg-surface hover:bg-surface-variant/50'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-[22px] ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                            {sec.icon}
                          </span>
                          <span className={`text-xs font-medium ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                            {t(sec.labelKey)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.sector && <p className="text-xs text-error">{errors.sector}</p>}
                </div>
              )}

              {/* Step 4: Organization Type */}
              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-on-surface mb-1">{t('step4Title')}</h2>
                    <p className="text-sm text-on-surface-variant">{t('step4Subtitle')}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {ORG_TYPES.map(org => {
                      const isSelected = form.orgType === org.key;
                      return (
                        <button
                          key={org.key}
                          type="button"
                          onClick={() => updateField('orgType', org.key as OrgType)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                              : 'border-outline-variant bg-surface hover:bg-surface-variant/50'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                            {org.icon}
                          </span>
                          <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                            {t(org.labelKey)}
                          </span>
                          {isSelected && (
                            <span className="ml-auto w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center">
                              <span className="material-symbols-outlined text-[13px]">check</span>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {errors.orgType && <p className="text-xs text-error">{errors.orgType}</p>}

                  {/* Conditional org name fields */}
                  {form.orgType === 'existing_startup' && (
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
                        {t('companyNameLabel')} <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.orgName}
                        onChange={e => updateField('orgName', e.target.value)}
                        placeholder={t('orgNamePlaceholder')}
                        className={`w-full px-3.5 py-2.5 bg-surface border rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.orgName ? 'border-error' : 'border-outline-variant'}`}
                      />
                      {errors.orgName && <p className="mt-1 text-xs text-error">{errors.orgName}</p>}
                    </div>
                  )}
                  {form.orgType === 'existing_business' && (
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
                        {t('businessNameLabel')} <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.orgName}
                        onChange={e => updateField('orgName', e.target.value)}
                        placeholder={t('orgNamePlaceholder')}
                        className={`w-full px-3.5 py-2.5 bg-surface border rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.orgName ? 'border-error' : 'border-outline-variant'}`}
                      />
                      {errors.orgName && <p className="mt-1 text-xs text-error">{errors.orgName}</p>}
                    </div>
                  )}
                  {form.orgType === 'existing_ngo' && (
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
                        {t('ngoNameLabel')} <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.orgName}
                        onChange={e => updateField('orgName', e.target.value)}
                        placeholder={t('orgNamePlaceholder')}
                        className={`w-full px-3.5 py-2.5 bg-surface border rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.orgName ? 'border-error' : 'border-outline-variant'}`}
                      />
                      {errors.orgName && <p className="mt-1 text-xs text-error">{errors.orgName}</p>}
                    </div>
                  )}
                  {form.orgType === 'planning_startup' && (
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
                        {t('startupPlanLabel')}
                      </label>
                      <input
                        type="text"
                        value={form.orgName}
                        onChange={e => updateField('orgName', e.target.value)}
                        placeholder={t('startupPlanPlaceholder')}
                        className="w-full px-3.5 py-2.5 bg-surface border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Financial Information */}
              {step === 5 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-on-surface mb-1">{t('step5Title')}</h2>
                    <p className="text-sm text-on-surface-variant">{t('step5Subtitle')}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">{t('annualIncomeLabel')}</label>
                      <input
                        type="text"
                        value={form.annualIncome}
                        onChange={e => updateField('annualIncome', e.target.value)}
                        placeholder={t('annualIncomePlaceholder')}
                        className="w-full px-3.5 py-2.5 bg-surface border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">{t('annualTurnoverLabel')}</label>
                      <input
                        type="text"
                        value={form.annualTurnover}
                        onChange={e => updateField('annualTurnover', e.target.value)}
                        placeholder={t('annualTurnoverPlaceholder')}
                        className="w-full px-3.5 py-2.5 bg-surface border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    {/* Existing Loans */}
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-2">{t('existingLoansLabel')}</label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => updateField('existingLoans', true)}
                          className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                            form.existingLoans
                              ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/30'
                              : 'border-outline-variant bg-surface text-on-surface hover:bg-surface-variant/50'
                          }`}
                        >
                          {t('yesLabel')}
                        </button>
                        <button
                          type="button"
                          onClick={() => { updateField('existingLoans', false); updateField('loanType', ''); updateField('loanAmount', ''); }}
                          className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                            !form.existingLoans
                              ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/30'
                              : 'border-outline-variant bg-surface text-on-surface hover:bg-surface-variant/50'
                          }`}
                        >
                          {t('noLabel')}
                        </button>
                      </div>
                    </div>

                    {form.existingLoans && (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-on-surface mb-1.5">{t('loanTypeLabel')}</label>
                          <input
                            type="text"
                            value={form.loanType}
                            onChange={e => updateField('loanType', e.target.value)}
                            placeholder={t('loanTypePlaceholder')}
                            className="w-full px-3.5 py-2.5 bg-surface border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-on-surface mb-1.5">{t('loanAmountLabel')}</label>
                          <input
                            type="text"
                            value={form.loanAmount}
                            onChange={e => updateField('loanAmount', e.target.value)}
                            placeholder={t('loanAmountPlaceholder')}
                            className="w-full px-3.5 py-2.5 bg-surface border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-xl transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  {t('backButton')}
                </button>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-on-primary text-sm font-semibold rounded-xl transition-all flex items-center gap-2"
                >
                  {step === TOTAL_STEPS ? t('completeProfile') : t('continueBtn')}
                  <span className="material-symbols-outlined text-[16px]">
                    {step === TOTAL_STEPS ? 'search' : 'arrow_forward'}
                  </span>
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
