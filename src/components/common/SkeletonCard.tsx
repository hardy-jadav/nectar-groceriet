import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-[18px] border border-[#e2e2e2] p-3 animate-pulse">
      <div className="w-full aspect-square bg-gray-200 rounded-xl mb-3" />
      <div className="h-3 bg-gray-200 rounded mb-2 w-3/4" />
      <div className="h-3 bg-gray-200 rounded mb-3 w-1/2" />
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="w-9 h-9 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
};

export default SkeletonCard;
