import React from "react";

const SkeletonLoaderProduct = () => {
  return (
    <div className="bg-[#eaeaea]">
      <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse">
          <div className="aspect-w-1 aspect-h-1 sm:aspect-h-8 sm:aspect-w-7">
            <div className="w-full h-64 bg-slate-100"></div>
          </div>
          <div className="mt-4">
            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded w-1/4 mt-2"></div>
          </div>
          <div className="mt-2">
            <div className="h-8 bg-slate-100 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoaderProduct;
