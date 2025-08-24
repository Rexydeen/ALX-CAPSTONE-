import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-[#2b1d0e] text-yellow-300 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="lithaven logo" className="h-10 w-10 object-contain" />
        <h3 className="text-xl font-semibold text-orange-400">LitHaven</h3>
      </div>

      <div className="space-x-6 text-sm sm:text-base">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? 'text-yellow-400 font-semibold' : 'hover:underline'
          }
        >
          HOME
        </NavLink>

        <NavLink
          to="/bookcard"
          className={({ isActive }) =>
            isActive ? 'text-yellow-400 font-semibold' : 'hover:underline'
          }
        >
          BOOKCARD
        </NavLink>

        <NavLink
          to="/book-details"
          className={({ isActive }) =>
            isActive ? 'text-yellow-400 font-semibold' : 'hover:underline'
          }
        >
          BOOK DETAILS
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? 'text-yellow-400 font-semibold' : 'hover:underline'
          }
        >
          FAVORITES
        </NavLink>
      </div>
    </nav>
  );
}

