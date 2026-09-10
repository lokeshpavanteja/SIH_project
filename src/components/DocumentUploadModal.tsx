import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DocumentRecord } from '../types';

interface DocumentUploadModalProps {
  isOpen: boolean;
  docToUpdate?: DocumentRecord | null;
  defaultDocName?: string;
  onClose: () => void;
  onUploadSuccess: (newDoc: DocumentRecord) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  docToUpdate,
  defaultDocName,
  onClose,
  onUploadSuccess,
}) => {
  const [docName, setDocName] = useState(
    docToUpdate?.name || defaultDocName || 'Financial Statements Q3 (P&L & Balance Sheet).pdf'
  );
  const [category, setCategory] = useState(docToUpdate?.category || 'Financials');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    feedback: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFileName(file.name);
      simulateAiVerification(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      simulateAiVerification(file.name);
    }
  };

  const simulateAiVerification = (fileName: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        score: 96,
        feedback: `Verified: ${fileName} contains full 3-month P&L, balance sheet, and GAAP-compliant ledger items. Eligible for immediate submission to Innovate Now & Federal SBIR.`,
      });
    }, 1200);
  };

  const handleConfirmUpload = () => {
    const newDoc: DocumentRecord = {
      id: docToUpdate?.id || `doc-${Date.now()}`,
      name: selectedFileName || docName,
      category,
      status: 'verified',
      lastUpdated: 'Just now',
      fileSize: '1.4 MB',
      aiVerificationScore: analysisResult?.score || 95,
      feedback:
        analysisResult?.feedback ||
        'Document verified and indexed into MatchWise AI compliance vault.',
    };

    onUploadSuccess(newDoc);
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
          className="bg-surface-container-lowest border border-outline-variant rounded-xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-surface-variant bg-surface flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">upload_file</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-base text-on-surface font-bold">
                  Upload Compliance Document
                </h3>
                <p className="text-xs text-on-surface-variant">
                  MatchWise AI auto-screens your file against grant guidelines.
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

          {/* Form */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Document Name / Description
              </label>
              <input
                type="text"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option className="bg-zinc-900 text-white" value="Financials">Financials & Balance Sheets</option>
                <option className="bg-zinc-900 text-white" value="Certifications">Diversity & MBE/WBE Certifications</option>
                <option className="bg-zinc-900 text-white" value="Pitch Materials">Pitch Decks & Whitepapers</option>
                <option className="bg-zinc-900 text-white" value="Compliance">AI Governance & Privacy Policies</option>
                <option className="bg-zinc-900 text-white" value="Legal">Articles of Incorporation & Legal</option>
              </select>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`p-6 border-2 border-dashed rounded-xl text-center transition-all cursor-pointer ${
                dragActive
                  ? 'border-white bg-white/5'
                  : 'border-outline-variant hover:border-white/50 bg-surface'
              }`}
            >
              <input
                type="file"
                id="doc-file-input"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.xlsx,.csv,.docx,.png"
              />
              <label htmlFor="doc-file-input" className="cursor-pointer block">
                <span className="material-symbols-outlined text-4xl text-white mb-2">
                  cloud_upload
                </span>
                <h5 className="font-label-md text-xs font-semibold text-on-surface">
                  {selectedFileName ? selectedFileName : 'Drag & drop file here or browse'}
                </h5>
                <p className="text-[11px] text-on-surface-variant mt-1">
                  Supports PDF, Excel, CSV, Word up to 25MB
                </p>
              </label>
            </div>

            {/* AI Analysis Feedback */}
            {isAnalyzing && (
              <div className="p-4 rounded-xl bg-surface border border-surface-variant flex items-center gap-3">
                <span className="material-symbols-outlined text-white text-xl animate-spin">
                  progress_activity
                </span>
                <span className="text-xs text-on-surface font-medium">
                  AI is scanning document structure & grant rubric compliance...
                </span>
              </div>
            )}

            {analysisResult && (
              <div className="p-4 rounded-xl bg-white-fixed/20 border border-white-fixed text-xs animate-in fade-in">
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    AI Compliance Score: {analysisResult.score}/100
                  </span>
                  <span className="text-on-primary-fixed-variant text-[11px]">Ready</span>
                </div>
                <p className="text-on-primary-fixed-variant leading-relaxed">
                  {analysisResult.feedback}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-surface-variant bg-surface flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-outline-variant hover:bg-surface-variant text-on-surface font-label-md text-xs rounded-lg transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirmUpload}
              className="px-6 py-2 bg-white hover:bg-on-primary-fixed-variant text-on-primary font-label-md text-xs rounded-lg transition-all shadow-xs"
            >
              Confirm & Save
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
