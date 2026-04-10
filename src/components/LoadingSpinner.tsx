import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
};
