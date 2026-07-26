import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  TrendingDown, 
  DollarSign, 
  Zap, 
  Calendar, 
  Download, 
  Sparkles, 
  BarChart2, 
  HelpCircle,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Customer } from '../types';
import { CHURN_DRIVERS, SHAP_FEATURE_IMPORTANCE } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface DashboardViewProps {
  onNavigateToCustomers: (filterQuadrant?: string) => void;
  onNavigateToExplainable: () => void;
  onOpenAskAI: () => void;
  onOpenExportPdf: () => void;
  customers: Customer[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateToCustomers,
  onNavigateToExplainable,
  onOpenAskAI,
  onOpenExportPdf,
  customers,
}) => {
  const { t, language } = useLanguage();
  const [timeRange, setTimeRange] = useState<'30d' | '7d' | '90d' | '1y'>('30d');
  const [distributionView, setDistributionView] = useState<'churn' | 'clv'>('churn');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const totalCustomers = 42850;
  const highChurnRisk = customers.filter(c => c.priority === 'High Risk').length * 180 + 1240;
  const avgChurnProb = 18.5;
  const totalCLV = '$12.4M';
  const urgentActionCount = customers.filter(c => c.churnProb > 80).length * 12 + 84;

  // Translated CHURN_DRIVERS
  const translatedChurnDrivers = [
    { title: t.supportTicketVolume, impact: '+8.2%', type: 'negative', barPercent: 82, barColorClass: 'bg-[#ba1a1a]' },
    { title: t.contractEndDate, impact: '+6.5%', type: 'negative', barPercent: 65, barColorClass: 'bg-[#ba1a1a]' },
    { title: t.featureAdoptionCore, impact: '-4.1%', type: 'positive', barPercent: 41, barColorClass: 'bg-emerald-600' },
    { title: t.loginFrequencyTrend, impact: '+3.8%', type: 'negative', barPercent: 38, barColorClass: 'bg-[#ba1a1a]' },
  ];

  // Translated SHAP Features
  const translatedShapFeatures = [
    { feature: t.shapUsageFrequency, shapValue: '+0.48', percentWidth: 78 },
    { feature: t.shapPaymentHistory, shapValue: '+0.32', percentWidth: 52 },
    { feature: t.shapTenure, shapValue: '+0.21', percentWidth: 35 },
    { feature: t.shapIntegrationHealth, shapValue: '+0.15', percentWidth: 25 },
  ];

  const distributionBars = distributionView === 'churn' ? [
    { label: '0-10%', height: '20%', count: '8,500' },
    { label: '10-20%', height: '35%', count: '12,200' },
    { label: '20-30%', height: '60%', count: '9,800' },
    { label: '30-40%', height: '85%', count: '5,400' },
    { label: '40-50%', height: '95%', count: '3,100', highlight: true },
    { label: '50-60%', height: '70%', count: '1,800' },
    { label: '60-70%', height: '45%', count: '1,100' },
    { label: '70-80%', height: '25%', count: '650' },
    { label: '80-100%', height: '15%', count: '300' },
  ] : [
    { label: '<$1k', height: '15%', count: '14,200' },
    { label: '$1k-$5k', height: '40%', count: '18,500' },
    { label: '$5k-$10k', height: '75%', count: '6,200' },
    { label: '$10k-$25k', height: '90%', count: '2,800', highlight: true },
    { label: '$25k-$50k', height: '60%', count: '850' },
    { label: '>$50k', height: '30%', count: '300' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-[#191b24] tracking-tight">{t.dashboardTitle}</h2>
          <p className="font-body-lg text-sm text-[#424656] mt-1">{t.dashboardSub}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Time Filter Button */}
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="appearance-none px-4 py-2 bg-white border border-[#c2c6d9] rounded-lg text-[#004bca] font-medium text-sm flex items-center gap-2 hover:bg-[#f2f3ff] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#004bca]/20 pr-8"
            >
              <option value="7d">{t.last7Days}</option>
              <option value="30d">{t.last30Days}</option>
              <option value="90d">{t.last90Days}</option>
              <option value="1y">{t.lastYear}</option>
            </select>
            <Calendar className="w-4 h-4 text-[#004bca] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Export PDF Button */}
          <button 
            onClick={onOpenExportPdf}
            className="px-4 py-2 bg-[#004bca] text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm hover:bg-[#003ea8] active:scale-[0.98] transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{t.exportPdf}</span>
          </button>
        </div>
      </div>

      {/* Top 5 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Total Customers */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#c2c6d9]/30 hover:border-[#004bca]/40 transition-all group">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-[#0061ff]/10 rounded-lg text-[#004bca] group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">+2.4%</span>
          </div>
          <p className="text-xs font-semibold text-[#424656] uppercase tracking-wider">{t.totalCustomers}</p>
          <h3 className="text-2xl font-bold text-[#191b24] mt-1">{totalCustomers.toLocaleString()}</h3>
        </div>

        {/* High Churn Risk */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#c2c6d9]/30 hover:border-[#ba1a1a]/40 transition-all group">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-[#ffdad6]/40 rounded-lg text-[#ba1a1a] group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#ba1a1a] bg-[#ffdad6] px-2 py-0.5 rounded-full">{t.alerts}</span>
          </div>
          <p className="text-xs font-semibold text-[#424656] uppercase tracking-wider">{t.highChurnRisk}</p>
          <h3 className="text-2xl font-bold text-[#191b24] mt-1">{highChurnRisk.toLocaleString()}</h3>
        </div>

        {/* Avg Churn Prob */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#c2c6d9]/30 hover:border-[#9d3000]/40 transition-all group">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-[#ffdbd0]/40 rounded-lg text-[#9d3000] group-hover:scale-110 transition-transform">
              <BarChart2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">-1.2%</span>
          </div>
          <p className="text-xs font-semibold text-[#424656] uppercase tracking-wider">{t.avgChurnProb}</p>
          <h3 className="text-2xl font-bold text-[#191b24] mt-1">{avgChurnProb}%</h3>
        </div>

        {/* Total CLV */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#c2c6d9]/30 hover:border-[#004bca]/40 transition-all group">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-[#0061ff]/10 rounded-lg text-[#004bca] group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#424656] px-2 py-0.5">{t.forecasted}</span>
          </div>
          <p className="text-xs font-semibold text-[#424656] uppercase tracking-wider">{t.totalCLV}</p>
          <h3 className="text-2xl font-bold text-[#191b24] mt-1">{totalCLV}</h3>
        </div>

        {/* Urgent Action */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#c2c6d9]/30 hover:border-[#004bca]/40 transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#0061ff]/10 -mr-8 -mt-8 rounded-full pointer-events-none" />
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-[#0061ff]/10 rounded-lg text-[#004bca] group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#004bca] px-2 py-0.5">{t.p1Priority}</span>
          </div>
          <p className="text-xs font-semibold text-[#424656] uppercase tracking-wider">{t.urgentAction}</p>
          <h3 className="text-2xl font-bold text-[#191b24] mt-1">{urgentActionCount}</h3>
        </div>
      </div>

      {/* Middle Grid: Retention Priority Matrix & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Retention Priority Matrix (2x2) */}
        <div className="lg:col-span-7 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#c2c6d9]/30 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#191b24]">{t.priorityMatrixTitle}</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-[#424656]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#004bca]" /> {t.enterprise}
              </span>
              <span className="flex items-center gap-1.5 font-medium text-[#424656]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#505f76]" /> {t.midMarket}
              </span>
            </div>
          </div>

          <div className="relative h-[380px] flex">
            {/* Y Axis Label */}
            <div className="flex flex-col justify-between py-8 pr-3 border-r border-[#c2c6d9]/60 italic text-xs font-semibold text-[#424656] w-12 text-center select-none">
              <span className="rotate-[-90deg] whitespace-nowrap -translate-x-1/2 block">{t.highRisk}</span>
              <span className="rotate-[-90deg] whitespace-nowrap -translate-x-1/2 block">{t.lowRisk}</span>
            </div>

            {/* Matrix Grid Container */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 p-3">
                {/* Top Left: Churn Guard (High Risk / Low CLV) */}
                <div 
                  onClick={() => onNavigateToCustomers('Churn Guard')}
                  className="bg-[#ffdad6]/20 rounded-lg border border-[#ba1a1a]/20 flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-[#ffdad6]/30 hover:-translate-y-0.5 transition-all group"
                >
                  <span className="text-xs font-bold text-[#ba1a1a] mb-2 group-hover:scale-105 transition-transform">{t.churnGuard}</span>
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-[#ba1a1a]/20 rounded-full animate-ping" />
                    <div className="relative w-12 h-12 bg-[#ba1a1a] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      342
                    </div>
                  </div>
                </div>

                {/* Top Right: URGENT FOCUS (High Risk / High CLV) */}
                <div 
                  onClick={() => onNavigateToCustomers('URGENT FOCUS')}
                  className="bg-[#0061ff]/10 rounded-lg border border-[#004bca]/30 flex flex-col items-center justify-center p-4 shadow-sm cursor-pointer hover:bg-[#0061ff]/20 hover:-translate-y-0.5 transition-all group"
                >
                  <span className="text-xs font-bold text-[#004bca] mb-2 group-hover:scale-105 transition-transform">{t.urgentFocus}</span>
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-[#004bca]/20 rounded-full scale-110 animate-pulse" />
                    <div className="relative w-16 h-16 bg-[#004bca] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      84
                    </div>
                  </div>
                </div>

                {/* Bottom Left: Steady (Low Risk / Low CLV) */}
                <div 
                  onClick={() => onNavigateToCustomers('Steady')}
                  className="bg-[#e7e7f4]/30 rounded-lg border border-[#c2c6d9]/30 flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-[#e7e7f4]/60 hover:-translate-y-0.5 transition-all group"
                >
                  <span className="text-xs font-medium text-[#424656] mb-2 group-hover:scale-105 transition-transform">{t.steady}</span>
                  <div className="w-10 h-10 bg-[#505f76] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    12.5k
                  </div>
                </div>

                {/* Bottom Right: LOYAL GIANTS (Low Risk / High CLV) */}
                <div 
                  onClick={() => onNavigateToCustomers('LOYAL GIANTS')}
                  className="bg-emerald-50 rounded-lg border border-emerald-200 flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-emerald-100/60 hover:-translate-y-0.5 transition-all group"
                >
                  <span className="text-xs font-bold text-emerald-700 mb-2 group-hover:scale-105 transition-transform">{t.loyalGiants}</span>
                  <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md">
                    1.2k
                  </div>
                </div>
              </div>

              {/* X Axis Labels */}
              <div className="h-8 border-t border-[#c2c6d9]/60 flex justify-between px-8 italic text-xs font-semibold text-[#424656] pt-2 select-none">
                <span>{t.lowCLV}</span>
                <span>{t.highCLV}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Revenue at Risk & AI Insights */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Revenue at Risk Card */}
          <div className="bg-gradient-to-br from-[#004bca] to-[#003ea8] p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/80">{t.revenueAtRisk}</p>
                  <h2 className="text-4xl font-extrabold tracking-tight mt-1">$420,000</h2>
                </div>
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <TrendingDown className="w-7 h-7 text-white" />
                </div>
              </div>
              <p className="text-xs text-white/90 leading-relaxed font-normal">
                {t.revenueDesc}
              </p>
            </div>
          </div>

          {/* AI Insights: Churn Drivers */}
          <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#c2c6d9]/30 p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-[#191b24] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#004bca]" />
                <span>{t.aiInsightsTitle}</span>
              </h3>

              <div className="space-y-4">
                {translatedChurnDrivers.map((driver, idx) => (
                  <div key={idx} className="group cursor-pointer" onClick={onNavigateToExplainable}>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="font-semibold text-[#191b24] group-hover:text-[#004bca] transition-colors">{driver.title}</span>
                      <span className={`font-bold ${driver.type === 'positive' ? 'text-emerald-600' : 'text-[#ba1a1a]'}`}>
                        {driver.impact}
                      </span>
                    </div>
                    <div className="w-full bg-[#e7e7f4] h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`${driver.barColorClass} h-full rounded-full transition-all duration-1000`} 
                        style={{ width: `${driver.barPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={onNavigateToExplainable}
              className="w-full mt-6 py-2.5 text-[#004bca] font-semibold text-xs border border-[#004bca]/30 rounded-lg hover:bg-[#004bca]/5 transition-all flex items-center justify-center gap-1.5"
            >
              <span>{t.viewExplainabilityReport}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Distribution Analysis & Global Feature Importance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Analysis */}
        <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#c2c6d9]/30 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-[#191b24]">{t.distributionTitle}</h3>
            <div className="flex bg-[#e7e7f4] p-1 rounded-lg">
              <button 
                onClick={() => setDistributionView('churn')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  distributionView === 'churn' ? 'bg-white text-[#004bca] shadow-sm' : 'text-[#424656] hover:text-[#191b24]'
                }`}
              >
                {t.churn}
              </button>
              <button 
                onClick={() => setDistributionView('clv')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  distributionView === 'clv' ? 'bg-white text-[#004bca] shadow-sm' : 'text-[#424656] hover:text-[#191b24]'
                }`}
              >
                {t.clv}
              </button>
            </div>
          </div>

          <div className="h-64 flex items-end gap-3 px-2 pt-6">
            {distributionBars.map((bar, idx) => (
              <div 
                key={idx} 
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
                className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
              >
                {/* Tooltip on hover */}
                {hoveredBar === idx && (
                  <div className="absolute -top-10 bg-[#191b24] text-white text-[11px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap z-20">
                    {bar.label}: {bar.count}
                  </div>
                )}
                <div 
                  className={`w-full rounded-t transition-all duration-300 ${
                    bar.highlight 
                      ? 'bg-[#004bca] shadow-md' 
                      : 'bg-[#0061ff]/20 hover:bg-[#004bca]/50'
                  }`}
                  style={{ height: bar.height }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4 px-2 text-xs font-medium text-[#424656] border-t border-[#e1e1ee] pt-3">
            <span>{distributionView === 'churn' ? '0% Risk' : '< $1k'}</span>
            <span>{distributionView === 'churn' ? '50% Risk' : '$10k - $25k'}</span>
            <span>{distributionView === 'churn' ? '100% Risk' : '> $50k'}</span>
          </div>
        </div>

        {/* Global Feature Importance (SHAP Values) */}
        <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#c2c6d9]/30 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-[#191b24]">{t.globalFeatureImportance}</h3>
            <span className="text-xs font-semibold text-[#424656] bg-[#e7e7f4] px-2.5 py-1 rounded">{t.shapValues}</span>
          </div>

          <div className="space-y-6">
            {translatedShapFeatures.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex justify-between mb-1.5 text-xs">
                  <span className="font-semibold text-[#191b24]">{item.feature}</span>
                  <span className="font-mono font-bold text-[#004bca]">{item.shapValue}</span>
                </div>
                <div className="h-3.5 w-full bg-[#e7e7f4] rounded-sm overflow-hidden flex">
                  <div className="bg-[#004bca] h-full rounded-sm transition-all duration-1000" style={{ width: `${item.percentWidth}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Footer Info */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#424656] border-t border-[#c2c6d9]/40 pt-6 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">{t.aiModel}: retention_v4.2.1-stable</span>
        </div>
        <div>{t.lastSynced}: 4 {t.minutesAgo}</div>
      </div>

      {/* Floating Action Button: Ask AI Assistant */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={onOpenAskAI}
          className="flex items-center gap-2.5 bg-[#0061ff] text-white px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:bg-[#004bca] active:scale-95 transition-all group"
        >
          <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
          <span className="text-sm font-bold">{t.askAIAssistant}</span>
        </button>
      </div>
    </div>
  );
};
