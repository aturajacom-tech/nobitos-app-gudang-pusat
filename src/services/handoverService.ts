import { api } from './api';
import { Handover } from '../types';

export interface PaginatedResponse<T> {
  status: string;
  data: T[];
  total_pages: number;
}

export const handoverService = {
  getHandovers: async (page = 1, limit = 50): Promise<PaginatedResponse<Handover>> => {
    const response = await api.get<PaginatedResponse<Handover>>('/handovers', {
      params: { page, limit }
    });
    return response.data.data ? response.data : response.data;
  },

  verifyHandover: async (id: string, pin: string): Promise<Handover> => {
    const response = await api.post<any>(`/handovers/${id}/verify`, { pin });
    return response.data.data;
  }
};
