import CartList from "../components/cart/cart-list/cart-list";
import { PageLayout } from "../components/layouts";
import NavBar from "../components/ui/navbar/navbar";

function CartPage () {
    return (
        <PageLayout>
            <NavBar />
            <CartList />
        </PageLayout>
    )
}

export default CartPage;