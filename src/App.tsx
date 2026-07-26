import React, { useState } from 'react';
import { NavTab, Customer } from './types';
import { INITIAL_CUSTOMERS } from './data/mockData';
import { LanguageProvider } from './context/LanguageContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { DashboardView } from './components/DashboardView';
import { CustomersView } from './components/CustomersView';
import { CustomerDrawer } from './components/CustomerDrawer';
import { PredictionsView } from './components/PredictionsView';
import { ExplainableAIView } from './components/ExplainableAIView';
import { RetentionStrategyView } from './components/RetentionStrategyView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { AIAssistantModal } from './components/AIAssistantModal';
import { AuditTrailModal } from './components/AuditTrailModal';
import { ExportPdfModal } from './components/ExportPdfModal';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string }>({
    name: 'Alex Rivera',
    email: 'alex.rivera@retentionpro.ai',
    role: 'Admin',
  });

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(INITIAL_CUSTOMERS[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [initialQuadrantFilter, setInitialQuadrantFilter] = useState<string | null>(null);

  // Modals
  const [isAskAIOpen, setIsAskAIOpen] = useState<boolean>(false);
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState<boolean>(false);
  const [auditCustomer, setAuditCustomer] = useState<Customer | null>(null);
  const [isExportPdfOpen, setIsExportPdfOpen] = useState<boolean>(false);

  // Auth Handlers
  const handleLogin = (user: { name: string; email: string; role: string }) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // If not authenticated, render Login Page
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Navigation Handlers
  const handleQuadrantClick = (quadrantName?: string) => {
    setInitialQuadrantFilter(quadrantName || null);
    setActiveTab('customers');
  };

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const handleExecuteAction = (customer: Customer) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customer.id) {
          const newAction = {
            id: `act-${Date.now()}`,
            title: `Executed ${c.recommendedAction}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Executed' as const,
          };
          return {
            ...c,
            executedActions: [newAction, ...(c.executedActions || [])],
          };
        }
        return c;
      })
    );
  };

  const handleOpenAuditTrail = (customer: Customer) => {
    setAuditCustomer(customer);
    setIsAuditTrailOpen(true);
  };

  return (
    <div className="bg-[#faf8ff] text-[#191b24] font-body-md min-h-screen">
      {/* Fixed Left Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        urgentCount={84} 
      />

      {/* Fixed Top Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenHelp={() => setIsAskAIOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Workspace Canvas */}
      <main className="ml-[280px] pt-16 min-h-screen p-10 max-w-[1440px] mx-auto pb-20">
        {activeTab === 'dashboard' && (
          <DashboardView
            customers={customers}
            onNavigateToCustomers={handleQuadrantClick}
            onNavigateToExplainable={() => setActiveTab('explainable')}
            onOpenAskAI={() => setIsAskAIOpen(true)}
            onOpenExportPdf={() => setIsExportPdfOpen(true)}
          />
        )}

        {activeTab === 'customers' && (
          <CustomersView
            customers={customers}
            selectedCustomer={selectedCustomer}
            onSelectCustomer={handleSelectCustomer}
            initialQuadrantFilter={initialQuadrantFilter}
          />
        )}

        {activeTab === 'predictions' && <PredictionsView />}

        {activeTab === 'explainable' && <ExplainableAIView />}

        {activeTab === 'strategy' && <RetentionStrategyView />}

        {activeTab === 'reports' && <ReportsView />}

        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Customer Detail Side Drawer */}
      {isDrawerOpen && selectedCustomer && (
        <CustomerDrawer
          customer={selectedCustomer}
          onClose={() => setIsDrawerOpen(false)}
          onOpenAuditTrail={handleOpenAuditTrail}
          onExecuteAction={handleExecuteAction}
        />
      )}

      {/* Floating AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAskAIOpen}
        onClose={() => setIsAskAIOpen(false)}
      />

      {/* Audit Trail Modal */}
      <AuditTrailModal
        customer={auditCustomer}
        isOpen={isAuditTrailOpen}
        onClose={() => setIsAuditTrailOpen(false)}
      />

      {/* Export PDF Modal */}
      <ExportPdfModal
        isOpen={isExportPdfOpen}
        onClose={() => setIsExportPdfOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
