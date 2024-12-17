import { Link } from "react-router-dom";

function NavBar() {
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
          />
          <button className="btn btn-outline-success" type="submit">
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
