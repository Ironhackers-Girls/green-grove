import { useEffect, useState } from "react";
import * as ProductsApi from "../../../services/products-services";
import WishItem from "../wish-item/wish-item.jsx";

function WishList({ className = " " }) {
  const [wishlist, setWishlist] = useState([]);
  const [productsWish, setProductsWish] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    ProductsApi.listWish()
      .then((wishlist) => setWishlist(wishlist))
      .catch((error) => console.log(error));
  }, [reload]);

  useEffect(() => {
      if (wishlist.length > 0) {
        Promise.all(
            wishlist.map((wishItem) => 
            ProductsApi.getProduct(wishItem.idProduct).then((productDetails) => ({
              ...productDetails
            }))
          )
        )
          .then((response) => {
            setProductsWish(response);
          })
          .catch((error) => console.log(error));
      }
    }, [wishlist]);

  const handleDeleteWishList = (product) => {
    const wishlistItem = wishlist.find((item) => item.idProduct === product.id);

    ProductsApi.deleteWish(wishlistItem.id)
      .then(() => setReload(!reload))
      .catch((error) => console.log(error));
  };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <div>
        <h3 className="text-2xl font-semibold">WishList</h3>
        <p>{productsWish.length} items</p>
      </div>
      {productsWish.map((productWish) => (
        <WishItem
          key={productWish.id}
          product={productWish}
          onDeleteWish={handleDeleteWishList}
        />
      ))}
    </div>
  );
}

export default WishList;
