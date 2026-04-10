import React, { useEffect, useState } from 'react';
import { handoverService } from '../services/handoverService';
import { Handover } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { KeyRound, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

export const HandoversPage = () => {
  const [handovers, setHandovers] = useState<Handover[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState('');

  const fetchHandovers = async () => {
    try {
      setIsLoading(true);
      const response = await handoverService.getHandovers(1, 50);
      setHandovers(response.data);
    } catch (error) {
      console.error("Failed to fetch handovers", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHandovers();
  }, []);

  const handleVerify = async (id: string) => {
    if (!pinInput || pinInput.length < 4) {
      setError('PIN must be at least 4 digits');
      return;
    }
    try {
      setError('');
      await handoverService.verifyHandover(id, pinInput);
      setPinInput('');
      setVerifyingId(null);
      fetchHandovers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid PIN');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Handover Verifications</h1>
        <p className="mt-1 text-sm text-gray-500">
          Verify stock handovers using secure PIN.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full p-8">
            <LoadingSpinner />
          </div>
        ) : handovers.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-lg shadow">
            No pending handovers.
          </div>
        ) : (
          handovers.map((handover) => (
            <div
              key={handover.id}
              className="bg-white overflow-hidden shadow rounded-lg border border-gray-200"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-blue-600">
                    <KeyRound className="h-5 w-5 mr-2" />
                    <h3 className="text-lg font-medium">Handover #{handover.id.slice(0, 6)}</h3>
                  </div>
                  {handover.status === 'verified' ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : handover.status === 'failed' ? (
                    <XCircle className="h-6 w-6 text-red-500" />
                  ) : null}
                </div>

                <div className="text-sm text-gray-600 space-y-2 mb-4">
                  <p>
                    <span className="font-medium">From:</span> {handover.from_warehouse}
                  </p>
                  <p>
                    <span className="font-medium">To:</span> {handover.to_location}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{' '}
                    {format(new Date(handover.timestamp), 'MMM d, HH:mm')}
                  </p>
                </div>

                {handover.status === 'pending' && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {verifyingId === handover.id ? (
                      <div className="space-y-3">
                        <input
                          type="password"
                          maxLength={6}
                          placeholder="Enter PIN"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={pinInput}
                          onChange={(e) => setPinInput(e.target.value)}
                        />
                        {error && <p className="text-xs text-red-600">{error}</p>}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleVerify(handover.id)}
                            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              setVerifyingId(null);
                              setError('');
                              setPinInput('');
                            }}
                            className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setVerifyingId(handover.id)}
                        className="w-full flex justify-center items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
                      >
                        Verify with PIN
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
