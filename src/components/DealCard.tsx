'use client';

import { Deal } from '@/types/deal';

interface DealCardProps {
  deal: Deal;
  onEdit: (deal: Deal) => void;
  onDelete: (id: string) => void;
}

export function DealCard({ deal, onEdit, onDelete }: DealCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate flex-1">
          {deal.title}
        </h3>
        <div className="flex gap-1 ml-2">
          <button
            onClick={() => onEdit(deal)}
            className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Edit deal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(deal.id)}
            className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Delete deal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">{deal.company}</p>

      {(deal.city || deal.state) && (
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">
          {[deal.city, deal.state].filter(Boolean).join(', ')}
        </p>
      )}

      {deal.industry && (
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">
          {deal.industry}
        </p>
      )}

      <div className="space-y-1 mb-2">
        {deal.revenue && (
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Revenue:</span>
            <span className="text-gray-700 dark:text-gray-300">{formatCurrency(deal.revenue)}</span>
          </div>
        )}
        {deal.earnings && (
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Earnings:</span>
            <span className="text-gray-700 dark:text-gray-300">{formatCurrency(deal.earnings)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-600 dark:text-green-400">
          {formatCurrency(deal.askingPrice)}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {formatDate(deal.updatedAt)}
        </span>
      </div>

      {deal.source && (
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          Source: {deal.source}
        </p>
      )}

      {deal.notes && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{deal.notes}</p>
      )}
    </div>
  );
}
