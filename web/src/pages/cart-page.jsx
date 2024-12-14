import { useState } from "react";
import CartList from "../components/cart/cart-list/cart-list";
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
      <NavBar />
      <CartList onProductsCartToCarbon={handleProductsCartToCarbon} />
      <CarbonInterface productsCartToCarbon={productsCartToCarbon} />
    </PageLayout>
  );
}

export default CartPage;
