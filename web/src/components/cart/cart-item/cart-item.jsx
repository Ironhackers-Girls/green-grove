import { Link } from "react-router-dom";

function CartItem({ product, onDeleteCart, onIncrement, onDecrement }) {
  return (
    <>
      <div className="flex items-center bg-white shadow-md rounded-lg p-10 mb-5">
        <Link key={product.id} to={`/products/${product.id}`}>
          {/* Image */}
          <div className="w-24 h-24">
            <img
              src={product.image}
              alt="cart image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </Link>

        {/* Description */}
        <div className="flex-1 px-6">
          <h5 className="text-lg font-medium text-gray-800">{product.name}</h5>
          <p className="text-sm text-gray-500">{product.store.name}</p>
          <p className="text-xl font-semibold text-gray-800 mt-2">
            ${product.price}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-end space-y-3">
          {/* Delete */}
          <button
            className="w-10 h-10 flex items-center justify-center text-red-500 rounded-full hover:bg-red-200"
            onClick={() => onDeleteCart(product)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M0 0h24v24H0z" stroke="none" />
              <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>

          {/* Add/Less */}
          <div className="flex items-center space-x-3 bg-gray-100 p-2 rounded-full">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200"
              onClick={() => onDecrement(product)}
              disabled={product.quantity <= 1}
            >
              -
            </button>
            <p className="text-lg font-medium text-gray-800">
              {product.quantity}
            </p>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200"
              onClick={() => onIncrement(product)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
