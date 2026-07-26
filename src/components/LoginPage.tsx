import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Bot, 
  CheckCircle2, 
  AlertCircle,
  Users,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LoginPageProps {
  onLogin: (user: { name: string; email: string; role: string; avatar?: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { language, setLanguage, t } = useLanguage();
  const [email, setEmail] = useState('alex.rivera@retentionpro.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError(language === 'id' ? 'Silakan masukkan email dan kata sandi.' : 'Please enter both email address and password.');
      return;
    }

    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: 'Alex Rivera',
        email: email,
        role: 'Admin',
      });
    }, 800);
  };

  const handleQuickLogin = (name: string, userEmail: string, role: string) => {
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name,
        email: userEmail,
        role,
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col justify-between relative overflow-hidden font-body-md text-[#191b24]">
      {/* Decorative background grid and shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#004bca]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0061ff]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="px-8 py-6 flex justify-between items-center relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#004bca] rounded-xl text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#191b24] leading-none">RetentionPro <span className="text-[#004bca]">AI</span></h1>
            <p className="text-[10px] text-[#737687] font-semibold tracking-wider uppercase mt-0.5">{t.enterpriseChurnIntelligence}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-white border border-[#c2c6d9]/50 rounded-full p-1 shadow-2xs">
            <button
              onClick={() => setLanguage('id')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                language === 'id'
                  ? 'bg-[#004bca] text-white shadow-xs'
                  : 'text-[#737687] hover:text-[#191b24]'
              }`}
              title="Bahasa Indonesia"
            >
              <span>🇮🇩</span>
              <span>ID</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-[#004bca] text-white shadow-xs'
                  : 'text-[#737687] hover:text-[#191b24]'
              }`}
              title="English"
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#424656] bg-white px-3.5 py-1.5 rounded-full border border-[#c2c6d9]/40 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>v4.2 {t.aiModelReady}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10 my-auto">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-[0px_10px_40px_rgba(0,0,0,0.06)] border border-[#c2c6d9]/40 overflow-hidden">
          
          {/* Left Hero / Product Value Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#004bca] to-[#003ea8] p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Overlay graphic */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white/90 mb-6 border border-white/20">
                <Bot className="w-3.5 h-3.5 text-sky-200" />
                <span>{t.nextGenPredictive}</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
                {t.stopChurnTitle}
              </h2>
              <p className="text-xs text-white/80 mt-3 leading-relaxed">
                {t.stopChurnDesc}
              </p>
            </div>

            {/* Quick Feature Stats */}
            <div className="space-y-4 my-8">
              <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/15">
                <div className="p-2 bg-white/20 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">94.2% {t.predictionAccuracy}</p>
                  <p className="text-[11px] text-white/70">{t.trainedAccounts}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/15">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Zap className="w-5 h-5 text-sky-200" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{t.automatedPlaybooks}</p>
                  <p className="text-[11px] text-white/70">{t.triggerRescue}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-white/70">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-sky-300" /> {t.soc2Certified}
              </span>
              <span>{t.encryption256}</span>
            </div>
          </div>

          {/* Right Login Form Column */}
          <div className="lg:col-span-7 p-10 sm:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full space-y-6">
              
              <div>
                <h2 className="text-2xl font-bold text-[#191b24] tracking-tight">{t.signInTitle}</h2>
                <p className="text-xs text-[#424656] mt-1">{t.signInSub}</p>
              </div>

              {error && (
                <div className="p-3.5 bg-[#ffdad6]/60 border border-[#ba1a1a]/30 rounded-xl text-xs font-medium text-[#ba1a1a] flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#ba1a1a]" />
                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#424656] mb-1.5 uppercase tracking-wider">
                    {t.emailLabel}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#737687] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#f2f3ff] border border-[#c2c6d9]/40 rounded-xl text-xs text-[#191b24] placeholder-[#737687] focus:outline-none focus:bg-white focus:border-[#004bca] focus:ring-2 focus:ring-[#004bca]/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-[#424656] uppercase tracking-wider">
                      {t.passwordLabel}
                    </label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert(language === 'id' ? 'Tautan reset kata sandi telah dikirim ke email kerja Anda.' : 'Password reset link sent to your registered work email.'); }} className="text-[11px] font-bold text-[#004bca] hover:underline">
                      {t.forgotPassword}
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#737687] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.enterPassword}
                      className="w-full pl-10 pr-10 py-2.5 bg-[#f2f3ff] border border-[#c2c6d9]/40 rounded-xl text-xs text-[#191b24] placeholder-[#737687] focus:outline-none focus:bg-white focus:border-[#004bca] focus:ring-2 focus:ring-[#004bca]/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737687] hover:text-[#191b24]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-[#424656]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-[#004bca] focus:ring-[#004bca]"
                    />
                    <span>{t.rememberMe}</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#004bca] text-white font-bold text-xs rounded-xl hover:bg-[#003ea8] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{t.signInButton}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick One-Click Demo Logins */}
              <div className="pt-4 border-t border-[#c2c6d9]/40">
                <p className="text-[11px] font-bold text-[#737687] uppercase tracking-wider mb-2.5 text-center">
                  {t.quickDemo}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('Alex Rivera', 'alex.rivera@retentionpro.ai', 'Admin')}
                    className="p-2.5 bg-[#f2f3ff] hover:bg-[#004bca]/10 border border-[#c2c6d9]/40 rounded-xl text-left transition-all group"
                  >
                    <p className="text-xs font-bold text-[#191b24] group-hover:text-[#004bca]">Alex Rivera</p>
                    <p className="text-[10px] text-[#737687]">{t.adminExecutive}</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('David Sterling', 'david.sterling@retentionpro.ai', 'CSM Manager')}
                    className="p-2.5 bg-[#f2f3ff] hover:bg-[#004bca]/10 border border-[#c2c6d9]/40 rounded-xl text-left transition-all group"
                  >
                    <p className="text-xs font-bold text-[#191b24] group-hover:text-[#004bca]">David Sterling</p>
                    <p className="text-[10px] text-[#737687]">{t.csmLead}</p>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 text-center text-[11px] text-[#737687] border-t border-[#c2c6d9]/30 relative z-10 bg-white/50">
        © 2026 RetentionPro AI, Inc. {t.allRightsReserved} {t.poweredBy} Google Gemini AI Engine.
      </footer>
    </div>
  );
};
