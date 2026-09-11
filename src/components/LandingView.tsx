import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, ArrowRight, ShieldCheck, Landmark, CheckCircle2, Layers, Search, Sparkles } from 'lucide-react';

interface LandingViewProps {
  onNavigateAuth: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onNavigateAuth,
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050505] text-[#111111] dark:text-[#F5F5F5] font-sans selection:bg-[#111111] selection:text-white dark:selection:bg-[#F5F5F5] dark:selection:text-black relative overflow-hidden">
      
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.4] dark:opacity-[0.2] pointer-events-none z-0" />

      {/* Subtle Glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#E5E5E5]/50 dark:from-[#1A1A1A]/50 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#FAFAFA]/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-[#E5E5E5]/50 dark:border-[#222222]/50">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-1 z-10">
            <span className="font-bold text-[20px] tracking-tight">MatchWise</span>
            <span className="font-bold text-[20px] tracking-tight">AI</span>
          </div>

          <div className="flex items-center gap-6 z-10">
            <button
              onClick={onToggleTheme}
              className="p-2 text-[#6B6B6B] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F5F5F5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-[#F5F5F5] rounded-md"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={onNavigateAuth}
              className="text-[14px] font-semibold text-[#6B6B6B] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F5F5F5] transition-colors hidden sm:block"
            >
              Sign in
            </button>
            <button
              onClick={onNavigateAuth}
              className="px-[16px] py-[8px] bg-[#111111] dark:bg-[#F5F5F5] text-[#FFFFFF] dark:text-[#111111] text-[14px] font-semibold rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-[0.5px] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#111111] dark:focus:ring-offset-[#050505]"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.04)] mb-8">
                <Sparkles size={14} className="text-[#111111] dark:text-[#F5F5F5]" />
                <span className="text-[13px] font-medium text-[#111111] dark:text-[#F5F5F5]">Match engine v2.0 live</span>
              </div>
              <h1 className="text-[56px] sm:text-[72px] leading-[1.05] font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight mb-6 drop-shadow-sm">
                Fund your startup, <br className="hidden sm:block" /> without the friction.
              </h1>
              <p className="text-[18px] leading-[1.6] text-[#6B6B6B] dark:text-[#888888] max-w-[540px] mx-auto lg:mx-0 mb-10">
                Instantly cross-reference your startup's profile against 96+ central, state, and private schemes. Discover capital you already qualify for.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={onNavigateAuth}
                  className="px-[24px] py-[12px] w-full sm:w-auto bg-[#111111] dark:bg-[#F5F5F5] text-[#FFFFFF] dark:text-[#111111] text-[15px] font-semibold rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-[1px] transition-all flex items-center justify-center gap-2 focus:outline-none"
                >
                  Find my schemes
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={onNavigateAuth}
                  className="px-[24px] py-[12px] w-full sm:w-auto bg-white dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#111111] dark:text-[#F5F5F5] text-[15px] font-semibold rounded-[8px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A] transition-colors focus:outline-none"
                >
                  Explore directory
                </button>
              </div>
            </motion.div>
          </div>

          {/* Hero UI Mockup */}
          <div className="flex-1 w-full max-w-[600px] relative perspective-[1000px]">
            <motion.div
              initial={{ opacity: 0, rotateY: 10, rotateX: 5, z: -100 }}
              animate={{ opacity: 1, rotateY: -5, rotateX: 5, z: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative w-full aspect-[4/3] rounded-[16px] border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#111111] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
            >
              {/* Fake App Header */}
              <div className="h-12 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#161616] flex items-center px-4 gap-4">
                <div className="w-3 h-3 rounded-full bg-[#E5E5E5] dark:bg-[#333]"></div>
                <div className="w-3 h-3 rounded-full bg-[#E5E5E5] dark:bg-[#333]"></div>
                <div className="w-3 h-3 rounded-full bg-[#E5E5E5] dark:bg-[#333]"></div>
                <div className="ml-auto w-32 h-6 bg-[#FFFFFF] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md"></div>
              </div>
              
              {/* Fake App Body */}
              <div className="p-6 flex-1 bg-[#FAFAFA] dark:bg-[#0A0A0A] relative">
                 {/* Mock Scheme Card */}
                 <motion.div 
                   animate={{ y: [0, -4, 0] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="w-[85%] bg-white dark:bg-[#161616] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[10px] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)] absolute top-8 left-8"
                 >
                   <div className="flex justify-between items-start mb-3">
                     <span className="border border-[#E5E5E5] dark:border-[#2A2A2A] text-[10px] font-semibold px-2 py-0.5 rounded text-[#6B6B6B] dark:text-[#888888] uppercase tracking-wider">
                       Government
                     </span>
                     <div className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#111111] dark:border-[#F5F5F5] bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-black">
                       <Sparkles size={10} />
                       <span className="text-[11px] font-bold">96% Match</span>
                     </div>
                   </div>
                   <div className="h-5 w-3/4 bg-[#111111] dark:bg-[#F5F5F5] rounded-[4px] mb-2 opacity-80"></div>
                   <div className="h-3 w-full bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-[2px] mb-1"></div>
                   <div className="h-3 w-5/6 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-[2px] mb-4"></div>
                   
                   <div className="flex gap-2">
                     <div className="h-8 w-24 bg-[#FAFAFA] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px]"></div>
                     <div className="h-8 w-24 bg-[#111111] dark:bg-[#F5F5F5] rounded-[6px]"></div>
                   </div>
                 </motion.div>

                 {/* Mock Compare Button Floating */}
                 <motion.div 
                   animate={{ y: [0, 4, 0] }}
                   transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                   className="absolute bottom-6 right-6 bg-white dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-[0_8px_24px_rgba(0,0,0,0.12)] rounded-[8px] px-4 py-2.5 flex items-center gap-2"
                 >
                   <Layers size={16} className="text-[#111111] dark:text-[#F5F5F5]" />
                   <span className="text-[13px] font-bold text-[#111111] dark:text-[#F5F5F5]">Compare (2)</span>
                 </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight mb-4 text-[#111111] dark:text-[#F5F5F5]">
              Engineered for founders.
            </h2>
            <p className="text-[16px] text-[#6B6B6B] dark:text-[#888888] max-w-[500px] mx-auto">
              Everything you need to discover, evaluate, and apply for capital in a single, highly performant interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
            {/* Bento 1: AI Match (Spans 2 cols) */}
            <div className="md:col-span-2 relative rounded-[16px] bg-white dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAFA] to-[#FFFFFF] dark:from-[#161616] dark:to-[#111111] -z-10" />
              <div className="p-8 pb-0 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-[20px] font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">Algorithmic Match Scoring</h3>
                  <p className="text-[14px] text-[#6B6B6B] dark:text-[#888888] max-w-[340px]">
                    Our engine evaluates 40+ data points from your profile to generate deterministic compatibility scores.
                  </p>
                </div>
                {/* Visual */}
                <div className="mt-8 mx-auto w-full max-w-[400px] h-[160px] bg-[#FAFAFA] dark:bg-[#0A0A0A] border-t border-l border-r border-[#E5E5E5] dark:border-[#2A2A2A] rounded-t-[12px] p-4 flex flex-col gap-3 relative translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <div className="flex justify-between items-center border-b border-[#E5E5E5] dark:border-[#2A2A2A] pb-3">
                     <div className="flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-[#111111] dark:text-[#F5F5F5]" />
                       <span className="text-[13px] font-medium text-[#111111] dark:text-[#F5F5F5]">Eligibility verified</span>
                     </div>
                     <span className="text-[24px] font-bold text-[#111111] dark:text-[#F5F5F5]">96%</span>
                   </div>
                   <div className="flex gap-2 flex-wrap">
                     <span className="text-[11px] px-2 py-1 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded bg-white dark:bg-[#161616]">DPIIT Recognized</span>
                     <span className="text-[11px] px-2 py-1 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded bg-white dark:bg-[#161616]">DeepTech</span>
                     <span className="text-[11px] px-2 py-1 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded bg-white dark:bg-[#161616]">Pre-seed</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Bento 2: Unified Interface */}
            <div className="relative rounded-[16px] bg-white dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="p-8 h-full flex flex-col">
                <Search className="w-8 h-8 text-[#111111] dark:text-[#F5F5F5] mb-6" />
                <h3 className="text-[20px] font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">Unified Access</h3>
                <p className="text-[14px] text-[#6B6B6B] dark:text-[#888888] mb-auto">
                  Search across central grants, state subsidies, and private venture funds from one dashboard.
                </p>
                <div className="flex -space-x-2 mt-4">
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111111] bg-[#FAFAFA] dark:bg-[#2A2A2A] flex items-center justify-center"><Landmark size={12}/></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111111] bg-[#E5E5E5] dark:bg-[#333333] flex items-center justify-center"><Layers size={12}/></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111111] bg-[#111111] dark:bg-[#F5F5F5] flex items-center justify-center text-white dark:text-black text-[10px] font-bold">+94</div>
                </div>
              </div>
            </div>

            {/* Bento 3: Comparison Engine */}
            <div className="relative rounded-[16px] bg-white dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="p-8 h-full flex flex-col">
                <Layers className="w-8 h-8 text-[#111111] dark:text-[#F5F5F5] mb-6" />
                <h3 className="text-[20px] font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">Side-by-side Compare</h3>
                <p className="text-[14px] text-[#6B6B6B] dark:text-[#888888]">
                  Stack multiple schemes next to each other to evaluate funding caps, equity requirements, and timelines instantly.
                </p>
              </div>
            </div>

            {/* Bento 4: Direct Application (Spans 2 cols) */}
            <div className="md:col-span-2 relative rounded-[16px] bg-[#111111] dark:bg-[#F5F5F5] border border-[#222222] dark:border-[#E5E5E5] shadow-[0_8px_24px_rgba(0,0,0,0.1)] overflow-hidden group">
              <div className="p-8 h-full flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-[20px] font-bold text-[#FFFFFF] dark:text-[#111111] mb-2">Ready to apply?</h3>
                  <p className="text-[14px] text-[#888888] dark:text-[#6B6B6B] mb-6 max-w-[340px]">
                    We provide direct links to official application portals and generate a checklist of exactly what documents you need.
                  </p>
                  <button
                    onClick={onNavigateAuth}
                    className="px-[16px] py-[8px] bg-white dark:bg-[#111111] text-[#111111] dark:text-[#F5F5F5] text-[14px] font-semibold rounded-[6px] transition-all focus:outline-none"
                  >
                    Create free account
                  </button>
                </div>
                {/* Abstract document stack */}
                <div className="flex-1 w-full flex justify-center relative translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
                  <div className="w-[200px] h-[140px] bg-[#1A1A1A] dark:bg-[#FFFFFF] border border-[#333333] dark:border-[#E5E5E5] rounded-[8px] absolute rotate-6 translate-y-4 shadow-lg"></div>
                  <div className="w-[200px] h-[140px] bg-[#222222] dark:bg-[#FAFAFA] border border-[#444444] dark:border-[#D1D5DB] rounded-[8px] relative z-10 p-4 shadow-xl flex flex-col gap-2">
                     <div className="w-1/2 h-2 bg-[#333] dark:bg-[#E5E5E5] rounded-full"></div>
                     <div className="w-3/4 h-2 bg-[#333] dark:bg-[#E5E5E5] rounded-full"></div>
                     <div className="w-1/3 h-2 bg-[#333] dark:bg-[#E5E5E5] rounded-full"></div>
                     <div className="w-8 h-8 bg-white dark:bg-[#111] rounded-full mt-auto self-end flex items-center justify-center">
                       <ShieldCheck size={14} className="text-[#111111] dark:text-[#F5F5F5]" />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actionable Footer / Trust */}
        <section className="bg-white dark:bg-[#111111] py-20 px-6 border-y border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[32px] font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight mb-6">
              Start building your funding pipeline today.
            </h2>
            <p className="text-[16px] text-[#6B6B6B] dark:text-[#888888] mb-8">
              Join thousands of Indian founders who use MatchWise AI to navigate the startup ecosystem.
            </p>
            <button
              onClick={onNavigateAuth}
              className="px-[32px] py-[16px] bg-[#111111] dark:bg-[#F5F5F5] text-[#FFFFFF] dark:text-[#111111] text-[16px] font-bold rounded-[8px] shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.2)] hover:-translate-y-[1px] transition-all focus:outline-none"
            >
              Get started for free
            </button>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-1">
          <span className="font-bold text-[14px] text-[#111111] dark:text-[#F5F5F5]">MatchWise</span>
          <span className="font-bold text-[14px] text-[#111111] dark:text-[#F5F5F5]">AI</span>
        </div>
        <div className="text-[13px] text-[#6B6B6B] dark:text-[#888888]">
          © 2026 MatchWise AI. Built for Indian founders.
        </div>
      </footer>
    </div>
  );
};
