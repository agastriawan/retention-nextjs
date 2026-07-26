import React, { useState } from 'react';
import { Settings, Save, Shield, Bell, Key, CheckCircle2, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SettingsView: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [highRiskThreshold, setHighRiskThreshold] = useState<number>(75);
  const [medRiskThreshold, setMedRiskThreshold] = useState<number>(40);
  const [autoEmailAlerts, setAutoEmailAlerts] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-[#191b24]">
          {t.settingsTitle}
        </h2>
        <p className="text-sm text-[#424656] mt-1">
          {t.settingsSub}
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{t.configSavedSuccess}</span>
        </div>
      )}

      {/* Language Preferences Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c2c6d9]/40 space-y-4">
        <h3 className="font-bold text-base text-[#191b24] flex items-center gap-2 border-b border-[#e1e1ee] pb-3">
          <Globe className="w-5 h-5 text-[#004bca]" />
          <span>{t.languagePreferences}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setLanguage('id')}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              language === 'id'
                ? 'border-[#004bca] bg-[#f2f3ff] ring-2 ring-[#004bca]/20'
                : 'border-[#c2c6d9]/40 hover:bg-[#faf8ff]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇮🇩</span>
              <div>
                <p className="text-sm font-bold text-[#191b24]">{t.indonesian}</p>
                <p className="text-xs text-[#737687]">{t.primaryLanguage}</p>
              </div>
            </div>
            {language === 'id' && <CheckCircle2 className="w-5 h-5 text-[#004bca]" />}
          </button>

          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              language === 'en'
                ? 'border-[#004bca] bg-[#f2f3ff] ring-2 ring-[#004bca]/20'
                : 'border-[#c2c6d9]/40 hover:bg-[#faf8ff]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇬🇧</span>
              <div>
                <p className="text-sm font-bold text-[#191b24]">{t.english}</p>
                <p className="text-xs text-[#737687]">{t.secondaryLanguage}</p>
              </div>
            </div>
            {language === 'en' && <CheckCircle2 className="w-5 h-5 text-[#004bca]" />}
          </button>
        </div>
      </div>

      {/* Threshold Configuration */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c2c6d9]/40 space-y-6">
        <h3 className="font-bold text-base text-[#191b24] flex items-center gap-2 border-b border-[#e1e1ee] pb-3">
          <Settings className="w-5 h-5 text-[#004bca]" />
          <span>{t.riskCategoryThresholds}</span>
        </h3>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span>{t.highChurnRiskCutoff}</span>
              <span className="font-mono text-[#ba1a1a] font-bold">&gt; {highRiskThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="90"
              value={highRiskThreshold}
              onChange={(e) => setHighRiskThreshold(Number(e.target.value))}
              className="w-full accent-[#ba1a1a] cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span>{t.mediumChurnRiskCutoff}</span>
              <span className="font-mono text-[#9d3000] font-bold">&gt; {medRiskThreshold}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="50"
              value={medRiskThreshold}
              onChange={(e) => setMedRiskThreshold(Number(e.target.value))}
              className="w-full accent-[#9d3000] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c2c6d9]/40 space-y-4">
        <h3 className="font-bold text-base text-[#191b24] flex items-center gap-2 border-b border-[#e1e1ee] pb-3">
          <Bell className="w-5 h-5 text-[#004bca]" />
          <span>{t.alertNotifications}</span>
        </h3>

        <label className="flex items-center gap-3 text-xs font-medium text-[#191b24] cursor-pointer">
          <input
            type="checkbox"
            checked={autoEmailAlerts}
            onChange={(e) => setAutoEmailAlerts(e.target.checked)}
            className="rounded text-[#004bca] focus:ring-[#004bca]"
          />
          <span>{t.sendInstantEmailAlerts}</span>
        </label>
      </div>

      {/* Gemini AI Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c2c6d9]/40 space-y-3">
        <h3 className="font-bold text-base text-[#191b24] flex items-center gap-2 border-b border-[#e1e1ee] pb-3">
          <Key className="w-5 h-5 text-[#004bca]" />
          <span>{t.aiEngineConfig}</span>
        </h3>
        <p className="text-xs text-[#424656] leading-relaxed">
          {t.aiEngineDescription}
        </p>
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-2.5 bg-[#004bca] text-white font-bold text-xs rounded-lg hover:bg-[#003ea8] transition-all flex items-center gap-2 shadow-sm"
      >
        <Save className="w-4 h-4" />
        <span>{t.saveConfiguration}</span>
      </button>
    </div>
  );
};
