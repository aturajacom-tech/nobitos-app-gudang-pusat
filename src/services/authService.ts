import { api } from './api';
import { AuthResponse, User } from '../types';

export const authService = {
  login: async (credentials: any): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },
  register: async (userData: any): Promise<void> => {
    await api.post('/auth/register', userData);
  },
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error', error);
    }
  }
};
