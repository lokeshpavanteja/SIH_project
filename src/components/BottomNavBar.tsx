import React from 'react';
import { NavigationTab, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';

interface BottomNavBarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  currentLanguage: LanguageCode;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange, currentLanguage }) => {
  const tabs: { tab: NavigationTab; labelKey: string; icon: string }[] = [
    { tab: 'recommended', labelKey: 'navRecommended', icon: 'auto_awesome' },
    { tab: 'discovery', labelKey: 'navDiscovery', icon: 'search' },
    { tab: 'my_schemes', labelKey: 'navMySchemes', icon: 'folder_open' },
    { tab: 'profile', labelKey: 'navProfile', icon: 'person' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-14 px-2 bg-surface border-t border-outline-variant/60 backdrop-blur-md bg-surface/95">
      {tabs.map((t) => {
        const isActive = activeTab === t.tab;
        return (
          <button
            key={t.tab}
            id={`bottom-nav-${t.tab}`}
            onClick={() => onTabChange(t.tab)}
            className={`flex flex-col items-center justify-center rounded-lg px-3 py-1 transition-all ${
              isActive
                ? 'text-primary'
                : 'text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined mb-0.5 text-[20px]"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {t.icon}
            </span>
            <span className="text-[10px] font-medium">{getTranslation(t.labelKey, currentLanguage)}</span>
          </button>
        );
      })}
    </nav>
  );
};
