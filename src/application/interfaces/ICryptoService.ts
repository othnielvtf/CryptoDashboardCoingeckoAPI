import { CryptoModel } from '../../core/models/CryptoModel';

// Interface for crypto service
export interface ICryptoService {
  fetchCryptoData(): Promise<CryptoModel[]>;
}
