import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, initializeTheme, applyTheme, storeTheme } from '../../infrastructure/utils/themeUtils';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with a default theme that will be immediately replaced in useEffect
  const [theme, setTheme] = useState<Theme>('light');
  
  // Initialize theme on client-side only
  useEffect(() => {
    // This runs once on component mount
    try {
      // Get and apply the initial theme
      const initialTheme = initializeTheme();
      console.log('ThemeProvider: Initial theme set to', initialTheme);
      setTheme(initialTheme);
    } catch (error) {
      console.error('ThemeProvider: Error initializing theme:', error);
    }
    
    // Add event listener for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      console.log('System preference changed to:', newTheme);
      setTheme(newTheme);
      applyTheme(newTheme);
      storeTheme(newTheme);
    };
    
    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    }
    
    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, []);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('ThemeProvider: Toggling theme from', theme, 'to', newTheme);
    
    // Update state
    setTheme(newTheme);
    
    // Apply the theme to the document
    applyTheme(newTheme);
    
    // Store the theme preference
    storeTheme(newTheme);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
