import { IAuthService } from '../../application/interfaces/IAuthService';
import { UserModel } from '../../core/models/UserModel';

// Implementation of IAuthService using localStorage
export class AuthService implements IAuthService {
  // Access environment variables with fallbacks
  private readonly VALID_USERNAME = import.meta.env.VITE_VALID_USERNAME;
  private readonly VALID_PASSWORD = import.meta.env.VITE_VALID_PASSWORD;
  private readonly STORAGE_KEY_USERNAME = 'username';
  private readonly STORAGE_KEY_IS_LOGGED_IN = 'isLoggedIn';
  
  constructor() {
    console.log('AuthService initialized with:', {
      username: this.VALID_USERNAME,
      password: this.VALID_PASSWORD ? '***' : 'not set',
      envVars: {
        VITE_VALID_USERNAME: import.meta.env.VITE_VALID_USERNAME || 'not set',
        VITE_VALID_PASSWORD: import.meta.env.VITE_VALID_PASSWORD ? 'set' : 'not set'
      }
    });
  }
  
  // Custom event for auth state changes
  private readonly AUTH_STATE_CHANGE_EVENT = 'auth-state-change';
  private readonly SESSION_STORAGE_KEY = 'auth_session';

  // Dispatch auth state change event
  private dispatchAuthStateChange() {
    window.dispatchEvent(new CustomEvent(this.AUTH_STATE_CHANGE_EVENT));
  }
  
  // Save session state to sessionStorage (persists across page refreshes but not tabs/windows)
  private saveSessionState(user: UserModel) {
    sessionStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(user));
  }
  
  // Clear session state
  private clearSessionState() {
    sessionStorage.removeItem(this.SESSION_STORAGE_KEY);
  }
  
  // Get session state
  private getSessionState(): UserModel | null {
    const sessionData = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    if (sessionData) {
      try {
        return JSON.parse(sessionData) as UserModel;
      } catch (e) {
        console.error('Failed to parse session data:', e);
        return null;
      }
    }
    return null;
  }

  // Subscribe to auth state changes
  public onAuthStateChange(callback: () => void) {
    window.addEventListener(this.AUTH_STATE_CHANGE_EVENT, callback);
    return () => window.removeEventListener(this.AUTH_STATE_CHANGE_EVENT, callback);
  }

  async login(username: string, password: string): Promise<UserModel> {
    // Log login attempt details
    console.log('Login attempt with:', { 
      inputUsername: username, 
      expectedUsername: this.VALID_USERNAME,
      usernameMatch: username === this.VALID_USERNAME,
      passwordMatch: password === this.VALID_PASSWORD
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
          const user: UserModel = {
            username,
            isLoggedIn: true
          };
          
          // Save to localStorage for long-term persistence
          localStorage.setItem(this.STORAGE_KEY_USERNAME, username);
          localStorage.setItem(this.STORAGE_KEY_IS_LOGGED_IN, 'true');
          
          // Save to sessionStorage for session persistence
          this.saveSessionState(user);
          
          // Notify subscribers about auth state change
          this.dispatchAuthStateChange();
          
          resolve(user);
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 800);
    });
  }
  
  logout(): void {
    // Clear localStorage
    localStorage.removeItem(this.STORAGE_KEY_USERNAME);
    localStorage.removeItem(this.STORAGE_KEY_IS_LOGGED_IN);
    
    // Clear sessionStorage
    this.clearSessionState();
    
    // Notify subscribers about auth state change
    this.dispatchAuthStateChange();
  }
  
  getCurrentUser(): UserModel | null {
    // First try to get from session storage (for current tab persistence)
    const sessionUser = this.getSessionState();
    if (sessionUser) {
      return sessionUser;
    }
    
    // Fall back to localStorage (for cross-tab persistence)
    const username = localStorage.getItem(this.STORAGE_KEY_USERNAME);
    const isLoggedIn = localStorage.getItem(this.STORAGE_KEY_IS_LOGGED_IN) === 'true';
    
    if (username && isLoggedIn) {
      const user = {
        username,
        isLoggedIn
      };
      
      // Update session storage for future use
      this.saveSessionState(user);
      
      return user;
    }
    
    return null;
  }
  
  isAuthenticated(): boolean {
    // First check session storage
    if (this.getSessionState()?.isLoggedIn) {
      return true;
    }
    
    // Then check localStorage
    return localStorage.getItem(this.STORAGE_KEY_IS_LOGGED_IN) === 'true';
  }
}
