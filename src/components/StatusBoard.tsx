'use client';

import { Deal, DealStage, DEAL_STAGES } from '@/types/deal';
import { StageColumn } from './StageColumn';

interface StatusBoardProps {
  deals: Deal[];
  onEditDeal: (deal: Deal) => void;
  onDeleteDeal: (id: string) => void;
  onMoveDeal: (id: string, newStage: DealStage) => void;
}

export function StatusBoard({ deals, onEditDeal, onDeleteDeal, onMoveDeal }: StatusBoardProps) {
  const getDealsByStage = (stage: DealStage) => {
    return deals
      .filter((d) => d.stage === stage)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {DEAL_STAGES.map((stage) => (
        <StageColumn
          key={stage.key}
          stage={stage.key}
          deals={getDealsByStage(stage.key)}
          onEditDeal={onEditDeal}
          onDeleteDeal={onDeleteDeal}
          onMoveDeal={onMoveDeal}
        />
      ))}
    </div>
  );
}
