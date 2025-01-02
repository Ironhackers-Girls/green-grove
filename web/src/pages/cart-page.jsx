import { useState } from "react";
import { CartList, CartCheckout } from "../components/cart/index";
import { PageLayout } from "../components/layouts";
import CarbonInterface from "../components/carbon-interface/carbon-interface";

function CartPage() {
  const [productsCartToCarbon, setProductsCartToCarbon] = useState([]);

  const handleProductsCartToCarbon = (products) => {
    setProductsCartToCarbon(products);
  };

  return (
    <PageLayout>
      <div className="p-4 font-montserrat">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-dark-green">YOUR CART</h3>
        </div>
        <div className="cart-page grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* CartList & CartCheckout */}
          <div className="cart-left flex flex-col w-full">
            <div className="cart-list w-full mb-4">
              <CartList onProductsCartToCarbon={handleProductsCartToCarbon} />
            </div>
            <div className="cart-checkout w-full">
              <CartCheckout productsCart={productsCartToCarbon} />
            </div>
          </div>
  
          {/* CarbonInterface */}
          <div className="carbon-interface md:mt-0">
            <CarbonInterface productsCartToCarbon={productsCartToCarbon} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
  
}

export default CartPage;
