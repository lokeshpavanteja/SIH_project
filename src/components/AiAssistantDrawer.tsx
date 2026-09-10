import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scheme, UserProfile, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  schemes: Scheme[];
  currentLanguage: LanguageCode;
  onOpenCompare: (schemeA?: Scheme, schemeB?: Scheme) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  userProfile,
  schemes,
  currentLanguage,
  onOpenCompare,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello ${userProfile.name}! I am your MatchWise AI Scheme Assistant. I can help you evaluate Government & Private schemes for **${userProfile.companyName}** (${userProfile.country}), check eligibility, prepare document checklists, and compare scheme benefits.

*Note: MatchWise is a matching and discovery platform. We provide verified official links so you can complete applications directly on official portals.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => getTranslation(key, currentLanguage);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = [
    'Compare Startup India Seed Fund vs BIRAC BIG',
    'What documents are needed for MSME CGTMSE?',
    'What is the difference between Gov Grants and Private VC?',
    'Which scheme matches my Indian entity best?',
  ];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          userProfile,
          schemesSummary: schemes.map((s) => ({
            id: s.id,
            title: s.title,
            type: s.type,
            provider: s.providerName,
            amount: s.amountFormatted,
            matchScore: s.matchScore,
            officialWebsiteUrl: s.officialWebsiteUrl,
          })),
          language: currentLanguage,
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text:
          data.reply ||
          'I recommend reviewing the official guidelines on the portal. Please ensure all your compliance documents are ready in your vault.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error contacting AI Assistant:', err);
      const errorMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: 'Based on your profile, both Central Government schemes (like Startup India) and Private Grants offer targeted funding. Be sure to check your document readiness and apply directly via the verified official portal.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-scrim/40 backdrop-blur-xs"
        />

        {/* Sliding Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="fixed inset-y-0 right-0 max-w-full w-full sm:w-[460px] bg-surface-container-lowest border-l border-surface-variant shadow-elevated z-10 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-surface-variant bg-surface/80 backdrop-blur-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-on-primary flex items-center justify-center font-bold shadow-xs">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <div>
                <h3 className="font-headline-md text-base font-bold text-on-surface flex items-center gap-1.5">
                  <span>MatchWise AI Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-success inline-block animate-pulse" />
                </h3>
                <p className="text-[11px] text-on-surface-variant">
                  Scheme matching & eligibility advisor for {userProfile.companyName}
                </p>
              </div>
            </div>

            <button
              id="btn-close-ai-drawer"
              onClick={onClose}
              className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2.5 bg-surface border-b border-surface-variant flex items-center gap-1.5 overflow-x-auto">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-lg bg-surface-container-lowest border border-surface-variant hover:border-white text-[11px] text-on-surface whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-white/5 text-white border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[15px]">smart_toy</span>
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-white text-on-primary rounded-br-xs'
                      : 'bg-surface border border-surface-variant text-on-surface rounded-bl-xs whitespace-pre-line'
                  }`}
                >
                  <div>{msg.text}</div>
                  <div
                    className={`text-[10px] mt-1.5 text-right ${
                      msg.sender === 'user' ? 'text-on-primary/70' : 'text-on-surface-variant'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-on-surface-variant">
                <div className="w-7 h-7 rounded-lg bg-white/5 text-white border border-white/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[15px] animate-spin">sync</span>
                </div>
                <div className="bg-surface border border-surface-variant rounded-xl px-4 py-2 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-white animate-bounce delay-100" />
                  <span className="w-2 h-2 rounded-full bg-white animate-bounce delay-200" />
                  <span className="ml-1 text-on-surface-variant">Evaluating schemes & criteria...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-surface-variant bg-surface-container-lowest">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                id="input-ai-chat"
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about scheme eligibility, documents, or compare..."
                className="flex-1 px-4 py-2.5 bg-surface border border-surface-variant rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                id="btn-send-ai-chat"
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="p-2.5 bg-white text-on-primary rounded-xl hover:bg-white-hover disabled:opacity-50 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
            <p className="mt-2 text-[10px] text-center text-on-surface-variant">
              MatchWise provides advisory matching. Always complete final applications on official portals.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
