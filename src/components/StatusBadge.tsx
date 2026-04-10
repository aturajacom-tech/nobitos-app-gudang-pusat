import React from 'react';
import { POStatus } from '../types';

export const StatusBadge = ({ status }: { status: POStatus }) => {
  const styles = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
  };

  const labels = {
    draft: 'Draft',
    sent: 'Sent',
    confirmed: 'Confirmed',
    completed: 'Completed',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};
