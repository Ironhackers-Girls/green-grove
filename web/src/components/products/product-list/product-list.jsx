import { useEffect, useState } from "react";
import * as ProductsApi from "../../../services/products-services.js";
import ProductItem from "../product-item/product-item.jsx";

function ProductList({ className = "", filters }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductsApi.listProducts()
      .then((allProducts) => {
        let filteredProducts = allProducts;

        // Filtrado por categoría
        if (filters.category && filters.category.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            filters.category.some((category) =>
              product.category.includes(category)
            )
          );
        }

        // Filtrado por estilo
        if (filters.style && filters.style.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            filters.style.some((style) => product.style.includes(style))
          );
        }

        // Filtrado por precio (si los filtros de precio están definidos)
        if (
          filters.price &&
          (filters.price[0] !== 0 || filters.price[1] !== 100)
        ) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.price >= filters.price[0] &&
              product.price <= filters.price[1]
          );
        }

        // Filtrado por tamaños disponibles
        if (filters.size && filters.size.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            product.available_sizes.some((size) => filters.size.includes(size))
          );
        }

        // Filtrado por tienda
        if (filters.store && filters.store.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            filters.store.includes(product.store.name)
          );
        }

        // Filtrado por materiales
        if (filters.material && filters.material.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            product.materials.some((material) =>
              filters.material.includes(material)
            )
          );
        }

        // Filtrado por disponibilidad (stock)
        if (filters.stock !== undefined) {
          filteredProducts = filteredProducts.filter((product) =>
            filters.stock ? product.stock === 0 : product.stock > 0
          );
        }

        // Filtrado por clasificación (rating)
        if (filters.rating !== null) {
          filteredProducts = filteredProducts.filter(
            (product) => product.rating <= filters.rating
          );
        }

        // Establecer los productos filtrados en el estado
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

export default ProductList;
