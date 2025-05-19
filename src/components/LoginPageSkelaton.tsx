// components/LoginPageSkeleton.tsx
'use client';

export default function LoginPageSkeleton() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center animate-pulse">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Rental Property Tracker
        </h1>
        <p className="text-gray-500 text-lg">Loading login interface...</p>
        <div className="mt-6">
          <div className="w-80 h-10 bg-gray-300 rounded mb-4" />
          <div className="w-80 h-10 bg-gray-300 rounded mb-4" />
          <div className="w-40 h-10 bg-gray-400 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}
