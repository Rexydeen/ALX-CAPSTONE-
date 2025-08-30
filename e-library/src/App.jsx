import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBAR';
import Home from './components/Home';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';
import Favorites from './components/Favorites';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white font-sans">
        <NavBar />

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bookcard" element={<BookCard />} />

          <Route path="/book/:id" element={<BookDetails />} />

          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

