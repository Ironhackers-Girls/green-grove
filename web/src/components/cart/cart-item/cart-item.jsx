import { Link } from "react-router-dom";

function CartItem({ product, onDeleteCart, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center bg-my-white rounded-3xl p-6 sm:p-8 w-full shadow-md gap-4 sm:gap-6">
      <Link
        key={product.id}
        to={`/products/${product.id}`}
        className="w-[100px] sm:w-[120px] lg:w-[140px]" 
      >
        <div className="w-full aspect-[3/4]"> 
          <img
            src={product.image}
            alt="cart image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Link>

      {/* Product Description */}
      <div className="flex-1 px-4 sm:px-6 text-center sm:text-left">
        <div>
          <h5 className="text-base sm:text-lg lg:text-xl font-semibold text-my-black">
            {product.name}
          </h5>
          <p className="text-xs sm:text-sm lg:text-base text-gray-500">
            {product.store.name}
          </p>
        </div>
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-my-black mt-2">
          ${product.price}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-end w-full sm:w-auto justify-end">
        {/* Delete Button */}
        <button
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-red-500 rounded-full hover:bg-red-200 mb-4 sm:mb-6"
          onClick={() => onDeleteCart(product)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
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
          <p className="text-sm sm:text-lg font-medium text-my-black font-montserrat">
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
