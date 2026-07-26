import React, { useState } from 'react';
import { Search, Bell, HelpCircle, User, CheckCircle2, AlertTriangle, ShieldCheck, LogOut, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenHelp?: () => void;
  currentUser?: { name: string; email: string; role: string };
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onOpenHelp, currentUser, onLogout }) => {
  const { language, setLanguage, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: t.urgentAlert, msg: 'Sarah Johnson (C-8291) churn risk jumped to 88%', time: '10m ago', urgent: true },
    { id: 2, title: t.playbookExecuted, msg: 'Retention Playbook P1 applied to 12 accounts', time: '1h ago', urgent: false },
    { id: 3, title: t.modelSynced, msg: 'Retention Model v4.2.1 retrained successfully', time: '4h ago', urgent: false },
  ];

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-280px)] h-16 bg-[#faf8ff] border-b border-[#c2c6d9]/40 px-10 flex justify-between items-center z-40">
      {/* Search Input */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737687]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 bg-[#e7e7f4]/60 border border-transparent rounded-full text-sm text-[#191b24] placeholder-[#737687] focus:outline-none focus:bg-white focus:border-[#004bca] focus:ring-2 focus:ring-[#004bca]/20 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 relative">
        {/* Language Switcher Button */}
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

        <div className="h-6 w-px bg-[#c2c6d9]/60 mx-0.5" />

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 text-[#424656] hover:bg-[#e7e7f4] rounded-full transition-colors relative"
            title={t.notifications}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-[#faf8ff]" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[#e1e1ee] py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-[#e1e1ee] flex justify-between items-center">
                <span className="font-bold text-sm text-[#191b24]">{t.notifications}</span>
                <span className="text-xs bg-[#ffdad6] text-[#ba1a1a] font-bold px-2 py-0.5 rounded-full">3 {t.newBadge}</span>
              </div>
              <div className="divide-y divide-[#f2f3ff] max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-[#faf8ff] transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      {n.urgent ? (
                        <AlertTriangle className="w-4 h-4 text-[#ba1a1a]" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-[#004bca]" />
                      )}
                      <span className="font-bold text-xs text-[#191b24]">{n.title}</span>
                      <span className="text-[10px] text-[#737687] ml-auto">{n.time}</span>
                    </div>
                    <p className="text-xs text-[#424656] leading-tight">{n.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help Button */}
        <button
          onClick={onOpenHelp}
          className="p-2 text-[#424656] hover:bg-[#e7e7f4] rounded-full transition-colors"
          title="Help & Documentation"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-[#c2c6d9]/60 mx-1" />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 hover:bg-[#e7e7f4]/60 rounded-full pl-2 pr-4 py-1 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-[#004bca]/10 text-[#004bca] flex items-center justify-center font-bold text-sm ring-1 ring-[#004bca]/30">
              <User className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-sm font-bold text-[#191b24]">{currentUser?.name || 'Alex Rivera'}</span>
              <span className="text-[10px] uppercase font-bold text-[#424656] tracking-wider">{currentUser?.role || (language === 'id' ? 'Admin' : 'Admin')}</span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#e1e1ee] py-2 z-50">
              <div className="px-4 py-2.5 border-b border-[#e1e1ee]">
                <p className="text-xs font-bold text-[#191b24]">{currentUser?.name || 'Alex Rivera'}</p>
                <p className="text-[11px] text-[#737687]">{currentUser?.email || 'alex.rivera@retentionpro.ai'}</p>
              </div>
              <div className="py-1">
                <button className="w-full px-4 py-2 text-left text-xs text-[#424656] hover:bg-[#f2f3ff] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#004bca]" />
                  <span>{language === 'id' ? 'Izin & Akses' : 'Permissions & Access'}</span>
                </button>
                <button 
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-[#ba1a1a] hover:bg-[#ffdad6]/40 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{language === 'id' ? 'Keluar' : 'Log Out'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
