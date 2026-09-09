import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile, LanguageCode, EducationLevel, SectorType, OrgType } from '../types';
import { getTranslation, supportedLanguages } from '../i18n/translations';
import { EDUCATION_LEVELS, SECTORS, ORG_TYPES, INDIAN_STATES } from '../data/mockData';

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
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-2.5 border-b border-outline-variant/50 last:border-0">
      <span className="text-xs font-semibold text-on-surface-variant sm:w-40 shrink-0">{label}</span>
      <span className="text-sm text-on-surface">{value || '—'}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-on-surface mb-0.5">{t('profileTitle')}</h1>
          <p className="text-sm text-on-surface-variant">{t('profileSubtitle')}</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => { setEditProfile(userProfile); setIsEditing(true); }}
            className="px-3 py-1.5 text-xs font-medium text-primary border border-primary/20 bg-primary/5 rounded-lg hover:bg-primary/10 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[14px]">edit</span>
            {t('editProfile')}
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleCancel} className="px-3 py-1.5 text-xs font-medium text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-variant transition-all">
              {t('cancelEdit')}
            </button>
            <button onClick={handleSave} className="px-3 py-1.5 text-xs font-semibold text-on-primary bg-primary rounded-lg hover:bg-primary/90 transition-all">
              {t('saveProfile')}
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden">
        {/* User avatar section */}
        <div className="p-5 border-b border-outline-variant flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
            {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-base font-bold text-on-surface">{userProfile.name || 'User'}</h2>
            <p className="text-xs text-on-surface-variant">
              {userProfile.stateRegion}{userProfile.district ? `, ${userProfile.district}` : ''}, India
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="p-5 space-y-6">
          {/* Personal */}
          <section>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">person</span>
              {t('personalInfo')}
            </h3>
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">{t('fullNameLabel')}</label>
                  <input type="text" value={editProfile.name} onChange={e => setEditProfile({...editProfile, name: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">{t('ageLabel')}</label>
                    <input type="number" value={editProfile.age || ''} onChange={e => setEditProfile({...editProfile, age: Number(e.target.value) || undefined})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">{t('stateLabel')}</label>
                    <select value={editProfile.stateRegion} onChange={e => setEditProfile({...editProfile, stateRegion: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                      {Object.keys(INDIAN_STATES).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <InfoRow label={t('fullNameLabel')} value={userProfile.name} />
                <InfoRow label={t('ageLabel')} value={userProfile.age ? String(userProfile.age) : undefined} />
                <InfoRow label={t('stateLabel')} value={userProfile.stateRegion} />
                <InfoRow label={t('districtLabel')} value={userProfile.district} />
              </div>
            )}
          </section>

          {/* Education */}
          <section>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">school</span>
              {t('educationInfo')}
            </h3>
            <InfoRow label={t('educationLabel')} value={getEduLabel(userProfile.education)} />
          </section>

          {/* Sector & Org */}
          <section>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">work</span>
              {t('sectorInfo')} & {t('orgInfo')}
            </h3>
            <InfoRow label={t('sectorLabel')} value={getSectorLabel(userProfile.sector)} />
            <InfoRow label={t('orgTypeLabel')} value={getOrgLabel(userProfile.orgType)} />
            {userProfile.companyName && <InfoRow label={t('orgNameLabel')} value={userProfile.companyName} />}
          </section>

          {/* Financial */}
          <section>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">payments</span>
              {t('financialInfo')}
            </h3>
            <InfoRow label={t('annualIncomeLabel')} value={userProfile.annualIncome} />
            <InfoRow label={t('annualTurnoverLabel')} value={userProfile.annualTurnover} />
            <InfoRow label={t('existingLoansLabel')} value={userProfile.existingLoans ? t('yesLabel') : t('noLabel')} />
            {userProfile.existingLoans && (
              <>
                <InfoRow label={t('loanTypeLabel')} value={userProfile.loanType} />
                <InfoRow label={t('loanAmountLabel')} value={userProfile.loanAmount} />
              </>
            )}
          </section>

          {/* Language */}
          <section>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">translate</span>
              {t('preferredLangField')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {supportedLanguages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                    currentLanguage === lang.code
                      ? 'border-primary bg-primary/5 text-primary font-semibold'
                      : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant'
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
      <div className="mt-6">
        <button
          onClick={onLogout}
          className="w-full py-2.5 text-sm font-medium text-error border border-error/20 bg-error/5 rounded-xl hover:bg-error/10 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          {t('logout')}
        </button>
      </div>
    </motion.div>
  );
};
