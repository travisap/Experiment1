'use client';

import { useDroppable } from '@dnd-kit/core';
import { Deal, DealStage, DEAL_STAGES } from '@/types/deal';
import { DraggableDealCard } from './DraggableDealCard';

interface StageColumnProps {
  stage: DealStage;
  deals: Deal[];
  onEditDeal: (deal: Deal) => void;
  onDeleteDeal: (id: string) => void;
  onMoveDeal: (id: string, newStage: DealStage) => void;
}

export function StageColumn({ stage, deals, onEditDeal, onDeleteDeal, onMoveDeal }: StageColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: stage,
  });

  const stageInfo = DEAL_STAGES.find((s) => s.key === stage)!;
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex flex-col min-w-[280px] max-w-[280px]">
      <div className={`${stageInfo.color} rounded-t-lg p-3 border-b border-gray-200 dark:border-gray-700`}>
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200">{stageInfo.label}</h2>
          <span className="bg-white dark:bg-gray-700 px-2 py-1 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
            {deals.length}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{formatCurrency(totalValue)}</p>
      </div>

      <div
        ref={setNodeRef}
        className={`bg-gray-50 dark:bg-gray-900 rounded-b-lg p-3 flex-1 min-h-[400px] space-y-3 overflow-y-auto transition-colors ${
          isOver ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-400 ring-inset' : ''
        }`}
      >
        {deals.length === 0 ? (
          <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
            {isOver ? 'Drop here' : 'No deals in this stage'}
          </div>
        ) : (
          deals.map((deal) => (
            <DraggableDealCard
              key={deal.id}
              deal={deal}
              onEdit={onEditDeal}
              onDelete={onDeleteDeal}
            />
          ))
        )}
      </div>
    </div>
  );
}
