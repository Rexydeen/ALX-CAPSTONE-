// src/components/BookCard.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useFavoritesStore from '../Store/favoritesStore.js';

export default function BookCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const addFavorite = useFavoritesStore((state) => state.addFavorite);

  const q = new URLSearchParams(location.search).get("q")?.trim() || "";
  const BASE = import.meta.env.VITE_API_BASE_URL || "https://openlibrary.org";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      if (!q) {
        setBooks([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(`${BASE}/search.json?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setBooks((data?.docs || []).slice(0, 12));
      } catch (e) {
        console.error("Fetch error:", e);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [q, BASE]);

  const handleAddToFavorites = (book) => {
    addFavorite(book);
    navigate("/favorites");
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">Search Results</h1>

      {loading && <p>Searching...</p>}
      {!loading && books.length === 0 && <p>No results found.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((b, i) => {
          const img = b.cover_i
            ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
            : "https://via.placeholder.com/150x200?text=No+Cover";
          const bookId = b.key?.split("/")?.pop();

          return (
            <div key={b.key ?? i} className="bg-white text-black rounded-lg shadow p-4">
              <img src={img} alt={b.title} className="w-full h-48 object-cover rounded" />
              <h2 className="mt-2 text-lg font-bold line-clamp-2">{b.title}</h2>
              <p className="text-sm">
                <span className="text-gray-600">Author(s): </span>{b.author_name?.join(", ") || "Unknown"}
              </p>
              <p className="text-sm">
                <span className="text-gray-600">Publisher: </span>{b.publisher?.[0] || "N/A"}
              </p>

              <div className="flex justify-between gap-2 mt-4">
                <Link
                  to={`/book/${bookId}`}
                  className="w-1/2 text-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Book Details
                </Link>
                <button
                  onClick={() => handleAddToFavorites(b)}
                  className="w-1/2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
