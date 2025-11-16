import { Deal } from '@/types/deal';

const STORAGE_KEY = 'deal-flow-deals';

export const storage = {
  getDeals: (): Deal[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveDeals: (deals: Deal[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
  },

  addDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Deal => {
    const deals = storage.getDeals();
    const newDeal: Deal = {
      ...deal,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storage.saveDeals([...deals, newDeal]);
    return newDeal;
  },

  updateDeal: (id: string, updates: Partial<Omit<Deal, 'id' | 'createdAt'>>): Deal | null => {
    const deals = storage.getDeals();
    const index = deals.findIndex((d) => d.id === id);
    if (index === -1) return null;

    const updatedDeal: Deal = {
      ...deals[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    deals[index] = updatedDeal;
    storage.saveDeals(deals);
    return updatedDeal;
  },

  deleteDeal: (id: string): boolean => {
    const deals = storage.getDeals();
    const filtered = deals.filter((d) => d.id !== id);
    if (filtered.length === deals.length) return false;
    storage.saveDeals(filtered);
    return true;
  },
};
