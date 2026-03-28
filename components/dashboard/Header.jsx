'use client';

import { Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Header({ setSidebarOpen }) {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Hi {user?.name || "David Smith"},
          </h1>
        </div>
        <button
          type="button"
          className="lg:hidden -ml-1 text-gray-500 hover:text-gray-600 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-3 ml-auto">
          <span className="text-sm font-medium text-gray-700">
            {user?.name || "User"}
          </span>
          <img
            src={
              user?.profilePicture ||
              `https://ui-avatars.com/api/?background=6366F1&color=fff&name=${user?.name || "User"}`
            }
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}