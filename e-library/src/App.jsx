import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import BookCard from './components/BookCard'; // shows list of books from search
import BookDetails from './components/BookDetails';
import Favorites from './components/Favorites';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white font-sans">
        <NavBar />

        <Routes>
          {/* Redirect root to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Main Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/bookcard" element={<BookCard />} />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/book-details/:id" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
