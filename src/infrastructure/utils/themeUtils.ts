// Theme utility functions

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'app-theme';

/**
 * Get the current theme from localStorage or system preference
 */
export function getStoredTheme(): Theme {
  try {
    // Check localStorage first
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
      return storedTheme;
    }
    
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (error) {
    console.error('Error getting stored theme:', error);
    return 'light'; // Default to light if there's an error
  }
}

/**
 * Store the theme in localStorage
 */
export function storeTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.error('Error storing theme:', error);
  }
}

/**
 * Apply the theme to the document
 */
export function applyTheme(theme: Theme): void {
  try {
    // Remove both classes first
    document.documentElement.classList.remove('light', 'dark');
    
    // Add the current theme class
    document.documentElement.classList.add(theme);
    
    // Set data-theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    
    // Log for debugging
    console.log('Theme applied:', theme);
  } catch (error) {
    console.error('Error applying theme:', error);
  }
}

/**
 * Initialize theme on page load
 */
export function initializeTheme(): Theme {
  const theme = getStoredTheme();
  applyTheme(theme);
  return theme;
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(): Theme {
  const currentTheme = getStoredTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  applyTheme(newTheme);
  storeTheme(newTheme);
  
  return newTheme;
}
