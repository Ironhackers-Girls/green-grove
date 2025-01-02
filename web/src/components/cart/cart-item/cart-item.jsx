import { Link } from "react-router-dom";

function CartItem({ product, onDeleteCart, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center bg-my-white rounded-3xl p-8 w-full lg:w-full xl:w-full">
      <Link
        key={product.id}
        to={`/products/${product.id}`}
        className="max-w-[120px] max-h-[160px]"
      >
        {/* Image */}
        <div className="w-full h-full">
          <img
            src={product.image}
            alt="cart image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Link>

      {/* Description */}
      <div className="flex-1 px-6">
        <div>
          <h5 className="text-lg font-semibold text-my-black">
            {product.name}
          </h5>
          <p className="text-sm">{product.store.name}</p>
        </div>

        <p className="text-xl font-semibold text-my-black mt-2">
          ${product.price}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:space-y-0 sm:space-x-4 items-end sm:items-end w-full sm:w-auto justify-end">
        {/* Delete */}
        <button
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-red-500 rounded-full hover:bg-red-200 mb-5 sm:mb-7"
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
        <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-100 p-2 rounded-full">
          <button
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200"
            onClick={() => onDecrement(product)}
            disabled={product.quantity <= 1}
          >
            -
          </button>
          <p className="text-lg font-medium text-my-black font-montserrat">
            {product.quantity}
          </p>
          <button
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200"
            onClick={() => onIncrement(product)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
