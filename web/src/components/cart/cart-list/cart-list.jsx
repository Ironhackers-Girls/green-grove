import { useEffect, useState } from "react";
import * as ProductsApi from "../../../services/products-services";
import CartItem from "../cart-item/cart-item.jsx";

function CartList({ className = " ", onProductsCartToCarbon, reloadCart }) {
  const [cart, setCart] = useState([]);
  const [productsCart, setProductsCart] = useState([]);

  useEffect(() => {
    ProductsApi.listCart()
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error));
  }, [reloadCart]);

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
      .then(() => {
        setCart((prev) => prev.filter((item) => item.idProduct !== product.id)); // Actualizar el estado del carrito
        setProductsCart((prev) =>
          prev.filter((item) => item.id !== product.id)
        );
      })
      .catch((error) => console.log(error));
  };

  const handleIncrementCart = (product) => {
    const cartItem = cart.find((item) => item.idProduct === product.id);

    ProductsApi.incrementCart(cartItem)
      .then(() => {
        const updatedCart = cart.map((item) =>
          item.idProduct === cartItem.idProduct
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCart(updatedCart);
      })
      .catch((error) => console.log(error));
  };

  const handleDecrementCart = (product) => {
    const cartItem = cart.find((item) => item.idProduct === product.id);

    ProductsApi.decrementCart(cartItem)
      .then(() => {
        const updatedCart = cart.map((item) =>
          item.idProduct === cartItem.idProduct
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setCart(updatedCart);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={`flex flex-col gap-4 ${className} w-full`}>
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
