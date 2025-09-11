import { ComplianceActivity, ComplianceAlert } from './complianceData';

// Generate additional sample compliance activities
export const generateSampleActivities = (count: number = 10): ComplianceActivity[] => {
  const activityTypes = ['audit', 'review', 'training', 'update', 'finding'] as const;
  const users = ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Park', 'Lisa Thompson', 'James Wilson', 'Maria Garcia', 'Robert Lee'];
  const standards = ['FDA QSR 820.30', 'ISO 13485:2016', 'EU MDR Article 83', 'FDA QSR 820.100', 'ISO 13485 Clause 8.2'];
  
  const activities: ComplianceActivity[] = [];
  
  for (let i = 0; i < count; i++) {
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const standard = standards[Math.floor(Math.random() * standards.length)];
    
    // Generate date within last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    const activity: ComplianceActivity = {
      id: `activity-${Date.now()}-${i}`,
      type,
      user,
      standard: Math.random() > 0.3 ? standard : undefined,
      timestamp: date.toISOString(),
      ...getActivityContent(type)
    };
    
    activities.push(activity);
  }
  
  return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

function getActivityContent(type: ComplianceActivity['type']) {
  switch (type) {
    case 'audit':
      const auditTitles = [
        'Internal Quality Audit Completed',
        'Supplier Audit Conducted',
        'Design Control Audit Scheduled',
        'Management Review Audit',
        'CAPA System Audit'
      ];
      const auditDescriptions = [
        'Q4 2023 internal audit completed with minor findings',
        'Supplier qualification audit revealed documentation gaps',
        'Annual design control audit scheduled for next week',
        'Management review process audit completed successfully',
        'CAPA effectiveness review identified improvement opportunities'
      ];
      return {
        title: auditTitles[Math.floor(Math.random() * auditTitles.length)],
        description: auditDescriptions[Math.floor(Math.random() * auditDescriptions.length)]
      };
      
    case 'finding':
      const findingTitles = [
        'Audit Finding Resolved',
        'CAPA Implementation Complete',
        'Non-Conformance Addressed',
        'Corrective Action Verified',
        'Finding Investigation Closed'
      ];
      const findingDescriptions = [
        'Training records documentation updated per audit finding',
        'Process improvement implemented for design validation',
        'Supplier qualification documentation completed',
        'Risk management file updated with post-market data',
        'Document control procedure revised and approved'
      ];
      return {
        title: findingTitles[Math.floor(Math.random() * findingTitles.length)],
        description: findingDescriptions[Math.floor(Math.random() * findingDescriptions.length)]
      };
      
    case 'review':
      const reviewTitles = [
        'Document Review Completed',
        'Procedure Updated',
        'Policy Revision Approved',
        'Standard Operating Procedure Released',
        'Quality Manual Updated'
      ];
      const reviewDescriptions = [
        'Quality manual revision approved and released',
        'Design control procedure updated for compliance',
        'Risk management policy aligned with standards',
        'New SOP for complaint handling implemented',
        'Training procedures updated for regulatory changes'
      ];
      return {
        title: reviewTitles[Math.floor(Math.random() * reviewTitles.length)],
        description: reviewDescriptions[Math.floor(Math.random() * reviewDescriptions.length)]
      };
      
    case 'training':
      const trainingTitles = [
        'Compliance Training Conducted',
        'Regulatory Update Training',
        'Quality System Training',
        'Audit Skills Workshop',
        'ISO 13485 Training Session'
      ];
      const trainingDescriptions = [
        'EU MDR requirements training for R&D team',
        'FDA QSR updates training for quality staff',
        'ISO 13485 internal auditor training completed',
        'Risk management training for design team',
        'CAPA process training for manufacturing staff'
      ];
      return {
        title: trainingTitles[Math.floor(Math.random() * trainingTitles.length)],
        description: trainingDescriptions[Math.floor(Math.random() * trainingDescriptions.length)]
      };
      
    case 'update':
      const updateTitles = [
        'System Update Deployed',
        'Documentation Updated',
        'Process Improvement Implemented',
        'Software Validation Completed',
        'Database Update Applied'
      ];
      const updateDescriptions = [
        'Quality management system updated for compliance',
        'Document control system enhanced with new features',
        'Risk assessment process improved based on feedback',
        'Training management system upgraded',
        'Audit tracking system updated with new reporting'
      ];
      return {
        title: updateTitles[Math.floor(Math.random() * updateTitles.length)],
        description: updateDescriptions[Math.floor(Math.random() * updateDescriptions.length)]
      };
      
    default:
      return {
        title: 'General Activity',
        description: 'Compliance-related activity completed'
      };
  }
}

// Generate additional sample compliance alerts
export const generateSampleAlerts = (count: number = 8): ComplianceAlert[] => {
  const severities = ['low', 'medium', 'high', 'critical'] as const;
  const standards = [
    'FDA QSR 820.30',
    'ISO 13485:2016',
    'EU MDR Article 83',
    'FDA QSR 820.100',
    'ISO 13485 Clause 7.3',
    'EU MDR Article 61',
    'FDA QSR 820.22',
    'ISO 13485 Clause 8.5'
  ];
  
  const alerts: ComplianceAlert[] = [];
  
  for (let i = 0; i < count; i++) {
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const standard = standards[Math.floor(Math.random() * standards.length)];
    
    // Generate due date within next 30 days (70% chance) or past due (30% chance)
    const isOverdue = Math.random() < 0.3;
    const dueDate = new Date();
    if (isOverdue) {
      dueDate.setDate(dueDate.getDate() - Math.floor(Math.random() * 10 + 1));
    } else {
      dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30 + 1));
    }
    
    // Created date 1-7 days ago
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 7 + 1));
    
    const alert: ComplianceAlert = {
      id: `alert-${Date.now()}-${i}`,
      severity,
      standard,
      isOverdue,
      dueDate: dueDate.toISOString().split('T')[0],
      createdAt: createdDate.toISOString().split('T')[0],
      ...getAlertContent(severity, isOverdue)
    };
    
    alerts.push(alert);
  }
  
  return alerts.sort((a, b) => {
    // Sort by overdue first, then by severity, then by due date
    if (a.isOverdue && !b.isOverdue) return -1;
    if (!a.isOverdue && b.isOverdue) return 1;
    
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
    if (severityDiff !== 0) return severityDiff;
    
    return new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime();
  });
};

function getAlertContent(severity: ComplianceAlert['severity'], isOverdue: boolean) {
  const alertTypes = {
    critical: [
      {
        title: 'Critical Non-Conformance',
        description: 'Major deviation from quality system requirements detected'
      },
      {
        title: 'Safety Issue Reported',
        description: 'Serious adverse event requires immediate investigation'
      },
      {
        title: 'Regulatory Deadline Missed',
        description: 'Critical regulatory submission deadline has passed'
      }
    ],
    high: [
      {
        title: 'Design Control Review Overdue',
        description: 'Design history file review for critical project is overdue'
      },
      {
        title: 'Supplier Audit Required',
        description: 'Critical supplier requires immediate audit due to quality issues'
      },
      {
        title: 'CAPA Implementation Delayed',
        description: 'High-priority corrective action implementation behind schedule'
      }
    ],
    medium: [
      {
        title: 'CAPA Response Due Soon',
        description: 'Corrective action response required for audit finding'
      },
      {
        title: 'Training Records Review',
        description: 'Quarterly training effectiveness review scheduled'
      },
      {
        title: 'Document Review Pending',
        description: 'Quality manual revision awaiting final approval'
      },
      {
        title: 'Post-Market Surveillance Report',
        description: 'Quarterly surveillance report preparation needed'
      }
    ],
    low: [
      {
        title: 'Training Records Missing',
        description: 'Quality training records incomplete for staff members'
      },
      {
        title: 'Routine Calibration Due',
        description: 'Measurement equipment requires routine calibration'
      },
      {
        title: 'Document Update Available',
        description: 'New regulatory guidance available for review'
      },
      {
        title: 'Internal Audit Scheduling',
        description: 'Next quarter internal audit schedule needs finalization'
      }
    ]
  };
  
  const options = alertTypes[severity];
  const selected = options[Math.floor(Math.random() * options.length)];
  
  return {
    title: isOverdue ? `${selected.title} - OVERDUE` : selected.title,
    description: selected.description
  };
}

// Utility function to get a fresh set of sample data
export const getRandomSampleData = () => ({
  activities: generateSampleActivities(15),
  alerts: generateSampleAlerts(6)
});