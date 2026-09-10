import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile, LanguageCode, EducationLevel, SectorType, OrgType } from '../types';
import { getTranslation, supportedLanguages } from '../i18n/translations';
import { EDUCATION_LEVELS, SECTORS, ORG_TYPES, INDIAN_STATES } from '../data/mockData';
import { User, GraduationCap, Briefcase, CreditCard, Languages, Edit3, LogOut, Save, X } from 'lucide-react';

interface ProfileViewProps {
  userProfile: UserProfile;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onUpdateProfile: (updated: UserProfile) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  currentLanguage,
  onLanguageChange,
  onUpdateProfile,
  onLogout,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState(userProfile);

  const t = (key: string) => getTranslation(key, currentLanguage);

  const handleSave = () => {
    onUpdateProfile(editProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProfile(userProfile);
    setIsEditing(false);
  };

  const getEduLabel = (edu?: EducationLevel) => {
    const found = EDUCATION_LEVELS.find(e => e.key === edu);
    return found ? t(found.labelKey) : '—';
  };

  const getSectorLabel = (sec?: SectorType) => {
    const found = SECTORS.find(s => s.key === sec);
    return found ? t(found.labelKey) : '—';
  };

  const getOrgLabel = (org?: OrgType) => {
    const found = ORG_TYPES.find(o => o.key === org);
    return found ? t(found.labelKey) : '—';
  };

  const InfoRow: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-outline last:border-0 group">
      <span className="text-xs font-semibold text-on-surface-muted sm:w-40 shrink-0 group-hover:text-on-surface transition-colors">{label}</span>
      <span className="text-sm font-medium text-on-surface sm:text-right">{value || '—'}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-black tracking-tight mb-1">
            {t('profileTitle')}
          </h1>
          <p className="text-sm text-on-surface-variant">{t('profileSubtitle')}</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => { setEditProfile(userProfile); setIsEditing(true); }}
            className="px-4 py-2 text-xs font-bold text-on-surface border border-outline bg-surface-container rounded-xl hover:bg-surface-hover transition-all flex items-center gap-2 shadow-sm"
          >
            <Edit3 size={14} />
            {t('editProfile')}
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleCancel} 
              className="p-2 sm:px-4 sm:py-2 text-xs font-bold text-on-surface-muted border border-outline rounded-xl hover:text-on-surface hover:bg-surface-hover transition-all flex items-center gap-2"
            >
              <X size={14} />
              <span className="hidden sm:inline">{t('cancelEdit')}</span>
            </button>
            <button 
              onClick={handleSave} 
              className="p-2 sm:px-4 sm:py-2 text-xs font-bold text-on-primary bg-primary border border-transparent rounded-xl hover:bg-primary-hover transition-all flex items-center gap-2 shadow-sm"
            >
              <Save size={14} />
              <span className="hidden sm:inline">{t('saveProfile')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="glass-panel border border-outline rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        {/* User avatar section */}
        <div className="p-6 sm:p-8 border-b border-outline flex items-center gap-5 bg-surface-container relative z-10">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary text-on-primary flex items-center justify-center text-2xl font-black shadow-sm border border-primary/20">
            {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-on-background mb-1 tracking-tight">{userProfile.name || 'User'}</h2>
            <p className="text-xs font-medium text-on-surface-muted bg-surface-container px-3 py-1 rounded-full border border-outline inline-block">
              {userProfile.stateRegion}{userProfile.district ? `, ${userProfile.district}` : ''}, India
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="p-6 sm:p-8 space-y-8 relative z-10">
          {/* Personal */}
          <section>
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-widest mb-4 flex items-center gap-2">
              <User size={16} />
              {t('personalInfo')}
            </h3>
            {isEditing ? (
              <div className="space-y-4 bg-surface-container p-4 rounded-xl border border-outline">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">{t('fullNameLabel')}</label>
                  <input type="text" value={editProfile.name} onChange={e => setEditProfile({...editProfile, name: e.target.value})} className="w-full px-4 py-2.5 bg-surface border border-outline rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-outline-focus transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">Email</label>
                  <input type="email" value={editProfile.email || ''} onChange={e => setEditProfile({...editProfile, email: e.target.value})} className="w-full px-4 py-2.5 bg-surface border border-outline rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-outline-focus transition-all" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">{t('ageLabel')}</label>
                    <input type="number" value={editProfile.age || ''} onChange={e => setEditProfile({...editProfile, age: Number(e.target.value) || undefined})} className="w-full px-4 py-2.5 bg-surface border border-outline rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-outline-focus transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">{t('stateLabel')}</label>
                    <select value={editProfile.stateRegion} onChange={e => setEditProfile({...editProfile, stateRegion: e.target.value})} className="w-full px-4 py-2.5 bg-surface border border-outline rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-outline-focus transition-all">
                      {Object.keys(INDIAN_STATES).map(s => <option className="bg-surface text-on-surface" key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-surface-container-low px-5 py-2 rounded-xl border border-outline">
                <InfoRow label={t('fullNameLabel')} value={userProfile.name} />
                <InfoRow label="Email" value={userProfile.email} />
                <InfoRow label={t('ageLabel')} value={userProfile.age ? String(userProfile.age) : undefined} />
                <InfoRow label={t('stateLabel')} value={userProfile.stateRegion} />
                <InfoRow label={t('districtLabel')} value={userProfile.district} />
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <section>
              <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                <GraduationCap size={16} />
                {t('educationInfo')}
              </h3>
              <div className="bg-surface-container-low px-5 py-2 rounded-xl border border-outline h-full">
                <InfoRow label={t('educationLabel')} value={getEduLabel(userProfile.education)} />
              </div>
            </section>

            {/* Sector & Org */}
            <section>
              <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                <Briefcase size={16} />
                {t('sectorInfo')} & {t('orgInfo')}
              </h3>
              <div className="bg-surface-container-low px-5 py-2 rounded-xl border border-outline h-full">
                <InfoRow label={t('sectorLabel')} value={getSectorLabel(userProfile.sector)} />
                <InfoRow label={t('orgTypeLabel')} value={getOrgLabel(userProfile.orgType)} />
                {userProfile.companyName && <InfoRow label={t('orgNameLabel')} value={userProfile.companyName} />}
              </div>
            </section>
          </div>

          {/* Financial */}
          <section>
            <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
              <CreditCard size={16} />
              {t('financialInfo')}
            </h3>
            <div className="bg-surface-container-low px-5 py-2 rounded-xl border border-outline">
              <InfoRow label={t('annualIncomeLabel')} value={userProfile.annualIncome} />
              <InfoRow label={t('annualTurnoverLabel')} value={userProfile.annualTurnover} />
              <InfoRow label={t('existingLoansLabel')} value={userProfile.existingLoans ? t('yesLabel') : t('noLabel')} />
              {userProfile.existingLoans && (
                <div className="pl-4 mt-2 border-l-2 border-accent/20">
                  <InfoRow label={t('loanTypeLabel')} value={userProfile.loanType} />
                  <InfoRow label={t('loanAmountLabel')} value={userProfile.loanAmount} />
                </div>
              )}
            </div>
          </section>

          {/* Language */}
          <section>
            <h3 className="text-xs font-bold text-on-surface-muted uppercase tracking-widest mb-4 flex items-center gap-2">
              <Languages size={16} />
              {t('preferredLangField')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {supportedLanguages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 border ${
                    currentLanguage === lang.code
                      ? 'bg-surface-container-highest text-on-surface border-outline-focus shadow-sm'
                      : 'bg-transparent border-outline text-on-surface-muted hover:text-on-surface hover:bg-surface-hover'
                  }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onLogout}
          className="px-6 py-3 text-sm font-bold text-error border border-error/20 bg-error/5 rounded-xl hover:bg-error/10 hover:border-error/30 transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={16} />
          {t('logout')}
        </button>
      </div>
    </motion.div>
  );
};
