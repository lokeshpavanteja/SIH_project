import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, ArrowLeft } from 'lucide-react';

interface AuthViewProps {
  onSuccess: (name: string, email: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccess, isDarkMode, onToggleTheme }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) return;
    onSuccess(isLogin ? (name || 'User') : name, email);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050505] flex flex-col relative font-sans selection:bg-[#111111] selection:text-white dark:selection:bg-[#F5F5F5] dark:selection:text-black">
      
      {/* Premium Background Layer */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.5] dark:opacity-[0.2] pointer-events-none z-0" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#E5E5E5]/60 dark:from-[#1A1A1A]/80 to-transparent blur-3xl pointer-events-none z-0 rounded-full" />

      {/* Top Bar */}
      <div className="relative z-10 w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F5F5F5] transition-colors font-medium text-[14px]">
          <ArrowLeft size={16} />
          Back to home
        </a>
        <button
          onClick={onToggleTheme}
          className="w-8 h-8 flex items-center justify-center text-[#6B6B6B] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F5F5F5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-[#F5F5F5] rounded-md"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Form Container */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 relative z-10">
        
        {/* Logo Text */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-1"
        >
          <span className="font-bold text-[24px] tracking-tight text-[#111111] dark:text-[#F5F5F5]">MatchWise</span>
          <span className="font-bold text-[24px] tracking-tight text-[#111111] dark:text-[#F5F5F5]">AI</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-[400px]"
        >
          <div className="bg-[#FFFFFF] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#222222] rounded-[16px] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
            <div className="mb-8 text-center sm:text-left">
              <h1 className="text-[24px] font-bold tracking-tight text-[#111111] dark:text-[#F5F5F5] mb-2">
                {isLogin ? 'Sign in' : 'Create account'}
              </h1>
              <p className="text-[14px] text-[#6B6B6B] dark:text-[#888888]">
                {isLogin
                  ? 'Enter your credentials to access your dashboard.'
                  : 'Start finding schemes matched to your startup.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#111111] dark:text-[#E0E0E0]">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-[#D1D5DB] dark:border-[#333333] rounded-[8px] px-[14px] py-[10px] text-[14px] text-[#111111] dark:text-[#F5F5F5] bg-transparent focus:outline-none focus:border-[#111111] dark:focus:border-[#888888] focus:ring-1 focus:ring-[#111111] dark:focus:ring-[#888888] transition-all shadow-sm"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-[#111111] dark:text-[#E0E0E0]">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  className="w-full border border-[#D1D5DB] dark:border-[#333333] rounded-[8px] px-[14px] py-[10px] text-[14px] text-[#111111] dark:text-[#F5F5F5] bg-transparent focus:outline-none focus:border-[#111111] dark:focus:border-[#888888] focus:ring-1 focus:ring-[#111111] dark:focus:ring-[#888888] transition-all shadow-sm placeholder:text-[#9CA3AF] dark:placeholder:text-[#555555]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[13px] font-semibold text-[#111111] dark:text-[#E0E0E0]">
                    Password
                  </label>
                  {isLogin && (
                    <button type="button" className="text-[13px] text-[#6B6B6B] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#F5F5F5] transition-colors font-medium focus:outline-none">
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-[#D1D5DB] dark:border-[#333333] rounded-[8px] px-[14px] py-[10px] text-[14px] text-[#111111] dark:text-[#F5F5F5] bg-transparent focus:outline-none focus:border-[#111111] dark:focus:border-[#888888] focus:ring-1 focus:ring-[#111111] dark:focus:ring-[#888888] transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#111111] dark:bg-[#F5F5F5] text-[#FFFFFF] dark:text-[#111111] rounded-[8px] py-[12px] text-[14px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-[0.5px] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#111111] dark:focus:ring-offset-[#111111]"
              >
                {isLogin ? 'Sign in' : 'Create account'}
              </button>
            </form>

            <div className="mt-8 text-center text-[14px] text-[#6B6B6B] dark:text-[#888888]">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#111111] dark:text-[#F5F5F5] font-semibold hover:underline focus:outline-none underline-offset-4"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
