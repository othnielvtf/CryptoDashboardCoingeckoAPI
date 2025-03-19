import { ICryptoService } from '../../application/interfaces/ICryptoService';
import { CryptoModel } from '../../core/models/CryptoModel';

// Implementation of ICryptoService
export class CryptoService implements ICryptoService {
  private readonly API_KEY = import.meta.env.VITE_API_KEY;
  private readonly CRYPTO_IDS = ['bitcoin', 'ethereum', 'solana', 'hyperliquid'];
  
  async fetchCryptoData(): Promise<CryptoModel[]> {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${this.CRYPTO_IDS.join(',')}&order=market_cap_desc&sparkline=false&price_change_percentage=1h,24h,7d,30d`,
        {
          headers: {
            'x-cg-demo-api-key': this.API_KEY
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }
      
      const data = await response.json();
      
      // Map API response to our domain model
      return data.map((item: any): CryptoModel => ({
        id: item.id,
        symbol: item.symbol,
        name: item.name,
        image: item.image,
        currentPrice: item.current_price,
        priceChangePercentage24h: item.price_change_percentage_24h,
        priceChangePercentage1h: item.price_change_percentage_1h_in_currency,
        priceChangePercentage7d: item.price_change_percentage_7d_in_currency,
        priceChangePercentage30d: item.price_change_percentage_30d_in_currency,
        marketCap: item.market_cap,
        totalVolume: item.total_volume
      }));
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      throw error;
    }
  }
}
