import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = (
    <>
      <NavLink
        to="/home"
        onClick={closeMenu}
        className={({ isActive }) =>
          isActive ? 'text-yellow-400 font-semibold' : 'hover:underline'
        }
      >
        HOME
      </NavLink>

      <NavLink
        to="/bookcard"
        onClick={closeMenu}
        className={({ isActive }) =>
          isActive ? 'text-yellow-400 font-semibold' : 'hover:underline'
        }
      >
        BOOKCARD
      </NavLink>

      <NavLink
        to="/book-details"
        onClick={closeMenu}
        className={({ isActive }) =>
          isActive ? 'text-yellow-400 font-semibold' : 'hover:underline'
        }
      >
        BOOK DETAILS
      </NavLink>

      <NavLink
        to="/favorites"
        onClick={closeMenu}
        className={({ isActive }) =>
          isActive ? 'text-yellow-400 font-semibold' : 'hover:underline'
        }
      >
        FAVORITES
      </NavLink>
    </>
  );

  return (
    <nav className="bg-[#2b1d0e] text-yellow-300 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="lithaven logo" className="h-10 w-10 object-contain" />
          <h3 className="text-xl font-semibold text-orange-400">LitHaven</h3>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm sm:text-base">
          {navLinks}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-yellow-300 focus:outline-none text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="mt-3 flex flex-col space-y-2 md:hidden text-sm sm:text-base">
          {navLinks}
        </div>
      )}
    </nav>
  );
}
