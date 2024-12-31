import { useState } from "react";
import { CartList, CartCheckout } from "../components/cart/index";
import { PageLayout } from "../components/layouts";
import CarbonInterface from "../components/carbon-interface/carbon-interface";
import "./cart-page.css";

function CartPage() {
  const [productsCartToCarbon, setProductsCartToCarbon] = useState([]);

  const handleProductsCartToCarbon = (products) => {
    setProductsCartToCarbon(products);
  };

  return (
    <PageLayout>
      <div className="p-4">
        <div>
          <h3 className="text-2xl font-semibold">List Cart</h3>
        </div>
        <div className="cart-page grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Lado izquierdo: CartList y CartCheckout */}
          <div className="cart-left flex flex-col w-full">
            <div className="cart-list w-full">
              <CartList onProductsCartToCarbon={handleProductsCartToCarbon} />
            </div>
            <div className="cart-checkout mt-6 w-full">
              <CartCheckout productsCart={productsCartToCarbon} />
            </div>
          </div>
  
          {/* Lado derecho: CarbonInterface */}
          <div className="carbon-interface">
            <CarbonInterface productsCartToCarbon={productsCartToCarbon} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
  
  
  
}

export default CartPage;
