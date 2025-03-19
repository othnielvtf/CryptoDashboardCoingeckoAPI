import { UserModel } from '../../core/models/UserModel';

// Interface for authentication service
export interface IAuthService {
  login(username: string, password: string): Promise<UserModel>;
  logout(): void;
  getCurrentUser(): UserModel | null;
  isAuthenticated(): boolean;
}
