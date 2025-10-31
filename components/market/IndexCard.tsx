import React from 'react';
import { MarketIndex } from '@/types';
import { formatNumber, formatPercentage, getChangeColor } from '@/lib/utils';

interface IndexCardProps {
  index: MarketIndex;
}

export function IndexCard({ index }: IndexCardProps) {
  const isPositive = index.change >= 0;
  const colorClass = getChangeColor(index.change);

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-600">{index.symbol}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{formatNumber(index.price)}</p>
        </div>
        <div className={`text-right ${colorClass}`}>
          <div className="flex items-center gap-1">
            <span className="text-lg">{isPositive ? '▲' : '▼'}</span>
            <span className="text-sm font-medium">{formatPercentage(index.percentChange)}</span>
          </div>
          <p className="text-xs mt-1">{formatNumber(Math.abs(index.change))}</p>
        </div>
      </div>
    </div>
  );
}
