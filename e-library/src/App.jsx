import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import Favorites from './components/Favorites';


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white font-sans">
        <Navbar />

        <Routes>
          {/* Redirect root to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Main routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}