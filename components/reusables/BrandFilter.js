// components/reusables/BrandFilter.js
import React from "react";

const BrandFilter = ({ selectedBrand, onChange }) => {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-4">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-medium">Filter by Brand:</span>
        <div className="relative inline-block w-full max-w-xs sm:max-w-[16rem] lg:max-w-[14rem]">
          <select
            value={selectedBrand}
            onChange={onChange}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Brands</option>
            <option value="MAPL">MAPL</option>
            <option value="Aludecor">Aludecor</option>
            <option value="Polyfix">Polyfix</option>
            <option value="Generic">Generic</option>
            <option value="Alstone">Alstone</option>
            <option value="Alstar">Alstar</option>
            <option value="Viva">Viva</option>
            <option value="Virgo">Virgo</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandFilter;
