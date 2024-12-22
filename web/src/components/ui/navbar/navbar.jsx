import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function NavBar() {
  const [searchTerm, setSearchTerm]= useState("");
  const navigate = useNavigate()

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${searchTerm}`);
    setSearchTerm("")
  }
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Green Grove
        </Link>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit" onClick={handleSearchSubmit}>
            Search
          </button>
        </form>
        <Link to="/wishlist">
          <button className="btn btn-outline-success me-2" type="button">
            Fav
          </button>
        </Link>
        <Link to="/cart">
          <button className="btn btn-sm btn-outline-secondary" type="button">
            Carrito
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
