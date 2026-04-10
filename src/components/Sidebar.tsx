import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  History, 
  Truck, 
  KeyRound 
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['office_pusat', 'gudang_pusat', 'supplier', 'kitchen_head', 'kitchen_staff', 'outlet_manager', 'hq_management'] },
    { name: 'Purchase Orders', path: '/purchase-orders', icon: ShoppingCart, roles: ['office_pusat', 'gudang_pusat', 'supplier', 'hq_management'] },
    { name: 'Current Stock', path: '/stock/current', icon: Package, roles: ['office_pusat', 'gudang_pusat', 'kitchen_head', 'kitchen_staff', 'hq_management'] },
    { name: 'Stock History', path: '/stock/history', icon: History, roles: ['office_pusat', 'gudang_pusat', 'kitchen_head', 'hq_management'] },
    { name: 'Delivery Orders', path: '/delivery-orders', icon: Truck, roles: ['office_pusat', 'gudang_pusat', 'supplier', 'outlet_manager', 'hq_management'] },
    { name: 'Handovers', path: '/handovers', icon: KeyRound, roles: ['gudang_pusat', 'kitchen_staff', 'outlet_manager', 'hq_management'] },
  ];

  const filteredItems = navItems.filter(item => user && item.roles.includes(user.role));

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <nav className="mt-5 px-2 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className="block"
            >
              {({ isActive }) => (
                <div className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}>
                  <Icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
