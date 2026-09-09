import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReadinessTask } from '../types';

interface ImproveScoreModalProps {
  isOpen: boolean;
  score: number;
  tasks: ReadinessTask[];
  onClose: () => void;
  onToggleTask: (taskId: string) => void;
  onOpenDocUpload: (docType?: string) => void;
}

export const ImproveScoreModal: React.FC<ImproveScoreModalProps> = ({
  isOpen,
  score,
  tasks,
  onClose,
  onToggleTask,
  onOpenDocUpload,
}) => {
  if (!isOpen) return null;

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-surface-variant bg-surface flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-primary/20 flex items-center justify-center bg-surface-container-lowest shadow-xs">
                <span className="font-headline-md text-xl text-primary font-bold">
                  {score}
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-lg text-on-surface font-bold">
                  Readiness Score Audit
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Complete {incompleteTasks.length} pending task{incompleteTasks.length === 1 ? '' : 's'} to achieve 100/100 readiness.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Body List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {/* Pending Tasks */}
            <div>
              <h4 className="font-label-md text-xs uppercase tracking-wider text-outline font-semibold mb-3">
                High-Impact Tasks to Complete
              </h4>
              <div className="space-y-3">
                {incompleteTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl border border-secondary-container/40 bg-secondary-fixed/10 hover:border-secondary-container transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className="w-5 h-5 rounded border-2 border-outline hover:border-primary flex items-center justify-center text-transparent hover:text-primary transition-colors mt-0.5"
                        title="Mark as Complete"
                      >
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-label-md text-sm font-semibold text-on-surface">
                            {task.title}
                          </h5>
                          <span className="bg-secondary-container text-on-secondary-container font-label-sm text-[10px] px-1.5 py-0.5 rounded font-bold">
                            +{task.points} pts
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1">
                          {task.subtitle}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (task.requiredDocType) {
                          onOpenDocUpload(task.requiredDocType);
                        } else {
                          onToggleTask(task.id);
                        }
                      }}
                      className="px-3 py-1.5 bg-primary text-on-primary font-label-sm text-xs rounded-lg hover:bg-on-primary-fixed-variant transition-colors shrink-0 shadow-xs"
                    >
                      {task.actionLabel}
                    </button>
                  </div>
                ))}

                {incompleteTasks.length === 0 && (
                  <div className="p-6 text-center bg-primary-fixed/20 border border-primary-fixed rounded-xl text-primary">
                    <span className="material-symbols-outlined text-4xl mb-1">
                      emoji_events
                    </span>
                    <h5 className="font-bold text-sm">Perfect 100/100 Score Achieved!</h5>
                    <p className="text-xs mt-1 text-on-primary-fixed-variant">
                      Your profile has unlocked Tier-1 federal and corporate grant priority queues.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div>
                <h4 className="font-label-md text-xs uppercase tracking-wider text-outline font-semibold mb-3">
                  Verified & Completed ({completedTasks.length})
                </h4>
                <div className="space-y-2">
                  {completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg bg-surface border border-surface-variant flex items-center justify-between opacity-80"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                        <div>
                          <h6 className="font-label-md text-xs font-semibold text-on-surface line-through">
                            {task.title}
                          </h6>
                          <span className="text-[10px] text-outline">
                            Verified (+{task.points} pts)
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onToggleTask(task.id)}
                        className="text-[11px] text-outline hover:text-error transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-surface-variant bg-surface flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-primary text-on-primary font-label-md text-xs rounded-lg hover:bg-on-primary-fixed-variant transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
