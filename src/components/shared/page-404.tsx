"use client";

import { FaExclamationTriangle, FaSearch } from "react-icons/fa";

const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="relative">
        <FaExclamationTriangle className="h-24 w-24 text-yellow-500 animate-bounce" />
        <FaSearch className="absolute -bottom-2 -right-2 h-8 w-8 text-gray-400 animate-pulse" />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-lg text-gray-600">Page not found</p>
      </div>
    </div>
  );
};

export default Page404;
