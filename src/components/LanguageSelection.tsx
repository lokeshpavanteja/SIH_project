import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { LanguageCode, supportedLanguages, getTranslation } from '../i18n/translations';

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
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        {/* Brand header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-sm">
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-on-surface tracking-tight">
              MatchWise <span className="text-primary">AI</span>
            </h1>
            <p className="text-[10px] text-on-surface-variant font-medium tracking-wide uppercase">
              Scheme Discovery & Guidance
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 sm:p-8 shadow-ambient">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface mb-1.5">
              {t('selectLanguageTitle')}
            </h2>
            <p className="text-sm text-on-surface-variant max-w-md mx-auto">
              {t('selectLanguageSubtitle')}
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              id="input-search-languages"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchLanguages')}
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-outline-variant rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Language Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 mb-6 max-h-[400px] overflow-y-auto pr-1">
            {filteredLanguages.map((lang) => {
              const isSelected = selectedLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  id={`lang-btn-${lang.code}`}
                  onClick={() => onSelectLanguage(lang.code)}
                  type="button"
                  className={`relative flex flex-col items-start p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                      : 'border-outline-variant bg-surface hover:bg-surface-variant/50 hover:border-outline'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="text-base font-bold text-on-surface leading-tight">
                      {lang.nativeName}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[13px]">check</span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-on-surface-variant">{lang.name}</span>
                </button>
              );
            })}
          </div>

          {filteredLanguages.length === 0 && (
            <div className="text-center py-8 text-sm text-on-surface-variant">
              No languages found matching "{searchQuery}"
            </div>
          )}

          {/* Continue */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-outline-variant">
            <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-primary">info</span>
              <span>{t('languageChangeNote')}</span>
            </p>

            <button
              id="btn-language-continue"
              onClick={onContinue}
              className="w-full sm:w-auto px-8 py-2.5 bg-primary hover:bg-primary/90 text-on-primary font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>{t('continueButton')}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
