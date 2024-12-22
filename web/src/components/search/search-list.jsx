import { useEffect, useState } from "react";
import * as ProductsApi from "../../services/products-services.js";
import ProductItem from "../products/product-item/product-item.jsx";

function SearchList ({ className = "", filters }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductsApi.listProducts()
      .then((allProducts) => {
        let filteredProducts = allProducts;

        if (filters.name && filters.name.length > 0) {
            filteredProducts = filteredProducts.filter((product) =>
              filters.name.some((name) =>
                product.name.toLowerCase().includes(name.toLowerCase().trim())
              )
            );
          }
        
        setProducts(filteredProducts);
      })
      .catch((error) => console.log(error));
  }, [filters]);

  const handleProductAddCart = (product) => {
    ProductsApi.addCart(product.id)
      .then(() => console.log("Producto añadido al carrito"))
      .catch((error) => console.log(error));
  };

  return (
    <div className={`d-flex flex-wrap gap-3 ${className}`}>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddCart={handleProductAddCart}
        />
      ))}
    </div>
  );
}

export default SearchList ;
