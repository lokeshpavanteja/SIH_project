import React, { useState } from 'react';
import { NavigationTab, UserProfile, LanguageCode } from '../types';
import { getTranslation, supportedLanguages } from '../i18n/translations';

interface TopAppBarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  userProfile: UserProfile;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onLogout: () => void;
  onBackClick?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  activeTab,
  onTabChange,
  userProfile,
  currentLanguage,
  onLanguageChange,
  onLogout,
  onBackClick,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = (key: string) => getTranslation(key, currentLanguage);
  const currentLangObj = supportedLanguages.find(l => l.code === currentLanguage) || supportedLanguages[0];

  const navItems: { tab: NavigationTab; labelKey: string; icon: string }[] = [
    { tab: 'recommended', labelKey: 'navRecommended', icon: 'auto_awesome' },
    { tab: 'discovery', labelKey: 'navDiscovery', icon: 'search' },
    { tab: 'my_schemes', labelKey: 'navMySchemes', icon: 'folder_open' },
    { tab: 'profile', labelKey: 'navProfile', icon: 'person' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-background border-b border-outline-variant select-none">
      <div className="flex justify-between items-center px-4 sm:px-6 h-12 w-full max-w-6xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <button
            id="btn-brand-home"
            onClick={() => onTabChange('recommended')}
            className="font-bold text-sm text-on-surface tracking-tight text-left hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
            <span>MatchWise <span className="text-primary">AI</span></span>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-1 items-center">
          {navItems.map(item => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                id={`nav-${item.tab}`}
                onClick={() => onTabChange(item.tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                {t(item.labelKey)}
              </button>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => { setShowLangMenu(!showLangMenu); setShowProfileMenu(false); }}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all"
              title={t('changeLanguage')}
            >
              <span className="text-[11px] font-bold text-primary">{currentLangObj.script}</span>
              <span className="material-symbols-outlined text-[14px]">translate</span>
            </button>
            {showLangMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
                <div className="absolute right-0 mt-1 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto py-1">
                  {supportedLanguages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { onLanguageChange(lang.code); setShowLangMenu(false); }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-surface-variant/50 transition-colors ${
                        currentLanguage === lang.code ? 'bg-primary/5 text-primary font-medium' : 'text-on-surface'
                      }`}
                    >
                      <div>
                        <span className="font-medium">{lang.nativeName}</span>
                        <span className="text-xs text-on-surface-variant ml-1.5">{lang.name}</span>
                      </div>
                      {currentLanguage === lang.code && (
                        <span className="material-symbols-outlined text-primary text-[14px]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Profile / Logout */}
          <div className="relative">
            <button
              onClick={() => { setShowProfileMenu(!showProfileMenu); setShowLangMenu(false); }}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="hidden sm:inline text-xs truncate max-w-[100px]">{userProfile.name || 'User'}</span>
            </button>
            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                <div className="absolute right-0 mt-1 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg z-50 py-1">
                  <button
                    onClick={() => { onTabChange('profile'); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2 text-sm text-on-surface hover:bg-surface-variant/50 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    {t('navProfile')}
                  </button>
                  <div className="border-t border-outline-variant my-1" />
                  <button
                    onClick={() => { onLogout(); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2 text-sm text-error hover:bg-error/5 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    {t('logout')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
