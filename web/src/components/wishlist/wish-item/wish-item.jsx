import { Link } from "react-router-dom";

function WishItem({ product, onDeleteWish }) {
  return (
    <>
      <Link key={product.id} to={`/products/${product.id}`}>
        <div className="card mb-3">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/3">
              <img
                src={product.image}
                className="w-full h-auto rounded-l-lg"
                alt="cart image"
              />
            </div>
            <div className="md:w-2/3">
              <div className="p-4">
                <h5 className="text-xl font-semibold">{product.name}</h5>
                <p className="text-gray-700">{product.description}.</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex gap-4 p-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => onDeleteWish(product)}
        >
          delete
        </button>
      </div>
    </>
  );
}

export default WishItem;
