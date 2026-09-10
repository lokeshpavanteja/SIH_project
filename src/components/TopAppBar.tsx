import React, { useState } from 'react';
import { NavigationTab, UserProfile, LanguageCode } from '../types';
import { getTranslation, supportedLanguages } from '../i18n/translations';
import { Sparkles, Search, FolderOpen, User, Languages, Check, LogOut } from 'lucide-react';

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
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = (key: string) => getTranslation(key, currentLanguage);
  const currentLangObj = supportedLanguages.find(l => l.code === currentLanguage) || supportedLanguages[0];

  const navItems: { tab: NavigationTab; labelKey: string; icon: React.ReactNode }[] = [
    { tab: 'recommended', labelKey: 'navRecommended', icon: <Sparkles size={16} /> },
    { tab: 'discovery', labelKey: 'navDiscovery', icon: <Search size={16} /> },
    { tab: 'my_schemes', labelKey: 'navMySchemes', icon: <FolderOpen size={16} /> },
    { tab: 'profile', labelKey: 'navProfile', icon: <User size={16} /> },
  ];

  return (
    <header className="w-full sticky top-0 z-50 glass-nav select-none">
      <div className="flex justify-between items-center px-4 sm:px-6 h-14 w-full max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <button
            id="btn-brand-home"
            onClick={() => onTabChange('recommended')}
            className="font-bold text-base text-white tracking-tight text-left hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <div className="bg-white p-1.5 rounded-lg border border-white text-black shadow-sm">
              <Sparkles size={18} className="animate-pulse" style={{ animationDuration: '3s' }} />
            </div>
            <span>MatchWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-black">AI</span></span>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-1.5 items-center p-1 bg-surface-container-low/50 rounded-xl border border-white/5 backdrop-blur-md">
          {navItems.map(item => {
            const isActive = activeTab === item.tab;
            return (
               <button
                key={item.tab}
                id={`nav-${item.tab}`}
                onClick={() => onTabChange(item.tab)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-black shadow-sm'
                    : 'text-on-surface-variant hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={isActive ? 'text-black' : ''}>
                  {item.icon}
                </span>
                {t(item.labelKey)}
              </button>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => { setShowLangMenu(!showLangMenu); setShowProfileMenu(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-on-surface hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
              title={t('changeLanguage')}
            >
              <Languages size={16} className="text-secondary" />
              <span className="text-[11px] font-bold">{currentLangObj.script}</span>
            </button>
            {showLangMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
                <div className="absolute right-0 mt-2 w-48 glass-panel rounded-xl z-50 max-h-64 overflow-y-auto py-2">
                  {supportedLanguages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { onLanguageChange(lang.code); setShowLangMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-white/10 transition-colors ${
                        currentLanguage === lang.code ? 'text-white font-bold bg-white/5' : 'text-on-surface'
                      }`}
                    >
                      <div>
                        <span className="font-medium">{lang.nativeName}</span>
                        <span className="text-xs text-on-surface-muted ml-2">{lang.name}</span>
                      </div>
                      {currentLanguage === lang.code && (
                        <Check size={16} className="text-white" />
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
              className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
            >
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shadow-sm">
                {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </button>
            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                <div className="absolute right-0 mt-2 w-52 glass-panel rounded-xl z-50 py-2">
                  <div className="px-4 py-3 border-b border-white/10 mb-2">
                    <p className="text-sm font-bold text-white truncate">{userProfile.name || 'User'}</p>
                    <p className="text-xs text-on-surface-muted truncate">{userProfile.type === 'business' ? 'Business Profile' : 'Individual Profile'}</p>
                  </div>
                  <button
                    onClick={() => { onTabChange('profile'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-white/10 transition-colors flex items-center gap-3 font-medium"
                  >
                    <User size={16} />
                    {t('navProfile')}
                  </button>
                  <button
                    onClick={() => { onLogout(); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors flex items-center gap-3 font-medium mt-1"
                  >
                    <LogOut size={16} />
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
