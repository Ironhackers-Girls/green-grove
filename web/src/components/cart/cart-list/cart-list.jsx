import { useEffect, useState } from "react";
import * as ProductsApi from "../../../services/products-services";
import CartItem from "../cart-item/cart-item.jsx"

function CartList({className=' '}) {
  const [cart, setCart] = useState([]);
  const [productsCart, setProductsCart] = useState([]);

  useEffect(() => {
    ProductsApi.listCart()
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      Promise.all(
        cart.map((product) =>
          ProductsApi.getProduct(product.idProduct)
            .then((productData) => {
                setProductsCart(prevState => [...prevState, productData]);
            })
            .catch((error) => console.log(error))
        )
      );
    }
  }, [cart]);

  //const handleProductDeleteCart = (product) => {
    //ProductsApi.deleteCart(product.id)
      //.then(() => console.log("product delete"))
      //.catch((error) => console.log(error));
  //};

  return (
    <div className={`d-flex flex-wrap gap-3 ${className}`}>
      {productsCart.map((productCart) => (
        <CartItem
          key={productCart.id}
          product={productCart}

        />
      ))}
    </div>
  );
}

export default CartList;
