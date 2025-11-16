'use client';

import { useState, useEffect } from 'react';
import { Deal, DealStage } from '@/types/deal';
import { storage } from '@/lib/storage';

export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDeals(storage.getDeals());
    setIsLoading(false);
  }, []);

  const addDeal = (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDeal = storage.addDeal(deal);
    setDeals((prev) => [...prev, newDeal]);
    return newDeal;
  };

  const updateDeal = (id: string, updates: Partial<Omit<Deal, 'id' | 'createdAt'>>) => {
    const updatedDeal = storage.updateDeal(id, updates);
    if (updatedDeal) {
      setDeals((prev) => prev.map((d) => (d.id === id ? updatedDeal : d)));
    }
    return updatedDeal;
  };

  const deleteDeal = (id: string) => {
    const success = storage.deleteDeal(id);
    if (success) {
      setDeals((prev) => prev.filter((d) => d.id !== id));
    }
    return success;
  };

  const moveDeal = (id: string, newStage: DealStage) => {
    return updateDeal(id, { stage: newStage });
  };

  const getDealsByStage = (stage: DealStage) => {
    return deals.filter((d) => d.stage === stage);
  };

  return {
    deals,
    isLoading,
    addDeal,
    updateDeal,
    deleteDeal,
    moveDeal,
    getDealsByStage,
  };
}
