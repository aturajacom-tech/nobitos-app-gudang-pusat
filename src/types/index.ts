export type Role = 'office_staff' | 'warehouse_staff';

export interface User {
  id: string;
  email: string;
  full_name: string;
  organization: string;
  role: Role;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type POStatus = 'draft' | 'sent' | 'confirmed' | 'completed';

export interface POItem {
  id: string;
  item_name: string;
  sku: string;
  quantity: number;
  unit_price: number;
}

export interface PurchaseOrder {
  id: string;
  po_number: string;
  supplier_name: string;
  status: POStatus;
  created_at: string;
  expected_delivery_date?: string;
  items: POItem[];
  total_amount: number;
}

export interface StockItem {
  id: string;
  item_name: string;
  sku: string;
  current_quantity: number;
  minimum_quantity: number;
  location: string;
}

export interface StockHistory {
  id: string;
  item_name: string;
  sku: string;
  change_amount: number;
  previous_quantity: number;
  new_quantity: number;
  reason: string;
  created_at: string;
  created_by: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
