import { useState, useEffect, useCallback } from 'react';
import { AuthService } from '../../infrastructure/services/AuthService';
import { UserModel } from '../../core/models/UserModel';

export const useAuth = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const authService = new AuthService();
  
  // Initialize auth state
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsAuthenticated(authService.isAuthenticated());
    setIsLoading(false);
  }, []);
  
  // Login function
  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await authService.login(username, password);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
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
