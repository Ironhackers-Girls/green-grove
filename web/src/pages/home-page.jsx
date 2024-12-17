import { PageLayout } from "../components/layouts";
import ProductList from "../components/products/product-list/product-list";
import NavBar from "../components/ui/navbar/navbar";

function HomePage () {
    return (
        <PageLayout>
            <h3 className="fs-1">List Products</h3>
            <ProductList />
        </PageLayout>
    )
}

export default HomePage;