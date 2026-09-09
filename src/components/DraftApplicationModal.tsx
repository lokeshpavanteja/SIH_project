import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Grant, UserProfile } from '../types';

interface DraftApplicationModalProps {
  grant: Grant | null;
  userProfile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveDraft: (grantId: string, progress: number) => void;
  onSubmitApplication: (grantId: string) => void;
}

export const DraftApplicationModal: React.FC<DraftApplicationModalProps> = ({
  grant,
  userProfile,
  isOpen,
  onClose,
  onSaveDraft,
  onSubmitApplication,
}) => {
  const [activeSection, setActiveSection] = useState<'exec' | 'problem' | 'solution' | 'budget'>('exec');
  const [execSummary, setExecSummary] = useState(
    `${userProfile.companyName} respectfully applies for the ${grant?.title || 'Tech Grant'} to accelerate deployment of our ethical machine learning infrastructure. Founded by ${userProfile.name} Chen, our team delivers high-precision algorithmic workflows for underserved health and enterprise ecosystems.`
  );
  const [problemStatement, setProblemStatement] = useState(
    'Underrepresented communities and community health clinics face significant hurdles adopting modern enterprise AI due to prohibitive licensing costs and lack of localized fine-tuning models.'
  );
  const [solutionStatement, setSolutionStatement] = useState(
    'Apex AI Solutions deploys modular, privacy-preserving small language models and automated validation pipelines that reduce operational inference overhead by 45% while adhering to strict fairness benchmarks.'
  );
  const [budgetNarrative, setBudgetNarrative] = useState(
    `Requested Funding: ${grant?.amountFormatted || '$50,000'}\n\n- Engineering & Machine Learning Research: 55%\n- Cloud Infrastructure & Security Audits: 25%\n- Partner Outreach & Community Impact Reporting: 20%`
  );
  const [isEnhancingWithAI, setIsEnhancingWithAI] = useState(false);

  if (!isOpen || !grant) return null;

  const handleEnhanceWithAI = async () => {
    setIsEnhancingWithAI(true);
    try {
      const sectionName =
        activeSection === 'exec'
          ? 'Executive Summary'
          : activeSection === 'problem'
          ? 'Problem Statement'
          : activeSection === 'solution'
          ? 'Proposed AI Technical Solution'
          : 'Budget Narrative & Milestones';

      const response = await fetch('/api/gemini/grant-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grantTitle: grant.title,
          agency: grant.agency,
          description: grant.description,
          sectionName,
          companyProfile: userProfile,
          customInstructions: 'Enhance this section to maximize grant reviewer scoring.',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (activeSection === 'exec') setExecSummary(data.content);
        else if (activeSection === 'problem') setProblemStatement(data.content);
        else if (activeSection === 'solution') setSolutionStatement(data.content);
        else if (activeSection === 'budget') setBudgetNarrative(data.content);
      }
    } catch {
      // Fallback
    } finally {
      setIsEnhancingWithAI(false);
    }
  };

  const handleSave = () => {
    onSaveDraft(grant.id, 85);
    onClose();
  };

  const handleSubmit = () => {
    onSubmitApplication(grant.id);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-surface-variant bg-surface flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-secondary-fixed-dim text-on-secondary-fixed font-label-sm text-xs px-2 py-0.5 rounded font-bold">
                  Draft in Progress
                </span>
                <span className="text-xs text-outline font-medium">
                  {grant.amountFormatted} • {grant.deadlineRelative}
                </span>
              </div>
              <h2 className="font-headline-md text-xl text-on-surface font-bold">
                Application: {grant.title}
              </h2>
              <p className="text-xs text-on-surface-variant">
                Funding Agency: {grant.agency}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Section Tabs */}
          <div className="flex border-b border-surface-variant px-6 bg-surface-container-low overflow-x-auto">
            {[
              { key: 'exec', label: '1. Executive Summary' },
              { key: 'problem', label: '2. Problem Statement' },
              { key: 'solution', label: '3. Technical Solution' },
              { key: 'budget', label: '4. Budget & Milestones' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key as any)}
                className={`py-3 px-3.5 font-label-md text-xs border-b-2 whitespace-nowrap transition-all font-semibold ${
                  activeSection === tab.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-xs font-bold text-on-surface">
                {activeSection === 'exec' && 'Executive Summary & Venture Alignment'}
                {activeSection === 'problem' && 'Problem Statement & Need Description'}
                {activeSection === 'solution' && 'Technical Innovation & Impact Methodology'}
                {activeSection === 'budget' && 'Itemized Budget & Milestones Narrative'}
              </span>

              <button
                onClick={handleEnhanceWithAI}
                disabled={isEnhancingWithAI}
                className="text-xs font-semibold text-primary hover:text-on-primary-fixed-variant flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary-container">
                  auto_awesome
                </span>
                {isEnhancingWithAI ? 'Enhancing with Gemini...' : 'Polish Section with AI'}
              </button>
            </div>

            {activeSection === 'exec' && (
              <textarea
                rows={9}
                value={execSummary}
                onChange={(e) => setExecSummary(e.target.value)}
                className="w-full p-4 bg-surface border border-outline-variant rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary font-mono resize-none text-on-surface"
              />
            )}

            {activeSection === 'problem' && (
              <textarea
                rows={9}
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                className="w-full p-4 bg-surface border border-outline-variant rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary font-mono resize-none text-on-surface"
              />
            )}

            {activeSection === 'solution' && (
              <textarea
                rows={9}
                value={solutionStatement}
                onChange={(e) => setSolutionStatement(e.target.value)}
                className="w-full p-4 bg-surface border border-outline-variant rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary font-mono resize-none text-on-surface"
              />
            )}

            {activeSection === 'budget' && (
              <textarea
                rows={9}
                value={budgetNarrative}
                onChange={(e) => setBudgetNarrative(e.target.value)}
                className="w-full p-4 bg-surface border border-outline-variant rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary font-mono resize-none text-on-surface"
              />
            )}

            <div className="p-3 bg-surface rounded-lg border border-surface-variant flex items-center gap-2 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
              <span>All attached documents (MBE Certificate, AI Privacy Framework) will be automatically bundled upon submission.</span>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 md:p-6 border-t border-surface-variant bg-surface flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-outline-variant hover:bg-surface-variant text-on-surface font-label-md text-xs rounded-lg transition-colors"
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-surface-variant hover:bg-outline-variant text-on-surface font-label-md text-xs rounded-lg transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-md text-xs rounded-lg transition-all shadow-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                Submit Official Application
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
