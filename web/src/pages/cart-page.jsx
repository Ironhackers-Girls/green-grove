import CartList from "../components/cart/cart-list/cart-list";
import { PageLayout } from "../components/layouts";
import NavBar from "../components/ui/navbar/navbar";

function CartPage () {
    return (
        <PageLayout>
            <NavBar />
            <h3 className="fs-2">List Cart</h3>
            <CartList />
        </PageLayout>
    )
}

export default CartPage;