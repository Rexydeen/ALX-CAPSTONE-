// components/SearchBar.jsx
import React from 'react';

export default function SearchBar() {
  return (
    <div className="w-full flex justify-center mt-8">
      <input
        type="text"
        placeholder="Search for books here"
        className="w-[600px] max-w-full px-6 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}
