import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scheme, UserProfile, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';

interface SchemeCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSchemeA?: Scheme | null;
  initialSchemeB?: Scheme | null;
  allSchemes: Scheme[];
  userProfile: UserProfile;
  currentLanguage: LanguageCode;
}

export const SchemeCompareModal: React.FC<SchemeCompareModalProps> = ({
  isOpen,
  onClose,
  initialSchemeA,
  initialSchemeB,
  allSchemes,
  userProfile,
  currentLanguage,
}) => {
  const [selectedSchemeAId, setSelectedSchemeAId] = useState<string>('');
  const [selectedSchemeBId, setSelectedSchemeBId] = useState<string>('');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);

  useEffect(() => {
    if (initialSchemeA) {
      setSelectedSchemeAId(initialSchemeA.id);
    } else if (allSchemes.length > 0) {
      setSelectedSchemeAId(allSchemes[0].id);
    }

    if (initialSchemeB) {
      setSelectedSchemeBId(initialSchemeB.id);
    } else if (allSchemes.length > 1) {
      setSelectedSchemeBId(allSchemes[1].id);
    }
  }, [initialSchemeA, initialSchemeB, allSchemes, isOpen]);

  const schemeA = allSchemes.find((s) => s.id === selectedSchemeAId) || allSchemes[0];
  const schemeB = allSchemes.find((s) => s.id === selectedSchemeBId) || allSchemes[1] || allSchemes[0];

  // Fetch AI Scheme Comparison
  useEffect(() => {
    if (!isOpen || !schemeA || !schemeB || schemeA.id === schemeB.id) {
      setAiAnalysis(null);
      return;
    }

    let isMounted = true;
    setIsLoadingAnalysis(true);

    fetch('/api/gemini/scheme-compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        schemeA,
        schemeB,
        userProfile,
        language: currentLanguage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setAiAnalysis(data.analysis || null);
          setIsLoadingAnalysis(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching scheme comparison:', err);
        if (isMounted) {
          setIsLoadingAnalysis(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedSchemeAId, selectedSchemeBId, isOpen, currentLanguage]);

  if (!isOpen) return null;

  const t = (key: string) => getTranslation(key, currentLanguage);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-scrim/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl bg-surface-container-lowest border border-surface-variant rounded-xl shadow-elevated z-10 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-surface-variant flex items-center justify-between bg-surface/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-[22px]">compare_arrows</span>
              </div>
              <div>
                <h2 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface">
                  {t('compareSchemesTitle')}
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Side-by-side evaluation of Government and Private funding options for {userProfile.companyName}
                </p>
              </div>
            </div>

            <button
              id="btn-close-compare"
              onClick={onClose}
              className="p-2 rounded-xl border border-surface-variant text-on-surface-variant hover:bg-surface-variant"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Scheme Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6 bg-surface border-b border-surface-variant">
            {/* Selector A */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Scheme 1 (Select to compare)
              </label>
              <select
                id="select-scheme-a"
                value={selectedSchemeAId}
                onChange={(e) => setSelectedSchemeAId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-surface-variant rounded-xl text-xs font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {allSchemes.map((s) => (
                  <option className="bg-surface text-on-surface" key={s.id} value={s.id}>
                    {s.type === 'government' ? '🏛️ [Gov]' : '🏢 [Private]'} {s.title} ({s.matchScore}% Match)
                  </option>
                ))}
              </select>
            </div>

            {/* Selector B */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Scheme 2 (Select to compare)
              </label>
              <select
                id="select-scheme-b"
                value={selectedSchemeBId}
                onChange={(e) => setSelectedSchemeBId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-surface-variant rounded-xl text-xs font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {allSchemes.map((s) => (
                  <option className="bg-surface text-on-surface" key={s.id} value={s.id}>
                    {s.type === 'government' ? '🏛️ [Gov]' : '🏢 [Private]'} {s.title} ({s.matchScore}% Match)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Body Comparison Matrix */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-on-surface">
            {schemeA && schemeB && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-variant">
                      <th className="py-3 px-4 font-bold text-on-surface-variant uppercase w-1/4">Criteria</th>
                      <th className="py-3 px-4 font-bold text-on-surface w-3/8 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span>{schemeA.type === 'government' ? '🏛️' : '🏢'}</span>
                          <span>{schemeA.title}</span>
                        </div>
                      </th>
                      <th className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400 w-3/8 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span>{schemeB.type === 'government' ? '🏛️' : '🏢'}</span>
                          <span>{schemeB.title}</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-variant/60">
                    {/* Category Type */}
                    <tr>
                      <td className="py-3 px-4 font-semibold text-on-surface-variant">Scheme Type</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md font-bold uppercase text-[10px] ${
                          schemeA.type === 'government' ? 'bg-amber-500/10 text-amber-600' : 'bg-indigo-500/10 text-indigo-600'
                        }`}>
                          {schemeA.type === 'government' ? 'Government Scheme' : 'Private Scheme'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md font-bold uppercase text-[10px] ${
                          schemeB.type === 'government' ? 'bg-amber-500/10 text-amber-600' : 'bg-indigo-500/10 text-indigo-600'
                        }`}>
                          {schemeB.type === 'government' ? 'Government Scheme' : 'Private Scheme'}
                        </span>
                      </td>
                    </tr>

                    {/* Match Score */}
                    <tr>
                      <td className="py-3 px-4 font-semibold text-on-surface-variant">Match Score</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-sm text-on-surface">{schemeA.matchScore}% Match</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">{schemeB.matchScore}% Match</span>
                      </td>
                    </tr>

                    {/* Provider */}
                    <tr>
                      <td className="py-3 px-4 font-semibold text-on-surface-variant">Provider / Body</td>
                      <td className="py-3 px-4 text-on-surface font-medium">{schemeA.providerName}</td>
                      <td className="py-3 px-4 text-on-surface font-medium">{schemeB.providerName}</td>
                    </tr>

                    {/* Funding & Nature */}
                    <tr>
                      <td className="py-3 px-4 font-semibold text-on-surface-variant">Funding / Benefit</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-on-surface text-sm">{schemeA.amountFormatted}</div>
                        <div className="text-[11px] text-on-surface-variant">{schemeA.fundingNature}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-on-surface text-sm">{schemeB.amountFormatted}</div>
                        <div className="text-[11px] text-on-surface-variant">{schemeB.fundingNature}</div>
                      </td>
                    </tr>

                    {/* Document Readiness */}
                    <tr>
                      <td className="py-3 px-4 font-semibold text-on-surface-variant">Document Readiness</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-success flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">task_alt</span>
                          {schemeA.documentReadiness.score}% Ready
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-success flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">task_alt</span>
                          {schemeB.documentReadiness.score}% Ready
                        </div>
                      </td>
                    </tr>

                    {/* Eligibility Highlights */}
                    <tr>
                      <td className="py-3 px-4 font-semibold text-on-surface-variant">Key Eligibility</td>
                      <td className="py-3 px-4 space-y-1">
                        {schemeA.eligibility.slice(0, 3).map((e, idx) => (
                          <div key={idx} className="flex items-start gap-1 text-[11px] text-on-surface-variant">
                            <span className="text-on-surface">•</span>
                            <span>{e}</span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-4 space-y-1">
                        {schemeB.eligibility.slice(0, 3).map((e, idx) => (
                          <div key={idx} className="flex items-start gap-1 text-[11px] text-on-surface-variant">
                            <span className="text-indigo-500">•</span>
                            <span>{e}</span>
                          </div>
                        ))}
                      </td>
                    </tr>

                    {/* Official Portal Link */}
                    <tr>
                      <td className="py-3 px-4 font-semibold text-on-surface-variant">Official Website</td>
                      <td className="py-3 px-4">
                        <a
                          href={schemeA.officialWebsiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-semibold text-[11px] hover:bg-primary-hover transition-colors"
                        >
                          <span>{schemeA.providerType}</span>
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={schemeB.officialWebsiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary text-on-secondary font-semibold text-[11px] hover:bg-secondary-hover transition-colors"
                        >
                          <span>{schemeB.providerType}</span>
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* AI Comparison Analysis Box */}
            <div className="p-5 rounded-xl bg-surface border border-surface-variant shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                  MatchWise AI Comparative Analysis
                </h3>
              </div>

              {isLoadingAnalysis ? (
                <div className="flex items-center gap-2 text-xs text-on-surface-variant py-4">
                  <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating compatibility for {userProfile.companyName}...</span>
                </div>
              ) : aiAnalysis ? (
                <div className="text-xs text-on-surface space-y-2 whitespace-pre-line leading-relaxed">
                  {aiAnalysis}
                </div>
              ) : (
                <p className="text-xs text-on-surface-variant">
                  Both schemes offer strong advantages. Compare your compliance readiness in the vault to choose the fastest pathway.
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-surface-variant bg-surface-container-lowest flex items-center justify-between text-xs text-on-surface-variant">
            <span>MatchWise provides objective scheme comparison. Applications must be completed on official portals.</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-surface hover:bg-surface-variant border border-surface-variant rounded-xl font-semibold text-on-surface"
            >
              Close Comparison
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
