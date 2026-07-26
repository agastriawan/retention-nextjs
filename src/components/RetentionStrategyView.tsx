import React, { useState } from 'react';
import { Target, Zap, Play, CheckCircle2, Plus, Sparkles, Sliders } from 'lucide-react';
import { RETENTION_PLAYBOOKS } from '../data/mockData';
import { RetentionPlaybook } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const RetentionStrategyView: React.FC = () => {
  const { t, language } = useLanguage();
  const [playbooks, setPlaybooks] = useState<RetentionPlaybook[]>(RETENTION_PLAYBOOKS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleAutomation = (id: string) => {
    setPlaybooks((prev) =>
      prev.map((pb) => (pb.id === id ? { ...pb, automated: !pb.automated } : pb))
    );
  };

  const triggerPlaybook = (title: string) => {
    setToastMessage(`${t.playbookTriggered.replace('Playbook', `"${title}"`)}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#191b24]">{t.retentionStrategyTitle}</h2>
          <p className="text-sm text-[#424656] mt-1">
            {t.retentionStrategySub}
          </p>
        </div>
        <button
          onClick={() => triggerPlaybook('Custom Retention Campaign')}
          className="bg-[#004bca] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#003ea8] transition-all text-xs font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{t.createNewPlaybook}</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Playbooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playbooks.map((pb) => (
          <div
            key={pb.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-[#c2c6d9]/40 flex flex-col justify-between hover:border-[#004bca]/40 transition-all space-y-4"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#004bca]/10 rounded-lg text-[#004bca]">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#191b24]">{pb.title}</h3>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  {t.active}
                </span>
              </div>

              <p className="text-xs text-[#424656] leading-relaxed mb-4">{pb.description}</p>

              <div className="space-y-2 bg-[#faf8ff] p-3.5 rounded-lg border border-[#e1e1ee] text-xs">
                <div className="flex justify-between">
                  <span className="text-[#737687]">{t.triggerCondition}</span>
                  <span className="font-mono font-bold text-[#191b24]">{pb.triggerCondition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737687]">{t.targetSegment}</span>
                  <span className="font-semibold text-[#191b24]">{pb.targetSegment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737687]">{t.expectedImpact}</span>
                  <span className="font-bold text-[#004bca]">{pb.expectedRetentionBoost}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#e1e1ee]">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#424656] cursor-pointer">
                <input
                  type="checkbox"
                  checked={pb.automated}
                  onChange={() => toggleAutomation(pb.id)}
                  className="rounded text-[#004bca] focus:ring-[#004bca]"
                />
                <span>{t.autoExecute} ({pb.activeCount} {t.activeCount})</span>
              </label>

              <button
                onClick={() => triggerPlaybook(pb.title)}
                className="px-4 py-2 bg-[#004bca] text-white font-bold text-xs rounded-lg hover:bg-[#003ea8] transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{t.runNow}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
