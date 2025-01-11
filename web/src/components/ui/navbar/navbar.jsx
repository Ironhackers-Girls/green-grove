import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


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
    <nav className="sticky rounded-md top-4 z-10 bg-my-gray backdrop-filter backdrop-blur-lg bg-opacity-70 border-b border-my-white">
      <div className="flex flex-row items-center justify-between mx-auto p-4">
        <Link to="/">
          <img src="/green-groove-logo.svg" alt="Logo" width="160" />
        </Link>
        <div className="items-center justify-between hidden w-full lg:flex lg:w-auto">
          <ul className="flex flex-row p0 mt-0 font-montserrat font-medium gap-7 ld:gap-2">
            <li>
              <Link
                to="/products"
                className="block text-gray-900 hover:text-dark-green hover:scale-110 transition-all duration-300"
                aria-current="page"
              >
                PRODUCTS
              </Link>
            </li>
            <li><span className="font-bold text-gray-900">·</span></li>
            <li>
              <Link
                to="/about"
                className="block text-gray-900 hover:text-dark-green hover:scale-110 transition-all duration-300"
                aria-current="page"
              >
                ABOUT US
              </Link>
            </li>
            <li><span className="font-bold text-gray-900">·</span></li>
            <li>
              <Link
                to="/contact"
                className="block text-gray-900 hover:text-dark-green hover:scale-110 transition-all duration-300"
                aria-current="page"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon className="w-4 h-4 text-gray-900" />
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border rounded-full bg-my-gray"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <div className="flex space-x-4">
            <Link to="/wishlist">
              <FavoriteBorderOutlinedIcon
                className="text-gray-900 hover:text-dark-green hover:scale-110 transition-all duration-300" />
            </Link>
            <Link to="/cart">
              <ShoppingBagOutlinedIcon className="text-gray-900 hover:text-dark-green hover:scale-110 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
