

import LoginPage from './presentation/pages/LoginPage';
import DashboardPage from './presentation/pages/DashboardPage';
import ThemeToggle from './presentation/components/ThemeToggle';
import { ThemeProvider } from './presentation/contexts/ThemeContext';
import { useAuth } from './presentation/hooks/useAuth';

/**
 * Main App component using clean architecture
 * 
 * This component serves as the entry point for our application and manages
 * the authentication state to determine which page to display.
 */

function App() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  console.log('App rendering, isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        {isLoading ? (
          // Show loading state
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : isAuthenticated ? (
          <DashboardPage onLogout={logout} />
        ) : (
          <LoginPage onLoginSuccess={() => console.log('Login successful')} />
        )}
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );


}

export default App;