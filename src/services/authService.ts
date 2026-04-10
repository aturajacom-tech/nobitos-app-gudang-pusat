import { api } from './api';
import { AuthResponse, User } from '../types';

export const authService = {
  // Returns { token, user } ready for AuthContext.login()
  login: async (credentials: { email: string; password: string }): Promise<{ token: string; user: User }> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const data = response.data.data;
    return {
      token: data.token!,
      user: {
        id: data.user_id,
        email: data.email,
        full_name: data.full_name,
        role: data.role,
        organization_id: data.organization_id,
      },
    };
  },

  register: async (userData: { email: string; password: string; full_name: string; role: string }): Promise<void> => {
    await api.post('/auth/register', userData);
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore logout errors — token is cleared client-side anyway
    }
  },
};
