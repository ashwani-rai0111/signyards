import React from "react";

const SkeletonLoaderCart = () => {
  return (
    <div>
      <div className="p-4 bg-white shadow-md rounded-lg animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoaderCart;
