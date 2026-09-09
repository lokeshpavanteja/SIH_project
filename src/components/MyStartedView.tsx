import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scheme, StartedScheme, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';

interface MyStartedViewProps {
  schemes: Scheme[];
  startedSchemes: StartedScheme[];
  currentLanguage: LanguageCode;
  onOpenSchemeDetail: (scheme: Scheme) => void;
  onRemoveStarted: (id: string) => void;
  onUpdateStatus: (id: string, status: 'started' | 'in_progress' | 'ready_to_apply') => void;
  onToggleSave: (schemeId: string) => void;
}

export const MyStartedView: React.FC<MyStartedViewProps> = ({
  schemes,
  startedSchemes,
  currentLanguage,
  onOpenSchemeDetail,
  onRemoveStarted,
  onUpdateStatus,
  onToggleSave,
}) => {
  const [activeTab, setActiveTab] = useState<'started' | 'saved'>('started');

  const t = (key: string) => getTranslation(key, currentLanguage);

  const savedSchemes = schemes.filter(s => s.saved);
  const getScheme = (schemeId: string) => schemes.find(s => s.id === schemeId);

  const statusLabel = (status: string) => {
    if (status === 'started') return t('statusStarted');
    if (status === 'in_progress') return t('statusInProgress');
    if (status === 'ready_to_apply') return t('statusReadyToApply');
    return status;
  };

  const statusColor = (status: string) => {
    if (status === 'started') return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
    if (status === 'in_progress') return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
    if (status === 'ready_to_apply') return 'bg-green-500/10 text-green-700 border-green-500/20';
    return 'bg-surface-variant text-on-surface-variant';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-on-surface mb-1">{t('myStartedTitle')}</h1>
        <p className="text-sm text-on-surface-variant">{t('myStartedSubtitle')}</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-surface-variant/60 p-0.5 rounded-lg mb-6 w-fit">
        <button
          onClick={() => setActiveTab('started')}
          className={`px-4 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
            activeTab === 'started'
              ? 'bg-surface-container-lowest text-on-surface shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">play_circle</span>
          {t('startedTab')}
          {startedSchemes.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary">
              {startedSchemes.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
            activeTab === 'saved'
              ? 'bg-surface-container-lowest text-on-surface shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">bookmark</span>
          {t('savedTab')}
          {savedSchemes.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary">
              {savedSchemes.length}
            </span>
          )}
        </button>
      </div>

      {/* Started Schemes Tab */}
      {activeTab === 'started' && (
        <div>
          {startedSchemes.length === 0 ? (
            <div className="text-center py-16 bg-surface border border-outline-variant rounded-xl">
              <span className="material-symbols-outlined text-[40px] text-on-surface-variant/40 mb-3 block">inbox</span>
              <h3 className="text-base font-semibold text-on-surface mb-1">{t('emptyStarted')}</h3>
              <p className="text-sm text-on-surface-variant">{t('emptyStartedSubtitle')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {startedSchemes.map(started => {
                const scheme = getScheme(started.schemeId);
                if (!scheme) return null;
                return (
                  <div
                    key={started.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-outline transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                            scheme.type === 'government' ? 'bg-amber-500/10 text-amber-700' : 'bg-blue-500/10 text-blue-700'
                          }`}>
                            {scheme.type === 'government' ? t('govBadge') : t('privateBadge')}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${statusColor(started.status)}`}>
                            {statusLabel(started.status)}
                          </span>
                        </div>
                        <h3
                          className="text-sm font-bold text-on-surface mb-1 cursor-pointer hover:text-primary transition-colors truncate"
                          onClick={() => onOpenSchemeDetail(scheme)}
                        >
                          {scheme.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                            {t('startedOn')} {started.startedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">trending_up</span>
                            {started.progress}%
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-2 h-1.5 bg-surface-variant rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${started.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={started.status}
                          onChange={e => onUpdateStatus(started.id, e.target.value as any)}
                          className="px-2.5 py-1.5 text-xs font-medium bg-surface border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="started">{t('statusStarted')}</option>
                          <option value="in_progress">{t('statusInProgress')}</option>
                          <option value="ready_to_apply">{t('statusReadyToApply')}</option>
                        </select>

                        <button
                          onClick={() => onOpenSchemeDetail(scheme)}
                          className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg transition-all"
                          title={t('viewScheme')}
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>

                        <button
                          onClick={() => onRemoveStarted(started.id)}
                          className="p-2 text-on-surface-variant hover:text-error hover:bg-error/5 rounded-lg transition-all"
                          title={t('removeStarted')}
                        >
                          <span className="material-symbols-outlined text-[18px]">delete_outline</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Saved Schemes Tab */}
      {activeTab === 'saved' && (
        <div>
          {savedSchemes.length === 0 ? (
            <div className="text-center py-16 bg-surface border border-outline-variant rounded-xl">
              <span className="material-symbols-outlined text-[40px] text-on-surface-variant/40 mb-3 block">bookmark_border</span>
              <h3 className="text-base font-semibold text-on-surface mb-1">{t('emptySaved')}</h3>
              <p className="text-sm text-on-surface-variant">{t('emptySavedSubtitle')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedSchemes.map(scheme => (
                <div
                  key={scheme.id}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-outline transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          scheme.type === 'government' ? 'bg-amber-500/10 text-amber-700' : 'bg-blue-500/10 text-blue-700'
                        }`}>
                          {scheme.type === 'government' ? t('govBadge') : t('privateBadge')}
                        </span>
                        <span className="text-[10px] text-on-surface-variant bg-surface-variant px-1.5 py-0.5 rounded-md">
                          {scheme.category}
                        </span>
                      </div>
                      <h3
                        className="text-sm font-bold text-on-surface cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => onOpenSchemeDetail(scheme)}
                      >
                        {scheme.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{scheme.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onOpenSchemeDetail(scheme)}
                        className="px-3 py-1.5 text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg transition-all"
                      >
                        {t('viewDetails')}
                      </button>
                      <button
                        onClick={() => onToggleSave(scheme.id)}
                        className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all"
                        title="Remove saved"
                      >
                        <span className="material-symbols-outlined text-[18px]">bookmark</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
