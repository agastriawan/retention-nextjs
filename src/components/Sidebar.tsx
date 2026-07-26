import React from 'react';
import { NavTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  LayoutDashboard, 
  Users, 
  Radio, 
  Brain, 
  Target, 
  BarChart3, 
  Settings, 
  Activity 
} from 'lucide-react';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  urgentCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, urgentCount = 84 }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'dashboard' as NavTab, label: t.dashboard, icon: LayoutDashboard },
    { id: 'customers' as NavTab, label: t.customers, icon: Users, badge: urgentCount },
    { id: 'predictions' as NavTab, label: t.predictions, icon: Radio },
    { id: 'explainable' as NavTab, label: t.explainableAI, icon: Brain },
    { id: 'strategy' as NavTab, label: t.retentionStrategy, icon: Target },
    { id: 'reports' as NavTab, label: t.reports, icon: BarChart3 },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-[#ffffff] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col py-6 z-50 border-r border-[#e2e8f0]">
      {/* Brand Header */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#004bca] rounded-xl flex items-center justify-center text-white shadow-sm">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-headline-sm text-xl font-bold text-[#191b24] tracking-tight">{t.retentionProTitle}</h1>
            <p className="font-label-md text-xs font-semibold text-[#424656] tracking-wider uppercase">{t.expertAdvisor}</p>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-6 py-3.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'border-l-4 border-[#004bca] bg-[#f2f3ff] text-[#004bca] font-bold'
                  : 'text-[#424656] hover:bg-[#e7e7f4]/40 hover:text-[#191b24]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#004bca]' : 'text-[#737687]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && item.badge > 0 && (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-[#004bca] text-white' : 'bg-[#ffdad6] text-[#ba1a1a]'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Settings */}
      <div className="pt-6 border-t border-[#e1e1ee]">
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3.5 px-6 py-3.5 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'settings'
              ? 'border-l-4 border-[#004bca] bg-[#f2f3ff] text-[#004bca] font-bold'
              : 'text-[#424656] hover:bg-[#e7e7f4]/40 hover:text-[#191b24]'
          }`}
        >
          <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-[#004bca]' : 'text-[#737687]'}`} />
          <span>{t.settings}</span>
        </button>
      </div>
    </aside>
  );
};
