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
    <div className="group flex w-full flex-col overflow-hidden bg-white">
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <Link key={product.id} to={`/products/${product.id}`} >
        <img
            src={imageSrc}
            className="absolute top-0 right-0 h-full w-full object-cover"
            alt="product image"
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          />
        </Link>
        <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:bg-gray-700"
            onClick={() => onAddCart(product)}
          >
            <ShoppingBagIcon />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:bg-gray-700"
            onClick={() => onAddWishList(product)}
          >
            <FavoriteIcon />
          </button>
        </div>
      </div>
      <div className="mt-4 pb-5">
        <Link key={product.id} to={`/products/${product.id}`}>
          <h5 className="text-center tracking-tight text-gray-500">{product.name}</h5>
        </Link>
        <div className="mb-5 flex justify-center">
          <p>
            <span className="text-sm font-bold text-gray-900">{product.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
