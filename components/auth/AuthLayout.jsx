'use client';
import Card from "../ui/Card";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <>
      <div className="bg-white w-full p-3 pl-8 ">
        <button
          onClick={() => window.history.back()}
          className="text-sm text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
        >
          ← Back
        </button>

        <h2 className="text-xl font-bold text-gray-900 text-center">
          Logoipsum
        </h2>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl space-y-8 w-full">
          <div className="text-center">
            {title && (
              <p className="mt-2 text-gray-900 font-bold text-4xl">{title}</p>
            )}
            {subtitle && (
              <p className="text-sm text-gray-900 mt-1">{subtitle}</p>
            )}
          </div>
          <Card>{children}</Card>
        </div>
      </div>
    </>
  );
}