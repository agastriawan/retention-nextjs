import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Printer } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ExportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportPdfModal: React.FC<ExportPdfModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [downloading, setDownloading] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setCompleted(true);
      setTimeout(() => {
        setCompleted(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[75] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#c2c6d9] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#004bca] text-white flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Printer className="w-5 h-5 text-white" />
            <h3 className="font-bold text-sm">{t.exportExecutiveReport}</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-6 space-y-4 text-xs text-[#191b24] bg-[#faf8ff]">
          <div className="p-4 bg-white rounded-xl border border-[#e1e1ee] shadow-xs space-y-2">
            <div className="flex justify-between font-bold border-b border-[#f2f3ff] pb-2">
              <span>{t.executiveSummary}</span>
              <span className="text-[#004bca]">{language === 'id' ? 'Juli 2026' : 'July 2026'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div>{language === 'id' ? 'Total Akun Dianalisis' : 'Total Accounts Analyzed'}: <strong>42,850</strong></div>
              <div>{language === 'id' ? 'Akun Risiko Tinggi' : 'High Risk Accounts'}: <strong>1,240</strong></div>
              <div>{language === 'id' ? 'Pendapatan Berisiko' : 'Revenue at Risk'}: <strong>$420,000</strong></div>
              <div>{language === 'id' ? 'Pemicu Churn Utama' : 'Primary Churn Driver'}: <strong>Support Ticket SLA</strong></div>
            </div>
          </div>

          <p className="text-[#737687] text-[11px]">
            {t.pdfReportDesc}
          </p>

          {completed && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'id' ? 'Laporan PDF berhasil diunduh!' : 'PDF report downloaded successfully!'}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 bg-white border-t border-[#e1e1ee] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#737687] hover:bg-[#e7e7f4] rounded-lg"
          >
            {language === 'id' ? 'Batal' : 'Cancel'}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-5 py-2 bg-[#004bca] text-white rounded-lg text-xs font-bold hover:bg-[#003ea8] transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? (language === 'id' ? 'Membuat PDF...' : 'Generating PDF...') : (language === 'id' ? 'Unduh PDF' : 'Download PDF')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
