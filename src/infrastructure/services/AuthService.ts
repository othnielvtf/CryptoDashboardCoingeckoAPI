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

  // Dispatch auth state change event
  private dispatchAuthStateChange() {
    window.dispatchEvent(new CustomEvent(this.AUTH_STATE_CHANGE_EVENT));
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
          
          // Save to localStorage
          localStorage.setItem(this.STORAGE_KEY_USERNAME, username);
          localStorage.setItem(this.STORAGE_KEY_IS_LOGGED_IN, 'true');
          
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
    localStorage.removeItem(this.STORAGE_KEY_USERNAME);
    localStorage.removeItem(this.STORAGE_KEY_IS_LOGGED_IN);
    
    // Notify subscribers about auth state change
    this.dispatchAuthStateChange();
  }
  
  getCurrentUser(): UserModel | null {
    const username = localStorage.getItem(this.STORAGE_KEY_USERNAME);
    const isLoggedIn = localStorage.getItem(this.STORAGE_KEY_IS_LOGGED_IN) === 'true';
    
    if (username && isLoggedIn) {
      return {
        username,
        isLoggedIn
      };
    }
    
    return null;
  }
  
  isAuthenticated(): boolean {
    return localStorage.getItem(this.STORAGE_KEY_IS_LOGGED_IN) === 'true';
  }
}
