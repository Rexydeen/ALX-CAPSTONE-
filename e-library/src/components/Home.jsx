import React from 'react';
import SearchBar from '../components/SearchBar';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6 bg-[#2b1d0e]">
        <div className="text-2xl font-bold text-yellow-400">LitHaven</div>
        <nav className="space-x-10 text-yellow-200 text-lg">
          <a href="#" className="font-bold text-yellow-300">HOME</a>
          <a href="#">BOOK DETAILS</a>
          <a href="#">FAVORITES</a>
        </nav>
      </header>

      {/* Search Bar */}
      <SearchBar />

      {/* Hero Text */}
      <section className="text-center mt-14 px-4">
        <h1 className="text-5xl font-bold leading-tight">
          Discover Your <br /> Next Great Read
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Explore our collection of books across various genres.
        </p>
        
        {/* Browse Button */}
        <button className="mt-8 px-6 py-3 bg-white text-orange-500 font-semibold text-lg rounded shadow-md hover:bg-orange-100 transition">
          Browse Books
        </button>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white opacity-80">
        © 2025
      </footer>
    </main>
  );
}
