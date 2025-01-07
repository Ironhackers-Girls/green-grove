import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

function WishItem({ product, onDeleteWish, onAddCart }) {
  const [isFavorite, setIsFavorite] = useState(true);
  const [imageSrc, setImageSrc] = useState(product.image);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onDeleteWish(product);
  };

  const handleMouseEnter = () => {
    setImageSrc(product.modelImage);
  };

  const handleMouseLeave = () => {
    setImageSrc(product.image);
  };

  return (
    <div className="group flex w-full flex-col overflow-hidden">
      <div
        className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={`/products/${product.id}`}>
          <img
            src={imageSrc}
            alt={product.name}
            className="absolute top-0 right-0 w-full h-full object-cover transition-all duration-100"
          />
        </Link>
        {/* Heart Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:scale-105 transition-all"
        >
          <FavoriteIcon
            className={isFavorite ? "text-red-500" : "text-gray-400"}
          />
        </button>
      </div>

      <div className="mt-4">
        <Link to={`/products/${product.id}`}>
          <h5 className="text-center uppercase tracking-tight text-gray-500 text-sm sm:text-base">
            {product.name}
          </h5>
        </Link>
        <div className="flex flex-col items-center mb-5">
          <p>
            <span className="text-xs sm:text-sm font-montserrat font-bold text-my-black">
              {product.price} €
            </span>
          </p>
          {/* Add to Cart Button */}
          <button
            className="mt-2 px-6 py-3 bg-lime-green text-dark-green text-xs sm:text-sm font-semibold rounded-full hover:bg-dark-green hover:text-white transition-all"
            onClick={() => onAddCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishItem;
