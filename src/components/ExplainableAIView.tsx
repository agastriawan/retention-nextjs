import React from 'react';
import { Brain, Sparkles, HelpCircle, CheckCircle, BarChart3, Layers, Zap } from 'lucide-react';
import { SHAP_FEATURE_IMPORTANCE } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export const ExplainableAIView: React.FC = () => {
  const { t, language } = useLanguage();
  
  const modelMetrics = [
    { label: t.rocAucScore, value: '0.942', status: t.excellent, color: 'text-emerald-600' },
    { label: t.precisionRate, value: '89.4%', status: t.high, color: 'text-[#004bca]' },
    { label: t.recallRate, value: '92.1%', status: t.optimal, color: 'text-[#004bca]' },
    { label: t.f1Score, value: '0.907', status: t.balanced, color: 'text-emerald-600' },
  ];

  const segmentShapData = [
    { segment: t.enterpriseCustomers, topDriver: t.serviceOutagesSLA, impact: '+0.52' },
    { segment: t.midMarketCustomers, topDriver: t.contractRenewalProximity, impact: '+0.41' },
    { segment: t.smbSelfServe, topDriver: t.loginFrequencyTrendNeg, impact: '+0.38' },
    { segment: t.highUsageCohort, topDriver: t.coreFeatureAdoptionHigh, impact: '-0.46' },
  ];

  const translatedShapFeatures = [
    { feature: t.shapUsageFrequency, shapValue: '+0.48', percentWidth: 78 },
    { feature: t.shapPaymentHistory, shapValue: '+0.32', percentWidth: 52 },
    { feature: t.shapTenure, shapValue: '+0.21', percentWidth: 35 },
    { feature: t.shapIntegrationHealth, shapValue: '+0.15', percentWidth: 25 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-[#191b24]">{t.explainableAITitle}</h2>
        <p className="text-sm text-[#424656] mt-1">
          {t.explainableAISub}
        </p>
      </div>

      {/* Model Diagnostics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modelMetrics.map((m, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-[#c2c6d9]/40 shadow-xs">
            <p className="text-xs font-semibold text-[#737687] uppercase tracking-wider">{m.label}</p>
            <div className="flex items-baseline justify-between mt-1">
              <h3 className="text-2xl font-extrabold text-[#191b24]">{m.value}</h3>
              <span className={`text-xs font-bold ${m.color}`}>{m.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SHAP Feature Importance Chart */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 shadow-sm border border-[#c2c6d9]/40 space-y-6">
          <div className="flex justify-between items-center border-b border-[#e1e1ee] pb-4">
            <h3 className="font-bold text-base text-[#191b24] flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#004bca]" />
              <span>{t.globalShapTitle}</span>
            </h3>
            <span className="text-xs bg-[#e7e7f4] font-semibold text-[#424656] px-2.5 py-1 rounded">
              {t.kernelShapExplainer}
            </span>
          </div>

          <p className="text-xs text-[#424656] leading-relaxed">
            {t.shapDescription}
          </p>

          <div className="space-y-5 pt-2">
            {translatedShapFeatures.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#191b24]">{item.feature}</span>
                  <span className="font-mono text-[#004bca]">{item.shapValue} {t.meanShap}</span>
                </div>
                <div className="h-4 w-full bg-[#e7e7f4] rounded-full overflow-hidden flex">
                  <div
                    className="bg-[#004bca] h-full rounded-full transition-all duration-1000"
                    style={{ width: `${item.percentWidth}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#191b24]">{t.supportTicketSLA}</span>
                <span className="font-mono text-[#004bca]">+0.12 {t.meanShap}</span>
              </div>
              <div className="h-4 w-full bg-[#e7e7f4] rounded-full overflow-hidden flex">
                <div className="bg-[#004bca] h-full rounded-full transition-all duration-1000" style={{ width: '20%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Segment Level Drivers */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 shadow-sm border border-[#c2c6d9]/40 space-y-4">
          <h3 className="font-bold text-base text-[#191b24] flex items-center gap-2 border-b border-[#e1e1ee] pb-4">
            <Layers className="w-5 h-5 text-[#004bca]" />
            <span>{t.topChurnDriverSegment}</span>
          </h3>

          <div className="space-y-3">
            {segmentShapData.map((s, idx) => (
              <div key={idx} className="p-3.5 bg-[#faf8ff] rounded-lg border border-[#e1e1ee] space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#191b24]">{s.segment}</span>
                  <span className={`font-mono font-bold ${s.impact.startsWith('+') ? 'text-[#ba1a1a]' : 'text-emerald-600'}`}>
                    {s.impact}
                  </span>
                </div>
                <p className="text-xs text-[#737687]">{s.topDriver}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 mt-4 text-xs text-emerald-900 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{t.modelFairnessAudit}</span>
            </div>
            <span>{t.noBiasDetected}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
