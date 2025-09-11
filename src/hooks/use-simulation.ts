import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';

export function useSimulation(id?: string) {
  const [simulations, setSimulations] = useKV('audit-simulations', []);
  
  const createSimulation = (simulation: Omit<any, 'id' | 'createdAt'>) => {
    const newSimulation = {
      ...simulation,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'draft' as const,
      findings: []
    };
    
    setSimulations((current: any[]) => [...current, newSimulation]);
    return newSimulation;
  };

  const updateSimulation = (id: string, updates: Partial<any>) => {
    setSimulations((current: any[]) => 
      current.map(sim => sim.id === id ? { ...sim, ...updates } : sim)
    );
  };

  const deleteSimulation = (id: string) => {
    setSimulations((current: any[]) => 
      current.filter(sim => sim.id !== id)
    );
  };

  const addFinding = (simulationId: string, finding: Omit<any, 'id'>) => {
    const newFinding = {
      ...finding,
      id: crypto.randomUUID()
    };
    
    setSimulations((current: any[]) => 
      current.map(sim => 
        sim.id === simulationId 
          ? { ...sim, findings: [...sim.findings, newFinding] }
          : sim
      )
    );
    
    return newFinding;
  };

  const simulation = id ? simulations.find((s: any) => s.id === id) : null;
  
  return {
    simulations,
    simulation,
    createSimulation,
    updateSimulation,
    deleteSimulation,
    addFinding
  };
}