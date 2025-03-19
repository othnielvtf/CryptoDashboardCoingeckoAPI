// Core domain model for cryptocurrency data
export interface CryptoModel {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  priceChangePercentage1h: number;
  priceChangePercentage7d: number;
  priceChangePercentage30d: number;
  marketCap: number;
  totalVolume: number;
}
