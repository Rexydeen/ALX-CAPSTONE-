function Navbar() {
  return (
    <nav className="bg-[#2b1d0e] text-yellow-300 p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">LitHaven</div>
      <div className="space-x-8">
        <a href="/home" className="hover:underline text-yellow-400 font-semibold">Home</a>
        <a href="/book-details" className="hover:underline">Book Details</a>
        <a href="/favorites" className="hover:underline">Favorites</a>
      </div>
    </nav>
  );
}

export default Navbar;
