'use client';

import { useState } from 'react';
import { useDeals } from '@/hooks/useDeals';
import { StatusBoard } from '@/components/StatusBoard';
import { DealModal } from '@/components/DealModal';
import { Deal } from '@/types/deal';

export default function Home() {
  const { deals, isLoading, addDeal, updateDeal, deleteDeal, moveDeal } = useDeals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  const handleAddDeal = () => {
    setEditingDeal(null);
    setIsModalOpen(true);
  };

  const handleEditDeal = (deal: Deal) => {
    setEditingDeal(deal);
    setIsModalOpen(true);
  };

  const handleDeleteDeal = (id: string) => {
    if (confirm('Are you sure you want to delete this deal?')) {
      deleteDeal(id);
    }
  };

  const handleSaveDeal = (dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingDeal) {
      updateDeal(editingDeal.id, dealData);
    } else {
      addDeal(dealData);
    }
  };

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const activeDeals = deals.filter(
    (d) => d.stage !== 'closed_won' && d.stage !== 'closed_lost'
  ).length;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading deals...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Deal Flow</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and monitor your sales pipeline
              </p>
            </div>

            <button
              onClick={handleAddDeal}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Deal
            </button>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white border-b">
        <div className="max-w-full mx-auto px-6 py-3">
          <div className="flex gap-8">
            <div>
              <p className="text-sm text-gray-500">Total Deals</p>
              <p className="text-lg font-semibold text-gray-900">{deals.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Deals</p>
              <p className="text-lg font-semibold text-gray-900">{activeDeals}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pipeline Value</p>
              <p className="text-lg font-semibold text-green-600">{formatCurrency(totalValue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Board */}
      <main className="max-w-full mx-auto px-6 py-6">
        {deals.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No deals yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first deal</p>
            <button
              onClick={handleAddDeal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add First Deal
            </button>
          </div>
        ) : (
          <StatusBoard
            deals={deals}
            onEditDeal={handleEditDeal}
            onDeleteDeal={handleDeleteDeal}
            onMoveDeal={moveDeal}
          />
        )}
      </main>

      {/* Modal */}
      <DealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDeal}
        deal={editingDeal}
      />
    </div>
  );
}
