import { Customer, RetentionPlaybook, AuditLogItem, ChurnDriverInsight, FeatureImportance } from '../types';

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'C-8291',
    name: 'Sarah Johnson',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI82rm3nAaS9MSOu0f25l6AV3VBMlezQ1mbH2SrI-dSwB9qXsWY5dLdyhHqRGnLGSVBTK2-4C_w_KM1dqUmnIIstEMxY4Y0YnTm3T7wR04WnCXxCktzyErt8HIjoEo-xKBOdJ4w7HvfL8Rs09c_gLmh5lq_TDuRjjpwSiH9rgnF_F8zlr8gwJ0FiIhwIo67twB2HOV4X94ivGu5hCvTBQGWJTiRQ3OXmiv-dSbm5Wjf4JkGX6py9Zc_CNLF6JBUz5ACxEu06HJGxY',
    churnProb: 88,
    clv: 12400,
    priority: 'High Risk',
    segment: 'ENTERPRISE',
    recommendedAction: 'Offer 20% Discount',
    actionIcon: 'auto_awesome',
    accountManager: 'David Sterling',
    joinDate: '2023-03-15',
    contractEndDate: '2026-08-30',
    supportTickets30d: 8,
    loginFrequencyTrend: '-42% past 14 days',
    featureAdoptionRate: 35,
    riskFactors: [
      { name: 'Service Outages', impactPercent: 30, type: 'negative' },
      { name: 'Price Change Impact', impactPercent: 15, type: 'negative' },
      { name: 'Customer Tenure', impactPercent: -10, type: 'positive' },
    ],
    recentNote: 'Experiencing recent API downtime issues. Account manager notified.',
    executedActions: [
      { id: 'act-1', title: 'Priority Support Ticket Escalation', date: '2026-07-20', status: 'Executed' },
      { id: 'act-2', title: 'Executive Sponsor Outreach Email', date: '2026-07-22', status: 'Executed' }
    ]
  },
  {
    id: 'C-7312',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    churnProb: 65,
    clv: 8900,
    priority: 'Med Risk',
    segment: 'MID-MARKET',
    recommendedAction: 'Send Loyalty Email',
    actionIcon: 'mail',
    accountManager: 'Jessica Taylor',
    joinDate: '2022-11-01',
    contractEndDate: '2026-09-15',
    supportTickets30d: 4,
    loginFrequencyTrend: '-18% past 14 days',
    featureAdoptionRate: 58,
    riskFactors: [
      { name: 'Contract Renewal < 60d', impactPercent: 22, type: 'negative' },
      { name: 'Feature Adoption Lag', impactPercent: 14, type: 'negative' },
      { name: 'Prompt Support Resolution', impactPercent: -11, type: 'positive' },
    ],
    recentNote: 'Renewal approaching. Requested feedback on Tier-2 feature set.',
    executedActions: [
      { id: 'act-3', title: 'Automated Renewal Reminder Sent', date: '2026-07-15', status: 'Executed' }
    ]
  },
  {
    id: 'C-1045',
    name: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    churnProb: 12,
    clv: 25000,
    priority: 'Low Risk',
    segment: 'ENTERPRISE',
    recommendedAction: 'Upsell Premium',
    actionIcon: 'upgrade',
    accountManager: 'Alex Rivera',
    joinDate: '2021-05-20',
    contractEndDate: '2027-01-10',
    supportTickets30d: 1,
    loginFrequencyTrend: '+12% past 14 days',
    featureAdoptionRate: 92,
    riskFactors: [
      { name: 'High Feature Utilization', impactPercent: -25, type: 'positive' },
      { name: 'Multi-seat Expansion', impactPercent: -15, type: 'positive' },
      { name: 'Slight Support Delay', impactPercent: 5, type: 'negative' },
    ],
    recentNote: 'Power user account. Added 15 additional seats last month.',
    executedActions: []
  },
  {
    id: 'C-9902',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    churnProb: 91,
    clv: 34500,
    priority: 'High Risk',
    segment: 'ENTERPRISE',
    recommendedAction: 'Schedule VP Review',
    actionIcon: 'video',
    accountManager: 'David Sterling',
    joinDate: '2023-01-10',
    contractEndDate: '2026-08-10',
    supportTickets30d: 11,
    loginFrequencyTrend: '-65% past 14 days',
    featureAdoptionRate: 22,
    riskFactors: [
      { name: 'Critical Bug Escalations', impactPercent: 35, type: 'negative' },
      { name: 'Executive Turn-over', impactPercent: 20, type: 'negative' },
      { name: 'High Account CLV', impactPercent: -10, type: 'positive' },
    ],
    recentNote: 'New Champion appointed at client company. Needs onboarding restart.',
    executedActions: [
      { id: 'act-4', title: 'Critical Bug Hotfix Deployed', date: '2026-07-24', status: 'Executed' }
    ]
  },
  {
    id: 'C-4120',
    name: 'Aisha Patel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    churnProb: 44,
    clv: 15200,
    priority: 'Med Risk',
    segment: 'RENEWAL_WINDOW',
    recommendedAction: 'Send Feature Guide',
    actionIcon: 'book_open',
    accountManager: 'Jessica Taylor',
    joinDate: '2022-08-14',
    contractEndDate: '2026-08-28',
    supportTickets30d: 3,
    loginFrequencyTrend: '-5% past 14 days',
    featureAdoptionRate: 64,
    riskFactors: [
      { name: 'Contract End Date < 40d', impactPercent: 18, type: 'negative' },
      { name: 'Consistent Monthly Usage', impactPercent: -12, type: 'positive' },
    ],
    recentNote: 'Requested quote for annual commitment vs quarterly billing.',
    executedActions: []
  },
  {
    id: 'C-3388',
    name: 'Jonathan Sterling',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    churnProb: 8,
    clv: 48000,
    priority: 'Low Risk',
    segment: 'LOYAL_GIANT',
    recommendedAction: 'Invite to Advisory Board',
    actionIcon: 'award',
    accountManager: 'Alex Rivera',
    joinDate: '2020-02-18',
    contractEndDate: '2027-06-30',
    supportTickets30d: 0,
    loginFrequencyTrend: '+8% past 14 days',
    featureAdoptionRate: 98,
    riskFactors: [
      { name: 'Long Term Tenure (6 yrs)', impactPercent: -30, type: 'positive' },
      { name: 'API Integration Depth', impactPercent: -20, type: 'positive' },
    ],
    recentNote: 'Agreed to be a case study reference customer for Q3 marketing.',
    executedActions: []
  },
  {
    id: 'C-5519',
    name: 'Chloe Zhang',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    churnProb: 78,
    clv: 6200,
    priority: 'High Risk',
    segment: 'MID-MARKET',
    recommendedAction: 'Trigger Automated Nudge',
    actionIcon: 'zap',
    accountManager: 'Jessica Taylor',
    joinDate: '2023-09-01',
    contractEndDate: '2026-09-01',
    supportTickets30d: 6,
    loginFrequencyTrend: '-38% past 14 days',
    featureAdoptionRate: 40,
    riskFactors: [
      { name: 'Low Integration Health', impactPercent: 28, type: 'negative' },
      { name: 'Support Ticket Unresolved', impactPercent: 16, type: 'negative' },
    ],
    recentNote: 'Webhook integration throwing error 500s.',
    executedActions: []
  }
];

export const CHURN_DRIVERS: ChurnDriverInsight[] = [
  {
    title: 'Support Ticket Volume',
    impact: '+24.2% impact',
    impactValue: 24.2,
    type: 'negative',
    barPercent: 85,
    barColorClass: 'bg-error',
  },
  {
    title: 'Contract End Date (< 90d)',
    impact: '+18.5% impact',
    impactValue: 18.5,
    type: 'negative',
    barPercent: 65,
    barColorClass: 'bg-tertiary-container',
  },
  {
    title: 'Feature Adoption (Core)',
    impact: '-12.1% impact',
    impactValue: -12.1,
    type: 'positive',
    barPercent: 40,
    barColorClass: 'bg-green-500',
  },
  {
    title: 'Login Frequency Trend',
    impact: '+5.4% impact',
    impactValue: 5.4,
    type: 'negative',
    barPercent: 25,
    barColorClass: 'bg-outline',
  },
];

export const SHAP_FEATURE_IMPORTANCE: FeatureImportance[] = [
  { feature: 'Usage Frequency', shapValue: '+0.48', percentWidth: 78 },
  { feature: 'Payment History', shapValue: '+0.32', percentWidth: 52 },
  { feature: 'Tenure', shapValue: '+0.21', percentWidth: 35 },
  { feature: 'Integration Health', shapValue: '+0.15', percentWidth: 25 },
];

export const RETENTION_PLAYBOOKS: RetentionPlaybook[] = [
  {
    id: 'pb-1',
    title: 'P1 High-CLV Urgent Rescue',
    description: 'Triggers executive CSM notification, auto-applies 20% discount coupon, and schedules immediate 1-on-1 call.',
    triggerCondition: 'Churn Prob > 80% & CLV > $10,000',
    targetSegment: 'Enterprise & Mid-Market',
    expectedRetentionBoost: '+28% recovery rate',
    automated: true,
    activeCount: 84,
    status: 'Active'
  },
  {
    id: 'pb-2',
    title: 'Contract Renewal Window Re-engagement',
    description: 'Automated 60-day & 30-day email sequence highlighting unused premium features and upcoming product roadmap.',
    triggerCondition: 'Contract Days Left < 60',
    targetSegment: 'All Customers',
    expectedRetentionBoost: '+14% renewal rate',
    automated: true,
    activeCount: 312,
    status: 'Active'
  },
  {
    id: 'pb-3',
    title: 'Support Outage Satisfaction Follow-up',
    description: 'Provides 1-month service credit and priority engineering session after 3+ support tickets in 7 days.',
    triggerCondition: 'Support Tickets > 3 / week',
    targetSegment: 'High Impact Accounts',
    expectedRetentionBoost: '+21% CSAT bounceback',
    automated: false,
    activeCount: 45,
    status: 'Active'
  },
  {
    id: 'pb-4',
    title: 'Low Usage Feature Nudge Sequence',
    description: 'In-app guided walk-throughs for teams with core feature adoption under 40%.',
    triggerCondition: 'Core Feature Adoption < 40%',
    targetSegment: 'Mid-Market & SMB',
    expectedRetentionBoost: '+9% adoption growth',
    automated: true,
    activeCount: 520,
    status: 'Active'
  }
];

export const MOCK_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    timestamp: 'Today, 10:42 AM',
    event: 'AI Model Alert Triggered',
    author: 'retention_v4.2.1-stable',
    type: 'alert',
    details: 'Churn probability increased from 64% to 88% due to 3 consecutive unresolved API outage tickets.'
  },
  {
    id: 'log-2',
    timestamp: 'Yesterday, 04:15 PM',
    event: 'CSM Action Executed',
    author: 'David Sterling (CSM)',
    type: 'user',
    details: 'Sent 20% renewal discount voucher and requested urgent engineering support review.'
  },
  {
    id: 'log-3',
    timestamp: 'July 22, 2026',
    event: 'Login Frequency Dropped',
    author: 'System Analytics',
    type: 'system',
    details: 'Weekly active user logins decreased by 42% compared to previous 30-day baseline.'
  },
  {
    id: 'log-4',
    timestamp: 'July 15, 2026',
    event: 'Contract Renewal Window Opened',
    author: 'Billing Service',
    type: 'system',
    details: '60-day renewal notification triggered for contract expiring Aug 30, 2026.'
  }
];
