import React from 'react';
import { motion } from 'motion/react';
import { Scheme, UpcomingDeadline, UserProfile, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';
import { getCountryFlag } from '../utils/countryData';

interface DashboardViewProps {
  userProfile: UserProfile;
  schemes: Scheme[];
  deadlines: UpcomingDeadline[];
  readinessScore: number;
  remainingTasksCount: number;
  currentLanguage: LanguageCode;
  onOpenSchemeDetail: (scheme: Scheme) => void;
  onToggleBookmark: (schemeId: string, e: React.MouseEvent) => void;
  onOpenImproveScore: () => void;
  onOpenDeadlineAction: (deadline: UpcomingDeadline) => void;
  onNavigateToDiscovery: () => void;
  onOpenCompare: (schemeA?: Scheme) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  schemes,
  deadlines,
  readinessScore,
  remainingTasksCount,
  currentLanguage,
  onOpenSchemeDetail,
  onToggleBookmark,
  onOpenImproveScore,
  onOpenDeadlineAction,
  onNavigateToDiscovery,
  onOpenCompare,
}) => {
  const topMatches = schemes.slice(0, 4);

  // Donut chart stroke calculation (2 * Math.PI * 40 = 251.327)
  const circumference = 251.2;
  const strokeDashoffset = circumference - (circumference * readinessScore) / 100;

  const t = (key: string) => getTranslation(key, currentLanguage);
  const countryFlag = getCountryFlag(userProfile.country || 'India');

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="max-w-7xl mx-auto px-margin-mobile py-8 md:py-12"
    >
      {/* Greeting Section */}
      <div className="mb-stack-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{countryFlag}</span>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background tracking-tight">
              Hello, {userProfile.name}
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1.5">
            <span>{userProfile.companyName}</span>
            <span>•</span>
            <span>{userProfile.stateRegion}, {userProfile.country}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white border border-white/10">
              {userProfile.country} Matching Active
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-surface-variant text-xs font-semibold text-on-surface flex items-center gap-2 shadow-xs">
            <span className="material-symbols-outlined text-white text-[18px]">verified</span>
            <span>Target Funding: <strong className="text-white">{userProfile.targetFunding || '₹50,00,000'}</strong></span>
          </div>

          <button
            id="btn-dash-compare-cta"
            onClick={() => onOpenCompare()}
            className="px-3.5 py-2 rounded-xl bg-white text-on-primary text-xs font-semibold hover:bg-white-hover shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
            <span>{t('compareSchemesTitle')}</span>
          </button>
        </div>
      </div>

      {/* Safety Notice Strip */}
      <div className="mb-6 p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs text-on-surface">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-white text-[18px]">shield</span>
          <span>
            <strong>Official Application Notice:</strong> MatchWise provides smart matching and document checklists. All submissions occur on official government and private portals.
          </span>
        </div>
        <button
          onClick={onNavigateToDiscovery}
          className="text-white font-semibold hover:underline shrink-0 hidden sm:inline-block"
        >
          Explore All Schemes →
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-md">
        {/* Top Matches (Spans 8 cols on desktop) */}
        <section className="col-span-1 md:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-4 md:p-6 flex flex-col">
          <div className="flex justify-between items-center mb-stack-md">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {t('topMatchesTitle')}
              </h2>
              <p className="text-xs text-on-surface-variant hidden sm:block">
                Prioritized Government & Private schemes for your profile in {userProfile.country}
              </p>
            </div>
            <button
              id="btn-dash-view-all-discovery"
              onClick={onNavigateToDiscovery}
              className="font-label-md text-label-md text-white hover:underline flex items-center gap-1 group transition-colors shrink-0"
            >
              <span>{t('discoveryTitle')}</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {topMatches.map((scheme) => (
              <div
                key={scheme.id}
                id={`scheme-card-${scheme.id}`}
                className="bg-surface border border-surface-variant rounded-xl p-4 flex flex-col justify-between hover:shadow-sm transition-all relative overflow-hidden group hover:border-white/40"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        scheme.type === 'government'
                          ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                          : 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20'
                      }`}
                    >
                      <span>{scheme.type === 'government' ? '🏛️' : '🏢'}</span>
                      <span>{scheme.type === 'government' ? 'Government' : 'Private'}</span>
                    </span>

                    <button
                      id={`btn-dash-bookmark-${scheme.id}`}
                      onClick={(e) => onToggleBookmark(scheme.id, e)}
                      className={`transition-colors p-1 rounded-md hover:bg-surface-variant ${
                        scheme.saved ? 'text-white' : 'text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {scheme.saved ? 'bookmark_added' : 'bookmark_add'}
                      </span>
                    </button>
                  </div>

                  {/* Title & Match */}
                  <h3
                    onClick={() => onOpenSchemeDetail(scheme)}
                    className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-white transition-colors line-clamp-1 cursor-pointer"
                  >
                    {scheme.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-3 line-clamp-1">
                    {scheme.providerName}
                  </p>

                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-headline-md text-headline-md text-white font-bold">
                      {scheme.amountFormatted}
                    </span>
                    <span className="font-label-md text-label-md px-2 py-0.5 rounded-full bg-white/5 text-white font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">stars</span>
                      {scheme.matchScore}% Match
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant line-clamp-2 mb-3 leading-relaxed">
                    {scheme.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-variant space-y-2">
                  <a
                    href={scheme.officialWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-white text-on-primary text-xs font-semibold hover:bg-white-hover shadow-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>{t('applyOnOfficialWebsite')}</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>

                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant px-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-success text-[14px]">task_alt</span>
                      <span>Doc Readiness: <strong className="text-on-surface">{scheme.documentReadiness.score}%</strong></span>
                    </span>
                    <button
                      onClick={() => onOpenSchemeDetail(scheme)}
                      className="text-white hover:underline font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Readiness Gauge (Spans 4 cols on desktop) */}
        <section className="col-span-1 md:col-span-4 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-4 md:p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-1">
              {t('readinessTitle')}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
              Compliance preparation score based on your uploaded documents.
            </p>

            {/* Circular Progress Gauge */}
            <div className="relative w-40 h-40 mx-auto my-2 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-surface-variant"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-success transition-all duration-700 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-display-sm text-display-sm text-on-surface font-extrabold tracking-tight">
                  {readinessScore}%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  {t('readinessStatusReady')}
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-surface border border-surface-variant text-xs text-on-surface space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Entity & Identity:</span>
                <span className="font-semibold text-success">Verified</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">DPIIT / MSME Cert:</span>
                <span className="font-semibold text-success">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Bank & Financials:</span>
                <span className="font-semibold text-amber-500">Update Needed</span>
              </div>
            </div>
          </div>

          <button
            id="btn-dash-improve-score"
            onClick={onOpenImproveScore}
            className="w-full py-3 px-4 rounded-xl bg-surface hover:bg-surface-variant border border-surface-variant text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <span>{t('improveScore')}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </section>

        {/* Upcoming Milestones / Deadlines */}
        <section className="col-span-1 md:col-span-12 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-4 md:p-6">
          <div className="flex justify-between items-center mb-stack-md">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {t('upcomingDeadlinesTitle')}
              </h2>
              <p className="text-xs text-on-surface-variant">
                Official application deadlines and scheme submission windows
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deadlines.map((item) => (
              <div
                key={item.id}
                className="bg-surface border border-surface-variant rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-error flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      {item.dueDate}
                    </span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant">
                      {item.schemeName}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-on-surface mb-1">
                    {item.taskTitle}
                  </h4>
                  <p className="text-xs text-on-surface-variant mb-3">
                    {item.category}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-variant flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">{item.daysRemaining} days left</span>
                  <button
                    onClick={() => onOpenDeadlineAction(item)}
                    className="text-white hover:underline font-semibold"
                  >
                    View Checklist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};
