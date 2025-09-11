import { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { KnowledgeBrowser } from '@/components/KnowledgeBrowser';
import { ComplianceAssistant } from '@/components/ComplianceAssistant';
import { AuditSimulations } from '@/components/AuditSimulations';
import { Toaster } from '@/components/ui/sonner';

type Page = 'dashboard' | 'knowledge-browser' | 'compliance-assistant' | 'audit-simulations';

interface NavigationState {
  page: Page;
  params?: any;
}

function App() {
  const [navigation, setNavigation] = useState<NavigationState>({ 
    page: 'dashboard' 
  });

  const handleNavigate = (page: string, params?: any) => {
    setNavigation({ page: page as Page, params });
  };

  const renderPage = () => {
    switch (navigation.page) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'knowledge-browser':
        return (
          <KnowledgeBrowser 
            onNavigate={handleNavigate}
            initialStandardId={navigation.params?.standardId}
          />
        );
      case 'compliance-assistant':
        return <ComplianceAssistant onNavigate={handleNavigate} />;
      case 'audit-simulations':
        return <AuditSimulations onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {renderPage()}
      </div>
      <Toaster />
    </div>
  );
}

export default App;