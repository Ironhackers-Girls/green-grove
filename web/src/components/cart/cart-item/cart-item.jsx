import { Link } from "react-router-dom";

function CartItem({ product, onDeleteCart, onIncrement, onDecrement }) {
  return (
    <div className="flex flex-row sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center bg-my-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-md gap-4 sm:gap-6 overflow-hidden">
      <Link
        key={product.id}
        to={`/products/${product.id}`}
        className="w-[80px] sm:w-[100px] lg:w-[120px] flex-shrink-0"
      >
        <div className="w-full aspect-[3/4]">
          <img
            src={product.image}
            alt="cart image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-2 w-full justify-between lg:flex-row ">
        {/* Product Description */}
        <div className="flex-1 px-2 sm:px-4 md:px-6 text-left">
          <div>
            <h5 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-my-black">
              {product.name}
            </h5>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-500">
              {product.store.name}
            </p>
          </div>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-my-black mt-2">
            ${product.price}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-row w-full items-center justify-end gap-4 md:gap-6 md:flex-col md:flex-1 md:items-end">
          {/* Delete Button */}
          <button
            className="w-5 h-5 flex items-center justify-center text-red-500 rounded-full hover:bg-red-200"
            onClick={() => onDeleteCart(product)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
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
          <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-100 p-1 sm:p-2 md:p-3 rounded-full">
            <button
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200"
              onClick={() => onDecrement(product)}
              disabled={product.quantity <= 1}
            >
              -
            </button>
            <p className="text-xs md:text-sm lg:text-lg xl:text-xl font-medium text-my-black font-montserrat">
              {product.quantity}
            </p>
            <button
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200"
              onClick={() => onIncrement(product)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
