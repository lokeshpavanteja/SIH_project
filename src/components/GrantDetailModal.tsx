import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scheme, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';
import { 
  X, Landmark, Building2, Bookmark, BookmarkCheck, Play, 
  ExternalLink, Info, Star, FileText, CheckCircle2, Check,
  Calendar, UserCheck, Shield, Clock, IndianRupee
} from 'lucide-react';

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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-surface border border-outline rounded-2xl shadow-2xl z-10 overflow-hidden max-h-full flex flex-col"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-surface-container border-b border-outline relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            
            <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                  isGov ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  {isGov ? <Landmark size={14} /> : <Building2 size={14} />}
                  {isGov ? t('govBadge') : t('privateBadge')}
                </span>
                <span className="text-xs font-semibold text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-lg border border-outline">
                  {scheme.category}
                </span>
                <span className={`text-xs font-black px-3 py-1.5 rounded-lg border shadow-sm flex items-center gap-1.5 ${
                  scheme.matchScore >= 80 ? 'bg-surface-container-highest text-on-surface border-outline-focus shadow-[0_0_15px_rgba(139,92,246,0.2)]' :
                  scheme.matchScore >= 60 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                  'bg-surface-variant text-on-surface-variant border-outline'
                }`}>
                  {scheme.matchScore}% {t('estimatedMatch')}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-surface-hover transition-colors text-on-surface-muted hover:text-on-surface bg-surface-container border border-outline"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-background mb-3 leading-tight relative z-10">
              {scheme.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-on-surface-variant mb-6 relative z-10">
              <span className="flex items-center gap-1.5"><Shield size={16} className="text-on-surface"/> {scheme.providerName}</span>
              {scheme.amountFormatted && (
                <>
                  <span className="text-on-surface/20">•</span>
                  <span className="text-on-surface flex items-center gap-1"><IndianRupee size={16} className="text-secondary"/> {scheme.amountFormatted}</span>
                </>
              )}
            </div>

            {/* Main Actions */}
            <div className="flex flex-wrap items-center gap-3 relative z-10">
              <button
                onClick={() => onStartApplication(scheme)}
                className="px-6 py-3 text-sm font-bold rounded-xl bg-primary text-on-primary hover:bg-primary-hover transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95"
              >
                <Play size={18} className="fill-current" />
                {t('startApplication')}
              </button>
              
              <button
                onClick={() => onToggleSave(scheme.id)}
                className={`px-5 py-3 text-sm font-bold rounded-xl border transition-all flex items-center gap-2 ${
                  scheme.saved
                    ? 'border-secondary/30 bg-secondary/10 text-secondary'
                    : 'border-outline bg-surface-container text-on-surface hover:bg-surface-hover'
                }`}
              >
                {scheme.saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                {scheme.saved ? t('savedScheme') : t('saveScheme')}
              </button>

              {scheme.officialWebsiteUrl && (
                <a
                  href={scheme.officialWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-sm font-bold rounded-xl border border-outline bg-surface-container text-on-surface hover:bg-surface-hover transition-all flex items-center gap-2 ml-auto"
                >
                  <ExternalLink size={18} />
                  {t('applyOnOfficialWebsite')}
                </a>
              )}
            </div>
          </div>

          {/* Body content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
            
            {/* Overview */}
            <section className="prose prose-invert max-w-none">
              <h3 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
                <Info className="text-on-surface" size={20} />
                {t('schemeOverview')}
              </h3>
              <p className="text-base text-on-surface-variant leading-relaxed">
                {scheme.fullOverview || scheme.description}
              </p>
            </section>

            {/* Why this matches */}
            {scheme.matchReasons && scheme.matchReasons.length > 0 && (
              <section className="p-5 bg-gradient-to-r from-primary/10 to-transparent border border-outline rounded-xl">
                <h3 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
                  <Star className="text-on-surface" size={18} />
                  {t('whyThisMatches')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scheme.matchReasons.map((reason, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={16} />
                      <span className="text-sm text-on-surface-variant font-medium">{t(reason) || reason}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Benefits */}
              {scheme.benefits && scheme.benefits.length > 0 && (
                <section>
                  <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                    <Star className="text-secondary" size={20} />
                    {t('schemeBenefits')}
                  </h3>
                  <ul className="space-y-3">
                    {scheme.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant bg-surface-container p-3 rounded-xl border border-outline">
                        <Check className="text-secondary shrink-0 mt-0.5" size={16} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Eligibility */}
              <section>
                <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                  <UserCheck className="text-secondary" size={20} />
                  {t('schemeEligibility')}
                </h3>
                <div className="flex flex-col gap-3">
                  {scheme.ageRequirements && (
                    <div className="p-3 bg-surface-container border border-outline rounded-xl flex items-center justify-between">
                      <span className="text-xs font-semibold text-on-surface-muted uppercase">{t('ageRequirement')}</span>
                      <span className="text-sm font-bold text-on-surface">{scheme.ageRequirements}</span>
                    </div>
                  )}
                  {scheme.locationRequirements && (
                    <div className="p-3 bg-surface-container border border-outline rounded-xl flex items-center justify-between">
                      <span className="text-xs font-semibold text-on-surface-muted uppercase">{t('locationRequirement')}</span>
                      <span className="text-sm font-bold text-on-surface">{scheme.locationRequirements}</span>
                    </div>
                  )}
                  {scheme.incomeRequirements && (
                    <div className="p-3 bg-surface-container border border-outline rounded-xl flex items-center justify-between">
                      <span className="text-xs font-semibold text-on-surface-muted uppercase">{t('incomeRequirement')}</span>
                      <span className="text-sm font-bold text-on-surface">{scheme.incomeRequirements}</span>
                    </div>
                  )}
                </div>
                {scheme.eligibility && scheme.eligibility.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {scheme.eligibility.map((e, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                        <div className="w-1.5 h-1.5 rounded-full bg-on-surface/30 mt-1.5 shrink-0" />
                        {e}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Required Documents */}
              {scheme.requiredDocs && scheme.requiredDocs.length > 0 && (
                <section>
                  <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                    <FileText className="text-on-surface" size={20} />
                    {t('schemeDocuments')}
                  </h3>
                  <div className="space-y-2">
                    {scheme.requiredDocs.map((doc, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-on-surface-variant bg-surface-container-low p-3 rounded-xl border border-outline">
                        <FileText className="text-on-surface-muted" size={16} />
                        <span className="font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Application Process */}
              {(scheme.applicationSteps || scheme.applicationProcess) && (
                <section>
                  <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                    <Clock className="text-on-surface" size={20} />
                    {t('schemeProcess')}
                  </h3>
                  {scheme.applicationSteps ? (
                    <ol className="relative border-l border-outline ml-3 space-y-6">
                      {scheme.applicationSteps.map((step, i) => (
                        <li key={i} className="pl-6 relative">
                          <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-surface-container-highest border border-outline text-on-surface text-xs font-black flex items-center justify-center">
                            {i + 1}
                          </span>
                          <p className="text-sm font-medium text-on-surface-variant pt-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-sm text-on-surface-variant p-4 bg-surface-container rounded-xl border border-outline">{scheme.applicationProcess}</p>
                  )}
                </section>
              )}
            </div>

            {/* Important Information Meta Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-surface-container-low border border-outline rounded-xl">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-muted uppercase mb-1">
                  <Calendar size={12} /> {t('applicationDeadline')}
                </div>
                <div className="text-sm font-bold text-on-surface">{scheme.deadline || 'Open'}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-muted uppercase mb-1">
                  <Shield size={12} /> {t('responsibleAuthority')}
                </div>
                <div className="text-sm font-bold text-on-surface truncate" title={scheme.providerName}>{scheme.providerName}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-muted uppercase mb-1">
                  <CheckCircle2 size={12} /> {t('schemeStatus')}
                </div>
                <div className="text-sm font-bold text-green-500 capitalize">{scheme.status || 'Active'}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-muted uppercase mb-1">
                  <Clock size={12} /> {t('lastUpdated')}
                </div>
                <div className="text-sm font-bold text-on-surface">{scheme.lastUpdatedDate || '—'}</div>
              </div>
            </section>

            {/* Disclaimer */}
            <p className="text-xs text-on-surface-muted text-center max-w-2xl mx-auto italic">
              {t('safetyDisclaimer')}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
