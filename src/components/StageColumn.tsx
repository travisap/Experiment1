'use client';

import { Deal, DealStage, DEAL_STAGES } from '@/types/deal';
import { DealCard } from './DealCard';

interface StageColumnProps {
  stage: DealStage;
  deals: Deal[];
  onEditDeal: (deal: Deal) => void;
  onDeleteDeal: (id: string) => void;
  onMoveDeal: (id: string, newStage: DealStage) => void;
}

export function StageColumn({ stage, deals, onEditDeal, onDeleteDeal, onMoveDeal }: StageColumnProps) {
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

  const getNextStages = (): DealStage[] => {
    const currentIndex = DEAL_STAGES.findIndex((s) => s.key === stage);
    return DEAL_STAGES.filter((_, i) => i !== currentIndex).map((s) => s.key);
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

      <div className="bg-gray-50 dark:bg-gray-900 rounded-b-lg p-3 flex-1 min-h-[400px] space-y-3 overflow-y-auto">
        {deals.length === 0 ? (
          <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
            No deals in this stage
          </div>
        ) : (
          deals.map((deal) => (
            <div key={deal.id} className="relative group">
              <DealCard deal={deal} onEdit={onEditDeal} onDelete={onDeleteDeal} />

              {/* Move buttons */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-1 flex gap-1 border dark:border-gray-700">
                  {getNextStages().map((nextStage) => {
                    const nextInfo = DEAL_STAGES.find((s) => s.key === nextStage)!;
                    return (
                      <button
                        key={nextStage}
                        onClick={() => onMoveDeal(deal.id, nextStage)}
                        className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap"
                        title={`Move to ${nextInfo.label}`}
                      >
                        → {nextInfo.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
