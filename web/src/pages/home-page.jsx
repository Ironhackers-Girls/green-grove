import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h3 className="text-4xl font-bold mb-4">Home</h3>
      <Link to="/products">
        <h1 className="text-3xl text-blue-600 hover:text-blue-800 transition duration-200">Products</h1>
      </Link>
    </>
  );
}

export default HomePage;
