import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  // Pre-fill credentials in development mode
  const defaultUsername = import.meta.env.DEV ? import.meta.env.VITE_VALID_USERNAME : '';
  const [username, setUsername] = useState(defaultUsername);
  const defaultPassword = import.meta.env.DEV ? import.meta.env.VITE_VALID_PASSWORD : '';
  const [password, setPassword] = useState(defaultPassword);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is already authenticated, calling onLoginSuccess');
      onLoginSuccess();
    }
  }, [isAuthenticated, onLoginSuccess]);
  
  // Log authentication state changes
  useEffect(() => {
    console.log('LoginPage auth state changed:', { isAuthenticated, loading });
  }, [isAuthenticated, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', { username });
      await login(username, password);
      console.log('Login successful in component');
      // The auth state change will trigger the useEffect
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 w-full max-w-md transition-colors duration-200">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6 transition-colors duration-200">Crypto Dashboard Login</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
              
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
          <p>Use the provided credentials to log in</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
