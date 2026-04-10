/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthLayout } from './components/AuthLayout';
import { DashboardLayout } from './components/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { PurchaseOrdersPage } from './pages/PurchaseOrdersPage';
import { PurchaseOrderDetailPage } from './pages/PurchaseOrderDetailPage';
import { StockCurrentPage } from './pages/StockCurrentPage';
import { StockHistoryPage } from './pages/StockHistoryPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
              <Route path="/purchase-orders/:id" element={<PurchaseOrderDetailPage />} />
              <Route path="/stock/current" element={<StockCurrentPage />} />
              <Route path="/stock/history" element={<StockHistoryPage />} />
              
              {/* Bonus pages placeholders */}
              <Route path="/delivery-orders" element={<div className="p-8 text-center text-gray-500">Delivery Orders (Coming Soon)</div>} />
              <Route path="/handovers" element={<div className="p-8 text-center text-gray-500">Handovers (Coming Soon)</div>} />
              
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
