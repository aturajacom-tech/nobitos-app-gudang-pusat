import { api } from './api';
import { PurchaseOrder, PaginatedResponse } from '../types';

export const poService = {
  getPOs: async (page = 1, limit = 10, search = ''): Promise<PaginatedResponse<PurchaseOrder>> => {
    const response = await api.get<PaginatedResponse<PurchaseOrder>>('/purchase-orders', {
      params: { page, limit, search }
    });
    return response.data;
  },
  getPODetail: async (id: string): Promise<PurchaseOrder> => {
    const response = await api.get<PurchaseOrder>(`/purchase-orders/${id}`);
    return response.data;
  },
  createPO: async (data: any): Promise<PurchaseOrder> => {
    const response = await api.post<PurchaseOrder>('/purchase-orders', data);
    return response.data;
  },
  confirmPO: async (id: string): Promise<PurchaseOrder> => {
    const response = await api.put<PurchaseOrder>(`/purchase-orders/${id}/confirm`);
    return response.data;
  }
};
