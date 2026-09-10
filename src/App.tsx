/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  NavigationTab,
  Scheme,
  UserProfile,
  LanguageCode,
  StartedScheme,
} from './types';
import {
  initialUserProfile,
  initialSchemes,
} from './data/mockData';
import { LanguageSelection } from './components/LanguageSelection';
import { OnboardingView } from './components/OnboardingView';
import { AuthView } from './components/AuthView';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { RecommendedView } from './components/RecommendedView';
import { DiscoveryView } from './components/DiscoveryView';
import { MyStartedView } from './components/MyStartedView';
import { ProfileView } from './components/ProfileView';
import { GrantDetailModal } from './components/GrantDetailModal';
import { StartApplicationModal } from './components/StartApplicationModal';
import { SchemeComparisonModal } from './components/SchemeComparisonModal';
import { Toast, ToastMessage } from './components/Toast';
import { Layers } from 'lucide-react';

type AppScreen = 'auth' | 'language_select' | 'onboarding' | 'main_app';

export default function App() {
  // Screen state
  const [appScreen, setAppScreen] = useState<AppScreen>(() => {
    try {
      const savedProfile = localStorage.getItem('matchwise_user_profile');
      if (savedProfile) return 'main_app';
    } catch { /* ignore */ }
    return 'auth';
  });

  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('matchwise_language');
      if (saved) return saved as LanguageCode;
    } catch { /* ignore */ }
    return 'en';
  });

  // User profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('matchwise_user_profile');
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return initialUserProfile;
  });

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('matchwise_theme');
      if (saved) return saved === 'dark';
    } catch { /* ignore */ }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sync theme with body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try { localStorage.setItem('matchwise_theme', isDarkMode ? 'dark' : 'light'); } catch { /* ignore */ }
  }, [isDarkMode]);

  // App state
  const [activeTab, setActiveTab] = useState<NavigationTab>('recommended');
  const [schemes, setSchemes] = useState<Scheme[]>(initialSchemes);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [comparisonSchemes, setComparisonSchemes] = useState<Scheme[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Started schemes (localStorage)
  const [startedSchemes, setStartedSchemes] = useState<StartedScheme[]>(() => {
    try {
      const saved = localStorage.getItem('matchwise_started_schemes');
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return [];
  });

  // Modals
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [startModalScheme, setStartModalScheme] = useState<Scheme | null>(null);

  // Persist language
  useEffect(() => {
    try { localStorage.setItem('matchwise_language', currentLanguage); } catch { /* ignore */ }
  }, [currentLanguage]);

  // Persist user profile
  useEffect(() => {
    if (appScreen === 'main_app') {
      try { localStorage.setItem('matchwise_user_profile', JSON.stringify(userProfile)); } catch { /* ignore */ }
    }
  }, [userProfile, appScreen]);

  // Persist started schemes
  useEffect(() => {
    try { localStorage.setItem('matchwise_started_schemes', JSON.stringify(startedSchemes)); } catch { /* ignore */ }
  }, [startedSchemes]);

  // Toast helper
  const addToast = (type: 'success' | 'info' | 'warning', title: string, message?: string) => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Language handlers
  const handleSelectLanguage = (lang: LanguageCode) => setCurrentLanguage(lang);

  const handleLanguageContinue = () => {
    // Check if user has a saved profile — skip onboarding
    try {
      const saved = localStorage.getItem('matchwise_user_profile');
      if (saved) {
        setUserProfile(JSON.parse(saved));
        setAppScreen('main_app');
        return;
      }
    } catch { /* ignore */ }
    setAppScreen('onboarding');
  };

  // Onboarding complete
  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppScreen('main_app');
    setActiveTab('recommended');
    addToast('success', `Welcome, ${profile.name}!`, 'Your profile is ready. Here are your matched schemes.');
  };

  // Logout
  const handleLogout = () => {
    try {
      localStorage.removeItem('matchwise_user_profile');
      localStorage.removeItem('matchwise_started_schemes');
      localStorage.removeItem('matchwise_onboarding_draft');
    } catch { /* ignore */ }
    setUserProfile(initialUserProfile);
    setAppScreen('auth');
    setActiveTab('recommended');
    setComparisonSchemes([]);
    addToast('info', 'Logged out', 'You have been logged out.');
  };

  // Auth Success
  const handleAuthSuccess = (name: string, email: string) => {
    setUserProfile(prev => ({ ...prev, name, email }));
    setAppScreen('language_select');
  };

  // Profile update
  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    addToast('success', 'Profile updated', 'Your profile has been saved.');
  };

  // Save/bookmark toggle
  const handleToggleSave = (schemeId: string) => {
    setSchemes(prev => prev.map(s => {
      if (s.id === schemeId) {
        const next = !s.saved;
        addToast(next ? 'success' : 'info', next ? 'Scheme saved' : 'Removed from saved', `"${s.title}"`);
        return { ...s, saved: next };
      }
      return s;
    }));
  };

  // Compare toggle
  const handleToggleCompare = (scheme: Scheme) => {
    setComparisonSchemes(prev => {
      const isSelected = prev.some(s => s.id === scheme.id);
      if (isSelected) {
        return prev.filter(s => s.id !== scheme.id);
      }
      if (prev.length >= 3) {
        addToast('warning', 'Comparison full', 'You can only compare up to 3 schemes at once.');
        return prev;
      }
      return [...prev, scheme];
    });
  };

  // Start application
  const handleStartApplication = (scheme: Scheme) => {
    setStartModalScheme(scheme);
  };

  const handleConfirmStart = (scheme: Scheme) => {
    const alreadyStarted = startedSchemes.some(s => s.schemeId === scheme.id);
    if (alreadyStarted) {
      addToast('info', 'Already started', `"${scheme.title}" is already in your started schemes.`);
      return;
    }

    const newStarted: StartedScheme = {
      id: `started-${Date.now()}`,
      schemeId: scheme.id,
      status: 'started',
      startedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      progress: 10,
    };
    setStartedSchemes(prev => [...prev, newStarted]);
    addToast('success', 'Application started!', `"${scheme.title}" has been added to My Schemes.`);
    setStartModalScheme(null);
  };

  // Remove started
  const handleRemoveStarted = (id: string) => {
    setStartedSchemes(prev => prev.filter(s => s.id !== id));
    addToast('info', 'Removed', 'Application removed from your list.');
  };

  // Update status
  const handleUpdateStartedStatus = (id: string, status: 'started' | 'in_progress' | 'ready_to_apply') => {
    setStartedSchemes(prev => prev.map(s => {
      if (s.id === id) {
        const progress = status === 'started' ? 10 : status === 'in_progress' ? 50 : 90;
        return { ...s, status, progress };
      }
      return s;
    }));
  };

  // ─── Screen 0: Auth ─────────────────────────────────────────
  if (appScreen === 'auth') {
    return (
      <div className="min-h-screen bg-background text-on-background">
        <AuthView onSuccess={handleAuthSuccess} />
        <Toast toasts={toasts} onDismiss={handleDismissToast} />
      </div>
    );
  }

  // ─── Screen 1: Language Selection ───────────────────────────
  if (appScreen === 'language_select') {
    return (
      <div className="min-h-screen bg-background text-on-background">
        <LanguageSelection
          selectedLanguage={currentLanguage}
          onSelectLanguage={handleSelectLanguage}
          onContinue={handleLanguageContinue}
        />
        <Toast toasts={toasts} onDismiss={handleDismissToast} />
      </div>
    );
  }

  // ─── Screen 2: Onboarding ──────────────────────────────────
  if (appScreen === 'onboarding') {
    return (
      <div className="min-h-screen bg-background text-on-background">
        <OnboardingView
          currentLanguage={currentLanguage}
          onComplete={handleOnboardingComplete}
          onBackToLanguage={() => setAppScreen('language_select')}
        />
        <Toast toasts={toasts} onDismiss={handleDismissToast} />
      </div>
    );
  }

  // ─── Screen 3: Main App ────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col antialiased selection:bg-white/20 selection:text-white relative">
      {/* Decorative noise/spotlight is handled in index.css body */}
      <TopAppBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userProfile={userProfile}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <main className="flex-1 pb-24 md:pb-12 pt-6">
        <AnimatePresence mode="wait">
          {activeTab === 'recommended' && (
            <RecommendedView
              key="recommended"
              schemes={schemes}
              userProfile={userProfile}
              currentLanguage={currentLanguage}
              onOpenSchemeDetail={setSelectedScheme}
              onToggleSave={handleToggleSave}
              onStartApplication={handleStartApplication}
              startedSchemes={startedSchemes}
              comparisonSchemes={comparisonSchemes}
              onToggleCompare={handleToggleCompare}
            />
          )}

          {activeTab === 'discovery' && (
            <DiscoveryView
              key="discovery"
              schemes={schemes}
              userProfile={userProfile}
              currentLanguage={currentLanguage}
              onOpenSchemeDetail={setSelectedScheme}
              onToggleSave={handleToggleSave}
              onStartApplication={handleStartApplication}
              startedSchemes={startedSchemes}
              comparisonSchemes={comparisonSchemes}
              onToggleCompare={handleToggleCompare}
            />
          )}

          {activeTab === 'my_schemes' && (
            <MyStartedView
              key="my_schemes"
              schemes={schemes}
              startedSchemes={startedSchemes}
              currentLanguage={currentLanguage}
              onOpenSchemeDetail={setSelectedScheme}
              onRemoveStarted={handleRemoveStarted}
              onUpdateStatus={handleUpdateStartedStatus}
              onToggleSave={handleToggleSave}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              key="profile"
              userProfile={userProfile}
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
              onUpdateProfile={handleUpdateProfile}
              onLogout={handleLogout}
            />
          )}
        </AnimatePresence>
      </main>

      <BottomNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentLanguage={currentLanguage}
      />

      {/* Scheme Detail Modal */}
      <GrantDetailModal
        scheme={selectedScheme}
        isOpen={!!selectedScheme}
        onClose={() => setSelectedScheme(null)}
        onToggleSave={handleToggleSave}
        onStartApplication={handleStartApplication}
        currentLanguage={currentLanguage}
      />

      {/* Start Application Modal */}
      <StartApplicationModal
        scheme={startModalScheme}
        isOpen={!!startModalScheme}
        onClose={() => setStartModalScheme(null)}
        onConfirm={handleConfirmStart}
        currentLanguage={currentLanguage}
      />

      {/* Floating Compare Button */}
      {comparisonSchemes.length > 0 && (
        <button
          onClick={() => setShowComparisonModal(true)}
          className="fixed bottom-24 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Layers size={24} />
          <span className="font-bold">Compare ({comparisonSchemes.length})</span>
        </button>
      )}

      {/* Scheme Comparison Modal */}
      <SchemeComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        schemes={comparisonSchemes}
        onRemoveScheme={handleToggleCompare}
      />

      {/* Toasts */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
