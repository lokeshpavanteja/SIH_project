import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scheme, UserProfile, LanguageCode, StartedScheme } from '../types';
import { getTranslation } from '../i18n/translations';
import { computeAllMatches } from '../utils/matchingEngine';
import { 
  Search, Info, Landmark, Building2, CheckCircle2, 
  Eye, Bookmark, BookmarkCheck, Play, Check, 
  ChevronDown, ChevronUp, ShieldCheck, Sparkles, AlertCircle, Layers
} from 'lucide-react';

interface RecommendedViewProps {
  schemes: Scheme[];
  userProfile: UserProfile;
  currentLanguage: LanguageCode;
  onOpenSchemeDetail: (scheme: Scheme) => void;
  onToggleSave: (schemeId: string) => void;
  onStartApplication: (scheme: Scheme) => void;
  startedSchemes: StartedScheme[];
  comparisonSchemes?: Scheme[];
  onToggleCompare?: (scheme: Scheme) => void;
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const RecommendedView: React.FC<RecommendedViewProps> = ({
  schemes,
  userProfile,
  currentLanguage,
  onOpenSchemeDetail,
  onToggleSave,
  onStartApplication,
  startedSchemes,
  comparisonSchemes = [],
  onToggleCompare,
}) => {
  const [typeFilter, setTypeFilter] = useState<'all' | 'government' | 'private'>('all');
  const [searchQuery, setSearchQuery] = useState('');
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
  }, [schemes, userProfile, typeFilter, searchQuery]);

  const govSchemes = matchedSchemes.filter(s => s.type === 'government').slice(0, 8);
  const privateSchemes = matchedSchemes.filter(s => s.type === 'private').slice(0, 6);

  const isStarted = (schemeId: string) => startedSchemes.some(s => s.schemeId === schemeId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-black tracking-tight mb-3">
          {t('recommendedTitle')}
        </h1>
        <p className="text-base text-on-surface-variant max-w-2xl">{t('recommendedSubtitle')}</p>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        {/* Type tabs (Segmented Control style) */}
        <div className="flex p-1 bg-surface-container-low rounded-xl border border-outline backdrop-blur-sm shadow-inner">
          {(['all', 'government', 'private'] as const).map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                typeFilter === type
                  ? 'bg-surface-container-highest text-on-surface shadow-sm'
                  : 'text-on-surface-muted hover:text-on-surface hover:bg-surface-hover border border-transparent'
              }`}
            >
              {type === 'all' ? t('filterAll') : type === 'government' ? t('filterGovernment') : t('filterPrivate')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-md group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-muted group-focus-within:text-on-surface transition-colors" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchSchemes')}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline rounded-xl text-sm text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:ring-2 focus:ring-outline-focus focus:border-outline-focus focus:bg-surface transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mb-10 p-4 bg-surface-container border border-outline rounded-xl flex items-start gap-3 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <Info className="text-on-surface mt-0.5 shrink-0" size={20} />
        <p className="text-sm text-on-surface-variant leading-relaxed">
          <span className="font-semibold text-on-surface mr-1">Match Insights:</span>
          {t('matchDisclaimer')} {t('eligibilityNote')}
        </p>
      </div>

      {/* Government Schemes Section */}
      <AnimatePresence mode="wait">
        {(typeFilter === 'all' || typeFilter === 'government') && govSchemes.length > 0 && (
          <motion.section 
            key="gov"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-outline pb-3">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <Landmark className="text-amber-500" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-on-background tracking-tight">{t('governmentSchemesTitle')}</h2>
                <p className="text-sm text-on-surface-muted">{t('governmentSchemesSubtitle')}</p>
              </div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {govSchemes.map(scheme => (
                <motion.div key={scheme.id} variants={itemVariants}>
                  <SchemeCard
                    scheme={scheme}
                    currentLanguage={currentLanguage}
                    onView={() => onOpenSchemeDetail(scheme)}
                    onSave={() => onToggleSave(scheme.id)}
                    onStart={() => onStartApplication(scheme)}
                    isStarted={isStarted(scheme.id)}
                    expandedMatch={expandedMatch}
                    onToggleMatch={setExpandedMatch}
                    isCompared={comparisonSchemes.some(s => s.id === scheme.id)}
                    onToggleCompare={onToggleCompare ? () => onToggleCompare(scheme) : undefined}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Private Schemes Section */}
      <AnimatePresence mode="wait">
        {(typeFilter === 'all' || typeFilter === 'private') && privateSchemes.length > 0 && (
          <motion.section 
            key="private"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-outline pb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Building2 className="text-blue-400" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-on-background tracking-tight">{t('privateSchemesTitle')}</h2>
                <p className="text-sm text-on-surface-muted">{t('privateSchemesSubtitle')}</p>
              </div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {privateSchemes.map(scheme => (
                <motion.div key={scheme.id} variants={itemVariants}>
                  <SchemeCard
                    scheme={scheme}
                    currentLanguage={currentLanguage}
                    onView={() => onOpenSchemeDetail(scheme)}
                    onSave={() => onToggleSave(scheme.id)}
                    onStart={() => onStartApplication(scheme)}
                    isStarted={isStarted(scheme.id)}
                    expandedMatch={expandedMatch}
                    onToggleMatch={setExpandedMatch}
                    isCompared={comparisonSchemes.some(s => s.id === scheme.id)}
                    onToggleCompare={onToggleCompare ? () => onToggleCompare(scheme) : undefined}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {matchedSchemes.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-center py-24 px-4 border border-outline border-dashed rounded-2xl bg-surface-container-low"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-container mb-4">
            <AlertCircle className="text-on-surface-muted" size={32} />
          </div>
          <h3 className="text-lg font-bold text-on-background mb-2">{t('noMatchesFound')}</h3>
          <p className="text-sm text-on-surface-muted max-w-md mx-auto">{t('noMatchesSubtitle')}</p>
        </motion.div>
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
  isCompared?: boolean;
  onToggleCompare?: () => void;
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
  isCompared,
  onToggleCompare,
}) => {
  const t = (key: string) => getTranslation(key, currentLanguage);
  const isGov = scheme.type === 'government';
  const isExpanded = expandedMatch === scheme.id;
  const isHighMatch = scheme.matchScore >= 80;

  return (
    <div className="group glass-card rounded-xl p-5 flex flex-col h-full relative overflow-hidden">
      {/* Subtle hover gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top row: badges + match */}
      <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
            isGov ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
          }`}>
            {isGov ? <Landmark size={12} /> : <Building2 size={12} />}
            {isGov ? t('govBadge') : t('privateBadge')}
          </span>
          <span className="text-[10px] font-semibold text-on-surface-variant px-2 py-1 bg-surface-container border border-outline rounded-md tracking-wider uppercase">
            {scheme.category}
          </span>
        </div>

        {/* Match score Badge */}
        <div className={`flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full border shadow-sm ${
          isHighMatch 
            ? 'bg-surface-container-highest text-on-surface border-outline-focus' 
            : scheme.matchScore >= 60 ? 'bg-secondary/10 text-secondary border-secondary/20' 
            : 'bg-surface-variant text-on-surface-variant border-outline'
        }`}>
          {isHighMatch && <Sparkles size={12} className="animate-pulse" />}
          <span className="text-xs font-black">{scheme.matchScore}%</span>
        </div>
      </div>

      {/* Title */}
      <h3 
        className="text-lg font-bold text-on-background mb-2 line-clamp-2 cursor-pointer group-hover:text-primary transition-colors leading-tight relative z-10" 
        onClick={onView}
      >
        {scheme.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-on-surface-variant mb-4 line-clamp-2 leading-relaxed relative z-10 flex-1">
        {scheme.description}
      </p>

      {/* Key benefit */}
      {scheme.benefits && scheme.benefits.length > 0 && (
        <div className="flex items-start gap-2 mb-4 p-2.5 bg-surface-container rounded-xl border border-outline relative z-10">
          <ShieldCheck className="text-on-surface mt-0.5 shrink-0" size={16} />
          <span className="text-xs font-medium text-on-surface-muted leading-relaxed line-clamp-2">{scheme.benefits[0]}</span>
        </div>
      )}

      {/* Why matches (expandable) */}
      {scheme.matchReasons && scheme.matchReasons.length > 0 && (
        <div className="mb-5 relative z-10">
          <button
            onClick={() => onToggleMatch(isExpanded ? null : scheme.id)}
            className="text-xs font-semibold text-on-surface hover:text-on-surface flex items-center gap-1.5 transition-colors w-full p-2 hover:bg-surface-hover rounded-lg -ml-2"
          >
            <div className="bg-surface-container p-0.5 rounded">
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
            {t('whyThisMatches')}
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-2 pl-2 border-l-2 border-outline py-1">
                  {scheme.matchReasons.map((reason, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="text-secondary mt-0.5 shrink-0" size={14} />
                      <span className="text-xs text-on-surface-variant leading-relaxed">{t(reason) || reason}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 mt-auto border-t border-outline relative z-10">
        <button
          onClick={onView}
          className="flex-1 py-2.5 text-xs font-bold text-on-surface bg-surface-container hover:bg-surface-hover rounded-xl transition-all flex items-center justify-center gap-2 border border-outline hover:border-outline-focus"
        >
          <Eye size={16} />
          {t('viewDetails')}
        </button>

        <button
          onClick={onSave}
          className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-xl transition-all border ${
            scheme.saved
              ? 'text-secondary bg-secondary/10 border-secondary/30 shadow-[0_0_10px_rgba(14,165,233,0.2)]'
              : 'text-on-surface-muted hover:text-on-surface bg-surface-container hover:bg-surface-hover border-outline'
          }`}
          title={scheme.saved ? t('savedScheme') : t('saveScheme')}
        >
          {scheme.saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>

        {onToggleCompare && (
          <button
            onClick={onToggleCompare}
            className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-xl transition-all border ${
              isCompared
                ? 'text-primary bg-primary/20 border-primary/40 shadow-sm'
                : 'text-on-surface-muted hover:text-on-surface bg-surface-container hover:bg-surface-hover border-outline'
            }`}
            title="Compare Scheme"
          >
            <Layers size={18} />
          </button>
        )}

        <button
          onClick={onStart}
          disabled={isStarted}
          className={`py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center gap-2 border ${
            isStarted
              ? 'bg-surface-container text-on-surface-muted border-outline cursor-default'
              : 'bg-primary text-on-primary hover:bg-primary-hover border-primary shadow-sm'
          }`}
        >
          {isStarted ? <Check size={16} /> : <Play size={16} className="ml-0.5" />}
          {isStarted ? t('statusStarted') : t('startApplication')}
        </button>
      </div>
    </div>
  );
};
