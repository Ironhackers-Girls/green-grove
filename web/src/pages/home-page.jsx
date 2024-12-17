import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h3 className="fs-1">Hoome</h3>
      <Link to="/products">
        <h1>Products</h1>
      </Link>
    </>
  );
}

export default HomePage;
