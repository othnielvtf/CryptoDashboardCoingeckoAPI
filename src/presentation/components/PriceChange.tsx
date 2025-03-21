import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceChangeProps {
  value: number;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value }) => (
  <div
    className={`flex items-center gap-1 ${
      value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
    } transition-colors duration-200`}
  >
    {value >= 0 ? (
      <TrendingUp className="w-4 h-4" />
    ) : (
      <TrendingDown className="w-4 h-4" />
    )}
    <span className="font-medium">{Math.abs(value).toFixed(2)}%</span>
  </div>
);

export default PriceChange;
