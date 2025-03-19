import React, { useState, useEffect } from 'react';
import { RefreshCw, Loader2, LogOut } from 'lucide-react';
import { CryptoModel } from '../../core/models/CryptoModel';
import { CryptoService } from '../../infrastructure/services/CryptoService';
import { AuthService } from '../../infrastructure/services/AuthService';
import CryptoCard from '../components/CryptoCard';

interface DashboardPageProps {
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [cryptoData, setCryptoData] = useState<CryptoModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const cryptoService = new CryptoService();
  const authService = new AuthService();
  const currentUser = authService.getCurrentUser();

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const data = await cryptoService.fetchCryptoData();
      setCryptoData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch crypto data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
        <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg shadow-sm">
          <p className="text-red-600 dark:text-red-300">{error}</p>
          <button
            onClick={fetchCryptoData}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 md:p-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Crypto Dashboard</h1>
            {currentUser && (
              <div className="text-sm text-gray-500 dark:text-gray-400 ml-2 transition-colors duration-200">
                Logged in as <span className="font-medium">{currentUser.username}</span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchCryptoData}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-sm hover:shadow-md transition-all"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <RefreshCw className="w-5 h-5" />
              )}
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all text-red-600 dark:text-red-400"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading && cryptoData.length === 0 ? (
            Array(4).fill(0).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-pulse transition-colors duration-200"
              >
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 transition-colors duration-200"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-2/3 transition-colors duration-200"></div>
              </div>
            ))
          ) : (
            cryptoData.map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
