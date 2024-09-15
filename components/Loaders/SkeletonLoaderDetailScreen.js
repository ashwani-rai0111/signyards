import React from "react";

const SkeletonLoaderDetailScreen = () => {
  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row p-4 shadow-lg rounded-lg bg-white">
          <div className="w-full md:w-1/2 p-4">
            <div className="main-image-container mb-4 bg-gray-200 h-96 rounded-lg shadow-md"></div>
            <div className="thumbnail-container flex justify-center mt-4 space-x-2">
              <div className="thumbnail w-20 h-20 bg-gray-200 rounded-md border border-gray-300"></div>
              <div className="thumbnail w-20 h-20 bg-gray-200 rounded-md border border-gray-300"></div>
              <div className="thumbnail w-20 h-20 bg-gray-200 rounded-md border border-gray-300"></div>
            </div>
          </div>
          <div className="flex-grow md:w-1/2 md:pl-8 p-4">
            <div className="text-2xl font-bold mb-4 bg-gray-200 h-8 rounded-md"></div>
            <div className="text-xl text-gray-800 mb-4 bg-gray-200 h-6 rounded-md"></div>
            <div className="text-gray-700 mb-4 bg-gray-200 h-20 rounded-md"></div>
            <div className="mt-4 px-4 py-2 bg-gray-300 text-sm font-medium rounded-md w-1/2"></div>
            <div className="mt-4 px-4 py-2 bg-gray-300 text-sm font-medium rounded-md w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoaderDetailScreen;
