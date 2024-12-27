import { Link } from "react-router-dom";

function CartItem({ product, onDeleteCart, onIncrement, onDecrement }) {
  return (
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
              <p className="text-sm text-gray-500">
                Quantity: {product.quantity}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <button
                  className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
                  onClick={() => onDecrement(product)}
                  disabled={product.quantity <= 1}
                >
                  -
                </button>
                <p>{product.quantity}</p>
                <button
                  className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
                  onClick={() => onIncrement(product)}
                >
                  +
                </button>
                <p className="text-gray-700">Price: ${product.price}</p>
                <p className="text-gray-700">
                  Total: ${(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4">
              <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                fav
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => onDeleteCart(product)}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CartItem;
