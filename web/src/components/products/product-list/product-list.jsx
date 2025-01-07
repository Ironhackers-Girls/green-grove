import { useEffect, useState } from "react";
import * as ProductsApi from "../../../services/products-services.js";
import ProductItem from "../product-item/product-item.jsx";
import { Snackbar, Alert } from "@mui/material";

function ProductList({ className = "", filters }) {
  const [products, setProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    ProductsApi.listProducts()
      .then((allProducts) => {
        let filteredProducts = allProducts;

        // Verificar si los filtros están vacíos y no aplicar nada si es así
        if (filters && Object.keys(filters).length > 0) {
          // Filtrado por nombre (si está definido)
          if (filters.name && filters.name.length > 0) {
            filteredProducts = filteredProducts.filter((product) =>
              filters.name.some((category) => product.name.includes(category))
            );
          }

          // Filtrado por categoría
          if (filters.category && filters.category.length > 0) {
            filteredProducts = filteredProducts.filter((product) =>
              filters.category.some((category) => product.category.includes(category))
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
        }

        console.log("Filtros aplicados:", filters);
        console.log("Productos filtrados:", filteredProducts);

        // Establecer los productos filtrados en el estado
        setProducts(filteredProducts);
      })
      .catch((error) => console.log(error));
  }, [filters]); // Dependemos de los filtros para actualizar los productos

  const handleProductAddCart = (product) => {
    ProductsApi.addCart(product.id)
      .then(() => {
        setSnackbarMessage("Producto añadido al carrito");
        setSnackbarSeverity("success");
        setOpenSnackbar(true); 
      })
      .catch((error) => console.log(error));
  };

  const handleAddToWishlist = (product) => {
    ProductsApi.addWish(product.id)
      .then(() => {
        setSnackbarMessage("Producto añadido al wishlist");
        setSnackbarSeverity("info");
        setOpenSnackbar(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={`grid grid-cols-4 gap-0 ${className}`}>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddCart={handleProductAddCart}
            onAddWishList={handleAddToWishlist}
          />
        ))
      ) : (
        <p>No products found</p> // Mensaje si no hay productos que coincidan
      )}
      <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={() => setOpenSnackbar(false)}
    >
      <Alert
        onClose={() => setOpenSnackbar(false)}
        severity={snackbarSeverity}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </div>
  );
}

export default ProductList;
