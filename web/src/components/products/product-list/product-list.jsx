import { useEffect, useState } from "react";
import * as ProductsApi from '../../../services/products-services.js'
import ProductItem from "../product-item/product-item.jsx";


function ProductList({className = ''}) {
    const [products, setProducts] = useState([]);
    

    useEffect(() => {
        ProductsApi.listProducts()
            .then((products) => setProducts(products))
            .catch((error) => console.log(error))
    }, []);

    const handleProductAddCart = (product) => {
        ProductsApi.addCart(product.id)
            .then(() => console.log("product add to cart"))
            .catch((error) => console.log(error))

    }

    return (
        <div className={`d-flex flex-wrap gap-3 ${className}`}>
            {products.map((product) => (
                <ProductItem key={product.id} product={product} onAddCart={handleProductAddCart} />
            ))}
        </div>
    )
}

export default ProductList