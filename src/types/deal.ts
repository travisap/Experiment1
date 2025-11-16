export type DealStage =
  | 'lead'
  | 'contacted'
  | 'indication_of_interest'
  | 'loi_submitted'
  | 'loi_signed'
  | 'closed_transaction'
  | 'non_active';

export interface Deal {
  id: string;
  title: string;
  company: string;
  askingPrice: number;
  stage: DealStage;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  city?: string;
  state?: string;
  industry?: string;
  revenue?: number;
  earnings?: number;
  source?: string;
}

export const DEAL_STAGES: { key: DealStage; label: string; color: string }[] = [
  { key: 'lead', label: 'Lead', color: 'bg-gray-100' },
  { key: 'contacted', label: 'Contacted', color: 'bg-blue-100' },
  { key: 'indication_of_interest', label: 'Indication of Interest', color: 'bg-yellow-100' },
  { key: 'loi_submitted', label: 'Letter of Intent Submitted', color: 'bg-orange-100' },
  { key: 'loi_signed', label: 'Letter of Intent Signed', color: 'bg-purple-100' },
  { key: 'closed_transaction', label: 'Closed Transaction', color: 'bg-green-100' },
  { key: 'non_active', label: 'Non-Active', color: 'bg-red-100' },
];
