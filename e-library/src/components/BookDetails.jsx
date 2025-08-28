import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        // To fetch work data
        const resWork = await fetch(`https://openlibrary.org/works/${id}.json`);
        const workData = await resWork.json();

        // To fetch edition data
        const resEditions = await fetch(`https://openlibrary.org/works/${id}/editions.json?limit=1`);
        const editionData = await resEditions.json();
        const firstEdition = editionData.entries?.[0] || {};

        // To merge work and edition data
        setBook({
          ...workData,
          isbn: firstEdition.isbn_13 || firstEdition.isbn_10 || [],
          number_of_pages: firstEdition.number_of_pages,
          publish_date: firstEdition.publish_date,
        });
      } catch (error) {
        console.error("Failed to fetch book details", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-white">Loading book details...</p>;
  if (!book) return <p className="text-center mt-10 text-white">Book not found.</p>;

  const visibleSubjects = showAllSubjects ? book.subjects || [] : (book.subjects || []).slice(0, 12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white px-6 py-10">
      {/* Navigation */}
      <div className="flex justify-end space-x-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          ⬅ Back to Search
        </button>
        <button
          onClick={() => navigate("/favorites")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          ❤ Favorites
        </button>
      </div>

      {/* Book Info */}
      <div className="w-full bg-white text-gray-900 rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-indigo-800 mb-6 border-b-2 border-indigo-300 pb-3">
          {book.title}
        </h1>

        <div className="space-y-6 text-lg">
          <p>
            <span className="font-semibold text-purple-700">Description:</span>{" "}
            {typeof book.description === "string"
              ? book.description
              : book.description?.value || "N/A"}
          </p>

          <p>
            <span className="font-semibold text-purple-700">Publication Date:</span>{" "}
            {book.publish_date || book.first_publish_date || "N/A"}
          </p>

          <p>
            <span className="font-semibold text-purple-700">ISBN:</span>{" "}
            {book.isbn?.[0] || "N/A"}
          </p>

          <p>
            <span className="font-semibold text-purple-700">Number of Pages:</span>{" "}
            {book.number_of_pages || "N/A"}
          </p>

          {/* Subjects */}
          <div>
            <span className="font-semibold text-purple-700">Subjects:</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {visibleSubjects.map((subject, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full font-medium"
                >
                  {subject}
                </span>
              ))}
            </div>

            {book.subjects?.length > 12 && (
              <button
                onClick={() => setShowAllSubjects(!showAllSubjects)}
                className="mt-4 text-indigo-300 hover:underline text-sm"
              >
                {showAllSubjects ? "Show Less ▲" : "Show More ▼"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Related Books Section */}
      {book.subjects?.length > 0 && (
        <RelatedBooks subject={book.subjects[0]} currentId={id} />
      )}
    </div>
  );
}

// Related Books Component
function RelatedBooks({ subject, currentId }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(
          `https://openlibrary.org/subjects/${encodeURIComponent(subject.toLowerCase())}.json?limit=6`
        );
        const data = await res.json();
        const filtered = (data.works || []).filter(
          (book) => book.key.split("/").pop() !== currentId
        );
        setRelated(filtered);
      } catch (err) {
        console.error("Failed to fetch related books", err);
      }
    };

    fetchRelated();
  }, [subject, currentId]);

  if (related.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-purple-200 mb-4">🔁 Related Books</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {related.map((book) => {
          const cover = book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
            : "https://via.placeholder.com/150x200?text=No+Cover";
          const bookId = book.key.split("/").pop();

          return (
            <div
              key={book.key}
              className="bg-white rounded shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => (window.location.href = `/book/${bookId}`)}
            >
              <img src={cover} alt={book.title} className="w-full h-48 object-cover rounded-t" />
              <div className="p-2 text-sm font-medium text-center text-indigo-800 line-clamp-2">
                {book.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



