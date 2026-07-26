import React from 'react';
import { BarChart3, Download, FileText, Calendar, Filter, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ReportsView: React.FC = () => {
  const { t, language } = useLanguage();
  
  const reports = [
    { title: 'Monthly Executive Retention Briefing - July 2026', size: '2.4 MB', date: 'Jul 25, 2026', type: 'PDF' },
    { title: 'SHAP Feature Contribution Audit Log', size: '1.8 MB', date: 'Jul 20, 2026', type: 'CSV' },
    { title: 'Enterprise Cohort Churn & Expansion Matrix', size: '3.1 MB', date: 'Jul 15, 2026', type: 'PDF' },
    { title: 'Support Outage Impact on CLV Loss Report', size: '890 KB', date: 'Jul 10, 2026', type: 'PDF' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#191b24]">{t.reportsTitle}</h2>
          <p className="text-sm text-[#424656] mt-1">
            {t.reportsSub}
          </p>
        </div>
        <button className="bg-[#004bca] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#003ea8] transition-all text-xs font-semibold shadow-sm">
          <Download className="w-4 h-4" />
          <span>{t.generateCustomReport}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#c2c6d9]/40 p-6 space-y-4">
        <h3 className="font-bold text-base text-[#191b24] mb-4">{t.availableReports}</h3>
        <div className="divide-y divide-[#e1e1ee]">
          {reports.map((r, idx) => (
            <div key={idx} className="py-4 flex justify-between items-center hover:bg-[#faf8ff] px-3 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#f2f3ff] rounded-lg text-[#004bca]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#191b24]">{r.title}</h4>
                  <p className="text-[11px] text-[#737687]">{t.generatedOn} {r.date} • {r.size}</p>
                </div>
              </div>

              <button className="px-4 py-2 border border-[#c2c6d9] rounded-lg text-xs font-semibold text-[#004bca] hover:bg-[#004bca]/5 transition-all flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadFile} {r.type}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
