import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
    <div className="fixed bottom-20 md:bottom-6 right-4 z-[60] space-y-2 max-w-xs">
      <AnimatePresence>
        {toasts.map(toast => {
          const iconMap = {
            success: 'check_circle',
            info: 'info',
            warning: 'warning',
          };
          const colorMap = {
            success: 'bg-green-600',
            info: 'bg-surface-container-highest',
            warning: 'bg-amber-600',
          };
          const textColorMap = {
            success: 'text-white',
            info: 'text-on-surface',
            warning: 'text-white',
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`${colorMap[toast.type]} ${textColorMap[toast.type]} rounded-xl shadow-lg px-4 py-3 flex items-start gap-2.5 cursor-pointer`}
              onClick={() => onDismiss(toast.id)}
            >
              <span className="material-symbols-outlined text-[18px] mt-0.5">{iconMap[toast.type]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.message && <p className="text-xs opacity-80 mt-0.5 truncate">{toast.message}</p>}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDismiss(toast.id); }}
                className="opacity-60 hover:opacity-100"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
