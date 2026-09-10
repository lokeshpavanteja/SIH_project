import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Info, DollarSign, Calendar, Target, ShieldCheck } from 'lucide-react';
import { Scheme } from '../types';

interface SchemeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  schemes: Scheme[];
  onRemoveScheme: (scheme: Scheme) => void;
}

export const SchemeComparisonModal: React.FC<SchemeComparisonModalProps> = ({
  isOpen,
  onClose,
  schemes,
  onRemoveScheme,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-outline"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-outline bg-surface-container">
            <div>
              <h2 className="font-headline-md text-on-background flex items-center gap-2">
                Compare Schemes
                <span className="text-xs py-1 px-2 rounded-md bg-primary/20 text-primary font-bold">
                  {schemes.length} selected
                </span>
              </h2>
              <p className="text-sm text-on-surface-muted mt-1">Side-by-side view of your selected schemes</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-hover rounded-full transition-colors"
            >
              <X size={24} className="text-on-surface-muted hover:text-on-surface" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {schemes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-on-surface-muted">
                <Info size={48} className="mb-4 opacity-50" />
                <p>No schemes selected for comparison.</p>
              </div>
            ) : (
              <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
                {schemes.map((scheme) => (
                  <div key={scheme.id} className="min-w-[300px] w-1/3 flex-shrink-0 snap-start bg-surface-container rounded-2xl border border-outline p-5 relative flex flex-col">
                    <button
                      onClick={() => onRemoveScheme(scheme)}
                      className="absolute top-4 right-4 p-1.5 bg-surface rounded-full hover:bg-error/20 hover:text-error text-on-surface-muted transition-colors border border-outline"
                      title="Remove from comparison"
                    >
                      <X size={16} />
                    </button>
                    
                    <div className="mb-4 pr-8">
                      <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">{scheme.type}</div>
                      <h3 className="font-headline-sm text-on-background leading-tight mb-2">{scheme.title}</h3>
                      <p className="text-sm text-on-surface-variant line-clamp-2">{scheme.providerName}</p>
                    </div>

                    <div className="space-y-6 flex-1">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-on-surface-muted uppercase mb-2">
                          <DollarSign size={14} /> Amount
                        </div>
                        <div className="text-lg font-bold text-success">{scheme.amountFormatted}</div>
                        <div className="text-sm text-on-surface-variant">{scheme.fundingNature}</div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-on-surface-muted uppercase mb-2">
                          <Calendar size={14} /> Deadline
                        </div>
                        <div className="text-sm font-medium text-on-surface">{scheme.deadline}</div>
                        <div className="text-xs text-on-surface-variant">{scheme.deadlineRelative}</div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-on-surface-muted uppercase mb-2">
                          <Target size={14} /> Eligibility Highlights
                        </div>
                        <ul className="space-y-2">
                          {scheme.eligibility.slice(0, 3).map((req, idx) => (
                            <li key={idx} className="text-sm text-on-surface-variant flex items-start gap-2">
                              <CheckCircle size={14} className="text-secondary mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-2">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-on-surface-muted uppercase mb-2">
                          <ShieldCheck size={14} /> Documents Required
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {scheme.requiredDocs.slice(0, 4).map((doc, idx) => (
                            <span key={idx} className="text-xs bg-surface-container px-2 py-1 rounded-md text-on-surface border border-outline truncate max-w-full">
                              {doc}
                            </span>
                          ))}
                          {scheme.requiredDocs.length > 4 && (
                            <span className="text-xs bg-surface-container px-2 py-1 rounded-md text-on-surface-muted border border-outline">
                              +{scheme.requiredDocs.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
