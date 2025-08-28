import { useNavigate } from "react-router-dom";
import  useFavoritesStore  from "../Store/favoritesStore";


export default function Favorites() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white flex items-center justify-center">
        <p className="text-xl">No favorite books added yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Favorite Books</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((book, index) => {
            const bookId = book.key?.split("/works/")[1];

            return (
              <div key={index} className="bg-white text-gray-900 rounded-lg shadow-md p-5 space-y-3">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-600">
                  {book.author_name?.[0] || "Unknown Author"}
                </p>
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => navigate(`/book/${bookId}`)}
                    className="text-indigo-600 hover:underline"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => removeFavorite(book.key)}
                    className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                  >
                    <span>Remove</span>
                    <span className="text-xl">❌</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
