import React from 'react';
import { NavigationTab, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';
import { Sparkles, Search, FolderOpen, User } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  currentLanguage: LanguageCode;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange, currentLanguage }) => {
  const tabs: { tab: NavigationTab; labelKey: string; icon: React.ReactNode; activeIcon: React.ReactNode }[] = [
    { tab: 'recommended', labelKey: 'navRecommended', icon: <Sparkles size={20} strokeWidth={2} />, activeIcon: <Sparkles size={22} strokeWidth={2.5} /> },
    { tab: 'discovery', labelKey: 'navDiscovery', icon: <Search size={20} strokeWidth={2} />, activeIcon: <Search size={22} strokeWidth={2.5} /> },
    { tab: 'my_schemes', labelKey: 'navMySchemes', icon: <FolderOpen size={20} strokeWidth={2} />, activeIcon: <FolderOpen size={22} strokeWidth={2.5} /> },
    { tab: 'profile', labelKey: 'navProfile', icon: <User size={20} strokeWidth={2} />, activeIcon: <User size={22} strokeWidth={2.5} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 flex justify-around items-center h-16 px-2 glass-panel rounded-xl">
      {tabs.map((t) => {
        const isActive = activeTab === t.tab;
        return (
          <button
            key={t.tab}
            id={`bottom-nav-${t.tab}`}
            onClick={() => onTabChange(t.tab)}
            className={`flex flex-col items-center justify-center rounded-xl w-16 h-12 transition-all duration-300 relative ${
              isActive
                ? 'text-on-surface'
                : 'text-on-surface-muted hover:text-on-surface'
            }`}
          >
            {isActive && (
              <div className="absolute inset-0 bg-surface-container-highest rounded-xl blur-sm" />
            )}
            <span className={`mb-1 transition-all duration-300 z-10 ${isActive ? 'text-on-surface' : ''}`}>
              {isActive ? t.activeIcon : t.icon}
            </span>
            <span className={`text-[10px] z-10 ${isActive ? 'font-bold' : 'font-medium'}`}>
              {getTranslation(t.labelKey, currentLanguage)}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
