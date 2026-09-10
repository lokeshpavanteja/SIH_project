import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { LanguageCode, supportedLanguages, getTranslation } from '../i18n/translations';
import { Sparkles, Search, Check, Info, ArrowRight } from 'lucide-react';

interface LanguageSelectionProps {
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onContinue: () => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onContinue,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return supportedLanguages;
    const q = searchQuery.toLowerCase();
    return supportedLanguages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const t = (key: string) => getTranslation(key, selectedLanguage);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Brand header */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-on-primary shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-primary/20">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-on-background tracking-tight">
              MatchWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-black tracking-tight">AI</span>
            </h1>
            <p className="text-xs text-on-surface-muted font-bold tracking-widest uppercase mt-0.5">
              Enterprise Scheme Discovery
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="glass-panel border border-outline rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-background mb-2">
              {t('selectLanguageTitle')}
            </h2>
            <p className="text-sm text-on-surface-variant max-w-md mx-auto">
              {t('selectLanguageSubtitle')}
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted group-focus-within:text-on-surface transition-colors" size={18} />
            <input
              id="input-search-languages"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchLanguages')}
              className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline rounded-xl text-sm text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-outline-focus transition-all shadow-inner"
            />
          </div>

          {/* Language Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredLanguages.map((lang) => {
              const isSelected = selectedLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  id={`lang-btn-${lang.code}`}
                  onClick={() => onSelectLanguage(lang.code)}
                  type="button"
                  className={`relative flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-outline-focus bg-surface-container-highest shadow-[0_0_15px_rgba(139,92,246,0.15)] scale-[1.02]'
                      : 'border-outline bg-surface-container hover:bg-surface-hover hover:border-outline-focus'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className={`text-base font-bold leading-tight ${isSelected ? 'text-on-surface' : 'text-on-surface'}`}>
                      {lang.nativeName}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                        <Check size={14} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-on-surface-muted font-medium">{lang.name}</span>
                </button>
              );
            })}
          </div>

          {filteredLanguages.length === 0 && (
            <div className="text-center py-10 text-sm text-on-surface-muted bg-surface-container rounded-xl border border-outline border-dashed">
              No languages found matching "{searchQuery}"
            </div>
          )}

          {/* Continue */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-outline">
            <p className="text-xs text-on-surface-muted flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface shrink-0">
                <Info size={14} />
              </span>
              <span>{t('languageChangeNote')}</span>
            </p>

            <button
              id="btn-language-continue"
              onClick={onContinue}
              className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-hover text-on-primary font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-105 active:scale-95"
            >
              <span>{t('continueButton')}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
