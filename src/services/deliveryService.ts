import { api } from './api';
import { DeliveryOrder } from '../types';

export interface PaginatedResponse<T> {
  status: string;
  data: T[];
  total_pages: number;
  page: number;
  total: number;
}

export const deliveryService = {
  getDeliveries: async (page = 1, limit = 10, search = ''): Promise<PaginatedResponse<DeliveryOrder>> => {
    const response = await api.get<PaginatedResponse<DeliveryOrder>>('/delivery-orders', {
      params: { page, limit, search }
    });
    return response.data.data ? response.data : response.data;
  },

  createDelivery: async (data: Partial<DeliveryOrder>): Promise<DeliveryOrder> => {
    const response = await api.post<any>('/delivery-orders', data);
    return response.data.data;
  },

  updateStatus: async (id: string, status: string): Promise<DeliveryOrder> => {
    const response = await api.put<any>(`/delivery-orders/${id}/status`, { status });
    return response.data.data;
  }
};
