import { useState } from "react";
import { CartList, CartCheckout } from "../components/cart/index";
import { PageLayout } from "../components/layouts";
import NavBar from "../components/ui/navbar/navbar";
import CarbonInterface from "../components/carbon-interface/carbon-interface";

function CartPage() {
  const [productsCartToCarbon, setProductsCartToCarbon] = useState([]);

  const handleProductsCartToCarbon = (products) => {
    setProductsCartToCarbon(products);
  };

  return (
    <PageLayout>
      <CartList onProductsCartToCarbon={handleProductsCartToCarbon} />
      <CartCheckout productsCart={productsCartToCarbon} /> 
      <CarbonInterface productsCartToCarbon={productsCartToCarbon} />
    </PageLayout>
  );
}

export default CartPage;
