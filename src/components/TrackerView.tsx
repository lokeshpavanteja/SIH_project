import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scheme, DocumentRecord, UserProfile, InvestorInfo, LanguageCode } from '../types';
import { sampleInvestors } from '../data/mockData';
import { getTranslation } from '../i18n/translations';

interface TrackerViewProps {
  schemes: Scheme[];
  documents: DocumentRecord[];
  userProfile: UserProfile;
  onOpenSchemeDetail: (scheme: Scheme) => void;
  onOpenDocumentUpload: (doc?: DocumentRecord) => void;
  onAcceptScheme: (schemeId: string) => void;
  onRejectScheme: (schemeId: string) => void;
  onRestoreScheme: (schemeId: string) => void;
  onOpenCompare: (schemeA?: Scheme) => void;
  currentLanguage: LanguageCode;
}

export const TrackerView: React.FC<TrackerViewProps> = ({
  schemes,
  documents,
  userProfile,
  onOpenSchemeDetail,
  onOpenDocumentUpload,
  onAcceptScheme,
  onRejectScheme,
  onRestoreScheme,
  onOpenCompare,
  currentLanguage,
}) => {
  const [activeTab, setActiveTab] = useState<'decisions' | 'vault' | 'investors'>('decisions');
  const [decisionSubTab, setDecisionSubTab] = useState<'accepted' | 'rejected'>('accepted');

  const t = (key: string) => getTranslation(key, currentLanguage);

  const acceptedSchemes = schemes.filter((s) => s.userDecision === 'accepted');
  const rejectedSchemes = schemes.filter((s) => s.userDecision === 'rejected');

  const missingDocsCount = documents.filter((d) => d.status === 'missing' || d.status === 'action_required').length;
  const verifiedDocsCount = documents.filter((d) => d.status === 'verified').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="max-w-7xl mx-auto px-margin-mobile py-8 md:py-12"
    >
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-1">
            Pipeline, Vault & Investors
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Track accepted schemes, prepare required compliance documents, and view verified investors.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex bg-surface-variant p-1 rounded-xl w-fit">
          <button
            id="tab-view-decisions"
            onClick={() => setActiveTab('decisions')}
            className={`font-label-md px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'decisions'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">checklist</span>
            Accepted & Rejected ({acceptedSchemes.length + rejectedSchemes.length})
          </button>

          <button
            id="tab-view-vault"
            onClick={() => setActiveTab('vault')}
            className={`font-label-md px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 relative ${
              activeTab === 'vault'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">folder_managed</span>
            Document Readiness Vault
            {missingDocsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-error inline-block" />
            )}
          </button>

          <button
            id="tab-view-investors"
            onClick={() => setActiveTab('investors')}
            className={`font-label-md px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'investors'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">groups</span>
            Investor Info
          </button>
        </div>
      </div>

      {/* ================= 1. ACCEPTED & REJECTED SCHEMES TAB ================= */}
      {activeTab === 'decisions' && (
        <div className="space-y-6">
          {/* Sub Tab Switcher */}
          <div className="flex bg-surface-variant p-1 rounded-xl w-fit">
            <button
              id="subtab-accepted-schemes"
              onClick={() => setDecisionSubTab('accepted')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                decisionSubTab === 'accepted'
                  ? 'bg-success text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>{t('acceptedSectionTitle')} ({acceptedSchemes.length})</span>
            </button>

            <button
              id="subtab-rejected-schemes"
              onClick={() => setDecisionSubTab('rejected')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                decisionSubTab === 'rejected'
                  ? 'bg-error text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">cancel</span>
              <span>{t('rejectedSectionTitle')} ({rejectedSchemes.length})</span>
            </button>
          </div>

          {/* Accepted Schemes List */}
          {decisionSubTab === 'accepted' && (
            <div>
              <div className="mb-4">
                <h2 className="text-sm font-bold text-on-surface">
                  {t('acceptedSectionTitle')}
                </h2>
                <p className="text-xs text-on-surface-variant">
                  {t('acceptedSectionSubtitle')}
                </p>
              </div>

              {acceptedSchemes.length === 0 ? (
                <div className="p-10 rounded-2xl bg-surface-container-lowest border border-surface-variant text-center space-y-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-4xl">inbox</span>
                  <p className="text-xs text-on-surface-variant">{t('emptyAccepted')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {acceptedSchemes.map((scheme) => (
                    <div
                      key={scheme.id}
                      className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-5 shadow-ambient flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              scheme.type === 'government'
                                ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                                : 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20'
                            }`}
                          >
                            {scheme.type === 'government' ? '🏛️ Government' : '🏢 Private'}
                          </span>
                          <span className="text-xs font-bold text-primary">{scheme.matchScore}% Match</span>
                        </div>

                        <h3
                          onClick={() => onOpenSchemeDetail(scheme)}
                          className="font-bold text-base text-on-surface hover:text-primary cursor-pointer transition-colors line-clamp-2 mb-1"
                        >
                          {scheme.title}
                        </h3>
                        <p className="text-xs text-on-surface-variant line-clamp-1 mb-3">
                          {scheme.providerName}
                        </p>

                        <div className="p-3 rounded-xl bg-surface border border-surface-variant text-xs mb-3 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Funding Amount:</span>
                            <span className="font-bold text-on-surface">{scheme.amountFormatted}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Doc Readiness:</span>
                            <span className="font-semibold text-success">{scheme.documentReadiness.score}% Ready</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-surface-variant space-y-2">
                        <a
                          href={scheme.officialWebsiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-3 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover shadow-xs flex items-center justify-center gap-1.5 transition-all"
                        >
                          <span>{t('applyOnOfficialWebsite')}</span>
                          <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                        </a>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onOpenSchemeDetail(scheme)}
                            className="flex-1 py-1.5 text-xs text-on-surface-variant hover:text-on-surface bg-surface hover:bg-surface-variant rounded-lg border border-surface-variant text-center transition-colors"
                          >
                            Checklist
                          </button>
                          <button
                            onClick={() => onRejectScheme(scheme.id)}
                            className="px-3 py-1.5 text-xs text-error hover:bg-error/10 rounded-lg border border-surface-variant transition-colors"
                          >
                            Move to Rejected
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Rejected Schemes List */}
          {decisionSubTab === 'rejected' && (
            <div>
              <div className="mb-4">
                <h2 className="text-sm font-bold text-on-surface">
                  {t('rejectedSectionTitle')}
                </h2>
                <p className="text-xs text-on-surface-variant">
                  {t('rejectedSectionSubtitle')}
                </p>
              </div>

              {rejectedSchemes.length === 0 ? (
                <div className="p-10 rounded-2xl bg-surface-container-lowest border border-surface-variant text-center space-y-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-4xl">check_circle</span>
                  <p className="text-xs text-on-surface-variant">{t('emptyRejected')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rejectedSchemes.map((scheme) => (
                    <div
                      key={scheme.id}
                      className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-5 shadow-ambient flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-error/15 text-error border border-error/30">
                            Rejected
                          </span>
                          <span className="text-xs text-on-surface-variant">{scheme.matchScore}% Match</span>
                        </div>

                        <h3 className="font-bold text-base text-on-surface mb-1">
                          {scheme.title}
                        </h3>
                        <p className="text-xs text-on-surface-variant line-clamp-1 mb-3">
                          {scheme.providerName}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-surface-variant flex items-center justify-between gap-2">
                        <button
                          onClick={() => onOpenSchemeDetail(scheme)}
                          className="flex-1 py-2 text-xs text-on-surface bg-surface hover:bg-surface-variant rounded-lg border border-surface-variant text-center font-medium"
                        >
                          Review Overview
                        </button>
                        <button
                          onClick={() => onRestoreScheme(scheme.id)}
                          className="flex-1 py-2 text-xs font-semibold text-primary hover:bg-primary/10 rounded-lg border border-primary/20 transition-colors"
                        >
                          Restore Scheme
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= 2. DOCUMENT READINESS VAULT TAB ================= */}
      {activeTab === 'vault' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-variant shadow-ambient flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-headline-md text-lg font-bold text-on-surface mb-1">
                Compliance & Eligibility Document Vault
              </h2>
              <p className="text-xs text-on-surface-variant">
                Upload and verify key identity and business certificates to maximize scheme match accuracy.
              </p>
            </div>
            <button
              onClick={() => onOpenDocumentUpload()}
              className="px-4 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary-hover flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer w-fit"
            >
              <span className="material-symbols-outlined text-[18px]">upload_file</span>
              <span>Upload Compliance Document</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-5 shadow-ambient flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface-variant text-on-surface-variant">
                      {doc.category}
                    </span>
                    <span
                      className={`text-[11px] font-bold flex items-center gap-1 ${
                        doc.status === 'verified'
                          ? 'text-success'
                          : doc.status === 'missing'
                          ? 'text-error'
                          : 'text-amber-500'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {doc.status === 'verified' ? 'check_circle' : 'pending'}
                      </span>
                      {doc.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-on-surface mb-1 line-clamp-2">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-3">
                    {doc.feedback || 'Stored for scheme eligibility verification.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-variant flex items-center justify-between text-xs text-on-surface-variant">
                  <span>{doc.fileSize || 'Required'}</span>
                  <button
                    onClick={() => onOpenDocumentUpload(doc)}
                    className="text-primary hover:underline font-semibold"
                  >
                    {doc.status === 'verified' ? 'Update' : 'Upload'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 3. INVESTOR INFORMATION TAB ================= */}
      {activeTab === 'investors' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-variant shadow-ambient">
            <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
              <span className="material-symbols-outlined text-[20px]">info</span>
              <span>{t('investorDirectoryTitle')}</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {t('investorDisclaimer')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sampleInvestors.map((inv) => (
              <div
                key={inv.id}
                className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-5 shadow-ambient flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                      Venture Capital / Seed
                    </span>
                    <span className="text-xs text-on-surface-variant">{inv.receptionDesk}</span>
                  </div>

                  <h3 className="font-bold text-base text-on-surface mb-0.5">
                    {inv.companyName}
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-4">
                    Lead Partners: {inv.investorName}
                  </p>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="text-on-surface-variant font-semibold block mb-0.5">
                        {t('investorFocusTitle')}:
                      </span>
                      <span className="text-on-surface">{inv.focusArea}</span>
                    </div>

                    <div>
                      <span className="text-on-surface-variant font-semibold block mb-0.5">
                        {t('investorTicketTitle')}:
                      </span>
                      <span className="text-on-surface font-bold text-primary">{inv.ticketSize}</span>
                    </div>

                    {/* Formatted Contact Number (+91 XXXXX XXXXX) */}
                    <div className="p-2.5 rounded-xl bg-surface border border-surface-variant">
                      <div className="text-[10px] uppercase font-bold text-on-surface-variant mb-0.5">
                        {t('investorContactTitle')}
                      </div>
                      <div className="text-xs font-mono font-semibold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-primary">call</span>
                        <span>{inv.contactNumber}</span>
                      </div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-primary">mail</span>
                        <span>{inv.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-variant mt-4">
                  <a
                    href={inv.officialWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-surface hover:bg-surface-variant border border-surface-variant text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Visit Investor Website</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
