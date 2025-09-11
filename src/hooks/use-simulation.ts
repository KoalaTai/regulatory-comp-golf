import { useKV } from '@github/spark/hooks';
import type { AuditSimulation, AuditFinding } from '@/types';

export function useSimulation(id?: string) {
  const [simulations, setSimulations] = useKV<AuditSimulation[]>('audit-simulations', []);
  
  const createSimulation = (simulation: Omit<AuditSimulation, 'id' | 'createdAt' | 'status' | 'findings'>) => {
    const newSimulation: AuditSimulation = {
      ...simulation,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'draft' as const,
      findings: []
    };
    
    setSimulations((current) => [...current, newSimulation]);
    return newSimulation;
  };

  const updateSimulation = (id: string, updates: Partial<AuditSimulation>) => {
    setSimulations((current) => 
      current.map(sim => sim.id === id ? { ...sim, ...updates } : sim)
    );
  };

  const deleteSimulation = (id: string) => {
    setSimulations((current) => 
      current.filter(sim => sim.id !== id)
    );
  };

  const addFinding = (simulationId: string, finding: Omit<AuditFinding, 'id'>) => {
    const newFinding: AuditFinding = {
      ...finding,
      id: crypto.randomUUID()
    };
    
    setSimulations((current) => 
      current.map(sim => 
        sim.id === simulationId 
          ? { ...sim, findings: [...sim.findings, newFinding] }
          : sim
      )
    );
    
    return newFinding;
  };

  const simulation = id ? simulations.find((s) => s.id === id) : null;
  
  return {
    simulations,
    simulation,
    createSimulation,
    updateSimulation,
    deleteSimulation,
    addFinding
  };
}