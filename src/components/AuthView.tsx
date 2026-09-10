import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, LanguageCode } from '../types';
import { sampleUsers } from '../data/mockData';
import { getTranslation, supportedLanguages } from '../i18n/translations';
import { COUNTRY_CODES, extractDigits, formatIndianPhoneNumber, isValidIndianPhoneNumber } from '../utils/phoneUtils';
import { PasswordInput } from './PasswordInput';
import { CheckCircle2, KeyRound, ShieldCheck, ArrowRight, ArrowLeft, BadgeInfo, Zap, LogIn, TriangleAlert, Info, KeySquare, Smartphone, Mail, XCircle, Globe, Hexagon } from 'lucide-react';

interface AuthViewProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onSignIn: (profile: UserProfile) => void;
  onSignUp: (profile: UserProfile) => void;
  onBackToLanguageSelect: () => void;
  savedUsers?: UserProfile[];
  onUpdateSavedUsers?: (users: UserProfile[]) => void;
}

const COUNTRIES = [
  'India',
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Spain',
  'Portugal',
  'Australia',
  'Japan',
  'Singapore',
  'United Arab Emirates',
  'Saudi Arabia',
  'Brazil',
  'South Africa',
  'Other / Global',
];

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka (Bengaluru)',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra (Mumbai/Pune)',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu (Chennai)',
  'Telangana (Hyderabad)',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi NCR',
];

const USER_CATEGORIES = [
  { key: 'catStartup', labelKey: 'catStartup' },
  { key: 'catSmallBusiness', labelKey: 'catSmallBusiness' },
  { key: 'catNonProfit', labelKey: 'catNonProfit' },
  { key: 'catResearcher', labelKey: 'catResearcher' },
  { key: 'catIndividual', labelKey: 'catIndividual' },
];

export const AuthView: React.FC<AuthViewProps> = ({
  currentLanguage,
  onLanguageChange,
  onSignIn,
  onSignUp,
  onBackToLanguageSelect,
  savedUsers = sampleUsers,
  onUpdateSavedUsers,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot_password'>('signin');

  // Sign In Form State
  const [signInIdentifier, setSignInIdentifier] = useState('aditya.verma@indusaitech.in');
  const [signInPassword, setSignInPassword] = useState('123456');
  const [signInError, setSignInError] = useState<string | null>(null);

  // Sign Up Form State
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneDigits, setPhoneDigits] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('India');
  const [stateRegion, setStateRegion] = useState('Karnataka (Bengaluru)');
  const [userCategory, setUserCategory] = useState('catStartup');
  const [industry, setIndustry] = useState('Enterprise AI & Healthcare Analytics');
  const [stage, setStage] = useState('Early Revenue (Seed Stage)');
  const [targetFunding, setTargetFunding] = useState('₹50,00,000');
  const [signUpError, setSignUpError] = useState<string | null>(null);

  // Forgot Password Wizard State
  // Steps: 'method' -> 'otp' -> 'new_password' -> 'success'
  const [forgotStep, setForgotStep] = useState<'method' | 'otp' | 'new_password' | 'success'>('method');
  const [forgotMethod, setForgotMethod] = useState<'phone' | 'email'>('phone');
  const [forgotCountryCode, setForgotCountryCode] = useState('+91');
  const [forgotPhoneDigits, setForgotPhoneDigits] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotTargetUser, setForgotTargetUser] = useState<UserProfile | null>(null);

  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [forgotStatusMsg, setForgotStatusMsg] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);

  const t = (key: string) => getTranslation(key, currentLanguage);
  const currentLangObj = supportedLanguages.find((l) => l.code === currentLanguage) || supportedLanguages[0];

  // Handle Phone input formatting
  const handlePhoneChange = (val: string, setter: (d: string) => void, errorSetter: (e: string | null) => void) => {
    const rawDigits = extractDigits(val).slice(0, 10);
    setter(rawDigits);
    if (rawDigits.length > 0 && rawDigits.length < 10) {
      errorSetter(`Please enter full 10-digit number (${rawDigits.length}/10)`);
    } else if (rawDigits.length === 10) {
      const validation = isValidIndianPhoneNumber(rawDigits);
      if (!validation.isValid) {
        errorSetter(validation.error || 'Invalid phone number');
      } else {
        errorSetter(null);
      }
    } else {
      errorSetter(null);
    }
  };

  // ================= SIGN IN SUBMIT =================
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError(null);

    // Rule 1: Password must be exactly 6 characters
    if (signInPassword.length !== 6) {
      setSignInError('Password must contain exactly 6 characters.');
      return;
    }

    const cleanInput = signInIdentifier.trim().toLowerCase();
    const cleanPhoneDigits = extractDigits(signInIdentifier);

    // Match against saved users and sample users
    const allUsers = [...savedUsers, ...sampleUsers];
    const matchedUser = allUsers.find(
      (u) =>
        u.email.toLowerCase() === cleanInput ||
        (cleanPhoneDigits.length >= 10 && u.phoneDigits.includes(cleanPhoneDigits))
    );

    if (matchedUser) {
      if (matchedUser.password && matchedUser.password !== signInPassword) {
        setSignInError('Incorrect password. Please try again or click Forgot Password?.');
        return;
      }
      onSignIn({ ...matchedUser, password: signInPassword });
    } else {
      // Dynamic registered user fallback
      const customUser: UserProfile = {
        id: `usr_${Date.now()}`,
        email: cleanInput.includes('@') ? cleanInput : `${cleanInput}@enterprise.in`,
        password: signInPassword,
        phoneNumber: cleanPhoneDigits.length === 10 ? formatIndianPhoneNumber(cleanPhoneDigits, '+91') : '+91 98765 43210',
        phoneCountryCode: '+91',
        phoneDigits: cleanPhoneDigits.length === 10 ? cleanPhoneDigits : '9876543210',
        name: cleanInput.split('@')[0].replace(/[._]/g, ' ').toUpperCase() || 'Founder',
        title: 'Managing Director',
        companyName: `${cleanInput.split('@')[0].toUpperCase()} Enterprise`,
        country: 'India',
        stateRegion: 'Karnataka (Bengaluru)',
        userCategory: 'catStartup',
        tagline: 'Innovative enterprise seeking matched government and private grants',
        industry: 'Technology & Manufacturing',
        stage: 'Seed / Early Commercial',
        foundedYear: 2024,
        teamSize: '4 engineers & specialists',
        annualRevenue: '₹25,00,000',
        location: 'Bengaluru, India',
        certifications: ['DPIIT Recognized', 'MSME Registered'],
        targetFunding: '₹50,00,000',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'Technology entrepreneur scaling innovative products in India.',
        aiFocusArea: 'AI, MSME Automation',
        businessIdNumber: 'UDYAM-KR-03-0012345',
        dunsNumber: '65-948-3829',
        preferredLanguage: currentLanguage,
      };
      onSignIn(customUser);
    }
  };

  // ================= SIGN UP SUBMIT =================
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError(null);

    if (!fullName || !email || !companyName) {
      setSignUpError('Please fill out all required profile fields.');
      return;
    }

    if (phoneDigits.length !== 10) {
      setSignUpError('Please provide a valid 10-digit Indian phone number.');
      setPhoneError('Indian phone number must be exactly 10 digits.');
      return;
    }

    const validation = isValidIndianPhoneNumber(phoneDigits);
    if (!validation.isValid) {
      setSignUpError(validation.error || 'Please enter a valid Indian mobile number.');
      setPhoneError(validation.error || 'Invalid phone number');
      return;
    }

    // Password validation: Exactly 6 characters
    if (signUpPassword.length !== 6) {
      setSignUpError('Password must contain exactly 6 characters.');
      return;
    }

    if (signUpConfirmPassword.length !== 6) {
      setSignUpError('Password must contain exactly 6 characters.');
      return;
    }

    // Password Matching validation
    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpError('Passwords do not match.');
      return;
    }

    const formattedPhone = formatIndianPhoneNumber(phoneDigits, countryCode);

    const newProfile: UserProfile = {
      id: `usr_${Date.now()}`,
      email: email.trim(),
      password: signUpPassword,
      phoneNumber: formattedPhone,
      phoneCountryCode: countryCode,
      phoneDigits,
      name: fullName.trim(),
      title: 'Founder & Managing Director',
      companyName: companyName.trim(),
      country,
      stateRegion,
      userCategory,
      tagline: `${companyName} specializing in ${industry} with focus on regional and national impact.`,
      industry,
      stage,
      foundedYear: new Date().getFullYear(),
      teamSize: '1 to 10 employees',
      annualRevenue: '₹15,00,000 - ₹50,00,000',
      location: `${stateRegion}, ${country}`,
      certifications: country === 'India' ? ['MSME / Udyam Registered', 'DPIIT Registered'] : ['Registered Entity'],
      targetFunding,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: `${fullName} is the leader of ${companyName} pursuing growth through high-impact Government and Private schemes.`,
      aiFocusArea: industry,
      businessIdNumber: country === 'India' ? 'UDYAM-APPLICANT-2026' : 'REG-ENTITY-2026',
      dunsNumber: '88-123-4567',
      preferredLanguage: currentLanguage,
    };

    onSignUp(newProfile);
  };

  // ================= FORGOT PASSWORD STEP 1 & 2: SEND OTP =================
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    setForgotStatusMsg(null);

    const allUsers = [...savedUsers, ...sampleUsers];
    let foundUser: UserProfile | undefined;

    if (forgotMethod === 'phone') {
      if (forgotPhoneDigits.length !== 10) {
        setForgotError('Please enter a valid 10-digit Indian phone number.');
        return;
      }
      foundUser = allUsers.find(
        (u) => u.phoneDigits === forgotPhoneDigits || u.phoneNumber.includes(forgotPhoneDigits)
      );
      if (!foundUser) {
        // Create an identified session fallback for demo continuity
        foundUser = {
          id: `usr_${Date.now()}`,
          name: 'Registered Founder',
          title: 'Founder & CEO',
          companyName: 'Founder Enterprise',
          email: `${forgotPhoneDigits}@indusaitech.in`,
          phoneNumber: formatIndianPhoneNumber(forgotPhoneDigits, forgotCountryCode),
          phoneCountryCode: forgotCountryCode,
          phoneDigits: forgotPhoneDigits,
          country: 'India',
          stateRegion: 'Karnataka (Bengaluru)',
          userCategory: 'catStartup',
          tagline: 'Venture scaling through scheme opportunities',
          industry: 'AI & Software',
          stage: 'Seed Stage',
          foundedYear: 2024,
          teamSize: '5 members',
          annualRevenue: '₹20,00,000',
          location: 'Bengaluru, India',
          certifications: ['MSME Registered'],
          targetFunding: '₹50,00,000',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          bio: 'Founder recovering account.',
          aiFocusArea: 'AI',
          preferredLanguage: currentLanguage,
        };
      }
    } else {
      const cleanEmail = forgotEmail.trim().toLowerCase();
      if (!cleanEmail || !cleanEmail.includes('@')) {
        setForgotError('Please enter a valid registered email address.');
        return;
      }
      foundUser = allUsers.find((u) => u.email.toLowerCase() === cleanEmail);
      if (!foundUser) {
        foundUser = {
          id: `usr_${Date.now()}`,
          name: cleanEmail.split('@')[0].toUpperCase(),
          title: 'Managing Director',
          companyName: `${cleanEmail.split('@')[0].toUpperCase()} Enterprise`,
          email: cleanEmail,
          phoneNumber: '+91 98765 43210',
          phoneCountryCode: '+91',
          phoneDigits: '9876543210',
          country: 'India',
          stateRegion: 'Karnataka (Bengaluru)',
          userCategory: 'catStartup',
          tagline: 'Venture scaling through scheme opportunities',
          industry: 'AI & Software',
          stage: 'Seed Stage',
          foundedYear: 2024,
          teamSize: '5 members',
          annualRevenue: '₹20,00,000',
          location: 'Bengaluru, India',
          certifications: ['MSME Registered'],
          targetFunding: '₹50,00,000',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          bio: 'Founder recovering account.',
          aiFocusArea: 'AI',
          preferredLanguage: currentLanguage,
        };
      }
    }

    setForgotTargetUser(foundUser);
    setForgotStatusMsg('OTP sent successfully.');
    setForgotStep('otp');
    setEnteredOtp('');
  };

  // ================= FORGOT PASSWORD STEP 3: VERIFY OTP =================
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);

    const cleanOtp = enteredOtp.trim();
    if (cleanOtp !== '123456') {
      setForgotError('Invalid OTP. Please try again.');
      return;
    }

    setForgotStatusMsg(null);
    setForgotStep('new_password');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  // ================= FORGOT PASSWORD STEP 4: SAVE NEW PASSWORD =================
  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);

    // Rule 1: Exactly 6 characters
    if (newPassword.length !== 6) {
      setForgotError('Password must contain exactly 6 characters.');
      return;
    }

    if (confirmNewPassword.length !== 6) {
      setForgotError('Password must contain exactly 6 characters.');
      return;
    }

    // Rule 2: Password matching
    if (newPassword !== confirmNewPassword) {
      setForgotError('Passwords do not match.');
      return;
    }

    // Persist new password for target user
    if (forgotTargetUser) {
      const updatedUser: UserProfile = {
        ...forgotTargetUser,
        password: newPassword,
      };

      if (onUpdateSavedUsers) {
        const updatedList = savedUsers.map((u) =>
          u.id === updatedUser.id || u.email.toLowerCase() === updatedUser.email.toLowerCase()
            ? updatedUser
            : u
        );
        if (!updatedList.some((u) => u.email.toLowerCase() === updatedUser.email.toLowerCase())) {
          updatedList.push(updatedUser);
        }
        onUpdateSavedUsers(updatedList);
      }
    }

    setForgotStatusMsg('Your password has been updated successfully.');
    setForgotStep('success');
  };

  // Reset state to return to Sign In
  const handleReturnToSignInFromSuccess = () => {
    setMode('signin');
    if (forgotTargetUser) {
      setSignInIdentifier(forgotTargetUser.email || forgotTargetUser.phoneNumber);
      setSignInPassword(newPassword);
    }
    setForgotStep('method');
    setForgotStatusMsg(null);
    setForgotError(null);
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col justify-between">
      {/* Top Bar with Language Selector & Step Indicator */}
      <header className="border-b border-white/10 bg-transparent-container-lowest/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center font-bold text-sm shadow-sm"><Hexagon className="w-5 h-5" strokeWidth={2.5} /></div>
            <div>
              <span className="font-headline-md font-bold tracking-tight text-on-surface">
                MatchWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-black">AI</span>
              </span>
              <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-on-surface-variant font-medium">
                Scheme Finder & Guidance
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-back-to-language"
              onClick={onBackToLanguageSelect}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-transparent hover:bg-white/5 text-xs font-medium text-on-surface transition-colors"
              title={t('changeLanguage')}
            >
              <Globe className="w-4 h-4 text-on-surface-variant" />
              <span className="hidden sm:inline">{currentLangObj.nativeName}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 py-8 md:py-12">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {/* ================= 1. SIGN IN SCREEN ================= */}
            {mode === 'signin' && (
              <motion.div
                key="signin-box"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="glass-panel rounded-lg p-8 sm:p-10 border-white/10 bg-transparent/50 backdrop-blur-3xl ring-1 ring-white/5 shadow-xl"
              >
                {/* Tabs */}
                <div className="flex bg-white/5 p-1 rounded-lg mb-6">
                  <button
                    id="tab-sign-in"
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setSignInError(null);
                    }}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg bg-transparent-container-lowest text-on-surface shadow-xs transition-all"
                  >
                    {t('signInTab')}
                  </button>
                  <button
                    id="tab-sign-up"
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setSignUpError(null);
                    }}
                    className="flex-1 py-2 text-xs font-medium rounded-lg text-on-surface-variant hover:text-on-surface transition-all"
                  >
                    {t('signUpTab')}
                  </button>
                </div>

                <div className="mb-6">
                  <h1 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-1">
                    {t('welcomeBack')}
                  </h1>
                  <p className="text-xs text-on-surface-variant">
                    {t('welcomeSubtitle')}
                  </p>
                </div>

                {signInError && (
                  <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-xs flex items-center gap-2 font-medium">
                    <TriangleAlert className="w-4 h-4" />
                    {signInError}
                  </div>
                )}

                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1.5">
                      Username or Email *
                    </label>
                    <div className="relative">
                      <BadgeInfo className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                      <input
                        id="input-signin-identifier"
                        type="text"
                        value={signInIdentifier}
                        onChange={(e) => setSignInIdentifier(e.target.value)}
                        placeholder="aditya.verma@indusaitech.in or +91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-white/10 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all font-medium"
                        required
                      />
                    </div>
                  </div>

                  {/* Password with Eye Icon and exact 6-char rule */}
                  <div>
                    <PasswordInput
                      id="input-signin-password"
                      label={t('passwordLabel')}
                      value={signInPassword}
                      onChange={(val) => {
                        setSignInPassword(val);
                        if (signInError) setSignInError(null);
                      }}
                      placeholder="••••••"
                      required
                    />

                    {/* Clearly visible Forgot Password link below password field */}
                    <div className="flex justify-end mt-1.5">
                      <button
                        id="btn-forgot-password-link"
                        type="button"
                        onClick={() => {
                          setMode('forgot_password');
                          setForgotStep('method');
                          setForgotError(null);
                          setForgotStatusMsg(null);
                        }}
                        className="text-xs text-white hover:text-white-hover font-semibold hover:underline flex items-center gap-1 transition-colors"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>{t('forgotPassword')}</span>
                      </button>
                    </div>
                  </div>

                  <button
                    id="btn-submit-signin"
                    type="submit"
                    className="w-full py-3 bg-primary text-white hover:bg-primary-hover rounded-lg text-sm font-semibold hover:bg-white-hover shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{t('signInButton')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Quick Demo Accounts */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      {t('demoAccountsTitle')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      id="btn-demo-aditya"
                      type="button"
                      onClick={() => onSignIn(sampleUsers[0])}
                      className="text-left p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">🇮🇳</span>
                        <div>
                          <div className="text-xs font-bold text-on-surface">Aditya Verma (Indus AI - Bengaluru)</div>
                          <div className="text-[11px] text-on-surface-variant">+91 98765 43210 • Password: 123456</div>
                        </div>
                      </div>
                      <LogIn className="w-4 h-4 text-white" />
                    </button>

                    <button
                      id="btn-demo-priya"
                      type="button"
                      onClick={() => onSignIn(sampleUsers[1])}
                      className="text-left p-3 rounded-lg border border-white/10 bg-transparent hover:bg-white/5 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">🇮🇳</span>
                        <div>
                          <div className="text-xs font-bold text-on-surface">Priya Sharma (Sharma Eco-Textiles)</div>
                          <div className="text-[11px] text-on-surface-variant">+91 94221 87654 • Password: 123456</div>
                        </div>
                      </div>
                      <LogIn className="w-4 h-4 text-on-surface-variant" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= 2. SIGN UP SCREEN ================= */}
            {mode === 'signup' && (
              <motion.div
                key="signup-box"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="glass-panel rounded-lg p-8 sm:p-10 border-white/10 bg-transparent/50 backdrop-blur-3xl ring-1 ring-white/5 shadow-xl"
              >
                {/* Tabs */}
                <div className="flex bg-white/5 p-1 rounded-lg mb-6">
                  <button
                    id="tab-sign-in-from-signup"
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setSignInError(null);
                    }}
                    className="flex-1 py-2 text-xs font-medium rounded-lg text-on-surface-variant hover:text-on-surface transition-all"
                  >
                    {t('signInTab')}
                  </button>
                  <button
                    id="tab-sign-up-active"
                    type="button"
                    onClick={() => setMode('signup')}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg bg-transparent-container-lowest text-on-surface shadow-xs transition-all"
                  >
                    {t('signUpTab')}
                  </button>
                </div>

                <div className="mb-6">
                  <h1 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-1">
                    {t('createAccount')}
                  </h1>
                  <p className="text-xs text-on-surface-variant">
                    {t('createAccountSubtitle')}
                  </p>
                </div>

                {signUpError && (
                  <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-xs flex items-center gap-2 font-medium">
                    <TriangleAlert className="w-4 h-4" />
                    {signUpError}
                  </div>
                )}

                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  {/* Founder & Enterprise Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
                        {t('fullNameLabel')} *
                      </label>
                      <input
                        id="input-signup-fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Aditya Verma"
                        className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
                        {t('companyNameLabel')} *
                      </label>
                      <input
                        id="input-signup-company"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Indus AI Innovations Pvt Ltd"
                        className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Indian Mobile Number with +91 Country Code Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1.5">
                      {t('phoneLabel')} * <span className="font-normal text-on-surface-variant">(Format: +91 XXXXX XXXXX)</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        id="select-country-code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-32 px-3 py-2.5 bg-transparent border border-white/10 rounded-lg text-xs font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option className="bg-zinc-900 text-white" key={c.code} value={c.code}>
                            {c.flag} {c.code} ({c.country.split(' ')[0]})
                          </option>
                        ))}
                      </select>

                      <div className="relative flex-1">
                        <input
                          id="input-signup-phone"
                          type="tel"
                          value={phoneDigits.length > 0 ? (phoneDigits.length > 5 ? `${phoneDigits.slice(0, 5)} ${phoneDigits.slice(5, 10)}` : phoneDigits) : ''}
                          onChange={(e) => handlePhoneChange(e.target.value, setPhoneDigits, setPhoneError)}
                          placeholder="98765 43210"
                          maxLength={11}
                          className={`w-full px-3.5 py-2.5 bg-transparent border rounded-lg text-sm font-medium tracking-wide focus:outline-none transition-all ${
                            phoneError
                              ? 'border-error text-error focus:ring-2 focus:ring-error/20'
                              : 'border-white/10 text-on-surface focus:ring-2 focus:ring-white/20 focus:border-white'
                          }`}
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-on-surface-variant">
                          {phoneDigits.length}/10
                        </span>
                      </div>
                    </div>
                    {phoneError ? (
                      <p className="mt-1 text-[11px] text-error flex items-center gap-1">
                        <TriangleAlert className="w-3.5 h-3.5" />
                        {phoneError}
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-on-surface-variant">
                        {t('phoneHelp')}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1.5">
                      {t('emailLabel')} *
                    </label>
                    <input
                      id="input-signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aditya@enterprise.in"
                      className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                      required
                    />
                  </div>

                  {/* Password & Confirm Password (Clean rectangle with eye icon & exactly 6 chars) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <PasswordInput
                      id="input-signup-password"
                      label="Password"
                      value={signUpPassword}
                      onChange={(val) => {
                        setSignUpPassword(val);
                        if (signUpError) setSignUpError(null);
                      }}
                      placeholder="••••••"
                      required
                    />

                    <PasswordInput
                      id="input-signup-confirm-password"
                      label="Confirm Password"
                      value={signUpConfirmPassword}
                      onChange={(val) => {
                        setSignUpConfirmPassword(val);
                        if (signUpError) setSignUpError(null);
                      }}
                      placeholder="••••••"
                      required
                    />
                  </div>

                  {/* Password Matching Helper / Hint */}
                  {signUpPassword && signUpConfirmPassword && (
                    <div className="text-[11px] flex items-center gap-1.5">
                      {signUpPassword === signUpConfirmPassword && signUpPassword.length === 6 ? (
                        <span className="text-success font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match (6 characters)
                        </span>
                      ) : (
                        <span className="text-error font-medium flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          {signUpPassword !== signUpConfirmPassword ? 'Passwords do not match.' : 'Password must contain exactly 6 characters.'}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Country & State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
                        {t('countryLabel')} *
                      </label>
                      <select
                        id="select-signup-country"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          if (e.target.value === 'India') {
                            setCountryCode('+91');
                            setStateRegion('Karnataka (Bengaluru)');
                          }
                        }}
                        className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                      >
                        {COUNTRIES.map((c) => (
                          <option className="bg-zinc-900 text-white" key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
                        {t('stateRegionLabel')} *
                      </label>
                      {country === 'India' ? (
                        <select
                          id="select-signup-state-india"
                          value={stateRegion}
                          onChange={(e) => setStateRegion(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                        >
                          {INDIAN_STATES.map((s) => (
                            <option className="bg-zinc-900 text-white" key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id="input-signup-state-general"
                          type="text"
                          value={stateRegion}
                          onChange={(e) => setStateRegion(e.target.value)}
                          placeholder="e.g. California, London, Bavaria"
                          className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                        />
                      )}
                    </div>
                  </div>

                  {/* User Category & Target Funding */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
                        {t('userCategoryLabel')} *
                      </label>
                      <select
                        id="select-signup-category"
                        value={userCategory}
                        onChange={(e) => setUserCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                      >
                        {USER_CATEGORIES.map((cat) => (
                          <option className="bg-zinc-900 text-white" key={cat.key} value={cat.key}>
                            {t(cat.labelKey)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1.5">
                        {t('targetFundingLabel')}
                      </label>
                      <input
                        id="input-signup-target-funding"
                        type="text"
                        value={targetFunding}
                        onChange={(e) => setTargetFunding(e.target.value)}
                        placeholder="₹50,00,000"
                        className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-on-surface-variant">
                    {t('termsNotice')}
                  </p>

                  <button
                    id="btn-submit-signup"
                    type="submit"
                    className="w-full py-3 bg-primary text-white hover:bg-primary-hover rounded-lg text-sm font-semibold hover:bg-white-hover shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{t('signUpButton')}</span>
                    <LogIn className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* ================= 3. FORGOT PASSWORD WIZARD FLOW ================= */}
            {mode === 'forgot_password' && (
              <motion.div
                key="forgot-password-box"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="glass-panel rounded-lg p-8 sm:p-10 border-white/10 bg-transparent/50 backdrop-blur-3xl ring-1 ring-white/5 shadow-xl"
              >
                {/* Back Button */}
                {forgotStep !== 'success' && (
                  <button
                    id="btn-back-to-signin-from-forgot"
                    type="button"
                    onClick={() => {
                      if (forgotStep === 'otp') {
                        setForgotStep('method');
                      } else if (forgotStep === 'new_password') {
                        setForgotStep('otp');
                      } else {
                        setMode('signin');
                        setForgotError(null);
                        setForgotStatusMsg(null);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-white font-semibold mb-4 hover:underline cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{forgotStep === 'method' ? t('backToSignIn') : 'Back'}</span>
                  </button>
                )}

                {/* Status and Error Banners */}
                {forgotStatusMsg && forgotStep !== 'success' && (
                  <div className="mb-4 p-3 rounded-lg bg-success/10 border border-success/20 text-success text-xs flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>{forgotStatusMsg}</span>
                  </div>
                )}

                {forgotError && (
                  <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-xs flex items-center gap-2 font-medium">
                    <span className="material-symbols-outlined text-sm shrink-0">error</span>
                    <span>{forgotError}</span>
                  </div>
                )}

                {/* ---------------- STEP 1 & 2: CHOOSE RECOVERY METHOD & ENTER DETAILS ---------------- */}
                {forgotStep === 'method' && (
                  <div>
                    <div className="mb-6">
                      <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center mb-3">
                        <KeyRound className="w-5 h-5" />
                      </div>
                      <h1 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-1">
                        {t('forgotPasswordTitle')}
                      </h1>
                      <p className="text-xs text-on-surface-variant">
                        {t('howReceiveOtp')}
                      </p>
                    </div>

                    <form onSubmit={handleSendOtp} className="space-y-4">
                      {/* Step 1: Recovery Method Selector */}
                      <div>
                        <label className="block text-xs font-semibold text-on-surface mb-2">
                          {t('howReceiveOtp')}
                        </label>
                        <div className="grid grid-cols-2 gap-2.5 p-1 bg-white/5 rounded-lg">
                          <button
                            id="btn-recovery-phone"
                            type="button"
                            onClick={() => {
                              setForgotMethod('phone');
                              setForgotError(null);
                            }}
                            className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              forgotMethod === 'phone'
                                ? 'bg-transparent-container-lowest text-on-surface shadow-xs border border-white/10'
                                : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                          >
                            <span>📱</span>
                            <span>Phone Number</span>
                          </button>

                          <button
                            id="btn-recovery-email"
                            type="button"
                            onClick={() => {
                              setForgotMethod('email');
                              setForgotError(null);
                            }}
                            className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              forgotMethod === 'email'
                                ? 'bg-transparent-container-lowest text-on-surface shadow-xs border border-white/10'
                                : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                          >
                            <span>📧</span>
                            <span>Email</span>
                          </button>
                        </div>
                      </div>

                      {/* Step 2: Enter Registered Information */}
                      {forgotMethod === 'phone' ? (
                        <div>
                          <label className="block text-xs font-semibold text-on-surface mb-1.5">
                            Registered Indian Phone Number *
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={forgotCountryCode}
                              onChange={(e) => setForgotCountryCode(e.target.value)}
                              className="w-28 px-3 py-2.5 bg-transparent border border-white/10 rounded-lg text-xs font-semibold text-on-surface"
                            >
                              <option className="bg-zinc-900 text-white" value="+91">🇮🇳 +91</option>
                              <option className="bg-zinc-900 text-white" value="+1">🇺🇸 +1</option>
                            </select>
                            <input
                              id="input-forgot-phone"
                              type="tel"
                              value={forgotPhoneDigits.length > 5 ? `${forgotPhoneDigits.slice(0, 5)} ${forgotPhoneDigits.slice(5, 10)}` : forgotPhoneDigits}
                              onChange={(e) => handlePhoneChange(e.target.value, setForgotPhoneDigits, setForgotError)}
                              placeholder="98765 43210"
                              maxLength={11}
                              className="flex-1 px-3.5 py-2.5 bg-transparent border border-white/10 rounded-lg text-sm text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                              required
                            />
                          </div>
                          <p className="mt-1 text-[11px] text-on-surface-variant">
                            Format: +91 XXXXX XXXXX (10 digits)
                          </p>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-xs font-semibold text-on-surface mb-1.5">
                            Registered Email Address *
                          </label>
                          <input
                            id="input-forgot-email"
                            type="email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="aditya.verma@indusaitech.in"
                            className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-lg text-sm text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                            required
                          />
                          <p className="mt-1 text-[11px] text-on-surface-variant">
                            Enter the email associated with your venture profile.
                          </p>
                        </div>
                      )}

                      <button
                        id="btn-send-otp"
                        type="submit"
                        className="w-full py-3 bg-primary text-white hover:bg-primary-hover rounded-lg text-sm font-semibold hover:bg-white-hover shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                      >
                        <span>{t('sendOtp')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}

                {/* ---------------- STEP 3 & 4: OTP VERIFICATION SCREEN ---------------- */}
                {forgotStep === 'otp' && (
                  <div>
                    <div className="mb-6">
                      <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center mb-3">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h1 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-1">
                        OTP Verification
                      </h1>
                      <p className="text-xs text-on-surface-variant">
                        We sent a 6-digit One-Time Password to{' '}
                        <strong className="text-on-surface">
                          {forgotMethod === 'phone'
                            ? formatIndianPhoneNumber(forgotPhoneDigits, forgotCountryCode)
                            : forgotEmail}
                        </strong>
                      </p>
                    </div>

                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1.5 text-center">
                          {t('enterOtpLabel')} *
                        </label>
                        <input
                          id="input-otp-code"
                          type="text"
                          value={enteredOtp}
                          onChange={(e) => {
                            setEnteredOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                            if (forgotError) setForgotError(null);
                          }}
                          placeholder="123456"
                          maxLength={6}
                          className="w-full max-w-xs mx-auto block px-4 py-3 text-center tracking-[0.5em] font-mono text-2xl font-bold bg-transparent border border-white/10 rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                          required
                          autoFocus
                        />
                        <div className="mt-2.5 flex items-center justify-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/20">
                            💡 Demo OTP: 123456
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-on-surface-variant">Didn&apos;t receive OTP?</span>
                        <button
                          type="button"
                          onClick={() => {
                            setForgotStatusMsg('OTP sent successfully.');
                            setEnteredOtp('');
                          }}
                          className="text-white font-semibold hover:underline"
                        >
                          Resend OTP
                        </button>
                      </div>

                      <button
                        id="btn-verify-otp"
                        type="submit"
                        disabled={enteredOtp.length !== 6}
                        className="w-full py-3 bg-primary text-white hover:bg-primary-hover rounded-lg text-sm font-semibold hover:bg-white-hover disabled:opacity-50 shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        <span>{t('verifyOtpButton')}</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}

                {/* ---------------- STEP 5: CREATE NEW PASSWORD ---------------- */}
                {forgotStep === 'new_password' && (
                  <div>
                    <div className="mb-6">
                      <div className="w-10 h-10 rounded-lg bg-success/10 text-success flex items-center justify-center mb-3">
                        <KeyRound className="w-5 h-5" />
                      </div>
                      <h1 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-1">
                        {t('createNewPassword')}
                      </h1>
                      <p className="text-xs text-on-surface-variant">
                        {t('createNewPasswordSubtitle')}
                      </p>
                    </div>

                    <form onSubmit={handleSaveNewPassword} className="space-y-4">
                      {/* New Password with Eye Icon */}
                      <PasswordInput
                        id="input-new-password"
                        label="New Password"
                        value={newPassword}
                        onChange={(val) => {
                          setNewPassword(val);
                          if (forgotError) setForgotError(null);
                        }}
                        placeholder="••••••"
                        required
                        autoComplete="new-password"
                      />

                      {/* Confirm New Password with Eye Icon */}
                      <PasswordInput
                        id="input-confirm-new-password"
                        label="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(val) => {
                          setConfirmNewPassword(val);
                          if (forgotError) setForgotError(null);
                        }}
                        placeholder="••••••"
                        required
                        autoComplete="new-password"
                      />

                      {/* Realtime Matching Status */}
                      {newPassword && confirmNewPassword && (
                        <div className="text-[11px] font-medium">
                          {newPassword === confirmNewPassword && newPassword.length === 6 ? (
                            <span className="text-success flex items-center gap-1 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match exactly
                            </span>
                          ) : (
                            <span className="text-error flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" />
                              {newPassword !== confirmNewPassword ? 'Passwords do not match.' : 'Password must contain exactly 6 characters.'}
                            </span>
                          )}
                        </div>
                      )}

                      <button
                        id="btn-save-new-password"
                        type="submit"
                        className="w-full py-3 bg-primary text-white hover:bg-primary-hover rounded-lg text-sm font-semibold hover:bg-white-hover shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        <span>Reset Password</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}

                {/* ---------------- STEP 6: PASSWORD RESET SUCCESSFUL ---------------- */}
                {forgotStep === 'success' && (
                  <div className="text-center py-4 space-y-5">
                    <div className="w-16 h-16 rounded-xl bg-success/10 text-success flex items-center justify-center mx-auto shadow-xs border border-success/20">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div>
                      <h2 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-1.5">
                        {t('passwordResetSuccessfulTitle')}
                      </h2>
                      <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                        {t('passwordUpdatedSuccess')}
                      </p>
                    </div>

                    <div className="p-3.5 bg-transparent border border-white/10 rounded-lg text-xs text-on-surface max-w-sm mx-auto text-left flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-white shrink-0" />
                      <div>
                        <div className="font-semibold">Ready to Sign In</div>
                        <div className="text-[11px] text-on-surface-variant">
                          Your updated 6-character password is now active for {forgotTargetUser?.email || 'your account'}.
                        </div>
                      </div>
                    </div>

                    <button
                      id="btn-return-to-signin-success"
                      type="button"
                      onClick={handleReturnToSignInFromSuccess}
                      className="w-full max-w-sm mx-auto py-3 bg-primary text-white hover:bg-primary-hover rounded-lg text-sm font-semibold hover:bg-white-hover shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{t('returnToSignIn')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-4 text-center text-xs text-on-surface-variant">
        MatchWise AI • Official Scheme Matching & Discovery Platform • All applications completed on official provider portals
      </footer>
    </div>
  );
};
