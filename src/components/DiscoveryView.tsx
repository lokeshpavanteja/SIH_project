import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Scheme, UserProfile, LanguageCode, StartedScheme } from '../types';
import { getTranslation } from '../i18n/translations';
import { SCHEME_CATEGORIES_GOV, SCHEME_CATEGORIES_PRIVATE } from '../data/mockData';
import { computeAllMatches } from '../utils/matchingEngine';

interface DiscoveryViewProps {
  schemes: Scheme[];
  userProfile: UserProfile;
  currentLanguage: LanguageCode;
  onOpenSchemeDetail: (scheme: Scheme) => void;
  onToggleSave: (schemeId: string) => void;
  onStartApplication: (scheme: Scheme) => void;
  startedSchemes: StartedScheme[];
}

const ITEMS_PER_PAGE = 12;

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({
  schemes,
  userProfile,
  currentLanguage,
  onOpenSchemeDetail,
  onToggleSave,
  onStartApplication,
  startedSchemes,
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-on-surface mb-1">{t('exploreTitle')}</h1>
        <p className="text-sm text-on-surface-variant">{t('exploreSubtitle')}</p>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Type tabs */}
          <div className="flex bg-surface-variant/60 p-0.5 rounded-lg">
            {(['all', 'government', 'private'] as const).map(type => (
              <button
                key={type}
                onClick={() => { setTypeFilter(type); setSelectedCategory('All Categories'); setVisibleCount(ITEMS_PER_PAGE); }}
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
          <div className="relative flex-1 w-full sm:max-w-sm">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              placeholder={t('searchSchemes')}
              className="w-full pl-9 pr-3 py-2 bg-surface border border-outline-variant rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-surface border border-outline-variant rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="best">{t('sortBestMatch')}</option>
            <option value="highest">{t('sortHighestMatch')}</option>
            <option value="recent">{t('sortRecentlyAdded')}</option>
            <option value="deadline">{t('sortDeadline')}</option>
          </select>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5">
          {categories.slice(0, 10).map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-surface border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-on-surface-variant mb-4">
        {t('showingResults').replace('{count}', String(filteredSchemes.length))}
      </p>

      {/* Scheme Grid */}
      {visibleSchemes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleSchemes.map(scheme => (
              <div
                key={scheme.id}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-outline transition-all flex flex-col"
              >
                {/* Badges */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                    scheme.type === 'government' ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20' : 'bg-blue-500/10 text-blue-700 border border-blue-500/20'
                  }`}>
                    {scheme.type === 'government' ? t('govBadge') : t('privateBadge')}
                  </span>
                  <span className="text-[10px] text-on-surface-variant bg-surface-variant px-1.5 py-0.5 rounded">
                    {scheme.category}
                  </span>
                  <span className={`ml-auto text-[11px] font-bold px-1.5 py-0.5 rounded ${
                    scheme.matchScore >= 80 ? 'bg-green-500/10 text-green-700' :
                    scheme.matchScore >= 60 ? 'bg-amber-500/10 text-amber-700' :
                    'bg-surface-variant text-on-surface-variant'
                  }`}>
                    {scheme.matchScore}%
                  </span>
                </div>

                {/* Title + Desc */}
                <h3
                  className="text-sm font-bold text-on-surface mb-1 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => onOpenSchemeDetail(scheme)}
                >
                  {scheme.title}
                </h3>
                <p className="text-xs text-on-surface-variant mb-3 line-clamp-2 flex-1">{scheme.description}</p>

                {/* Amount */}
                {scheme.amountFormatted && (
                  <div className="flex items-center gap-1.5 mb-3 text-xs text-on-surface">
                    <span className="material-symbols-outlined text-[14px] text-primary">payments</span>
                    {scheme.amountFormatted}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2.5 border-t border-outline-variant/60 mt-auto">
                  <button
                    onClick={() => onOpenSchemeDetail(scheme)}
                    className="flex-1 py-1.5 text-[11px] font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg transition-all"
                  >
                    {t('viewDetails')}
                  </button>
                  <button
                    onClick={() => onToggleSave(scheme.id)}
                    className={`py-1.5 px-2 text-[11px] font-medium rounded-lg transition-all flex items-center gap-1 ${
                      scheme.saved ? 'text-primary bg-primary/5' : 'text-on-surface-variant hover:bg-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">{scheme.saved ? 'bookmark' : 'bookmark_border'}</span>
                  </button>
                  <button
                    onClick={() => onStartApplication(scheme)}
                    disabled={isStarted(scheme.id)}
                    className={`py-1.5 px-2.5 text-[11px] font-semibold rounded-lg transition-all ${
                      isStarted(scheme.id)
                        ? 'bg-surface-variant text-on-surface-variant'
                        : 'bg-primary text-on-primary hover:bg-primary/90'
                    }`}
                  >
                    {isStarted(scheme.id) ? t('statusStarted') : t('startApplication')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < filteredSchemes.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                className="px-6 py-2.5 text-sm font-medium text-primary border border-primary/20 bg-primary/5 rounded-xl hover:bg-primary/10 transition-all"
              >
                {t('loadMore')}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-[40px] text-on-surface-variant/40 mb-3 block">search_off</span>
          <h3 className="text-base font-semibold text-on-surface mb-1">{t('noMatchesFound')}</h3>
          <p className="text-sm text-on-surface-variant">{t('noMatchesSubtitle')}</p>
        </div>
      )}
    </motion.div>
  );
};
