import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${searchTerm}`);
    setSearchTerm("")
  }
  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link className="text-xl font-semibold text-green-700" to="/">
          Green Grove
        </Link>
        <form className="flex items-center space-x-2" role="search">
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            type="submit"
            onClick={handleSearchSubmit}
          >
            Search
          </button>
        </form>
        <div className="flex space-x-2">
          <Link to="/wishlist">
            <button className="bg-transparent border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white transition duration-300">
              Fav
            </button>
          </Link>
          <Link to="/cart">
            <button className="bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300">
              Carrito
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
