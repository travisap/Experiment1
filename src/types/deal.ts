export type DealStage =
  | 'lead'
  | 'contacted'
  | 'proposal'
  | 'negotiation'
  | 'closed_won'
  | 'closed_lost';

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: DealStage;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export const DEAL_STAGES: { key: DealStage; label: string; color: string }[] = [
  { key: 'lead', label: 'Lead', color: 'bg-gray-100' },
  { key: 'contacted', label: 'Contacted', color: 'bg-blue-100' },
  { key: 'proposal', label: 'Proposal', color: 'bg-yellow-100' },
  { key: 'negotiation', label: 'Negotiation', color: 'bg-orange-100' },
  { key: 'closed_won', label: 'Closed Won', color: 'bg-green-100' },
  { key: 'closed_lost', label: 'Closed Lost', color: 'bg-red-100' },
];
