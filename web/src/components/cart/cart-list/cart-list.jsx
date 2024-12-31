import { useEffect, useState } from "react";
import * as ProductsApi from "../../../services/products-services";
import CartItem from "../cart-item/cart-item.jsx";

function CartList({ className = " ", onProductsCartToCarbon }) {
  const [cart, setCart] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    ProductsApi.listCart()
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error));
  }, [reload]);

  useEffect(() => {
    if (cart.length >= 0) {
      Promise.all(
        cart.map((cartItem) =>
          ProductsApi.getProduct(cartItem.idProduct).then((productDetails) => ({
            ...productDetails,
            quantity: cartItem.quantity,
          }))
        )
      )
        .then((response) => {
          setProductsCart(response);
        })
        .catch((error) => console.log(error));
    }
  }, [cart]);

  useEffect(() => {
    onProductsCartToCarbon(productsCart);
  }, [productsCart]);

  const handleDeleteCart = (product) => {
    const cartItem = cart.find((item) => item.idProduct === product.id);

    ProductsApi.deleteCart(cartItem.id)
      .then(() => setReload(!reload))
      .catch((error) => console.log(error));
  };

  const handleIncrementCart = (product) => {
    const cartItem = cart.find((item) => item.idProduct === product.id);

    ProductsApi.incrementCart(cartItem)
      .then(() => setReload(!reload))
      .catch((error) => console.log(error));
  };

  const handleDecrementCart = (product) => {
    const cartItem = cart.find((item) => item.idProduct === product.id);

    ProductsApi.decrementCart(cartItem)
      .then(() => setReload(!reload))
      .catch((error) => console.log(error));
  };

  return (
    <div className={`flex flex-col gap-3 ${className} w-full`}>
      
      {productsCart.map((productCart) => (
        <CartItem
          key={productCart.id}
          product={productCart}
          onDeleteCart={handleDeleteCart}
          onIncrement={handleIncrementCart}
          onDecrement={handleDecrementCart}
        />
      ))}
    </div>
  );
  
}

export default CartList;
