import { AuditSimulation, AuditFinding } from '@/types';

// Sample compliance metrics data
export interface ComplianceMetrics {
  overallScore: number;
  totalRequirements: number;
  compliantRequirements: number;
  nonCompliantRequirements: number;
  inProgressRequirements: number;
  lastAuditDate: string;
  nextAuditDate: string;
}

export interface ComplianceAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  standard: string;
  dueDate?: string;
  isOverdue: boolean;
  createdAt: string;
}

export interface ComplianceActivity {
  id: string;
  type: 'audit' | 'review' | 'training' | 'update' | 'finding';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  standard?: string;
}

export interface StandardCompliance {
  standardId: string;
  standardName: string;
  completionPercentage: number;
  lastReview: string;
  status: 'compliant' | 'non-compliant' | 'in-progress' | 'overdue';
  requirementsMet: number;
  totalRequirements: number;
}

// Sample data
export const complianceMetrics: ComplianceMetrics = {
  overallScore: 87,
  totalRequirements: 247,
  compliantRequirements: 215,
  nonCompliantRequirements: 18,
  inProgressRequirements: 14,
  lastAuditDate: '2024-01-15',
  nextAuditDate: '2024-07-15'
};

export const complianceAlerts: ComplianceAlert[] = [
  {
    id: 'alert-1',
    title: 'Design Control Review Overdue',
    description: 'Design history file review for Project Alpha is 5 days overdue',
    severity: 'high',
    standard: 'FDA QSR 820.30',
    dueDate: '2024-01-10',
    isOverdue: true,
    createdAt: '2024-01-05'
  },
  {
    id: 'alert-2',
    title: 'CAPA Response Due Soon',
    description: 'Corrective action for supplier audit finding due in 3 days',
    severity: 'medium',
    standard: 'ISO 13485:2016',
    dueDate: '2024-01-18',
    isOverdue: false,
    createdAt: '2024-01-08'
  },
  {
    id: 'alert-3',
    title: 'Post-Market Surveillance Report',
    description: 'Quarterly surveillance report preparation needed',
    severity: 'medium',
    standard: 'EU MDR Article 83',
    dueDate: '2024-01-25',
    isOverdue: false,
    createdAt: '2024-01-12'
  },
  {
    id: 'alert-4',
    title: 'Training Records Missing',
    description: 'Quality training records incomplete for 3 staff members',
    severity: 'low',
    standard: 'ISO 13485:2016',
    isOverdue: false,
    createdAt: '2024-01-14'
  }
];

export const recentActivity: ComplianceActivity[] = [
  {
    id: 'activity-1',
    type: 'audit',
    title: 'Internal Quality Audit Completed',
    description: 'Q4 2023 internal audit of design controls completed with 3 minor findings',
    timestamp: '2024-01-14T09:30:00Z',
    user: 'Sarah Johnson',
    standard: 'FDA QSR 820.30'
  },
  {
    id: 'activity-2',
    type: 'finding',
    title: 'Audit Finding Resolved',
    description: 'CAPA-2023-15: Supplier qualification documentation updated',
    timestamp: '2024-01-13T14:20:00Z',
    user: 'Michael Chen',
    standard: 'ISO 13485:2016'
  },
  {
    id: 'activity-3',
    type: 'review',
    title: 'Document Review Completed',
    description: 'Quality manual revision 3.2 approved and released',
    timestamp: '2024-01-12T11:45:00Z',
    user: 'Emily Rodriguez',
    standard: 'ISO 13485:2016'
  },
  {
    id: 'activity-4',
    type: 'training',
    title: 'Compliance Training Conducted',
    description: 'EU MDR requirements training completed for R&D team',
    timestamp: '2024-01-11T16:00:00Z',
    user: 'David Park',
    standard: 'EU MDR'
  },
  {
    id: 'activity-5',
    type: 'update',
    title: 'Procedure Updated',
    description: 'SOP-QA-015 Complaint Handling procedure revised for MDR compliance',
    timestamp: '2024-01-10T13:15:00Z',
    user: 'Lisa Thompson',
    standard: 'EU MDR Article 87'
  }
];

export const standardsCompliance: StandardCompliance[] = [
  {
    standardId: 'fda-qsr',
    standardName: 'FDA QSR (21 CFR 820)',
    completionPercentage: 92,
    lastReview: '2024-01-10',
    status: 'compliant',
    requirementsMet: 73,
    totalRequirements: 79
  },
  {
    standardId: 'iso-13485',
    standardName: 'ISO 13485:2016',
    completionPercentage: 89,
    lastReview: '2024-01-08',
    status: 'compliant',
    requirementsMet: 96,
    totalRequirements: 108
  },
  {
    standardId: 'eu-mdr',
    standardName: 'EU MDR (2017/745)',
    completionPercentage: 76,
    lastReview: '2023-12-15',
    status: 'in-progress',
    requirementsMet: 46,
    totalRequirements: 60
  }
];

export const auditSimulations: AuditSimulation[] = [
  {
    id: 'sim-1',
    title: 'FDA Pre-Market Inspection Simulation',
    description: 'Simulated FDA inspection focusing on design controls and risk management',
    standard: 'FDA QSR 820.30',
    status: 'completed',
    createdAt: '2024-01-05',
    findings: [
      {
        id: 'finding-1',
        title: 'Design History File Incomplete',
        description: 'DHF missing verification protocols for software components',
        severity: 'major',
        section: '820.30(j)',
        evidence: 'Software V&V documentation folder incomplete'
      },
      {
        id: 'finding-2',
        title: 'Risk Analysis Documentation',
        description: 'Risk analysis lacks post-market data integration',
        severity: 'minor',
        section: '820.30(g)',
        evidence: 'Risk management file review'
      }
    ]
  },
  {
    id: 'sim-2',
    title: 'ISO 13485 Surveillance Audit',
    description: 'Annual surveillance audit simulation covering management review and CAPA',
    standard: 'ISO 13485:2016',
    status: 'active',
    createdAt: '2024-01-12',
    findings: [
      {
        id: 'finding-3',
        title: 'Management Review Records',
        description: 'Management review minutes lack specific action items tracking',
        severity: 'minor',
        section: '5.6.3',
        evidence: 'Q3 2023 management review minutes'
      }
    ]
  },
  {
    id: 'sim-3',
    title: 'EU MDR Compliance Assessment',
    description: 'Comprehensive MDR readiness assessment simulation',
    standard: 'EU MDR',
    status: 'draft',
    createdAt: '2024-01-14',
    findings: []
  }
];

// Helper functions
export const getComplianceScoreColor = (score: number): string => {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-yellow-600';
  if (score >= 70) return 'text-orange-600';
  return 'text-red-600';
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'compliant':
      return 'text-green-600';
    case 'in-progress':
      return 'text-blue-600';
    case 'non-compliant':
      return 'text-red-600';
    case 'overdue':
      return 'text-red-700';
    default:
      return 'text-gray-600';
  }
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'critical':
      return 'text-red-700 bg-red-50 border-red-200';
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'low':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};