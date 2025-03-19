import { IAuthService } from '../../application/interfaces/IAuthService';
import { UserModel } from '../../core/models/UserModel';

// Implementation of IAuthService using localStorage
export class AuthService implements IAuthService {
  private readonly VALID_USERNAME = import.meta.env.VITE_VALID_USERNAME;
  private readonly VALID_PASSWORD = import.meta.env.VITE_VALID_PASSWORD;
  private readonly STORAGE_KEY_USERNAME = 'username';
  private readonly STORAGE_KEY_IS_LOGGED_IN = 'isLoggedIn';
  
  async login(username: string, password: string): Promise<UserModel> {
    // Simulate API call with a delay
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
