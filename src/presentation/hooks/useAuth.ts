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
    // Initial state
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsAuthenticated(authService.isAuthenticated());
    setIsLoading(false);
    
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
      setIsLoading(false);
      return user;
    } catch (error) {
      setIsLoading(false);
      throw error;
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
