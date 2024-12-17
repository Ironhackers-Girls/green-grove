import { useState, useEffect } from "react";

function CartCheckout({ productsCart }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    productsCart.forEach((product) => {
      total += product.price * product.quantity;
    });
    
    setTotalPrice(total);
  }, [productsCart]);

  return (
    <>
      Total Price: ${totalPrice.toFixed(2)}
    </>
  );
}

export default CartCheckout;
