import { useState } from "react";
import { CartList, CartCheckout } from "../components/cart/index";
import CarbonInterface from "../components/carbon-interface/carbon-interface";
import Lottie from "react-lottie";
import * as ProductsApi from "../services/products-services";
import purchaseAnimation from "../assets/purchaseAnimation.json";

function CartPage() {
  const [productsCartToCarbon, setProductsCartToCarbon] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reloadCart, setReloadCart] = useState(false);

  const handleProductsCartToCarbon = (products) => {
    setProductsCartToCarbon(products);
  };

  const handlePurchase = () => {
    setIsPopupOpen(true);

    ProductsApi.clearCart()
      .then(() => {
        setReloadCart((prev) => !prev);
      })
      .catch((error) => console.error("Error clearing cart:", error));
  };

  const closePopup = () => setIsPopupOpen(false);

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: purchaseAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="p-4 font-montserrat">
      <div>
        <h1>YOUR CART</h1>
      </div>
      <div className="cart-page grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="cart-left flex flex-col w-full">
          <div className="cart-list w-full mb-4">
            <CartList
              onProductsCartToCarbon={handleProductsCartToCarbon}
              reloadCart={reloadCart}
            />
          </div>
          <div className="cart-checkout w-full">
            <CartCheckout productsCart={productsCartToCarbon} />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handlePurchase}
              className="mt-2 px-6 py-3 bg-lime-green text-dark-green text-xs sm:text-sm font-semibold rounded-full hover:bg-dark-green hover:text-white transition-all"
            >
              Purchase
            </button>
          </div>
        </div>
        <div className="carbon-interface md:mt-0">
          <CarbonInterface productsCartToCarbon={productsCartToCarbon} />
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-3/4 md:w-1/3 text-center">
            <h4 className="text-xl font-semibold mb-4">Purchase Successful!</h4>
            <Lottie
              options={lottieOptions}
              height={200}
              width={200}
              className="mx-auto mb-4"
              style={{ cursor: "default" }}
            />
            <p className="text-lg mb-6">
              Thank you for your purchase.<br></br> Your items are on the way!
            </p>
            <button
              onClick={closePopup}
              className="mt-2 px-6 py-3 bg-lime-green text-dark-green text-xs sm:text-sm font-semibold rounded-full hover:bg-dark-green hover:text-white transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
