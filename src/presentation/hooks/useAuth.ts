import { useState, useEffect, useCallback } from 'react';
import { AuthService } from '../../infrastructure/services/AuthService';
import { UserModel } from '../../core/models/UserModel';

export const useAuth = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const authService = new AuthService();
  
  // Initialize auth state and listen for changes
  useEffect(() => {
    // Set loading state while we check authentication
    setIsLoading(true);
    
    // Check if user is authenticated
    const checkAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        const isAuth = authService.isAuthenticated();
        
        console.log('Initial auth check:', { currentUser, isAuth });
        
        setUser(currentUser);
        setIsAuthenticated(isAuth);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        // Always set loading to false when done
        setIsLoading(false);
      }
    };
    
    // Run initial check
    checkAuth();
    
    // Subscribe to auth state changes
    const unsubscribe = authService.onAuthStateChange(() => {
      console.log('Auth state changed, updating hook state');
      const updatedUser = authService.getCurrentUser();
      setUser(updatedUser);
      setIsAuthenticated(authService.isAuthenticated());
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);
  
  // Login function
  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await authService.login(username, password);
      console.log('Login successful, updating state');
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Logout function
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);
  
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };
};
