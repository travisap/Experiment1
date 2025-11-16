'use client';

import { useState } from 'react';
import { useDeals } from '@/hooks/useDeals';
import { StatusBoard } from '@/components/StatusBoard';
import { DealModal } from '@/components/DealModal';
import { Deal } from '@/types/deal';
import { useTheme } from '@/components/ThemeProvider';

export default function Home() {
  const { deals, isLoading, addDeal, updateDeal, deleteDeal, moveDeal } = useDeals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const { theme, toggleTheme } = useTheme();

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
        <div className="text-gray-500 dark:text-gray-400">Loading deals...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Deal Flow</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage and monitor your sales pipeline
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

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
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-full mx-auto px-6 py-3">
          <div className="flex gap-8">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Deals</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{deals.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Deals</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{activeDeals}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pipeline Value</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">{formatCurrency(totalValue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Board */}
      <main className="max-w-full mx-auto px-6 py-6">
        {deals.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No deals yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Get started by adding your first deal</p>
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
