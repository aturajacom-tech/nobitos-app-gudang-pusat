import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Nobitos Gudang Pusat</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <UserIcon className="h-5 w-5 text-gray-400" />
              <span className="hidden sm:inline-block font-medium">{user?.full_name}</span>
              <span className="hidden sm:inline-block text-gray-500">({user?.role === 'office_staff' ? 'Office' : 'Warehouse'})</span>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
