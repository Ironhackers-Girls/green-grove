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
    <div
      className="p-4 bg-green-500 text-white rounded-lg shadow-sm border-0"
      style={{ maxWidth: "700px", margin: "0 auto" }}
    >
      <h5 className="mb-4 text-center text-lg font-semibold">Order Summary</h5>

      <div className="flex justify-between mb-3">
        <span>Delivery Fee</span>
        <span>${deliveryFee.toFixed(2)}</span>
      </div>

      <hr className="my-4 border-white" />

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>${(totalPrice + deliveryFee).toFixed(2)}</span>
      </div>
    </div>
  );
}

export default CartCheckout;
