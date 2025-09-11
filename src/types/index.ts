export interface RegulatoryStandard {
  id: string;
  name: string;
  description: string;
  authority: string;
  category: 'fda' | 'iso' | 'eu' | 'other';
  sections: StandardSection[];
}

export interface StandardSection {
  id: string;
  title: string;
  content: string;
  subsections?: StandardSection[];
}

export interface Citation {
  standard: string;
  section: string;
  text: string;
  url?: string;
}

export interface AuditSimulation {
  id: string;
  title: string;
  description: string;
  standard: string;
  status: 'draft' | 'active' | 'completed';
  findings: AuditFinding[];
  createdAt: string;
}

export interface AuditFinding {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'major' | 'critical';
  section: string;
  evidence?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  timestamp: string;
}