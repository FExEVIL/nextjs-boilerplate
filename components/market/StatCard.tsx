import React from 'react';
import { Card } from '../ui/Card';
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  percentChange: number;
  isCurrency?: boolean;
}

export function StatCard({
  title,
  value,
  change,
  percentChange,
  isCurrency = true,
}: StatCardProps) {
  const isPositive = change >= 0;
  const colorClass = getChangeColor(change);

  return (
    <Card>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">
          {isCurrency ? formatCurrency(value) : value.toFixed(2)}
        </p>
        <div className={`flex items-center gap-2 ${colorClass}`}>
          <span className="text-lg font-medium">{isPositive ? '▲' : '▼'}</span>
          <span className="text-sm font-medium">
            {formatCurrency(Math.abs(change))} ({formatPercentage(percentChange)})
          </span>
        </div>
      </div>
    </Card>
  );
}
