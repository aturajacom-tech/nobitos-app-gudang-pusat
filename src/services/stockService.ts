import { api } from './api';
import { StockItem, StockHistory, PaginatedResponse } from '../types';

export const stockService = {
  getCurrentStock: async (page = 1, limit = 50, search = ''): Promise<PaginatedResponse<StockItem>> => {
    const response = await api.get<PaginatedResponse<StockItem>>('/stock/current', {
      params: { page, limit, search }
    });
    return response.data;
  },
  getStockHistory: async (page = 1, limit = 50): Promise<PaginatedResponse<StockHistory>> => {
    const response = await api.get<PaginatedResponse<StockHistory>>('/stock/history', {
      params: { page, limit }
    });
    return response.data;
  }
};
