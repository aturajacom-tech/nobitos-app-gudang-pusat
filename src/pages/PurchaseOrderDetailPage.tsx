import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { poService } from '../services/poService';
import { PurchaseOrder } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';

export const PurchaseOrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [po, setPo] = useState<PurchaseOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const fetchPO = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await poService.getPODetail(id);
        setPo(data);
      } catch (error) {
        console.error("Failed to fetch PO details", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPO();
  }, [id]);

  const handleConfirm = async () => {
    if (!id) return;
    try {
      setIsConfirming(true);
      const updatedPo = await poService.confirmPO(id);
      setPo(updatedPo);
    } catch (error) {
      console.error("Failed to confirm PO", error);
      alert("Failed to confirm PO");
    } finally {
      setIsConfirming(false);
    }
  };

  if (isLoading) {
    return <div className="p-8"><LoadingSpinner /></div>;
  }

  if (!po) {
    return <div className="p-8 text-center text-gray-500">Purchase Order not found.</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/purchase-orders')}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Purchase Orders
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Purchase Order {po.po_number}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Details and items.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <StatusBadge status={po.status} />
            {po.status === 'draft' && user?.role === 'office_staff' && (
              <button
                onClick={handleConfirm}
                disabled={isConfirming}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isConfirming ? <LoadingSpinner className="h-4 w-4 text-white mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                Confirm PO
              </button>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Supplier</dt>
              <dd className="mt-1 text-sm text-gray-900">{po.supplier_name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {format(new Date(po.created_at), 'MMM d, yyyy HH:mm')}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Expected Delivery</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {po.expected_delivery_date ? format(new Date(po.expected_delivery_date), 'MMM d, yyyy') : 'Not specified'}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
              <dd className="mt-1 text-sm text-gray-900 font-semibold">
                ${po.total_amount.toFixed(2)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Items</h4>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SKU
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {po.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.item_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.sku}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          ${item.unit_price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                          ${(item.quantity * item.unit_price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
