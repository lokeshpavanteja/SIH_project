import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scheme, StartedScheme, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';
import { 
  PlayCircle, Bookmark, Inbox, Landmark, Building2, 
  Calendar, TrendingUp, Eye, Trash2, BookmarkCheck
} from 'lucide-react';

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
    if (status === 'started') return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (status === 'in_progress') return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    if (status === 'ready_to_apply') return 'bg-green-500/10 text-green-400 border-green-500/20';
    return 'bg-surface-variant text-on-surface-variant';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-on-background mb-2 tracking-tight">{t('myStartedTitle')}</h1>
        <p className="text-sm text-on-surface-variant max-w-2xl">{t('myStartedSubtitle')}</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-surface-container-low p-1.5 rounded-xl border border-outline mb-8 w-fit shadow-inner">
        <button
          onClick={() => setActiveTab('started')}
          className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'started'
              ? 'bg-surface-container-highest text-on-surface shadow-md border border-outline'
              : 'text-on-surface-muted hover:text-on-surface hover:bg-surface-hover border border-transparent'
          }`}
        >
          <PlayCircle size={16} className={activeTab === 'started' ? 'text-on-surface' : ''} />
          {t('startedTab')}
          {startedSchemes.length > 0 && (
            <span className="ml-1 px-2 py-0.5 text-[10px] font-black rounded-full bg-surface-container-highest text-on-surface border border-outline-focus">
              {startedSchemes.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'saved'
              ? 'bg-surface-container-highest text-on-surface shadow-md border border-outline'
              : 'text-on-surface-muted hover:text-on-surface hover:bg-surface-hover border border-transparent'
          }`}
        >
          <Bookmark size={16} className={activeTab === 'saved' ? 'text-secondary' : ''} />
          {t('savedTab')}
          {savedSchemes.length > 0 && (
            <span className="ml-1 px-2 py-0.5 text-[10px] font-black rounded-full bg-secondary/20 text-secondary border border-secondary/30">
              {savedSchemes.length}
            </span>
          )}
        </button>
      </div>

      {/* Started Schemes Tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'started' && (
          <motion.div
            key="started"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {startedSchemes.length === 0 ? (
              <div className="text-center py-24 glass-panel border border-outline border-dashed rounded-2xl">
                <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6">
                  <Inbox size={40} className="text-on-surface-muted/50" />
                </div>
                <h3 className="text-xl font-bold text-on-background mb-2">{t('emptyStarted')}</h3>
                <p className="text-sm text-on-surface-muted max-w-sm mx-auto">{t('emptyStartedSubtitle')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {startedSchemes.map(started => {
                  const scheme = getScheme(started.schemeId);
                  if (!scheme) return null;
                  return (
                    <div
                      key={started.id}
                      className="glass-card rounded-xl p-5 hover:border-outline-focus transition-all flex flex-col group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="flex-1 mb-4 relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider ${
                            scheme.type === 'government' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          }`}>
                            {scheme.type === 'government' ? <Landmark size={12} /> : <Building2 size={12} />}
                            {scheme.type === 'government' ? t('govBadge') : t('privateBadge')}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider shadow-sm ${statusColor(started.status)}`}>
                            {statusLabel(started.status)}
                          </span>
                        </div>
                        <h3
                          className="text-base font-bold text-on-background mb-3 cursor-pointer hover:text-primary transition-colors line-clamp-2 leading-tight"
                          onClick={() => onOpenSchemeDetail(scheme)}
                        >
                          {scheme.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-on-surface-muted">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-on-surface-variant" />
                            {t('startedOn')} {started.startedDate}
                          </span>
                          <span className="flex items-center gap-1.5 text-on-surface">
                            <TrendingUp size={14} />
                            {started.progress}% Progress
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="h-2 bg-surface-container-low rounded-full overflow-hidden mb-5 border border-outline relative z-10">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${started.progress}%` }}
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between gap-3 pt-4 border-t border-outline relative z-10">
                        <select
                          value={started.status}
                          onChange={e => onUpdateStatus(started.id, e.target.value as any)}
                          className="px-3 py-2 text-xs font-bold bg-surface-container border border-outline rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-outline-focus cursor-pointer appearance-none flex-1 max-w-[160px]"
                        >
                          <option className="bg-surface text-on-surface" value="started">{t('statusStarted')}</option>
                          <option className="bg-surface text-on-surface" value="in_progress">{t('statusInProgress')}</option>
                          <option className="bg-surface text-on-surface" value="ready_to_apply">{t('statusReadyToApply')}</option>
                        </select>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onOpenSchemeDetail(scheme)}
                            className="p-2.5 text-on-surface-muted hover:text-on-surface bg-surface-container hover:bg-surface-hover rounded-xl border border-transparent hover:border-outline transition-all"
                            title={t('viewScheme')}
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            onClick={() => onRemoveStarted(started.id)}
                            className="p-2.5 text-on-surface-muted hover:text-error bg-surface-container hover:bg-error/10 rounded-xl border border-transparent hover:border-error transition-all"
                            title={t('removeStarted')}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Saved Schemes Tab */}
        {activeTab === 'saved' && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {savedSchemes.length === 0 ? (
              <div className="text-center py-24 glass-panel border border-outline border-dashed rounded-2xl">
                <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bookmark size={40} className="text-on-surface-muted/50" />
                </div>
                <h3 className="text-xl font-bold text-on-background mb-2">{t('emptySaved')}</h3>
                <p className="text-sm text-on-surface-muted max-w-sm mx-auto">{t('emptySavedSubtitle')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedSchemes.map(scheme => (
                  <div
                    key={scheme.id}
                    className="glass-card rounded-xl p-5 hover:border-outline-focus transition-all flex flex-col group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex-1 mb-4 relative z-10">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
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
                      <h3
                        className="text-base font-bold text-on-background cursor-pointer hover:text-secondary transition-colors line-clamp-2"
                        onClick={() => onOpenSchemeDetail(scheme)}
                      >
                        {scheme.title}
                      </h3>
                      <p className="text-sm text-on-surface-variant mt-2 line-clamp-2">{scheme.description}</p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-outline mt-auto relative z-10">
                      <button
                        onClick={() => onOpenSchemeDetail(scheme)}
                        className="flex-1 py-2 text-xs font-bold text-on-surface bg-surface-container hover:bg-surface-hover rounded-xl transition-all border border-transparent hover:border-outline-focus"
                      >
                        {t('viewDetails')}
                      </button>
                      <button
                        onClick={() => onToggleSave(scheme.id)}
                        className="p-2 text-secondary bg-secondary/10 border border-secondary/30 shadow-[0_0_10px_rgba(14,165,233,0.2)] rounded-xl transition-all hover:bg-secondary/20"
                        title="Remove saved"
                      >
                        <BookmarkCheck size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
