import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[120] space-y-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          const iconMap = {
            success: <CheckCircle2 className="text-success mt-0.5 shrink-0" size={20} />,
            info: <Info className="text-secondary mt-0.5 shrink-0" size={20} />,
            warning: <AlertTriangle className="text-amber-500 mt-0.5 shrink-0" size={20} />,
          };
          
          const glowMap = {
            success: 'shadow-[0_0_20px_rgba(34,197,94,0.15)]',
            info: 'shadow-[0_0_20px_rgba(14,165,233,0.15)]',
            warning: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
          };

          const borderMap = {
            success: 'border-success/30',
            info: 'border-secondary/30',
            warning: 'border-amber-500/30',
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`glass-panel border ${borderMap[toast.type]} ${glowMap[toast.type]} rounded-xl p-4 flex items-start gap-3 pointer-events-auto group relative overflow-hidden`}
              onClick={() => onDismiss(toast.id)}
            >
              {iconMap[toast.type]}
              
              <div className="flex-1 min-w-0 pr-6">
                <p className="text-sm font-bold text-white mb-0.5">{toast.title}</p>
                {toast.message && <p className="text-xs text-on-surface-muted leading-relaxed line-clamp-2">{toast.message}</p>}
              </div>
              
              <button
                onClick={(e) => { e.stopPropagation(); onDismiss(toast.id); }}
                className="absolute top-4 right-4 text-on-surface-muted hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-1"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
