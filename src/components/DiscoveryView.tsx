import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scheme, UserProfile, LanguageCode, StartedScheme } from '../types';
import { getTranslation } from '../i18n/translations';
import { SCHEME_CATEGORIES_GOV, SCHEME_CATEGORIES_PRIVATE } from '../data/mockData';
import { computeAllMatches } from '../utils/matchingEngine';
import { 
  Search, Landmark, Building2, Bookmark, BookmarkCheck, Play, Check, 
  ChevronDown, Filter, LayoutGrid, Sparkles, CreditCard, ExternalLink, Layers
} from 'lucide-react';

interface DiscoveryViewProps {
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

const ITEMS_PER_PAGE = 12;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({
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
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'best' | 'highest' | 'recent' | 'deadline'>('best');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const t = (key: string) => getTranslation(key, currentLanguage);

  const categories = useMemo(() => {
    if (typeFilter === 'government') return ['All Categories', ...SCHEME_CATEGORIES_GOV];
    if (typeFilter === 'private') return ['All Categories', ...SCHEME_CATEGORIES_PRIVATE];
    return ['All Categories', ...SCHEME_CATEGORIES_GOV, ...SCHEME_CATEGORIES_PRIVATE];
  }, [typeFilter]);

  const filteredSchemes = useMemo(() => {
    let result = computeAllMatches(userProfile, schemes.filter(s => s.country?.toLowerCase() === 'india' || !s.country));

    if (typeFilter !== 'all') result = result.filter(s => s.type === typeFilter);
    if (selectedCategory !== 'All Categories') {
      result = result.filter(s => s.category === selectedCategory || s.schemeCategory === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.providerName.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'highest') result.sort((a, b) => b.matchScore - a.matchScore);
    if (sortBy === 'deadline') result.sort((a, b) => a.deadline.localeCompare(b.deadline));

    return result;
  }, [schemes, userProfile, typeFilter, selectedCategory, searchQuery, sortBy]);

  const visibleSchemes = filteredSchemes.slice(0, visibleCount);
  const isStarted = (id: string) => startedSchemes.some(s => s.schemeId === id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mb-3">
          {t('exploreTitle')}
        </h1>
        <p className="text-base text-on-surface-variant max-w-2xl">{t('exploreSubtitle')}</p>
      </div>

      {/* Advanced Filters */}
      <div className="bg-surface-container border border-outline rounded-2xl p-5 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="flex flex-col gap-5 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            
            {/* Type tabs */}
            <div className="flex p-1 bg-surface-container-low rounded-xl border border-outline">
              {(['all', 'government', 'private'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => { setTypeFilter(type); setSelectedCategory('All Categories'); setVisibleCount(ITEMS_PER_PAGE); }}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    typeFilter === type
                      ? 'bg-surface-container-highest shadow-md text-on-surface border border-outline'
                      : 'text-on-surface-muted hover:text-on-surface hover:bg-surface-hover border border-transparent'
                  }`}
                >
                  {type === 'government' && <Landmark size={14} />}
                  {type === 'private' && <Building2 size={14} />}
                  {type === 'all' && <LayoutGrid size={14} />}
                  {type === 'all' ? t('filterAll') : type === 'government' ? t('filterGovernment') : t('filterPrivate')}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted group-focus-within:text-on-surface transition-colors" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
                placeholder={t('searchSchemes')}
                className="w-full pl-11 pr-4 py-2.5 bg-surface border border-outline rounded-xl text-sm text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:ring-2 focus:ring-outline-focus focus:border-outline-focus transition-all"
              />
            </div>

            {/* Sort */}
            <div className="relative w-full lg:w-48 group">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted" size={16} />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full appearance-none pl-11 pr-10 py-2.5 bg-surface border border-outline rounded-xl text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-outline-focus focus:border-outline-focus transition-all cursor-pointer"
              >
                <option className="bg-surface text-on-surface" value="best">{t('sortBestMatch')}</option>
                <option className="bg-surface text-on-surface" value="highest">{t('sortHighestMatch')}</option>
                <option className="bg-surface text-on-surface" value="recent">{t('sortRecentlyAdded')}</option>
                <option className="bg-surface text-on-surface" value="deadline">{t('sortDeadline')}</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-muted pointer-events-none" size={16} />
            </div>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 12).map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 border ${
                  selectedCategory === cat
                    ? 'bg-secondary/20 text-secondary border-secondary/30 shadow-[0_0_15px_rgba(14,165,233,0.15)]'
                    : 'bg-surface-container border-outline text-on-surface-muted hover:text-on-surface hover:bg-surface-hover'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm font-medium text-on-surface-muted mb-6 flex items-center gap-2">
        <Sparkles size={16} className="text-secondary" />
        {t('showingResults').replace('{count}', String(filteredSchemes.length))}
      </p>

      {/* Scheme Grid */}
      <AnimatePresence mode="wait">
        {visibleSchemes.length > 0 ? (
          <motion.div 
            key="grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {visibleSchemes.map(scheme => {
              const isHighMatch = scheme.matchScore >= 80;
              return (
                <motion.div
                  key={scheme.id}
                  variants={itemVariants}
                  className="group glass-card rounded-xl p-5 flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Badges */}
                  <div className="flex items-start justify-between gap-2 mb-4 relative z-10">
                    <div className="flex flex-col gap-2 items-start">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider ${
                        scheme.type === 'government' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {scheme.type === 'government' ? <Landmark size={12} /> : <Building2 size={12} />}
                        {scheme.type === 'government' ? t('govBadge') : t('privateBadge')}
                      </span>
                      <span className="text-[10px] font-semibold text-on-surface-variant bg-surface-container px-2 py-1 rounded border border-outline">
                        {scheme.category}
                      </span>
                    </div>
                    <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border shadow-sm ${
                      isHighMatch ? 'bg-secondary/20 text-secondary border-secondary/30 shadow-[0_0_10px_rgba(14,165,233,0.3)]' :
                      scheme.matchScore >= 60 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-surface-variant text-on-surface-variant border-outline'
                    }`}>
                      {scheme.matchScore}%
                    </span>
                  </div>

                  {/* Title + Desc */}
                  <h3
                    className="text-base font-bold text-on-background mb-2 line-clamp-2 cursor-pointer group-hover:text-primary transition-colors relative z-10"
                    onClick={() => onOpenSchemeDetail(scheme)}
                  >
                    {scheme.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant mb-4 line-clamp-3 flex-1 relative z-10">{scheme.description}</p>

                  {/* Amount */}
                  {scheme.amountFormatted && (
                    <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-on-surface bg-surface-container p-2.5 rounded-xl border border-outline relative z-10">
                      <CreditCard className="text-secondary" size={16} />
                      {scheme.amountFormatted}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-outline mt-auto relative z-10">
                    <button
                      onClick={() => onOpenSchemeDetail(scheme)}
                      className="flex-1 py-2.5 text-xs font-bold text-on-surface bg-surface-container hover:bg-surface-hover rounded-xl transition-all border border-outline hover:border-outline-focus flex justify-center items-center gap-1.5"
                    >
                      <ExternalLink size={14} />
                      {t('viewDetails')}
                    </button>
                    
                    <button
                      onClick={() => onToggleSave(scheme.id)}
                      className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-xl transition-all border ${
                        scheme.saved 
                          ? 'text-secondary bg-secondary/10 border-secondary/30 shadow-[0_0_10px_rgba(14,165,233,0.2)]' 
                          : 'text-on-surface-muted hover:text-on-surface bg-surface-container hover:bg-surface-hover border-outline'
                      }`}
                    >
                      {scheme.saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                    </button>
                    
                    {onToggleCompare && (
                      <button
                        onClick={() => onToggleCompare(scheme)}
                        className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-xl transition-all border ${
                          comparisonSchemes.some(s => s.id === scheme.id)
                            ? 'text-primary bg-primary/20 border-primary/40 shadow-sm'
                            : 'text-on-surface-muted hover:text-on-surface bg-surface-container hover:bg-surface-hover border-outline'
                        }`}
                        title="Compare Scheme"
                      >
                        <Layers size={18} />
                      </button>
                    )}
                    
                    <button
                      onClick={() => onStartApplication(scheme)}
                      disabled={isStarted(scheme.id)}
                      className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border ${
                        isStarted(scheme.id)
                          ? 'bg-surface-container text-on-surface-muted border-outline cursor-default'
                          : 'bg-secondary text-white hover:bg-secondary/90 border-secondary shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.23)] hover:-translate-y-0.5'
                      }`}
                    >
                      {isStarted(scheme.id) ? <Check size={14} /> : <Play size={14} className="ml-0.5" />}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center py-24 px-4 border border-outline border-dashed rounded-2xl bg-surface-container-low"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-container mb-4">
              <Search className="text-on-surface-muted" size={32} />
            </div>
            <h3 className="text-lg font-bold text-on-background mb-2">{t('noMatchesFound')}</h3>
            <p className="text-sm text-on-surface-muted max-w-md mx-auto">{t('noMatchesSubtitle')}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {visibleCount < filteredSchemes.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
            className="px-8 py-3 text-sm font-bold text-on-surface border border-outline bg-surface-container rounded-full hover:bg-surface-hover transition-all hover:scale-105 active:scale-95"
          >
            {t('loadMore')}
          </button>
        </div>
      )}
    </motion.div>
  );
};
