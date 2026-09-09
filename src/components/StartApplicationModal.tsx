import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scheme, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';

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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-lg z-10 p-6"
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
            <span className="material-symbols-outlined text-primary text-[24px]">rocket_launch</span>
          </div>

          <h2 className="text-lg font-bold text-on-surface text-center mb-2">
            {t('startApplicationTitle')}
          </h2>

          {/* Scheme info */}
          <div className="p-3 bg-surface border border-outline-variant rounded-xl mb-4">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                scheme.type === 'government' ? 'bg-amber-500/10 text-amber-700' : 'bg-blue-500/10 text-blue-700'
              }`}>
                {scheme.type === 'government' ? t('govBadge') : t('privateBadge')}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-on-surface">{scheme.title}</h3>
          </div>

          <p className="text-sm text-on-surface-variant text-center mb-6">
            {t('startApplicationDesc')}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-medium text-on-surface-variant border border-outline-variant rounded-xl hover:bg-surface-variant transition-all"
            >
              {t('cancelBtn')}
            </button>
            <button
              onClick={() => { onConfirm(scheme); onClose(); }}
              className="flex-1 py-2.5 text-sm font-semibold text-on-primary bg-primary rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              {t('startApplicationBtn')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
