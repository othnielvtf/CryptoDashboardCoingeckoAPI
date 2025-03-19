
import LoginPage from './presentation/pages/LoginPage';
import DashboardPage from './presentation/pages/DashboardPage';
import { useAuth } from './presentation/hooks/useAuth';

/**
 * Main App component using clean architecture
 * 
 * This component serves as the entry point for our application and manages
 * the authentication state to determine which page to display.
 */

function App() {
  const { isAuthenticated, logout } = useAuth();

  return isAuthenticated ? (
    <DashboardPage onLogout={logout} />
  ) : (
    <LoginPage onLoginSuccess={() => {}} />
  );


}

export default App;