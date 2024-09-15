import React from "react";

const SkeletonLoaderDelivery = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div> {/* Title skeleton */}
      
      {/* Name, phone, address fields */}
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>

      {/* City and postal code fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Button skeleton */}
      <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
    </div>
  );
};

export default SkeletonLoaderDelivery;
