import React from 'react';
import { X, History, AlertTriangle, User, ShieldCheck, Activity } from 'lucide-react';
import { Customer } from '../types';
import { MOCK_AUDIT_LOGS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface AuditTrailModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AuditTrailModal: React.FC<AuditTrailModalProps> = ({ customer, isOpen, onClose }) => {
  const { t } = useLanguage();
  
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[75] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#c2c6d9] flex flex-col h-[620px] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#191b24] text-white flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5 text-[#004bca]" />
            <div>
              <h3 className="font-bold text-sm">{t.customerAuditTrail}</h3>
              <p className="text-[11px] text-[#c2c6d9]">{customer.name} ({customer.id})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline Log */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#faf8ff]">
          <div className="relative border-l-2 border-[#004bca]/30 ml-4 space-y-6">
            {MOCK_AUDIT_LOGS.map((log) => (
              <div key={log.id} className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#004bca] ring-4 ring-white flex items-center justify-center text-white" />
                <div className="bg-white p-4 rounded-xl border border-[#e1e1ee] shadow-xs space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#191b24]">{log.event}</span>
                    <span className="text-[10px] text-[#737687]">{log.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#424656]">{log.details}</p>
                  <p className="text-[10px] font-semibold text-[#004bca] pt-1">{t.by} {log.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#e1e1ee] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#004bca] text-white rounded-lg text-xs font-bold hover:bg-[#003ea8]"
          >
            {t.closeAuditTrail}
          </button>
        </div>
      </div>
    </div>
  );
};
