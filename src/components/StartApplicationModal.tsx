import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scheme, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';
import { Rocket, Landmark, Building2, Play } from 'lucide-react';

interface StartApplicationModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (scheme: Scheme) => void;
  currentLanguage: LanguageCode;
}

export const StartApplicationModal: React.FC<StartApplicationModalProps> = ({
  scheme,
  isOpen,
  onClose,
  onConfirm,
  currentLanguage,
}) => {
  if (!isOpen || !scheme) return null;

  const t = (key: string) => getTranslation(key, currentLanguage);
  const isGov = scheme.type === 'government';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-surface border border-white/10 rounded-2xl shadow-2xl z-10 p-6 overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Icon */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 mx-auto shadow-lg relative z-10 border border-white/20">
            <Rocket className="text-white" size={32} />
          </div>

          <h2 className="text-xl font-extrabold text-white text-center mb-3 relative z-10">
            {t('startApplicationTitle')}
          </h2>

          {/* Scheme info card */}
          <div className="p-4 bg-surface-container-low border border-white/5 rounded-xl mb-6 relative z-10 shadow-inner">
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                isGov ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {isGov ? <Landmark size={12} /> : <Building2 size={12} />}
                {isGov ? t('govBadge') : t('privateBadge')}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight">{scheme.title}</h3>
          </div>

          <p className="text-sm text-on-surface-variant text-center mb-8 relative z-10">
            {t('startApplicationDesc')}
          </p>

          {/* Actions */}
          <div className="flex gap-3 relative z-10">
            <button
              onClick={onClose}
              className="flex-1 py-3 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              {t('cancelBtn')}
            </button>
            <button
              onClick={() => { onConfirm(scheme); onClose(); }}
              className="flex-1 py-3 text-sm font-bold text-black bg-white rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play size={16} className="fill-current" />
              {t('startApplicationBtn')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
