import React, { createContext, useContext, useState } from 'react';

export type Language = 'id' | 'en';

export interface Translations {
  // Navigation
  dashboard: string;
  customers: string;
  predictions: string;
  explainableAI: string;
  retentionStrategy: string;
  reports: string;
  settings: string;

  // Header & Controls
  searchPlaceholder: string;
  notifications: string;
  newBadge: string;
  urgentAlert: string;
  playbookExecuted: string;
  modelSynced: string;

  // Dashboard Page
  dashboardTitle: string;
  dashboardSub: string;
  last30Days: string;
  last7Days: string;
  last90Days: string;
  lastYear: string;
  exportPdf: string;

  // Metric Cards
  totalCustomers: string;
  highChurnRisk: string;
  avgChurnProb: string;
  totalCLV: string;
  urgentAction: string;
  p1Priority: string;
  forecasted: string;
  alerts: string;

  // Priority Matrix
  priorityMatrixTitle: string;
  enterprise: string;
  midMarket: string;
  highRisk: string;
  lowRisk: string;
  lowCLV: string;
  highCLV: string;
  churnGuard: string;
  urgentFocus: string;
  steady: string;
  loyalGiants: string;

  // Revenue & Insights
  revenueAtRisk: string;
  revenueDesc: string;
  aiInsightsTitle: string;
  viewExplainabilityReport: string;

  // Distribution & SHAP
  distributionTitle: string;
  churn: string;
  clv: string;
  globalFeatureImportance: string;

  // Actions
  askAIAssistant: string;
  executeAction: string;
  viewDetails: string;

  // Customers Hub
  customerHubTitle: string;
  customerHubSub: string;
  riskLevel: string;
  allRiskLevels: string;
  clvRange: string;
  activeSegments: string;
  clearAll: string;

  // Table Headers
  idCol: string;
  nameCol: string;
  churnProbCol: string;
  clvCol: string;
  priorityCol: string;
  recommendedActionCol: string;
  actionsCol: string;

  // Drawer
  riskAssessment: string;
  riskFactorAnalysis: string;
  aiRecommendedStrategy: string;
  fullAuditTrail: string;

  // Predictions Simulator
  predictionsTitle: string;
  predictionsSub: string;
  simulationInputs: string;
  resetBaseline: string;
  predictedScore: string;
  rerunModel: string;

  // Login Page
  signInTitle: string;
  signInSub: string;
  emailLabel: string;
  passwordLabel: string;
  rememberMe: string;
  signInButton: string;
  quickDemo: string;

  // Additional translations
  exportRiskReport: string;
  noCustomersMatch: string;
  showingResults: string;
  of: string;
  churnProbShort: string;
  closeDrawer: string;
  executedActions: string;
  actionQueued: string;
  moreOptions: string;
  all: string;
  highRiskOption: string;
  medRiskOption: string;
  lowRiskOption: string;
  minPlaceholder: string;
  maxPlaceholder: string;
  lastSynced: string;
  aiModel: string;
  minutesAgo: string;

  // Login Page - Additional
  enterpriseChurnIntelligence: string;
  aiModelReady: string;
  nextGenPredictive: string;
  stopChurnTitle: string;
  stopChurnDesc: string;
  predictionAccuracy: string;
  trainedAccounts: string;
  automatedPlaybooks: string;
  triggerRescue: string;
  soc2Certified: string;
  encryption256: string;
  forgotPassword: string;
  enterPassword: string;
  adminExecutive: string;
  csmLead: string;
  allRightsReserved: string;
  poweredBy: string;
  
  // Other components
  exportExecutiveReport: string;
  executiveSummary: string;
  pdfReportDesc: string;
  poweredByGemini: string;
  monthlyBriefing: string;
  downloadReports: string;
  configureWorkflows: string;

  // Feature names and data labels
  supportTicketVolume: string;
  contractEndDate: string;
  featureAdoptionCore: string;
  loginFrequencyTrend: string;
  usageFrequency: string;
  paymentHistory: string;
  tenure: string;
  integrationHealth: string;
  expertAdvisor: string;
  account: string;
  highFeatureUtilization: string;
  multiSeatExpansion: string;
  slightSupportDelay: string;
  impact: string;
  
  // Customer drawer specific
  accountManager: string;
  likelyToChurn: string;
  recommendImmediate: string;
  monthServiceCredit: string;
  
  // Sidebar brand
  retentionProTitle: string;
}

const translations: Record<Language, Translations> = {
  id: {
    dashboard: 'Dasbor',
    customers: 'Pelanggan',
    predictions: 'Prediksi',
    explainableAI: 'AI Terjelaskan',
    retentionStrategy: 'Strategi Retensi',
    reports: 'Laporan',
    settings: 'Pengaturan',

    searchPlaceholder: 'Cari wawasan, pelanggan, atau prediksi...',
    notifications: 'Notifikasi',
    newBadge: 'Baru',
    urgentAlert: 'Peringatan Mendesak',
    playbookExecuted: 'Playbook Dijalankan',
    modelSynced: 'Model Disinkronkan',

    dashboardTitle: 'Dasbor Retensi',
    dashboardSub: 'Analisis real-time kesehatan pelanggan dan probabilitas risiko churn.',
    last30Days: '30 Hari Terakhir',
    last7Days: '7 Hari Terakhir',
    last90Days: '90 Hari Terakhir',
    lastYear: '1 Tahun Terakhir',
    exportPdf: 'Ekspor PDF',

    totalCustomers: 'Total Pelanggan',
    highChurnRisk: 'Risiko Churn Tinggi',
    avgChurnProb: 'Rata-rata Prob. Churn',
    totalCLV: 'Total CLV',
    urgentAction: 'Tindakan Mendesak',
    p1Priority: 'Prioritas P1',
    forecasted: 'Terdoyong',
    alerts: 'Peringatan',

    priorityMatrixTitle: 'Matriks Prioritas Retensi',
    enterprise: 'Enterprise',
    midMarket: 'Mid-Market',
    highRisk: 'RISIKO TINGGI',
    lowRisk: 'RISIKO RENDAH',
    lowCLV: 'CLV RENDAH',
    highCLV: 'CLV TINGGI',
    churnGuard: 'Penjaga Churn',
    urgentFocus: 'FOKUS MENDESAK',
    steady: 'Stabil',
    loyalGiants: 'RAKSASA SETIA',

    revenueAtRisk: 'Pendapatan Berisiko',
    revenueDesc: 'AI memproyeksikan 12% dari ini dapat dipulihkan melalui interaksi proaktif dalam 14 hari ke depan.',
    aiInsightsTitle: 'Wawasan AI: Pemicu Churn',
    viewExplainabilityReport: 'Lihat Laporan Penjelasan AI',

    distributionTitle: 'Analisis Distribusi',
    churn: 'Churn',
    clv: 'CLV',
    globalFeatureImportance: 'Tingkat Kepentingan Fitur Global',

    askAIAssistant: 'Tanya Asisten AI',
    executeAction: 'Jalankan Tindakan',
    viewDetails: 'Lihat Detail',

    customerHubTitle: 'Pusat Retensi Pelanggan',
    customerHubSub: 'Kelola akun berisiko tinggi dan tindakan rekomendasi kecerdasan buatan.',
    riskLevel: 'Tingkat Risiko',
    allRiskLevels: 'Semua Tingkat Risiko',
    clvRange: 'Rentang CLV',
    activeSegments: 'Segmen Aktif',
    clearAll: 'Hapus Semua',

    idCol: 'ID',
    nameCol: 'NAMA',
    churnProbCol: 'PROB. CHURN (%)',
    clvCol: 'CLV ($)',
    priorityCol: 'PRIORITAS',
    recommendedActionCol: 'TINDAKAN REKOMENDASI',
    actionsCol: 'AKSI',

    riskAssessment: 'Penilaian Risiko',
    riskFactorAnalysis: 'Analisis Faktor Risiko',
    aiRecommendedStrategy: 'Strategi Rekomendasi AI',
    fullAuditTrail: 'Jejak Audit Pelanggan Lengkap',

    predictionsTitle: 'Prediksi & Simulator Risiko',
    predictionsSub: 'Lakukan simulasi skenario pengandaian untuk memprediksi probabilitas churn dalam berbagai kondisi.',
    simulationInputs: 'Variabel Input Simulasi',
    resetBaseline: 'Reset ke Baseline Sehat',
    predictedScore: 'Skor Risiko Churn Prediksi',
    rerunModel: 'Jalankan Ulang Model Prediktif',

    signInTitle: 'Masuk ke Dasbor',
    signInSub: 'Masukkan kredensial korporat Anda untuk mengakses intelijen risiko pelanggan.',
    emailLabel: 'Alamat Email Kerja',
    passwordLabel: 'Kata Sandi',
    rememberMe: 'Ingat sesi ini selama 30 hari',
    signInButton: 'Masuk ke Ruang Kerja',
    quickDemo: 'Akses Demo Cepat',

    exportRiskReport: 'Ekspor Laporan Risiko',
    noCustomersMatch: 'Tidak ada pelanggan yang cocok dengan filter aktif.',
    showingResults: 'Menampilkan',
    of: 'dari',
    churnProbShort: 'Prob. Churn',
    closeDrawer: 'Tutup panel',
    executedActions: 'Tindakan yang Dijalankan',
    actionQueued: 'Tindakan berhasil diantrekan & dijalankan!',
    moreOptions: 'Opsi lainnya',
    all: 'Semua',
    highRiskOption: 'Risiko Tinggi',
    medRiskOption: 'Risiko Sedang',
    lowRiskOption: 'Risiko Rendah',
    minPlaceholder: 'Min',
    maxPlaceholder: 'Maks',
    lastSynced: 'Terakhir Disinkronkan',
    aiModel: 'Model AI',
    minutesAgo: 'menit yang lalu',

    enterpriseChurnIntelligence: 'Intelijen Churn Perusahaan',
    aiModelReady: 'Model AI Siap',
    nextGenPredictive: 'Analitik Prediktif Generasi Baru',
    stopChurnTitle: 'Hentikan Churn Sebelum Terjadi.',
    stopChurnDesc: 'Matriks retensi berbasis AI, kepentingan fitur nilai SHAP, dan alur kerja penyelamatan pelanggan otomatis dalam satu platform real-time.',
    predictionAccuracy: 'Akurasi Prediksi',
    trainedAccounts: 'Dilatih pada 42.000+ akun pelanggan',
    automatedPlaybooks: 'Playbook Otomatis',
    triggerRescue: 'Picu kampanye penyelamatan eksekutif instan',
    soc2Certified: 'Tersertifikasi SOC2 Type II',
    encryption256: 'Enkripsi 256-bit',
    forgotPassword: 'Lupa Kata Sandi?',
    enterPassword: 'Masukkan kata sandi',
    adminExecutive: 'Admin / Eksekutif',
    csmLead: 'Pemimpin CSM',
    allRightsReserved: 'Semua hak dilindungi.',
    poweredBy: 'Didukung oleh',
    
    exportExecutiveReport: 'Ekspor Laporan PDF Retensi Eksekutif',
    executiveSummary: 'Ringkasan Eksekutif RetentionPro',
    pdfReportDesc: 'Laporan PDF mencakup metrik risiko eksekutif, grafik Matriks Prioritas Retensi 2x2, nilai fitur global SHAP, dan daftar tindakan pelanggan mendesak.',
    poweredByGemini: 'Didukung oleh Mesin Pakar Gemini AI',
    monthlyBriefing: 'Briefing Retensi Eksekutif Bulanan - Juli 2026',
    downloadReports: 'Unduh laporan eksekutif yang dihasilkan, analisis kohort, dan catatan audit model.',
    configureWorkflows: 'Konfigurasi alur kerja retensi otomatis, pemicu penjangkauan, dan playbook penyelamatan eksekutif.',

    supportTicketVolume: 'Volume Tiket Dukungan',
    contractEndDate: 'Tanggal Akhir Kontrak (< 90h)',
    featureAdoptionCore: 'Adopsi Fitur (Inti)',
    loginFrequencyTrend: 'Tren Frekuensi Login',
    usageFrequency: 'Frekuensi Penggunaan',
    paymentHistory: 'Riwayat Pembayaran',
    tenure: 'Masa Berlangganan',
    integrationHealth: 'Kesehatan Integrasi',
    expertAdvisor: 'Penasihat Ahli',
    account: 'Akun',
    highFeatureUtilization: 'Pemanfaatan Fitur Tinggi',
    multiSeatExpansion: 'Ekspansi Multi-seat',
    slightSupportDelay: 'Sedikit Penundaan Dukungan',
    impact: 'dampak',
    
    accountManager: 'Manajer Akun Pribadi',
    likelyToChurn: 'Kemungkinan churn karena masalah teknis terbaru. Rekomendasikan penjangkauan segera melalui',
    recommendImmediate: 'dengan kredit layanan 3 bulan.',
    monthServiceCredit: 'kredit layanan 3 bulan',
    
    retentionProTitle: 'RetentionPro',
    
    // SHAP Feature Names
    shapUsageFrequency: 'Frekuensi Penggunaan',
    shapPaymentHistory: 'Riwayat Pembayaran',
    shapTenure: 'Masa Berlangganan',
    shapIntegrationHealth: 'Kesehatan Integrasi',
    
    // Explainable AI View
    explainableAITitle: 'AI yang Dapat Dijelaskan & Wawasan SHAP',
    explainableAISub: 'Mendalami faktor keputusan model pembelajaran mesin, kepentingan fitur nilai SHAP, dan metrik validasi model.',
    rocAucScore: 'Skor ROC-AUC',
    precisionRate: 'Tingkat Presisi',
    recallRate: 'Tingkat Recall',
    f1Score: 'Skor F1',
    excellent: 'Sangat Baik',
    high: 'Tinggi',
    optimal: 'Optimal',
    balanced: 'Seimbang',
    globalShapTitle: 'Kepentingan Fitur Nilai SHAP Global',
    kernelShapExplainer: 'KernelSHAP Explainer v2.1',
    shapDescription: 'Nilai SHAP mengukur kontribusi marjinal relatif dari setiap fitur terhadap peningkatan atau penurunan probabilitas churn pelanggan di semua 42.850 akun aktif.',
    meanShap: 'rata-rata |SHAP|',
    supportTicketSLA: 'Resolusi SLA Tiket Dukungan',
    topChurnDriverSegment: 'Driver Churn Teratas per Segmen',
    enterpriseCustomers: 'Pelanggan Enterprise',
    midMarketCustomers: 'Pelanggan Mid-Market',
    smbSelfServe: 'SMB / Self-Serve',
    highUsageCohort: 'Kohort Penggunaan Tinggi',
    serviceOutagesSLA: 'Gangguan Layanan & Pelanggaran SLA',
    contractRenewalProximity: 'Kedekatan Perpanjangan Kontrak (<60h)',
    loginFrequencyTrendNeg: 'Tren Frekuensi Login (-40%)',
    coreFeatureAdoptionHigh: 'Tingkat Adopsi Fitur Inti (>85%)',
    modelFairnessAudit: 'Audit Keadilan & Bias Model:',
    noBiasDetected: 'Tidak ada bias berbasis demografi atau wilayah yang terdeteksi. Logika prediksi murni berbasis perilaku.',
    
    // Reports View
    reportsTitle: 'Laporan & Ekspor Analitik',
    reportsSub: 'Unduh laporan eksekutif yang dihasilkan, analisis kohort, dan catatan audit model.',
    generateCustomReport: 'Buat Laporan Kustom',
    availableReports: 'Laporan Tersedia',
    generatedOn: 'Dibuat pada',
    downloadFile: 'Unduh',
    
    // Retention Strategy View
    retentionStrategyTitle: 'Strategi Retensi & Playbook',
    retentionStrategySub: 'Konfigurasi alur kerja retensi otomatis, pemicu penjangkauan, dan playbook penyelamatan eksekutif.',
    createNewPlaybook: 'Buat Playbook Baru',
    playbookTriggered: 'Playbook dipicu untuk segmen aktif!',
    active: 'Aktif',
    triggerCondition: 'Kondisi Pemicu:',
    targetSegment: 'Segmen Target:',
    expectedImpact: 'Dampak yang Diharapkan:',
    autoExecute: 'Eksekusi Otomatis',
    activeCount: 'aktif',
    runNow: 'Jalankan Sekarang',
    
    // Settings View
    settingsTitle: 'Pengaturan & Konfigurasi AI',
    settingsSub: 'Kelola ambang batas risiko, notifikasi otomatis, opsi bahasa, dan status API AI.',
    configSavedSuccess: 'Konfigurasi berhasil disimpan!',
    languagePreferences: 'Pengaturan Bahasa (Language)',
    indonesian: 'Bahasa Indonesia',
    primaryLanguage: 'Bahasa Utama (Default)',
    english: 'English',
    secondaryLanguage: 'Secondary Language',
    riskCategoryThresholds: 'Ambang Batas Kategori Risiko',
    highChurnRiskCutoff: 'Batas Risiko Churn Tinggi (Prob %)',
    mediumChurnRiskCutoff: 'Batas Risiko Churn Sedang (Prob %)',
    alertNotifications: 'Notifikasi Peringatan',
    sendInstantEmailAlerts: 'Kirim peringatan email instan ke CSM ketika akun melampaui ambang batas Risiko Tinggi.',
    aiEngineConfig: 'Konfigurasi Mesin AI',
    aiEngineDescription: 'RetentionPro menggunakan Google Gemini 3.6 Flash server-side untuk rekomendasi strategi bahasa alami dan bantuan chat percakapan. Kunci API diinjeksi secara otomatis melalui rahasia platform.',
    saveConfiguration: 'Simpan Konfigurasi',
    
    // Audit Trail Modal
    customerAuditTrail: 'Jejak Audit & Timeline Pelanggan',
    closeAuditTrail: 'Tutup Jejak Audit',
    by: 'Oleh:',
    
    // AI Assistant Modal
    aiThinking: 'RetentionPro AI sedang berpikir...',
    
    // Dashboard - SHAP Values
    shapValues: 'Nilai SHAP',
  },
  en: {
    dashboard: 'Dashboard',
    customers: 'Customers',
    predictions: 'Predictions',
    explainableAI: 'Explainable AI',
    retentionStrategy: 'Retention Strategy',
    reports: 'Reports',
    settings: 'Settings',

    searchPlaceholder: 'Search insights, customers, or predictions...',
    notifications: 'Notifications',
    newBadge: 'New',
    urgentAlert: 'Urgent Alert',
    playbookExecuted: 'Playbook Executed',
    modelSynced: 'Model Synced',

    dashboardTitle: 'Retention Dashboard',
    dashboardSub: 'Real-time analysis of customer health and churn risk probabilities.',
    last30Days: 'Last 30 Days',
    last7Days: 'Last 7 Days',
    last90Days: 'Last 90 Days',
    lastYear: 'Last Year',
    exportPdf: 'Export PDF',

    totalCustomers: 'Total Customers',
    highChurnRisk: 'High Churn Risk',
    avgChurnProb: 'Avg Churn Prob.',
    totalCLV: 'Total CLV',
    urgentAction: 'Urgent Action',
    p1Priority: 'P1 Priority',
    forecasted: 'Forecasted',
    alerts: 'Alerts',

    priorityMatrixTitle: 'Retention Priority Matrix',
    enterprise: 'Enterprise',
    midMarket: 'Mid-Market',
    highRisk: 'HIGH RISK',
    lowRisk: 'LOW RISK',
    lowCLV: 'LOW CLV',
    highCLV: 'HIGH CLV',
    churnGuard: 'Churn Guard',
    urgentFocus: 'URGENT FOCUS',
    steady: 'Steady',
    loyalGiants: 'LOYAL GIANTS',

    revenueAtRisk: 'Revenue at Risk',
    revenueDesc: 'AI projects 12% of this can be recovered through proactive engagement in the next 14 days.',
    aiInsightsTitle: 'AI Insights: Churn Drivers',
    viewExplainabilityReport: 'View Explainability Report',

    distributionTitle: 'Distribution Analysis',
    churn: 'Churn',
    clv: 'CLV',
    globalFeatureImportance: 'Global Feature Importance',

    askAIAssistant: 'Ask AI Assistant',
    executeAction: 'Execute Action',
    viewDetails: 'View Details',

    customerHubTitle: 'Customer Retention Hub',
    customerHubSub: 'Manage high-risk accounts and AI-recommended actions.',
    riskLevel: 'Risk Level',
    allRiskLevels: 'All Risk Levels',
    clvRange: 'CLV Range',
    activeSegments: 'Active Segments',
    clearAll: 'Clear All',

    idCol: 'ID',
    nameCol: 'NAME',
    churnProbCol: 'CHURN PROB (%)',
    clvCol: 'CLV ($)',
    priorityCol: 'PRIORITY',
    recommendedActionCol: 'RECOMMENDED ACTION',
    actionsCol: 'ACTIONS',

    riskAssessment: 'Risk Assessment',
    riskFactorAnalysis: 'Risk Factor Analysis',
    aiRecommendedStrategy: 'AI Recommended Strategy',
    fullAuditTrail: 'Full Customer Audit Trail',

    predictionsTitle: 'Predictions & Risk Simulator',
    predictionsSub: 'Perform What-If scenario simulations to predict churn probability under altered customer conditions.',
    simulationInputs: 'Simulation Input Variables',
    resetBaseline: 'Reset to Healthy Baseline',
    predictedScore: 'Predicted Churn Risk Score',
    rerunModel: 'Re-run Full Predictive Model',

    signInTitle: 'Sign In to Dashboard',
    signInSub: 'Enter your corporate credentials to access customer risk intelligence.',
    emailLabel: 'Work Email Address',
    passwordLabel: 'Password',
    rememberMe: 'Remember this session for 30 days',
    signInButton: 'Sign In to Workspace',
    quickDemo: 'Quick Demo Access',

    exportRiskReport: 'Export Risk Report',
    noCustomersMatch: 'No customers match the active filters.',
    showingResults: 'Showing',
    of: 'of',
    churnProbShort: 'Churn Prob',
    closeDrawer: 'Close drawer',
    executedActions: 'Executed Actions',
    actionQueued: 'Action successfully queued & executed!',
    moreOptions: 'More options',
    all: 'All',
    highRiskOption: 'High Risk',
    medRiskOption: 'Medium Risk',
    lowRiskOption: 'Low Risk',
    minPlaceholder: 'Min',
    maxPlaceholder: 'Max',
    lastSynced: 'Last Synced',
    aiModel: 'AI Model',
    minutesAgo: 'minutes ago',

    enterpriseChurnIntelligence: 'Enterprise Churn Intelligence',
    aiModelReady: 'AI Model Ready',
    nextGenPredictive: 'Next-Gen Predictive Analytics',
    stopChurnTitle: 'Stop Churn Before It Happens.',
    stopChurnDesc: 'AI-driven retention matrix, SHAP value feature importance, and automated customer rescue workflows in one real-time platform.',
    predictionAccuracy: 'Prediction Accuracy',
    trainedAccounts: 'Trained on 42,000+ subscriber accounts',
    automatedPlaybooks: 'Automated Playbooks',
    triggerRescue: 'Trigger instant executive rescue campaigns',
    soc2Certified: 'SOC2 Type II Certified',
    encryption256: '256-bit Encryption',
    forgotPassword: 'Forgot Password?',
    enterPassword: 'Enter password',
    adminExecutive: 'Admin / Executive',
    csmLead: 'CSM Lead',
    allRightsReserved: 'All rights reserved.',
    poweredBy: 'Powered by',
    
    exportExecutiveReport: 'Export Executive Retention PDF Report',
    executiveSummary: 'RetentionPro Executive Summary',
    pdfReportDesc: 'The PDF report includes executive risk metrics, the 2x2 Retention Priority Matrix chart, SHAP global feature values, and urgent customer action list.',
    poweredByGemini: 'Powered by Gemini AI Expert Engine',
    monthlyBriefing: 'Monthly Executive Retention Briefing - July 2026',
    downloadReports: 'Download generated executive reports, cohort analyses, and model audit records.',
    configureWorkflows: 'Configure automated retention workflows, outreach triggers, and executive rescue playbooks.',

    supportTicketVolume: 'Support Ticket Volume',
    contractEndDate: 'Contract End Date (< 90d)',
    featureAdoptionCore: 'Feature Adoption (Core)',
    loginFrequencyTrend: 'Login Frequency Trend',
    usageFrequency: 'Usage Frequency',
    paymentHistory: 'Payment History',
    tenure: 'Tenure',
    integrationHealth: 'Integration Health',
    expertAdvisor: 'Expert Advisor',
    account: 'Account',
    highFeatureUtilization: 'High Feature Utilization',
    multiSeatExpansion: 'Multi-seat Expansion',
    slightSupportDelay: 'Slight Support Delay',
    impact: 'impact',
    
    accountManager: 'Personal Account Manager',
    likelyToChurn: 'Likely to churn due to recent technical issues. Recommend immediate outreach via',
    recommendImmediate: 'with a 3-month service credit.',
    monthServiceCredit: '3-month service credit',
    
    retentionProTitle: 'RetentionPro',
    
    // SHAP Feature Names
    shapUsageFrequency: 'Usage Frequency',
    shapPaymentHistory: 'Payment History',
    shapTenure: 'Tenure',
    shapIntegrationHealth: 'Integration Health',
    
    // Explainable AI View
    explainableAITitle: 'Explainable AI & SHAP Insights',
    explainableAISub: 'Deep-dive into machine learning model decision factors, SHAP value feature importance, and model validation metrics.',
    rocAucScore: 'ROC-AUC Score',
    precisionRate: 'Precision Rate',
    recallRate: 'Recall Rate',
    f1Score: 'F1 Score',
    excellent: 'Excellent',
    high: 'High',
    optimal: 'Optimal',
    balanced: 'Balanced',
    globalShapTitle: 'Global SHAP Value Feature Importance',
    kernelShapExplainer: 'KernelSHAP Explainer v2.1',
    shapDescription: 'SHAP values measure the relative marginal contribution of each feature toward increasing or decreasing customer churn probability across all 42,850 active accounts.',
    meanShap: 'mean |SHAP|',
    supportTicketSLA: 'Support Ticket SLA Resolution',
    topChurnDriverSegment: 'Top Churn Driver per Segment',
    enterpriseCustomers: 'Enterprise Customers',
    midMarketCustomers: 'Mid-Market Customers',
    smbSelfServe: 'SMB / Self-Serve',
    highUsageCohort: 'High Usage Cohort',
    serviceOutagesSLA: 'Service Outages & SLA breaches',
    contractRenewalProximity: 'Contract Renewal Proximity (<60d)',
    loginFrequencyTrendNeg: 'Login Frequency Trend (-40%)',
    coreFeatureAdoptionHigh: 'Core Feature Adoption Rate (>85%)',
    modelFairnessAudit: 'Model Fairness & Bias Audit:',
    noBiasDetected: 'No demographic or region-based bias detected. Prediction logic is purely behavior-based.',
    
    // Reports View
    rerunPredictiveModel: 'Re-run Full Predictive Model',
    highRiskDrivenBy: 'High risk driven by frequent support tickets and contract renewal approaching within 45 days.',
    
    // Reports View
    reportsTitle: 'Reports & Analytics Exports',
    reportsSub: 'Download generated executive reports, cohort analyses, and model audit records.',
    generateCustomReport: 'Generate Custom Report',
    availableReports: 'Available Reports',
    generatedOn: 'Generated on',
    downloadFile: 'Download',
    
    // Retention Strategy View
    retentionStrategyTitle: 'Retention Strategy & Playbooks',
    retentionStrategySub: 'Configure automated retention workflows, outreach triggers, and executive rescue playbooks.',
    createNewPlaybook: 'Create New Playbook',
    playbookTriggered: 'Playbook triggered for active segment!',
    active: 'Active',
    triggerCondition: 'Trigger Condition:',
    targetSegment: 'Target Segment:',
    expectedImpact: 'Expected Impact:',
    autoExecute: 'Auto-Execute',
    activeCount: 'active',
    runNow: 'Run Now',
    
    // Settings View
    settingsTitle: 'Settings & AI Configuration',
    settingsSub: 'Manage risk evaluation thresholds, automated notifications, language preferences, and AI API status.',
    configSavedSuccess: 'Configuration saved successfully!',
    languagePreferences: 'Language Preferences',
    indonesian: 'Bahasa Indonesia',
    primaryLanguage: 'Primary Language (Default)',
    english: 'English',
    secondaryLanguage: 'Secondary Language',
    riskCategoryThresholds: 'Risk Category Thresholds',
    highChurnRiskCutoff: 'High Churn Risk Cutoff (Prob %)',
    mediumChurnRiskCutoff: 'Medium Churn Risk Cutoff (Prob %)',
    alertNotifications: 'Alert Notifications',
    sendInstantEmailAlerts: 'Send instant email alerts to CSMs when an account crosses High Risk threshold.',
    aiEngineConfig: 'AI Engine Configuration',
    aiEngineDescription: 'RetentionPro uses Google Gemini 3.6 Flash server-side for natural language strategy recommendations and conversational chat assistance. API keys are injected automatically via platform secrets.',
    saveConfiguration: 'Save Configuration',
    
    // Audit Trail Modal
    customerAuditTrail: 'Customer Audit Trail & Timeline',
    closeAuditTrail: 'Close Audit Trail',
    by: 'By:',
    
    // AI Assistant Modal
    aiThinking: 'RetentionPro AI is thinking...',
    
    // Dashboard - SHAP Values
    shapValues: 'SHAP Values',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Indonesian (id) is default as requested
  const [language, setLanguage] = useState<Language>('id');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
