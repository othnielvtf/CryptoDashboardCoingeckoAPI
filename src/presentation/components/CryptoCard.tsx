import React from 'react';
import { CryptoModel } from '../../core/models/CryptoModel';
import PriceChange from './PriceChange';
import { formatPrice, formatLargeNumber } from '../../infrastructure/utils/formatters';

interface CryptoCardProps {
  crypto: CryptoModel;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-4">
        <img
          src={crypto.image}
          alt={crypto.name}
          className="w-8 h-8"
        />
        <div>
          <h2 className="font-semibold text-gray-900">
            {crypto.name}
          </h2>
          <p className="text-sm text-gray-500 uppercase">
            {crypto.symbol}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Price</p>
          <p className="text-xl font-bold text-gray-900">
            {formatPrice(crypto.currentPrice)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <p className="text-xs text-gray-500">1h</p>
            <PriceChange value={crypto.priceChangePercentage1h} />
          </div>
          <div>
            <p className="text-xs text-gray-500">24h</p>
            <PriceChange value={crypto.priceChangePercentage24h} />
          </div>
          <div>
            <p className="text-xs text-gray-500">7d</p>
            <PriceChange value={crypto.priceChangePercentage7d} />
          </div>
          <div>
            <p className="text-xs text-gray-500">30d</p>
            <PriceChange value={crypto.priceChangePercentage30d} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm text-gray-500">Market Cap</p>
            <p className="font-medium text-gray-900">
              ${formatLargeNumber(crypto.marketCap)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Volume (24h)</p>
            <p className="font-medium text-gray-900">
              ${formatLargeNumber(crypto.totalVolume)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
