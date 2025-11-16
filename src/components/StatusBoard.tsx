'use client';

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { Deal, DealStage, DEAL_STAGES } from '@/types/deal';
import { StageColumn } from './StageColumn';
import { DealCard } from './DealCard';

interface StatusBoardProps {
  deals: Deal[];
  onEditDeal: (deal: Deal) => void;
  onDeleteDeal: (id: string) => void;
  onMoveDeal: (id: string, newStage: DealStage) => void;
}

export function StatusBoard({ deals, onEditDeal, onDeleteDeal, onMoveDeal }: StatusBoardProps) {
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getDealsByStage = (stage: DealStage) => {
    return deals
      .filter((d) => d.stage === stage)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const deal = deals.find((d) => d.id === active.id);
    if (deal) {
      setActiveDeal(deal);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDeal(null);

    if (!over) return;

    const dealId = active.id as string;
    const newStage = over.id as DealStage;

    // Check if we dropped over a valid stage column
    const isValidStage = DEAL_STAGES.some((s) => s.key === newStage);
    if (!isValidStage) return;

    // Find the deal and check if it's actually moving to a different stage
    const deal = deals.find((d) => d.id === dealId);
    if (deal && deal.stage !== newStage) {
      onMoveDeal(dealId, newStage);
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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

      <DragOverlay>
        {activeDeal ? (
          <div className="rotate-3 opacity-90">
            <DealCard deal={activeDeal} onEdit={() => {}} onDelete={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
