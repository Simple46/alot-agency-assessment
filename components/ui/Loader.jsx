import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header – exactly as described */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          {/* ← Back button */}
      

          {/* Processing indicator with spinner */}
          <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
            <svg
              className="animate-spin h-4 w-4 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-xs font-medium text-gray-700">
              Processing
            </span>
          </div>
        </div>

        {/* Main loader area – central spinner and message */}
        <div className="flex flex-col items-center justify-center py-16 px-6 space-y-6">
          <div className="relative">
            {/* Large outer spinner */}
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-gray-800 font-medium text-lg">
              Loading your content
            </p>
            <p className="text-gray-400 text-sm">Please wait a moment...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
