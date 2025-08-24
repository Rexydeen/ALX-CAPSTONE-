import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleBrowse = () => {
    if (searchText.trim()) {
      navigate(`/bookcard?q=${encodeURIComponent(searchText.trim())}`);
    } else {
      navigate('/bookcard');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <section className="text-center mt-14 px-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for books here"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-[600px] max-w-full px-6 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Hero Text */}
        <h1 className="text-5xl font-bold leading-tight mt-10">
          Discover Your <br /> Next Great Read
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Explore our collection of books across various genres.
        </p>

        {/* Browse Button */}
        <button
          onClick={handleBrowse}
          className="mt-8 px-6 py-3 bg-white text-orange-500 font-semibold text-lg rounded shadow-md hover:bg-orange-100 transition"
        >
          Browse Books
        </button>
      </section>

      <footer className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white opacity-80">
        © 2025
      </footer>
    </main>
  );
}

