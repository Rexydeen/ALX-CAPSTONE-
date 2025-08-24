import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BookDetails() {
  const { id } = useParams(); // work ID
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [edition, setEdition] = useState(null); // For ISBN, page count, etc.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setBook(data);

        // Fetch first edition if available
        const editionsRes = await fetch(`https://openlibrary.org/works/${id}/editions.json?limit=1`);
        const editionsData = await editionsRes.json();
        setEdition(editionsData.entries?.[0] || null);
      } catch (err) {
        console.error("Error fetching book details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (!book) return <p className="text-red-400 p-4">Book not found.</p>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>

      <p className="text-gray-300 italic mb-4">
        {typeof book.description === 'string'
          ? book.description
          : book.description?.value || "No description available."}
      </p>

      <div className="text-sm text-gray-200 space-y-2">
        <p><strong>📅 Publication Date:</strong> {edition?.publish_date || "N/A"}</p>
        <p><strong>🔢 ISBN:</strong> {edition?.isbn_10?.[0] || edition?.isbn_13?.[0] || "N/A"}</p>
        <p><strong>📄 Number of Pages:</strong> {edition?.number_of_pages || "N/A"}</p>
        <p><strong>🏷️ Subjects:</strong> {book.subjects?.join(", ") || "N/A"}</p>
      </div>
    </div>
  );
}



