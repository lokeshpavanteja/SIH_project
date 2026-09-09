import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Scheme, UserProfile, LanguageCode, StartedScheme } from '../types';
import { getTranslation } from '../i18n/translations';
import { computeAllMatches } from '../utils/matchingEngine';

interface RecommendedViewProps {
  schemes: Scheme[];
  userProfile: UserProfile;
  currentLanguage: LanguageCode;
  onOpenSchemeDetail: (scheme: Scheme) => void;
  onToggleSave: (schemeId: string) => void;
  onStartApplication: (scheme: Scheme) => void;
  startedSchemes: StartedScheme[];
}

export const RecommendedView: React.FC<RecommendedViewProps> = ({
  schemes,
  userProfile,
  currentLanguage,
  onOpenSchemeDetail,
  onToggleSave,
  onStartApplication,
  startedSchemes,
}) => {
  const [typeFilter, setTypeFilter] = useState<'all' | 'government' | 'private'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'best' | 'highest' | 'deadline'>('best');
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const t = (key: string) => getTranslation(key, currentLanguage);

  const matchedSchemes = useMemo(() => {
    const matched = computeAllMatches(userProfile, schemes.filter(s => s.country?.toLowerCase() === 'india' || !s.country));
    return matched.filter(s => {
      if (typeFilter !== 'all' && s.type !== typeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!s.title.toLowerCase().includes(q) && !s.description.toLowerCase().includes(q) && !s.category.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [schemes, userProfile, typeFilter, searchQuery, sortBy]);

  const govSchemes = matchedSchemes.filter(s => s.type === 'government').slice(0, 8);
  const privateSchemes = matchedSchemes.filter(s => s.type === 'private').slice(0, 6);

  const isStarted = (schemeId: string) => startedSchemes.some(s => s.schemeId === schemeId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-on-surface mb-1.5">{t('recommendedTitle')}</h1>
        <p className="text-sm text-on-surface-variant max-w-2xl">{t('recommendedSubtitle')}</p>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        {/* Type tabs */}
        <div className="flex bg-surface-variant/60 p-0.5 rounded-lg">
          {(['all', 'government', 'private'] as const).map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                typeFilter === type
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {type === 'all' ? t('filterAll') : type === 'government' ? t('filterGovernment') : t('filterPrivate')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-xs">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchSchemes')}
            className="w-full pl-9 pr-3 py-2 bg-surface border border-outline-variant rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mb-6 p-3 bg-surface border border-outline-variant rounded-xl flex items-start gap-2.5">
        <span className="material-symbols-outlined text-[16px] text-on-surface-variant mt-0.5">info</span>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          {t('matchDisclaimer')} {t('eligibilityNote')}
        </p>
      </div>

      {/* Government Schemes Section */}
      {(typeFilter === 'all' || typeFilter === 'government') && govSchemes.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">account_balance</span>
            <div>
              <h2 className="text-base font-bold text-on-surface">{t('governmentSchemesTitle')}</h2>
              <p className="text-xs text-on-surface-variant">{t('governmentSchemesSubtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {govSchemes.map(scheme => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                currentLanguage={currentLanguage}
                onView={() => onOpenSchemeDetail(scheme)}
                onSave={() => onToggleSave(scheme.id)}
                onStart={() => onStartApplication(scheme)}
                isStarted={isStarted(scheme.id)}
                expandedMatch={expandedMatch}
                onToggleMatch={setExpandedMatch}
              />
            ))}
          </div>
        </section>
      )}

      {/* Private Schemes Section */}
      {(typeFilter === 'all' || typeFilter === 'private') && privateSchemes.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">business</span>
            <div>
              <h2 className="text-base font-bold text-on-surface">{t('privateSchemesTitle')}</h2>
              <p className="text-xs text-on-surface-variant">{t('privateSchemesSubtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {privateSchemes.map(scheme => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                currentLanguage={currentLanguage}
                onView={() => onOpenSchemeDetail(scheme)}
                onSave={() => onToggleSave(scheme.id)}
                onStart={() => onStartApplication(scheme)}
                isStarted={isStarted(scheme.id)}
                expandedMatch={expandedMatch}
                onToggleMatch={setExpandedMatch}
              />
            ))}
          </div>
        </section>
      )}

      {matchedSchemes.length === 0 && (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-[40px] text-on-surface-variant/40 mb-3 block">search_off</span>
          <h3 className="text-base font-semibold text-on-surface mb-1">{t('noMatchesFound')}</h3>
          <p className="text-sm text-on-surface-variant">{t('noMatchesSubtitle')}</p>
        </div>
      )}
    </motion.div>
  );
};

// ─── Scheme Card Component ───────────────────────────────────────
interface SchemeCardProps {
  scheme: Scheme;
  currentLanguage: LanguageCode;
  onView: () => void;
  onSave: () => void;
  onStart: () => void;
  isStarted: boolean;
  expandedMatch: string | null;
  onToggleMatch: (id: string | null) => void;
}

const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  currentLanguage,
  onView,
  onSave,
  onStart,
  isStarted,
  expandedMatch,
  onToggleMatch,
}) => {
  const t = (key: string) => getTranslation(key, currentLanguage);
  const isGov = scheme.type === 'government';
  const isExpanded = expandedMatch === scheme.id;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-outline transition-all">
      {/* Top row: badges + match */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
            isGov ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20' : 'bg-blue-500/10 text-blue-700 border border-blue-500/20'
          }`}>
            <span className="material-symbols-outlined text-[11px]">{isGov ? 'account_balance' : 'business'}</span>
            {isGov ? t('govBadge') : t('privateBadge')}
          </span>
          <span className="text-[10px] text-on-surface-variant px-1.5 py-0.5 bg-surface-variant rounded-md">
            {scheme.category}
          </span>
        </div>

        {/* Match score */}
        <div className="flex items-center gap-1 shrink-0">
          <div className={`text-xs font-bold px-2 py-1 rounded-lg ${
            scheme.matchScore >= 80 ? 'bg-green-500/10 text-green-700' :
            scheme.matchScore >= 60 ? 'bg-amber-500/10 text-amber-700' :
            'bg-surface-variant text-on-surface-variant'
          }`}>
            {scheme.matchScore}% {t('estimatedMatch').split(' ').slice(0, 1).join('')}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-on-surface mb-1.5 line-clamp-2 cursor-pointer hover:text-primary transition-colors" onClick={onView}>
        {scheme.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-on-surface-variant mb-3 line-clamp-2">{scheme.description}</p>

      {/* Key benefit */}
      {scheme.benefits && scheme.benefits.length > 0 && (
        <div className="flex items-start gap-1.5 mb-3">
          <span className="material-symbols-outlined text-primary text-[14px] mt-0.5">verified</span>
          <span className="text-xs text-on-surface">{scheme.benefits[0]}</span>
        </div>
      )}

      {/* Why matches (expandable) */}
      {scheme.matchReasons && scheme.matchReasons.length > 0 && (
        <div className="mb-3">
          <button
            onClick={() => onToggleMatch(isExpanded ? null : scheme.id)}
            className="text-[11px] font-medium text-primary hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[13px]">{isExpanded ? 'expand_less' : 'expand_more'}</span>
            {t('whyThisMatches')}
          </button>
          {isExpanded && (
            <div className="mt-2 space-y-1 pl-1">
              {scheme.matchReasons.map((reason, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-green-600 text-[13px]">check_circle</span>
                  <span className="text-xs text-on-surface">{t(reason) || reason}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2.5 border-t border-outline-variant/60">
        <button
          onClick={onView}
          className="flex-1 py-2 text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg transition-all flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-[14px]">visibility</span>
          {t('viewDetails')}
        </button>

        <button
          onClick={onSave}
          className={`py-2 px-3 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
            scheme.saved
              ? 'text-primary bg-primary/5 border border-primary/20'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">{scheme.saved ? 'bookmark' : 'bookmark_border'}</span>
          {scheme.saved ? t('savedScheme') : t('saveScheme')}
        </button>

        <button
          onClick={onStart}
          disabled={isStarted}
          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
            isStarted
              ? 'bg-surface-variant text-on-surface-variant cursor-default'
              : 'bg-primary text-on-primary hover:bg-primary/90'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">{isStarted ? 'check' : 'play_arrow'}</span>
          {isStarted ? t('statusStarted') : t('startApplication')}
        </button>
      </div>
    </div>
  );
};
