import { Link } from "react-router-dom";

function ProductItem({ product, onAddCart, onAddWishList }) {
  return (
    <>
      <Link key={product.id} to={`/products/${product.id}`}>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={product.image}
            className="w-full h-auto object-cover"
            alt="product image"
            style={{ maxWidth: "250px" }}
          />
        </div>
      </Link>
      <div className="p-4">
            <h5 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h5>
            <p className="text-lg text-green-600 font-semibold">
              {product.price}
            </p>
          </div>
      <div className="mt-4 flex space-x-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={() => onAddCart(product)}
        >
          Carrito
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          onClick={() => onAddWishList(product)}
        >
          Fav
        </button>
      </div>
    </>
  );
}

export default ProductItem;
