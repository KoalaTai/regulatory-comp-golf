import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, MessageCircle, ClipboardCheck } from '@phosphor-icons/react';
import { regulatoryStandards } from '@/data/standards';

interface DashboardProps {
  onNavigate: (page: string, params?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Regulatory Compliance Assistant
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Navigate medical device regulations with AI-powered guidance and comprehensive regulatory knowledge.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => onNavigate('knowledge-browser')}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Knowledge Browser</CardTitle>
                <CardDescription>
                  Explore regulatory standards
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Browse FDA QSR, ISO 13485, EU MDR, and other medical device regulations with advanced search and citation tools.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onNavigate('compliance-assistant')}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <MessageCircle className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>
                  Get compliance guidance
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ask questions about regulatory requirements and receive expert-level guidance with proper citations.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onNavigate('audit-simulations')}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/50 rounded-lg">
                <ClipboardCheck className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <CardTitle>Audit Simulations</CardTitle>
                <CardDescription>
                  Practice audit scenarios
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Develop audit skills through realistic compliance scenarios and structured finding documentation.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Regulatory Standards Overview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Regulatory Standards</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regulatoryStandards.map((standard) => (
            <Card key={standard.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base leading-tight">
                      {standard.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        standard.category === 'fda' ? 'default' :
                        standard.category === 'iso' ? 'secondary' : 'outline'
                      }>
                        {standard.authority}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">
                  {standard.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {standard.sections.length} sections
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onNavigate('knowledge-browser', { standardId: standard.id })}
                  >
                    Browse
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}