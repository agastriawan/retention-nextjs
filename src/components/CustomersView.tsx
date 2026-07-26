import React, { useState, useMemo } from 'react';
import { Customer, RiskLevel } from '../types';
import { 
  Download, 
  Filter, 
  DollarSign, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Search,
  UserPlus,
  RefreshCw,
  Mail,
  Zap,
  ArrowUpRight,
  Video,
  BookOpen,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CustomersViewProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelectCustomer: (customer: Customer) => void;
  initialQuadrantFilter?: string | null;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  customers,
  selectedCustomer,
  onSelectCustomer,
  initialQuadrantFilter,
}) => {
  const { t } = useLanguage();
  const [riskFilter, setRiskFilter] = useState<string>(
    initialQuadrantFilter === 'Churn Guard' || initialQuadrantFilter === 'URGENT FOCUS'
      ? 'High Risk'
      : initialQuadrantFilter === 'Steady'
      ? 'Med Risk'
      : initialQuadrantFilter === 'LOYAL GIANTS'
      ? 'Low Risk'
      : 'All'
  );

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minClv, setMinClv] = useState<string>('');
  const [maxClv, setMaxClv] = useState<string>('');
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Filter logic
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      // Risk filter
      if (riskFilter !== 'All' && c.priority !== riskFilter) return false;

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!c.name.toLowerCase().includes(query) && !c.id.toLowerCase().includes(query)) {
          return false;
        }
      }

      // CLV filter
      if (minClv && c.clv < Number(minClv)) return false;
      if (maxClv && c.clv > Number(maxClv)) return false;

      // Segment filter
      if (selectedSegment !== 'All' && c.segment !== selectedSegment) return false;

      return true;
    });
  }, [customers, riskFilter, searchQuery, minClv, maxClv, selectedSegment]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setRiskFilter('All');
    setSearchQuery('');
    setMinClv('');
    setMaxClv('');
    setSelectedSegment('All');
    setCurrentPage(1);
  };

  const getActionIcon = (actionIconName?: string) => {
    switch (actionIconName) {
      case 'auto_awesome': return <Sparkles className="w-4 h-4 text-[#004bca]" />;
      case 'mail': return <Mail className="w-4 h-4 text-[#505f76]" />;
      case 'upgrade': return <ArrowUpRight className="w-4 h-4 text-emerald-600" />;
      case 'video': return <Video className="w-4 h-4 text-[#ba1a1a]" />;
      case 'book_open': return <BookOpen className="w-4 h-4 text-[#004bca]" />;
      case 'award': return <Award className="w-4 h-4 text-amber-600" />;
      case 'zap': return <Zap className="w-4 h-4 text-[#004bca]" />;
      default: return <Sparkles className="w-4 h-4 text-[#004bca]" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#191b24] tracking-tight">{t.customerHubTitle}</h2>
          <p className="text-sm text-[#424656] mt-1">{t.customerHubSub}</p>
        </div>
        <button className="bg-[#004bca] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#003ea8] active:scale-[0.98] transition-all text-xs font-semibold shadow-sm">
          <Download className="w-4 h-4" />
          <span>{t.exportRiskReport}</span>
        </button>
      </div>

      {/* Bento Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Filter 1: Risk Level */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#c2c6d9]/30 flex flex-col gap-2">
          <label className="text-xs font-bold text-[#424656] flex items-center gap-1.5 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-[#004bca]" />
            <span>{t.riskLevel}</span>
          </label>
          <select
            value={riskFilter}
            onChange={(e) => { setRiskFilter(e.target.value); setCurrentPage(1); }}
            className="w-full bg-[#f2f3ff] border border-[#c2c6d9]/50 rounded-lg text-xs text-[#191b24] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004bca]"
          >
            <option value="All">{t.allRiskLevels}</option>
            <option value="High Risk">{t.highRiskOption}</option>
            <option value="Med Risk">{t.medRiskOption}</option>
            <option value="Low Risk">{t.lowRiskOption}</option>
          </select>
        </div>

        {/* Filter 2: CLV Range */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#c2c6d9]/30 flex flex-col gap-2">
          <label className="text-xs font-bold text-[#424656] flex items-center gap-1.5 uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5 text-[#004bca]" />
            <span>{t.clvRange}</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder={t.minPlaceholder}
              value={minClv}
              onChange={(e) => setMinClv(e.target.value)}
              className="w-full bg-[#f2f3ff] border border-[#c2c6d9]/50 rounded-lg text-xs py-2 px-2.5 text-[#191b24]"
            />
            <span className="text-[#737687] text-xs">-</span>
            <input
              type="number"
              placeholder={t.maxPlaceholder}
              value={maxClv}
              onChange={(e) => setMaxClv(e.target.value)}
              className="w-full bg-[#f2f3ff] border border-[#c2c6d9]/50 rounded-lg text-xs py-2 px-2.5 text-[#191b24]"
            />
          </div>
        </div>

        {/* Filter 3: Active Segments & Clear All */}
        <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-[#c2c6d9]/30 flex items-center justify-between gap-4">
          <div className="flex-1">
            <label className="text-xs font-bold text-[#424656] flex items-center gap-1.5 uppercase tracking-wider mb-2">
              <span>{t.activeSegments}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {['All', 'ENTERPRISE', 'MID-MARKET', 'RENEWAL_WINDOW'].map((seg) => (
                <button
                  key={seg}
                  onClick={() => setSelectedSegment(seg)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                    selectedSegment === seg
                      ? 'bg-[#004bca] text-white shadow-xs'
                      : 'bg-[#d0e1fb] text-[#54647a] hover:bg-[#b4c5ff]'
                  }`}
                >
                  {seg}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="text-xs text-[#004bca] font-bold hover:underline whitespace-nowrap"
          >
            {t.clearAll}
          </button>
        </div>
      </div>

      {/* Main Data Table Container */}
      <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#c2c6d9]/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f2f3ff]/60 border-b border-[#c2c6d9]/40">
              <tr>
                <th className="px-6 py-3.5 text-xs font-bold text-[#737687] uppercase tracking-wider">{t.idCol}</th>
                <th className="px-6 py-3.5 text-xs font-bold text-[#737687] uppercase tracking-wider">{t.nameCol}</th>
                <th className="px-6 py-3.5 text-xs font-bold text-[#737687] uppercase tracking-wider">{t.churnProbCol}</th>
                <th className="px-6 py-3.5 text-xs font-bold text-[#737687] uppercase tracking-wider">{t.clvCol}</th>
                <th className="px-6 py-3.5 text-xs font-bold text-[#737687] uppercase tracking-wider">{t.priorityCol}</th>
                <th className="px-6 py-3.5 text-xs font-bold text-[#737687] uppercase tracking-wider">{t.recommendedActionCol}</th>
                <th className="px-6 py-3.5 text-xs font-bold text-[#737687] uppercase tracking-wider text-right">{t.actionsCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c2c6d9]/30">
              {paginatedCustomers.map((cust) => {
                const isSelected = selectedCustomer?.id === cust.id;
                return (
                  <tr
                    key={cust.id}
                    onClick={() => onSelectCustomer(cust)}
                    className={`hover:bg-[#004bca]/5 transition-colors cursor-pointer group ${
                      isSelected ? 'bg-[#f2f3ff]' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-xs font-medium text-[#424656]">{cust.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-[#c2c6d9]"
                        />
                        <span className="text-sm font-semibold text-[#191b24] group-hover:text-[#004bca] transition-colors">
                          {cust.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 bg-[#e7e7f4] h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              cust.churnProb > 75
                                ? 'bg-[#ba1a1a]'
                                : cust.churnProb > 40
                                ? 'bg-[#9d3000]'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${cust.churnProb}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs font-bold ${
                            cust.churnProb > 75
                              ? 'text-[#ba1a1a]'
                              : cust.churnProb > 40
                              ? 'text-[#9d3000]'
                              : 'text-emerald-600'
                          }`}
                        >
                          {cust.churnProb}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-[#191b24]">${cust.clv.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          cust.priority === 'High Risk'
                            ? 'bg-[#ffdad6] text-[#93000a]'
                            : cust.priority === 'Med Risk'
                            ? 'bg-[#ffdbd0] text-[#832700]'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {cust.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-[#004bca]">
                        {getActionIcon(cust.actionIcon)}
                        <span>{cust.recommendedAction}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCustomer(cust);
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all ${
                          cust.priority === 'High Risk'
                            ? 'bg-[#004bca] text-white hover:bg-[#003ea8]'
                            : 'border border-[#737687] text-[#004bca] hover:bg-[#f2f3ff]'
                        }`}
                      >
                        {t.viewDetails}
                      </button>
                    </td>
                  </tr>
                );
              })}

              {paginatedCustomers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#737687] text-sm">
                    {t.noCustomersMatch}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-3.5 bg-[#f2f3ff]/40 border-t border-[#c2c6d9]/40 flex justify-between items-center text-xs text-[#424656]">
          <span>
            {t.showingResults} {paginatedCustomers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} {t.of} {filteredCustomers.length} customers
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded hover:bg-[#e7e7f4] disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-[#191b24]">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded hover:bg-[#e7e7f4] disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
