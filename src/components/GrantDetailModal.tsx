import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scheme, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';

interface GrantDetailModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleSave: (schemeId: string) => void;
  onStartApplication: (scheme: Scheme) => void;
  currentLanguage: LanguageCode;
}

export const GrantDetailModal: React.FC<GrantDetailModalProps> = ({
  scheme,
  isOpen,
  onClose,
  onToggleSave,
  onStartApplication,
  currentLanguage,
}) => {
  if (!isOpen || !scheme) return null;

  const t = (key: string) => getTranslation(key, currentLanguage);
  const isGov = scheme.type === 'government';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-lg z-10 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-outline-variant bg-surface/50">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                  isGov ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20' : 'bg-blue-500/10 text-blue-700 border border-blue-500/20'
                }`}>
                  <span className="material-symbols-outlined text-[12px]">{isGov ? 'account_balance' : 'business'}</span>
                  {isGov ? t('govBadge') : t('privateBadge')}
                </span>
                <span className="text-[10px] text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-md">
                  {scheme.category}
                </span>
                {/* Match */}
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  scheme.matchScore >= 80 ? 'bg-green-500/10 text-green-700' :
                  scheme.matchScore >= 60 ? 'bg-amber-500/10 text-amber-700' :
                  'bg-surface-variant text-on-surface-variant'
                }`}>
                  {scheme.matchScore}% {t('estimatedMatch')}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-surface-variant transition-colors text-on-surface-variant"
                aria-label={t('close')}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-2">{scheme.title}</h2>

            <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
              <span>{scheme.providerName}</span>
              {scheme.amountFormatted && (
                <>
                  <span>•</span>
                  <span className="font-semibold text-on-surface">{scheme.amountFormatted}</span>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSave(scheme.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 ${
                  scheme.saved
                    ? 'border-primary/20 bg-primary/5 text-primary'
                    : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">{scheme.saved ? 'bookmark' : 'bookmark_border'}</span>
                {scheme.saved ? t('savedScheme') : t('saveScheme')}
              </button>
              <button
                onClick={() => onStartApplication(scheme)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">play_arrow</span>
                {t('startApplication')}
              </button>
              {scheme.officialWebsiteUrl && (
                <a
                  href={scheme.officialWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-variant transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                  {t('applyOnOfficialWebsite')}
                </a>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Overview */}
            <section>
              <h3 className="text-sm font-bold text-on-surface mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">info</span>
                {t('schemeOverview')}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {scheme.fullOverview || scheme.description}
              </p>
            </section>

            {/* Why this matches */}
            {scheme.matchReasons && scheme.matchReasons.length > 0 && (
              <section className="p-3 bg-green-500/5 border border-green-500/15 rounded-xl">
                <h3 className="text-sm font-bold text-on-surface mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-green-600">verified</span>
                  {t('whyThisMatches')}
                </h3>
                <div className="space-y-1.5">
                  {scheme.matchReasons.map((reason, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-600 text-[14px]">check_circle</span>
                      <span className="text-sm text-on-surface">{t(reason) || reason}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Benefits */}
            {scheme.benefits && scheme.benefits.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-on-surface mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">star</span>
                  {t('schemeBenefits')}
                </h3>
                <ul className="space-y-1.5">
                  {scheme.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-[14px] mt-0.5">check</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Eligibility */}
            <section>
              <h3 className="text-sm font-bold text-on-surface mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">checklist</span>
                {t('schemeEligibility')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scheme.ageRequirements && (
                  <div className="p-3 bg-surface border border-outline-variant rounded-xl">
                    <div className="text-[10px] font-semibold text-on-surface-variant uppercase mb-1">{t('ageRequirement')}</div>
                    <div className="text-sm font-medium text-on-surface">{scheme.ageRequirements}</div>
                  </div>
                )}
                {scheme.locationRequirements && (
                  <div className="p-3 bg-surface border border-outline-variant rounded-xl">
                    <div className="text-[10px] font-semibold text-on-surface-variant uppercase mb-1">{t('locationRequirement')}</div>
                    <div className="text-sm font-medium text-on-surface">{scheme.locationRequirements}</div>
                  </div>
                )}
                {scheme.incomeRequirements && (
                  <div className="p-3 bg-surface border border-outline-variant rounded-xl">
                    <div className="text-[10px] font-semibold text-on-surface-variant uppercase mb-1">{t('incomeRequirement')}</div>
                    <div className="text-sm font-medium text-on-surface">{scheme.incomeRequirements}</div>
                  </div>
                )}
              </div>
              {scheme.eligibility && scheme.eligibility.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {scheme.eligibility.map((e, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="text-on-surface-variant">•</span>
                      {e}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Required Documents */}
            {scheme.requiredDocs && scheme.requiredDocs.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-on-surface mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                  {t('schemeDocuments')}
                </h3>
                <div className="space-y-1.5">
                  {scheme.requiredDocs.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-on-surface-variant text-[14px]">task_alt</span>
                      {doc}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Application Process */}
            {(scheme.applicationSteps || scheme.applicationProcess) && (
              <section>
                <h3 className="text-sm font-bold text-on-surface mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">route</span>
                  {t('schemeProcess')}
                </h3>
                {scheme.applicationSteps ? (
                  <ol className="space-y-2">
                    {scheme.applicationSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-on-surface-variant">{scheme.applicationProcess}</p>
                )}
              </section>
            )}

            {/* Important Information */}
            <section className="p-3 bg-surface border border-outline-variant rounded-xl">
              <h3 className="text-sm font-bold text-on-surface mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">info</span>
                {t('schemeImportant')}
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-on-surface-variant font-medium mb-0.5">{t('applicationDeadline')}</div>
                  <div className="text-on-surface font-semibold">{scheme.deadline || 'Open'}</div>
                </div>
                <div>
                  <div className="text-on-surface-variant font-medium mb-0.5">{t('responsibleAuthority')}</div>
                  <div className="text-on-surface font-semibold">{scheme.providerName}</div>
                </div>
                <div>
                  <div className="text-on-surface-variant font-medium mb-0.5">{t('schemeStatus')}</div>
                  <div className="text-on-surface font-semibold capitalize">{scheme.status || 'Active'}</div>
                </div>
                <div>
                  <div className="text-on-surface-variant font-medium mb-0.5">{t('lastUpdated')}</div>
                  <div className="text-on-surface font-semibold">{scheme.lastUpdatedDate || '—'}</div>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <p className="text-[11px] text-on-surface-variant leading-relaxed p-3 bg-surface-variant/30 rounded-lg">
              {t('safetyDisclaimer')}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
