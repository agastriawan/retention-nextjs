import React, { useState } from 'react';
import { Customer } from '../types';
import { X, Info, Bot, MoreHorizontal, CheckCircle2, History, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CustomerDrawerProps {
  customer: Customer | null;
  onClose: () => void;
  onOpenAuditTrail: (customer: Customer) => void;
  onExecuteAction: (customer: Customer) => void;
}

export const CustomerDrawer: React.FC<CustomerDrawerProps> = ({
  customer,
  onClose,
  onOpenAuditTrail,
  onExecuteAction,
}) => {
  const { t, language } = useLanguage();
  const [actionExecuted, setActionExecuted] = useState(false);

  if (!customer) return null;

  const handleExecute = () => {
    setActionExecuted(true);
    onExecuteAction(customer);
    setTimeout(() => setActionExecuted(false), 3000);
  };

  // Semi-circle SVG stroke calculation
  const radius = 40;
  const circumference = Math.PI * radius; // Half circle
  const dashoffset = circumference - (customer.churnProb / 100) * circumference;

  return (
    <div className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-[-10px_0px_30px_rgba(0,0,0,0.1)] z-[60] border-l border-[#c2c6d9] flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-6 border-b border-[#c2c6d9]/40 flex justify-between items-center bg-[#faf8ff]">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-full ring-2 ring-[#ba1a1a] p-0.5">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#191b24] leading-tight">{customer.name}</h3>
            <span className="text-xs font-semibold text-[#737687]">{t.account}: {customer.id}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[#e7e7f4] rounded-full transition-colors text-[#424656]"
          title={t.closeDrawer}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Risk Assessment Gauge Section */}
        <section>
          <h4 className="text-xs font-bold text-[#737687] uppercase tracking-wider mb-3">{t.riskAssessment}</h4>
          <div className="bg-[#f2f3ff] rounded-2xl p-6 border border-[#ba1a1a]/10 flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                  customer.priority === 'High Risk'
                    ? 'bg-[#ffdad6] text-[#93000a]'
                    : customer.priority === 'Med Risk'
                    ? 'bg-[#ffdbd0] text-[#832700]'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {customer.priority}
              </span>
            </div>

            {/* Gauge SVG */}
            <div className="relative w-44 h-24 mt-2 flex justify-center items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
                {/* Background arc */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#e1e1ee"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Value arc */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke={customer.churnProb > 75 ? '#ba1a1a' : customer.churnProb > 40 ? '#9d3000' : '#10b981'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={`${dashoffset}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute bottom-0 inset-x-0 flex flex-col items-center">
                <span className="text-2xl font-bold text-[#ba1a1a]">{customer.churnProb}%</span>
                <span className="text-xs font-medium text-[#737687]">{t.churnProbShort}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Factor Analysis */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-bold text-[#737687] uppercase tracking-wider">{t.riskFactorAnalysis}</h4>
            <Info className="w-4 h-4 text-[#737687] cursor-help" />
          </div>

          <div className="space-y-3.5">
            {customer.riskFactors.map((factor, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[#191b24]">{factor.name}</span>
                  <span className={`font-bold ${factor.type === 'negative' ? 'text-[#ba1a1a]' : 'text-emerald-600'}`}>
                    {factor.impactPercent > 0 ? `+${factor.impactPercent}%` : `${factor.impactPercent}%`}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#e7e7f4] rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full ${
                      factor.type === 'negative' ? 'bg-[#ba1a1a]' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.abs(factor.impactPercent) * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Recommended Strategy Card */}
        <section>
          <h4 className="text-xs font-bold text-[#737687] uppercase tracking-wider mb-3">{t.aiRecommendedStrategy}</h4>
          <div className="bg-[#004bca]/5 border border-[#004bca]/20 rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-[#004bca]/10 rounded-lg text-[#004bca] mt-0.5">
                <Bot className="w-5 h-5" />
              </div>
              <p className="text-xs text-[#191b24] leading-relaxed">
                {language === 'id' 
                  ? `Kemungkinan churn karena masalah teknis terbaru. Rekomendasikan penjangkauan segera melalui ${customer.accountManager || 'Manajer Akun Pribadi'} dengan kredit layanan 3 bulan.`
                  : `Likely to churn due to recent technical issues. Recommend immediate outreach via ${customer.accountManager || 'Personal Account Manager'} with a 3-month service credit.`
                }
              </p>
            </div>

            {actionExecuted ? (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs font-bold text-emerald-800 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.actionQueued}</span>
              </div>
            ) : (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleExecute}
                  className="flex-1 bg-[#004bca] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#003ea8] transition-all shadow-xs"
                >
                  {t.executeAction}
                </button>
                <button className="px-3 border border-[#c2c6d9] rounded-lg hover:bg-[#e7e7f4] transition-colors text-[#424656]">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Recent Executed History */}
        {customer.executedActions && customer.executedActions.length > 0 && (
          <section>
            <h4 className="text-xs font-bold text-[#737687] uppercase tracking-wider mb-2">{t.executedActions}</h4>
            <div className="space-y-2">
              {customer.executedActions.map((act) => (
                <div key={act.id} className="p-3 bg-[#faf8ff] rounded-lg border border-[#e1e1ee] text-xs flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-[#191b24]">{act.title}</p>
                    <p className="text-[10px] text-[#737687]">{act.date}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {act.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Drawer Footer */}
      <div className="p-5 border-t border-[#c2c6d9] bg-[#ffffff]">
        <button
          onClick={() => onOpenAuditTrail(customer)}
          className="w-full text-center py-2.5 text-[#004bca] font-bold text-xs hover:bg-[#004bca]/5 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <History className="w-4 h-4" />
          <span>{t.fullAuditTrail}</span>
        </button>
      </div>
    </div>
  );
};
