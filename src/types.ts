export type NavTab = 
  | 'dashboard' 
  | 'customers' 
  | 'predictions' 
  | 'explainable' 
  | 'strategy' 
  | 'reports' 
  | 'settings';

export type RiskLevel = 'High Risk' | 'Med Risk' | 'Low Risk';

export type CustomerSegment = 'ENTERPRISE' | 'MID-MARKET' | 'RENEWAL_WINDOW' | 'SMB' | 'CHURN_GUARD' | 'LOYAL_GIANT';

export interface RiskFactor {
  name: string;
  impactPercent: number; // e.g. +30 for +30% or -10 for -10%
  type: 'negative' | 'positive';
}

export interface Customer {
  id: string;
  name: string;
  avatar: string;
  churnProb: number; // 0 - 100
  clv: number; // e.g. 12400
  priority: RiskLevel;
  segment: CustomerSegment;
  recommendedAction: string;
  actionIcon?: string;
  accountManager?: string;
  joinDate?: string;
  contractEndDate?: string;
  supportTickets30d?: number;
  loginFrequencyTrend?: string;
  featureAdoptionRate?: number; // 0 - 100
  riskFactors: RiskFactor[];
  recentNote?: string;
  executedActions?: {
    id: string;
    title: string;
    date: string;
    status: 'Executed' | 'Pending' | 'Scheduled';
  }[];
}

export interface MetricCardData {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  badgeLabel: string;
  icon: string;
}

export interface PriorityMatrixQuadrant {
  id: 'churnGuard' | 'urgentFocus' | 'steady' | 'loyalGiants';
  title: string;
  count: number;
  riskCategory: 'HIGH' | 'LOW';
  clvCategory: 'HIGH' | 'LOW';
  badgeColor: string;
  bgClass: string;
}

export interface ChurnDriverInsight {
  title: string;
  impact: string;
  impactValue: number; // e.g. 24.2
  type: 'positive' | 'negative';
  barPercent: number; // 0 - 100
  barColorClass: string;
}

export interface FeatureImportance {
  feature: string;
  shapValue: string; // e.g. "+0.48"
  percentWidth: number; // 0 - 100
}

export interface RetentionPlaybook {
  id: string;
  title: string;
  description: string;
  triggerCondition: string;
  targetSegment: string;
  expectedRetentionBoost: string;
  automated: boolean;
  activeCount: number;
  status: 'Active' | 'Draft' | 'Paused';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  event: string;
  author: string;
  type: 'system' | 'ai' | 'user' | 'alert';
  details: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
