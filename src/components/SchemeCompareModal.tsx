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
  const [hasCompared, setHasCompared] = useState<boolean>(false);

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
    setHasCompared(false);
  }, [initialSchemeA, initialSchemeB, allSchemes, isOpen]);

  const schemeA = allSchemes.find((s) => s.id === selectedSchemeAId) || allSchemes[0];
  const schemeB = allSchemes.find((s) => s.id === selectedSchemeBId) || allSchemes[1] || allSchemes[0];

  const handleCompare = () => {
    if (!schemeA || !schemeB || schemeA.id === schemeB.id) {
      setAiAnalysis("Please select two different schemes to compare.");
      setHasCompared(true);
      return;
    }

    setHasCompared(true);
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
        setAiAnalysis(data.analysis || null);
        setIsLoadingAnalysis(false);
      })
      .catch((err) => {
        console.error('Error fetching scheme comparison:', err);
        setIsLoadingAnalysis(false);
      });
  };

  if (!isOpen) return null;

  const t = (key: string) => getTranslation(key, currentLanguage);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 bg-black/40 dark:bg-black/60"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-5xl bg-white dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-10 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-6 border-b border-[#E5E5E5] dark:border-[#2A2A2A] flex items-start justify-between bg-white dark:bg-[#111111] shrink-0">
            <div>
              <h2 className="text-[24px] leading-[1.15] tracking-tight font-bold text-[#111111] dark:text-[#F5F5F5]">
                {t('compareSchemesTitle') || 'Compare Schemes'}
              </h2>
              <p className="text-[15px] leading-[1.6] text-[#6B6B6B] dark:text-[#888888] mt-2 max-w-[560px]">
                Evaluate funding options for {userProfile.companyName}
              </p>
            </div>
            <button
              id="btn-close-compare"
              onClick={onClose}
              className="p-2 -mr-2 -mt-2 text-[#6B6B6B] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F5F5F5] transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-[#F5F5F5]"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto flex-1">
            {/* Scheme Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#FAFAFA] dark:bg-[#1A1A1A] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              {/* Selector A */}
              <div className="flex flex-col gap-2">
                <label htmlFor="select-scheme-a" className="text-[13px] font-semibold text-[#111111] dark:text-[#F5F5F5]">
                  Scheme 1
                </label>
                <select
                  id="select-scheme-a"
                  value={selectedSchemeAId}
                  onChange={(e) => setSelectedSchemeAId(e.target.value)}
                  className="w-full px-[14px] py-[10px] bg-white dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[8px] text-[15px] text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:border-[#111111] dark:focus:border-[#F5F5F5] transition-colors"
                >
                  {allSchemes.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.type === 'government' ? 'Government: ' : 'Private: '} {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selector B */}
              <div className="flex flex-col gap-2">
                <label htmlFor="select-scheme-b" className="text-[13px] font-semibold text-[#111111] dark:text-[#F5F5F5]">
                  Scheme 2
                </label>
                <select
                  id="select-scheme-b"
                  value={selectedSchemeBId}
                  onChange={(e) => setSelectedSchemeBId(e.target.value)}
                  className="w-full px-[14px] py-[10px] bg-white dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[8px] text-[15px] text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:border-[#111111] dark:focus:border-[#F5F5F5] transition-colors"
                >
                  {allSchemes.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.type === 'government' ? 'Government: ' : 'Private: '} {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Compare Action Button */}
            {!hasCompared && (
              <div className="p-6 bg-white dark:bg-[#111111] flex justify-start">
                <button
                  onClick={handleCompare}
                  disabled={!selectedSchemeAId || !selectedSchemeBId || selectedSchemeAId === selectedSchemeBId}
                  className="px-[24px] py-[12px] bg-[#111111] dark:bg-[#F5F5F5] text-[#FFFFFF] dark:text-[#111111] text-[15px] font-semibold rounded-[8px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#111111] dark:focus:ring-offset-[#111111]"
                >
                  Compare Schemes
                </button>
              </div>
            )}

            {/* Body Comparison Matrix */}
            {hasCompared && (
              <div className="p-6 space-y-8 bg-white dark:bg-[#111111]">
                {schemeA && schemeB && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-[15px] leading-[1.6] text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                          <th className="py-4 px-4 font-semibold text-[#6B6B6B] dark:text-[#888888] w-1/4">Criteria</th>
                          <th className="py-4 px-4 font-bold text-[#111111] dark:text-[#F5F5F5] w-3/8 text-[16px]">
                            {schemeA.title}
                          </th>
                          <th className="py-4 px-4 font-bold text-[#111111] dark:text-[#F5F5F5] w-3/8 text-[16px]">
                            {schemeB.title}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                        {/* Category Type */}
                        <tr>
                          <td className="py-4 px-4 text-[#6B6B6B] dark:text-[#888888]">Type</td>
                          <td className="py-4 px-4 text-[#111111] dark:text-[#F5F5F5]">
                            <span className="border border-[#E0E0E0] dark:border-[#2A2A2A] rounded-[4px] px-[8px] py-[2px] text-[12px] text-[#6B6B6B] dark:text-[#888888]">
                              {schemeA.type === 'government' ? 'Government' : 'Private'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-[#111111] dark:text-[#F5F5F5]">
                            <span className="border border-[#E0E0E0] dark:border-[#2A2A2A] rounded-[4px] px-[8px] py-[2px] text-[12px] text-[#6B6B6B] dark:text-[#888888]">
                              {schemeB.type === 'government' ? 'Government' : 'Private'}
                            </span>
                          </td>
                        </tr>

                        {/* Match Score */}
                        <tr>
                          <td className="py-4 px-4 text-[#6B6B6B] dark:text-[#888888]">Match Score</td>
                          <td className="py-4 px-4 text-[#111111] dark:text-[#F5F5F5]">
                            <span className="text-[13px] font-semibold">{schemeA.matchScore}% match</span>
                          </td>
                          <td className="py-4 px-4 text-[#111111] dark:text-[#F5F5F5]">
                            <span className="text-[13px] font-semibold">{schemeB.matchScore}% match</span>
                          </td>
                        </tr>

                        {/* Provider */}
                        <tr>
                          <td className="py-4 px-4 text-[#6B6B6B] dark:text-[#888888]">Provider</td>
                          <td className="py-4 px-4 text-[#111111] dark:text-[#F5F5F5]">{schemeA.providerName}</td>
                          <td className="py-4 px-4 text-[#111111] dark:text-[#F5F5F5]">{schemeB.providerName}</td>
                        </tr>

                        {/* Funding & Nature */}
                        <tr>
                          <td className="py-4 px-4 text-[#6B6B6B] dark:text-[#888888] align-top">Funding</td>
                          <td className="py-4 px-4 align-top">
                            <div className="text-[#111111] dark:text-[#F5F5F5] font-semibold">{schemeA.amountFormatted}</div>
                            <div className="text-[14px] text-[#6B6B6B] dark:text-[#888888] mt-1">{schemeA.fundingNature}</div>
                          </td>
                          <td className="py-4 px-4 align-top">
                            <div className="text-[#111111] dark:text-[#F5F5F5] font-semibold">{schemeB.amountFormatted}</div>
                            <div className="text-[14px] text-[#6B6B6B] dark:text-[#888888] mt-1">{schemeB.fundingNature}</div>
                          </td>
                        </tr>

                        {/* Document Readiness */}
                        <tr>
                          <td className="py-4 px-4 text-[#6B6B6B] dark:text-[#888888]">Document Readiness</td>
                          <td className="py-4 px-4 text-[#111111] dark:text-[#F5F5F5]">
                            {schemeA.documentReadiness.score}% Ready
                          </td>
                          <td className="py-4 px-4 text-[#111111] dark:text-[#F5F5F5]">
                            {schemeB.documentReadiness.score}% Ready
                          </td>
                        </tr>

                        {/* Eligibility Highlights */}
                        <tr>
                          <td className="py-4 px-4 align-top text-[#6B6B6B] dark:text-[#888888]">Key Eligibility</td>
                          <td className="py-4 px-4">
                            <ul className="space-y-2 m-0 p-0 list-none">
                              {schemeA.eligibility.slice(0, 3).map((e, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-[#111111] dark:text-[#F5F5F5]">
                                  <span className="text-[#6B6B6B] dark:text-[#888888] mt-[8px] w-[4px] h-[4px] rounded-full bg-[#6B6B6B] dark:bg-[#888888] shrink-0" />
                                  <span>{e}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="py-4 px-4">
                            <ul className="space-y-2 m-0 p-0 list-none">
                              {schemeB.eligibility.slice(0, 3).map((e, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-[#111111] dark:text-[#F5F5F5]">
                                  <span className="text-[#6B6B6B] dark:text-[#888888] mt-[8px] w-[4px] h-[4px] rounded-full bg-[#6B6B6B] dark:bg-[#888888] shrink-0" />
                                  <span>{e}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>

                        {/* Official Portal Link */}
                        <tr>
                          <td className="py-4 px-4 text-[#6B6B6B] dark:text-[#888888]">Website</td>
                          <td className="py-4 px-4">
                            <a
                              href={schemeA.officialWebsiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[15px] font-semibold text-[#111111] dark:text-[#F5F5F5] hover:opacity-80 transition-opacity inline-flex items-center gap-1 focus:outline-none focus:underline"
                            >
                              Visit portal
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6B6B6B] dark:text-[#888888]">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                              </svg>
                            </a>
                          </td>
                          <td className="py-4 px-4">
                            <a
                              href={schemeB.officialWebsiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[15px] font-semibold text-[#111111] dark:text-[#F5F5F5] hover:opacity-80 transition-opacity inline-flex items-center gap-1 focus:outline-none focus:underline"
                            >
                              Visit portal
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6B6B6B] dark:text-[#888888]">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                              </svg>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* AI Comparison Analysis Box */}
                <div className="p-6 rounded-[10px] border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-[1px] transition-all duration-200">
                  <h3 className="text-[16px] font-bold text-[#111111] dark:text-[#F5F5F5] mb-4">
                    Comparative Analysis
                  </h3>

                  {isLoadingAnalysis ? (
                    <div className="text-[15px] text-[#6B6B6B] dark:text-[#888888] flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-[#6B6B6B] dark:text-[#888888]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Evaluating compatibility for {userProfile.companyName}...
                    </div>
                  ) : aiAnalysis ? (
                    <div className="text-[15px] leading-[1.6] text-[#111111] dark:text-[#F5F5F5] space-y-2 whitespace-pre-line">
                      {aiAnalysis}
                    </div>
                  ) : (
                    <p className="text-[15px] leading-[1.6] text-[#6B6B6B] dark:text-[#888888]">
                      Both schemes offer distinct advantages. Review their criteria to choose the most suitable pathway.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A] flex items-center justify-between shrink-0">
            <span className="text-[14px] text-[#6B6B6B] dark:text-[#888888]">
              Applications must be completed on official portals.
            </span>
            <button
              onClick={onClose}
              className="px-[20px] py-[10px] bg-transparent border border-[#E5E5E5] dark:border-[#2A2A2A] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] rounded-[8px] text-[14px] font-semibold text-[#111111] dark:text-[#F5F5F5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-[#F5F5F5]"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
