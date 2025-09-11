import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, MessageCircle, ClipboardCheck, TrendUp, AlertTriangle, Activity, Calendar, CheckCircle, Clock, XCircle, RefreshCw } from '@phosphor-icons/react';
import { regulatoryStandards } from '@/data/standards';
import { 
  complianceMetrics, 
  complianceAlerts, 
  recentActivity, 
  standardsCompliance, 
  getComplianceScoreColor, 
  getStatusColor, 
  getSeverityColor 
} from '@/data/complianceData';
import { generateSampleActivities, generateSampleAlerts } from '@/data/sampleDataGenerator';
import { useState } from 'react';
import { toast } from 'sonner';

interface DashboardProps {
  onNavigate: (page: string, params?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [dynamicAlerts, setDynamicAlerts] = useState(complianceAlerts);
  const [dynamicActivity, setDynamicActivity] = useState(recentActivity);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const refreshSampleData = () => {
    const newData = {
      alerts: generateSampleAlerts(6),
      activities: generateSampleActivities(10)
    };
    setDynamicAlerts(newData.alerts);
    setDynamicActivity(newData.activities);
    toast.success('Sample data refreshed');
  };

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
        <div className="flex justify-center">
          <Button variant="outline" onClick={refreshSampleData} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Sample Data
          </Button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Compliance Overview</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Overall Score
                </CardTitle>
                <TrendUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className={`text-3xl font-bold ${getComplianceScoreColor(complianceMetrics.overallScore)}`}>
                  {complianceMetrics.overallScore}%
                </div>
                <Progress value={complianceMetrics.overallScore} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Compliant
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {complianceMetrics.compliantRequirements}
              </div>
              <p className="text-xs text-muted-foreground">
                of {complianceMetrics.totalRequirements} requirements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  In Progress
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {complianceMetrics.inProgressRequirements}
              </div>
              <p className="text-xs text-muted-foreground">
                requirements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Non-Compliant
                </CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {complianceMetrics.nonCompliantRequirements}
              </div>
              <p className="text-xs text-muted-foreground">
                requirements
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alerts and Activity Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Compliance Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <CardTitle>Compliance Alerts</CardTitle>
            </div>
            <CardDescription>
              Items requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dynamicAlerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'critical' ? 'bg-red-700' :
                  alert.severity === 'high' ? 'bg-red-600' :
                  alert.severity === 'medium' ? 'bg-yellow-600' : 'bg-blue-600'
                }`} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm leading-tight">{alert.title}</h4>
                    {alert.isOverdue && (
                      <Badge variant="destructive" className="text-xs">Overdue</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{alert.standard}</span>
                    {alert.dueDate && (
                      <>
                        <span>•</span>
                        <span>Due {formatDate(alert.dueDate)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
            <CardDescription>
              Latest compliance activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dynamicActivity.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-1.5 rounded-lg ${
                  activity.type === 'audit' ? 'bg-purple-100' :
                  activity.type === 'finding' ? 'bg-green-100' :
                  activity.type === 'review' ? 'bg-blue-100' :
                  activity.type === 'training' ? 'bg-orange-100' : 'bg-gray-100'
                }`}>
                  {activity.type === 'audit' && <ClipboardCheck className="h-3 w-3 text-purple-600" />}
                  {activity.type === 'finding' && <CheckCircle className="h-3 w-3 text-green-600" />}
                  {activity.type === 'review' && <BookOpen className="h-3 w-3 text-blue-600" />}
                  {activity.type === 'training' && <TrendUp className="h-3 w-3 text-orange-600" />}
                  {activity.type === 'update' && <Activity className="h-3 w-3 text-gray-600" />}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium text-sm leading-tight">{activity.title}</h4>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{formatDateTime(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Standards Compliance Status */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Standards Compliance Status</h2>
        <div className="grid gap-4">
          {standardsCompliance.map((standard) => (
            <Card key={standard.standardId}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{standard.standardName}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        standard.status === 'compliant' ? 'default' :
                        standard.status === 'in-progress' ? 'secondary' : 'destructive'
                      }>
                        {standard.status.replace('-', ' ')}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Last reviewed {formatDate(standard.lastReview)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getComplianceScoreColor(standard.completionPercentage)}`}>
                      {standard.completionPercentage}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {standard.requirementsMet}/{standard.totalRequirements} requirements
                    </div>
                  </div>
                </div>
                <Progress value={standard.completionPercentage} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Actions</h2>
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