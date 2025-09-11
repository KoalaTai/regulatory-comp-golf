import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, ClipboardText, AlertTriangle, CheckCircle, XCircle } from '@phosphor-icons/react';
import { useSimulation } from '@/hooks/use-simulation';
import { regulatoryStandards } from '@/data/standards';
import { toast } from 'sonner';
import type { AuditSimulation, AuditFinding } from '@/types';

interface AuditSimulationsProps {
  onNavigate: (page: string, params?: any) => void;
}

export function AuditSimulations({ onNavigate }: AuditSimulationsProps) {
  const { simulations, createSimulation, updateSimulation, deleteSimulation } = useSimulation();
  const [selectedSimulation, setSelectedSimulation] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleCreateSimulation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const standard = formData.get('standard') as string;

    if (!title || !standard) {
      toast.error('Please fill in all required fields');
      return;
    }

    const simulation = createSimulation({
      title,
      description,
      standard
    });

    toast.success('Simulation created successfully');
    setShowCreateDialog(false);
    setSelectedSimulation(simulation.id);
  };

  const simulation = selectedSimulation 
    ? simulations.find((s: AuditSimulation) => s.id === selectedSimulation)
    : null;

  if (simulation) {
    return (
      <SimulationDetail
        simulation={simulation}
        onBack={() => setSelectedSimulation(null)}
        onNavigate={onNavigate}
        updateSimulation={updateSimulation}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Audit Simulations</h1>
            <p className="text-muted-foreground">
              Practice audit scenarios and develop compliance skills
            </p>
          </div>
        </div>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Simulation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Audit Simulation</DialogTitle>
              <DialogDescription>
                Set up a new audit scenario to practice compliance procedures.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSimulation}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Quality System Audit - Medical Device Manufacturer"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Brief description of the audit scenario..."
                  />
                </div>
                <div>
                  <Label htmlFor="standard">Regulatory Standard</Label>
                  <Select name="standard" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a standard" />
                    </SelectTrigger>
                    <SelectContent>
                      {regulatoryStandards.map((standard) => (
                        <SelectItem key={standard.id} value={standard.id}>
                          {standard.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Simulation</Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {simulations.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-full w-fit mx-auto">
                <ClipboardText className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No simulations yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first audit simulation to start practicing compliance procedures.
                </p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Simulation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {simulations.map((sim: AuditSimulation) => {
            const standard = regulatoryStandards.find(s => s.id === sim.standard);
            return (
              <Card 
                key={sim.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedSimulation(sim.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg leading-tight">{sim.title}</CardTitle>
                      <CardDescription>{standard?.name}</CardDescription>
                    </div>
                    <Badge variant={
                      sim.status === 'completed' ? 'default' :
                      sim.status === 'active' ? 'secondary' : 'outline'
                    }>
                      {sim.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {sim.description && (
                    <p className="text-sm text-muted-foreground mb-3 overflow-hidden">
                      <span className="block truncate">
                        {sim.description}
                      </span>
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {sim.findings.length} findings
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(sim.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SimulationDetailProps {
  simulation: AuditSimulation;
  onBack: () => void;
  onNavigate: (page: string, params?: any) => void;
  updateSimulation: (id: string, updates: Partial<AuditSimulation>) => void;
}

function SimulationDetail({ simulation, onBack, updateSimulation }: SimulationDetailProps) {
  const { addFinding } = useSimulation(simulation.id);
  const [showAddFinding, setShowAddFinding] = useState(false);

  const standard = regulatoryStandards.find(s => s.id === simulation.standard);

  const handleAddFinding = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const severity = formData.get('severity') as 'minor' | 'major' | 'critical';
    const section = formData.get('section') as string;

    if (!title || !description || !severity || !section) {
      toast.error('Please fill in all required fields');
      return;
    }

    addFinding(simulation.id, {
      title,
      description,
      severity,
      section
    });

    toast.success('Finding added successfully');
    setShowAddFinding(false);
  };

  const handleStatusChange = (newStatus: AuditSimulation['status']) => {
    updateSimulation(simulation.id, { status: newStatus });
    toast.success(`Simulation ${newStatus}`);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'major': return <AlertTriangle className="h-4 w-4 text-accent" />;
      case 'minor': return <CheckCircle className="h-4 w-4 text-secondary-foreground" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to simulations
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{simulation.title}</h1>
            <p className="text-muted-foreground">{standard?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {simulation.status === 'draft' && (
            <Button onClick={() => handleStatusChange('active')}>
              Start Simulation
            </Button>
          )}
          {simulation.status === 'active' && (
            <Button onClick={() => handleStatusChange('completed')}>
              Complete Simulation
            </Button>
          )}
          <Badge variant={
            simulation.status === 'completed' ? 'default' :
            simulation.status === 'active' ? 'secondary' : 'outline'
          }>
            {simulation.status}
          </Badge>
        </div>
      </div>

      {simulation.description && (
        <Card>
          <CardHeader>
            <CardTitle>Scenario Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{simulation.description}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Audit Findings</h2>
        <Dialog open={showAddFinding} onOpenChange={setShowAddFinding}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Finding
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Audit Finding</DialogTitle>
              <DialogDescription>
                Document a new finding from your audit simulation.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddFinding}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Finding Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Missing documentation for design controls"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Detailed description of the finding..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="severity">Severity</Label>
                  <Select name="severity" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minor">Minor</SelectItem>
                      <SelectItem value="major">Major</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="section">Related Section</Label>
                  <Select name="section" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {standard?.sections.map((section) => (
                        <SelectItem key={section.id} value={section.id}>
                          {section.id} - {section.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowAddFinding(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Finding</Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {simulation.findings.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              No findings recorded yet. Start documenting audit findings as you progress through the simulation.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {simulation.findings.map((finding: AuditFinding) => (
            <Card key={finding.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {getSeverityIcon(finding.severity)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{finding.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {finding.section}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{finding.description}</p>
                  </div>
                  <Badge variant={
                    finding.severity === 'critical' ? 'destructive' :
                    finding.severity === 'major' ? 'secondary' : 'outline'
                  }>
                    {finding.severity}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}