import { useEffect, useState } from "react";
import * as ProductsApi from "../../../services/products-services.js";
import ProductItem from "../product-item/product-item.jsx";

function ProductList({ className = "", filters }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductsApi.listProducts()
      .then((allProducts) => {
        let filteredProducts = allProducts;

        if (filters.category && filters.category.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            filters.category.includes(product.category)
          );
        }

        if (filters.size && filters.size.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            product.available_sizes.some((size) => filters.size.includes(size))
          );
        }

        if (filters.style && filters.style.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            filters.style.includes(product.style)
          );
        }

        if (filters.store && filters.store.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            filters.store.includes(product.store.name)
          );
        }

        if (filters.material && filters.material.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            product.materials.some((material) =>
              filters.material.includes(material)
            )
          );
        }

        if (
          filters.price &&
          filters.price.min !== null &&
          filters.price.max !== null
        ) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.price >= filters.price.min &&
              product.price <= filters.price.max
          );
        }

        if (filters.stock !== undefined) {
          filteredProducts = filteredProducts.filter((product) =>
            filters.stock ? product.stock > 0 : product.stock === 0
          );
        }

        if (filters.rating !== null) {
          filteredProducts = filteredProducts.filter(
            (product) => product.rating >= filters.rating
          );
        }

        setProducts(filteredProducts);
      })
      .catch((error) => console.log(error));
  }, [filters]);

  const handleProductAddCart = (product) => {
    ProductsApi.addCart(product.id)
      .then(() => console.log("product add to cart"))
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

export default ProductList;
