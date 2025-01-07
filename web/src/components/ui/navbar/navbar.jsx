import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';


function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="sticky mx-4 my-4 rounded-md top-4 z-10 bg-secondary backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-100">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <img src="/green-groove-logo.svg" alt="Logo" width="160" />
        </Link>
        <div className="flex md:order-2 items-center space-x-4">
          {/* Formulario de búsqueda */}
          <div className="relative hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon className="w-4 h-4 text-gray-900" />
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border rounded-full bg-secondary bg-opacity-50"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <div className="flex space-x-4">
            <Link to="/wishlist">
              <FavoriteBorderOutlinedIcon
                className="text-gray-900 hover:text-primary hover:scale-110 transition-all duration-300" />
            </Link>
            <Link to="/cart">
              <ShoppingBagOutlinedIcon className="text-gray-900 hover:text-primary hover:scale-110 transition-all duration-300" />
            </Link>
          </div>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-montserrat font-medium md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link
                to="/products"
                className="block text-gray-900 md:hover:bg-transparent md:hover:text-primary md:p-0 hover:scale-110 transition-all duration-300"
                aria-current="page"
              >
                PRODUCTS
              </Link>
            </li>
            <li><span className="font-bold text-gray-900">·</span></li>
            <li>
              <Link
                to="/products"
                className="block text-gray-900 md:hover:bg-transparent md:hover:text-primary md:p-0 hover:scale-110 transition-all duration-300"
                aria-current="page"
              >
                ABOUT US
              </Link>
            </li>
            <li><span className="font-bold text-gray-900">·</span></li>
            <li>
              <Link
                to="/products"
                className="block text-gray-900 md:hover:bg-transparent md:hover:text-primary md:p-0 hover:scale-110 transition-all duration-300"
                aria-current="page"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
