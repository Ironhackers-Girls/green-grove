import { useEffect, useState } from "react";
import * as ProductsApi from "../../../services/products-services.js";
import ProductItem from "../product-item/product-item.jsx";
import { Snackbar, Alert } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material//NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';

function ProductList({ className = "", filters }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
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

        // Actualizar el estado de los productos
        setProducts(filteredProducts);
        setCurrentPage(1); // Resetear a la primera página después de aplicar los filtros
      })
      .catch((error) => console.log(error));
  }, [filters]); // Dependemos de los filtros para actualizar los productos

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

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
    <div>
      <div className={`grid grid-cols-4 gap-4 ${className}`}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddCart={handleProductAddCart}
              onAddWishList={handleAddToWishlist}
            />
          ))
        ) : (
          <div role="status" className="group flex w-full flex-col overflow-hidden bg-white animate-pulse ">
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden flex items-center justify-center mb-4 bg-gray-300 rounded dark:bg-gray-700">
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center space-x-2 my-4 items-center">
        <button
          onClick={() => handlePageChange(1)}
          className="px-2 py-2 border border-gray-300 hover:bg-lime-green rounded-full"
          disabled={currentPage === 1}
        >
          <FirstPageIcon />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-2 py-2 border border-gray-300 hover:bg-lime-green rounded-full"
          disabled={currentPage === 1}
        >
          <NavigateBeforeIcon />
        </button>
        <div>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)} // +1 para las páginas empezando desde 1
              className="px-2 py-2 ml-2 h-10 w-10 border bg-lime-green hover:bg-dark-green rounded-full font-montserrat hover:text-white"
              >
              {index + 1} {/* Muestra el número de la página */}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-2 py-2 border border-gray-300 hover:bg-lime-green rounded-full"
          disabled={currentPage === totalPages}
        >
          <NavigateNextIcon />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-2 py-2 border border-gray-300 hover:bg-lime-green rounded-full"
          disabled={currentPage === totalPages}
        >
          <LastPageIcon />
        </button>
      </div>

      {/* Snackbar */}
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
