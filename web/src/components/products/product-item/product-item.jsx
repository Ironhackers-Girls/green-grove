import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useState } from "react";

function ProductItem({ product, onAddCart, onAddWishList }) {
  const [imageSrc, setImageSrc] = useState(product.image);

  const handleMouseEnter = () => {
    setImageSrc(product.modelImage);
  };

  const handleMouseLeave = () => {
    setImageSrc(product.image);
  };

  return (
    <div
      className="group flex w-full flex-col overflow-hidden">
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden" onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} >
        <Link key={product.id} to={`/products/${product.id}`}>
          <img
            src={imageSrc}
            className="absolute top-0 right-0 h-full w-full object-cover transition-all duration-700 hover:scale-125"
            alt="product image"
          />
        </Link>
        <div className="absolute top-2 right-2 p-1 hover:scale-105 transition-all">

          <button
            className="flex h-10 w-10 items-center justify-center text-dark-green hover:text-red-600 hover:bg-my-white hover:rounded-full "
            onClick={() => onAddWishList(product)}
          >
            <FavoriteIcon />
          </button>
        </div>
      </div>

      <div className="mt-4 pb-5  flex flex-row items-center justify-between">
      <div >
        <Link key={product.id} to={`/products/${product.id}`}>
          <h5 className=" text-sm text-left uppercase font-montserrat tracking-tight text-gray-500">{product.name}</h5>
        </Link>
        <div>
          <p>
            <span className="text-sm text-left font-montserrat font-bold text-gray-900">{product.price}</span>
          </p>
        </div>
        </div>
        <button
            className="flex h-10 w-10 items-center justify-center text-dark-green bg-lime-green rounded-full hover:text-my-white hover:bg-dark-green hover:rounded-full "
            onClick={() => onAddCart(product)}
          >
            <ShoppingBagIcon />
          </button>
      </div>
    </div>
  );
}

export default ProductItem;
