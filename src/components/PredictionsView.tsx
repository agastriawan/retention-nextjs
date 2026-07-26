import React, { useState, useEffect } from 'react';
import { Sliders, Sparkles, AlertTriangle, ShieldCheck, RefreshCw, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PredictionsView: React.FC = () => {
  const { t, language } = useLanguage();
  const [supportTickets, setSupportTickets] = useState<number>(5);
  const [daysToRenewal, setDaysToRenewal] = useState<number>(45);
  const [weeklyLogins, setWeeklyLogins] = useState<number>(3);
  const [featureUsage, setFeatureUsage] = useState<number>(35);
  const [csatScore, setCsatScore] = useState<number>(6);

  const [simulatedScore, setSimulatedScore] = useState<number>(72);
  const [aiNote, setAiNote] = useState<string>(t.highRiskDrivenBy);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Run simulation call to server API `/api/simulate-churn`
  const runSimulation = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/simulate-churn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supportTickets,
          daysToRenewal,
          weeklyLogins,
          featureUsage,
          csatScore,
        }),
      });
      const data = await res.json();
      setSimulatedScore(data.churnProb);
      if (data.aiNote) setAiNote(data.aiNote);
    } catch (err) {
      // Local fallback calculation if server is offline
      let score = 15 + supportTickets * 8 + (90 - daysToRenewal) * 0.4 - weeklyLogins * 2 - featureUsage * 0.4 - csatScore * 5;
      score = Math.min(Math.max(Math.round(score), 5), 98);
      setSimulatedScore(score);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [supportTickets, daysToRenewal, weeklyLogins, featureUsage, csatScore]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-[#191b24]">{t.predictionsTitle}</h2>
        <p className="text-sm text-[#424656] mt-1">
          {t.predictionsSub}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 shadow-sm border border-[#c2c6d9]/40 space-y-6">
          <div className="flex justify-between items-center border-b border-[#e1e1ee] pb-4">
            <h3 className="font-bold text-base text-[#191b24] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#004bca]" />
              <span>{t.simulationInputVariables}</span>
            </h3>
            <button
              onClick={() => {
                setSupportTickets(2);
                setDaysToRenewal(180);
                setWeeklyLogins(12);
                setFeatureUsage(80);
                setCsatScore(9);
              }}
              className="text-xs font-bold text-[#004bca] hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.resetHealthyBaseline}</span>
            </button>
          </div>

          <div className="space-y-5">
            {/* Support Tickets */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#191b24]">{t.supportTicketsLast30}</span>
                <span className="font-mono text-[#004bca] font-bold">{supportTickets} {t.tickets}</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={supportTickets}
                onChange={(e) => setSupportTickets(Number(e.target.value))}
                className="w-full accent-[#004bca] cursor-pointer"
              />
            </div>

            {/* Days to Contract Renewal */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#191b24]">{t.daysUntilRenewal}</span>
                <span className="font-mono text-[#004bca] font-bold">{daysToRenewal} {t.days}</span>
              </div>
              <input
                type="range"
                min="5"
                max="365"
                value={daysToRenewal}
                onChange={(e) => setDaysToRenewal(Number(e.target.value))}
                className="w-full accent-[#004bca] cursor-pointer"
              />
            </div>

            {/* Weekly Logins */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#191b24]">{t.weeklyActiveLogins}</span>
                <span className="font-mono text-[#004bca] font-bold">{weeklyLogins} {t.loginsPerWeek}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={weeklyLogins}
                onChange={(e) => setWeeklyLogins(Number(e.target.value))}
                className="w-full accent-[#004bca] cursor-pointer"
              />
            </div>

            {/* Core Feature Usage */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#191b24]">{t.coreFeatureAdoptionRate}</span>
                <span className="font-mono text-[#004bca] font-bold">{featureUsage}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={featureUsage}
                onChange={(e) => setFeatureUsage(Number(e.target.value))}
                className="w-full accent-[#004bca] cursor-pointer"
              />
            </div>

            {/* CSAT Score */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#191b24]">{t.customerSatisfactionCSAT}</span>
                <span className="font-mono text-[#004bca] font-bold">{csatScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={csatScore}
                onChange={(e) => setCsatScore(Number(e.target.value))}
                className="w-full accent-[#004bca] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Prediction Output Card */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 shadow-sm border border-[#c2c6d9]/40 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-[#191b24] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#004bca]" />
              <span>{t.simulatedPredictionOutput}</span>
            </h3>

            <div className="p-6 rounded-2xl bg-[#f2f3ff] border border-[#004bca]/20 text-center flex flex-col items-center justify-center my-4">
              <span className="text-xs uppercase font-bold text-[#737687] tracking-wider mb-2">
                {t.predictedChurnRiskScore}
              </span>
              <div className="relative flex items-center justify-center">
                <span
                  className={`text-6xl font-extrabold font-headline-lg ${
                    simulatedScore > 60
                      ? 'text-[#ba1a1a]'
                      : simulatedScore > 30
                      ? 'text-[#9d3000]'
                      : 'text-emerald-600'
                  }`}
                >
                  {simulatedScore}%
                </span>
              </div>

              <span
                className={`mt-3 px-3 py-1 rounded-full text-xs font-bold ${
                  simulatedScore > 60
                    ? 'bg-[#ffdad6] text-[#93000a]'
                    : simulatedScore > 30
                    ? 'bg-[#ffdbd0] text-[#832700]'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {simulatedScore > 60 ? t.highChurnRiskLabel : simulatedScore > 30 ? t.mediumChurnRiskLabel : t.lowChurnRiskLabel}
              </span>
            </div>

            {/* AI Diagnosis Note */}
            <div className="p-4 bg-[#004bca]/5 rounded-xl border border-[#004bca]/20 text-xs text-[#191b24] leading-relaxed">
              <p className="font-bold text-[#004bca] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                {t.aiDiagnosis}
              </p>
              <p>{aiNote}</p>
            </div>
          </div>

          <button
            onClick={runSimulation}
            disabled={isLoading}
            className="w-full mt-6 py-3 bg-[#004bca] text-white font-bold text-xs rounded-lg hover:bg-[#003ea8] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{t.rerunPredictiveModel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
