import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getCountryFlag } from '../utils/countryData';
import { Globe, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CountryChangeModalProps {
  isOpen: boolean;
  currentCountry: string;
  targetCountry: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const CountryChangeModal: React.FC<CountryChangeModalProps> = ({
  isOpen,
  currentCountry,
  targetCountry,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const currentFlag = getCountryFlag(currentCountry);
  const targetFlag = getCountryFlag(targetCountry);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 bg-scrim/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-surface-container-lowest border border-surface-variant rounded-xl p-6 sm:p-7 shadow-elevated z-10 text-on-surface space-y-5"
        >
          {/* Header Badge & Title */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  Country Matching Confirmation
                </span>
              </div>
              <h2 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface">
                Update Target Country
              </h2>
            </div>
          </div>

          {/* Country Switch Visualization */}
          <div className="p-4 rounded-xl bg-surface border border-surface-variant flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{currentFlag}</span>
              <div>
                <div className="text-[10px] text-on-surface-variant uppercase font-semibold">Active Country</div>
                <div className="text-xs font-bold text-on-surface">{currentCountry}</div>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </div>

            <div className="flex items-center gap-2.5 text-right">
              <div>
                <div className="text-[10px] text-white uppercase font-semibold">New Country</div>
                <div className="text-xs font-bold text-white">{targetCountry}</div>
              </div>
              <span className="text-2xl">{targetFlag}</span>
            </div>
          </div>

          {/* Core Notice Message */}
          <div className="space-y-2.5 text-xs leading-relaxed text-on-surface-variant">
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-on-surface flex items-start gap-2.5 font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Notice:</strong> Changing your country will update your available Government and Private schemes.
              </span>
            </div>

            <p>
              Are you sure you want to change your profile country to <strong>{targetCountry}</strong>?
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-on-surface-variant">
              <li>
                <strong>Government Schemes:</strong> MatchWise will exclusively recommend verified Government schemes belonging to <strong>{targetCountry}</strong>.
              </li>
              <li>
                <strong>Private Schemes:</strong> Domestic private grants and global corporate programs for <strong>{targetCountry}</strong> will be prioritized.
              </li>
              <li>
                <strong>Match Scores:</strong> Eligibility scores and document readiness checklists will recalculate for <strong>{targetCountry}</strong> regulations.
              </li>
            </ul>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-surface-variant flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
            <button
              id="btn-cancel-country-change"
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-surface-variant bg-surface hover:bg-surface-variant text-xs font-semibold text-on-surface transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              id="btn-confirm-country-change"
              type="button"
              onClick={onConfirm}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-on-primary text-xs font-semibold hover:bg-white-hover shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Switch to {targetCountry}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
