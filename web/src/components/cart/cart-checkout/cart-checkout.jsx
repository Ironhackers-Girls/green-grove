import { useState, useEffect } from "react";

function CartCheckout({ productsCart }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    let total = 0;
    productsCart.forEach((product) => {
      total += product.price * product.quantity;
    });

    setTotalPrice(total);

    const calculatedDeliveryFee = total * 0.05;
    setDeliveryFee(calculatedDeliveryFee);
  }, [productsCart]);

  return (
    <div className="p-7 bg-dark-green text-my-white rounded-3xl shadow-md w-full">
      {/* Header */}
      <h5 className="mb-6 text-lg font-semibold text-left">Order Summary</h5>
  
      {/* Delivery Fee */}
      <div className="flex justify-between mb-3 text-sm">
        <span>Delivery Fee</span>
        <span>${deliveryFee.toFixed(2)}</span>
      </div>
  
      <hr className="my-4 border-my-white" />
  
      {/* Total */}
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>${(totalPrice + deliveryFee).toFixed(2)}</span>
      </div>
    </div>
  );
  
}

export default CartCheckout;
