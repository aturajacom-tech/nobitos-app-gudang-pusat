// Role values must match backend DB enum exactly
export type Role = 'office_pusat' | 'gudang_pusat' | 'supplier' | 'kitchen_head' | 'kitchen_staff' | 'outlet_manager' | 'hq_management';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  organization_id?: string;
}

// Matches backend response: { status: 'success', data: { user_id, email, token, ... } }
export interface AuthResponse {
  status: string;
  data: {
    user_id: string;
    email: string;
    full_name: string;
    role: Role;
    organization_id?: string;
    token?: string;
    expires_in?: number;
    token_type?: string;
    created_at?: string;
  };
}

export type POStatus = 'draft' | 'sent' | 'confirmed' | 'partially_received' | 'completed' | 'cancelled';

export interface POItem {
  id: string;
  item_id: string;
  quantity: number;
  unit_price?: number;
  subtotal?: number;
  received_qty?: number;
}

export interface PurchaseOrder {
  id: string;
  po_number: string;
  supplier_id: string;
  status: POStatus;
  total_amount?: number;
  created_by: string;
  confirmed_at?: string;
  created_at: string;
  updated_at: string;
  items?: POItem[];
}

export interface StockItem {
  id: string;
  item_id: string;
  quantity: number;
  updated_at: string;
  items?: {
    sku: string;
    name: string;
    unit: string;
    item_type: string;
  };
}

export interface StockHistory {
  id: string;
  item_id: string;
  transaction_type: string;
  quantity: number;
  notes?: string;
  created_at: string;
  items?: { name: string; sku: string; unit: string };
  users?: { full_name: string };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
