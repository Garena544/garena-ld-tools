import React from 'react';
import { useTools } from '../hooks/useTools';

export default function LastUpdated() {
  const { lastUpdated } = useTools();

  if (!lastUpdated) {
    return null;
  }

  return (
    <div className="bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2">
          <p className="text-xs text-gray-500 text-center">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
} 