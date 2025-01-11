import { useEffect, useState } from "react";
import * as ProductsApi from "../../../services/products-services.js";
import ProductItem from "../product-item/product-item.jsx";
import { Snackbar, Alert } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material//NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';

function ProductList({ filters }) {
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
        setSnackbarMessage("Product add to cart");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      })
      .catch((error) => console.log(error));
  };

  const handleAddToWishlist = (product) => {
    ProductsApi.addWish(product.id)
      .then(() => {
        setSnackbarMessage("Product add to wishlist");
        setSnackbarSeverity("info");
        setOpenSnackbar(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          <>
            {Array(12).fill().map((_, index) => (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse" key={index} >
                <div className="relative w-[450px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-300 dark:bg-gray-700">
                  <div className="absolute top-0 right-0 h-full w-full bg-gray-200 flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" ></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </>

        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center space-x-2 my-12 items-center">
        <button
          onClick={() => handlePageChange(1)}
          className="px-2 py-2 border border-gray-300 hover:bg-gray-200 rounded-full"
          disabled={currentPage === 1}
        >
          <FirstPageIcon />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-2 py-2 border border-gray-300 hover:bg-gray-200 rounded-full"
          disabled={currentPage === 1}
        >
          <NavigateBeforeIcon />
        </button>
        <div>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)} // +1 para las páginas empezando desde 1
              className="px-2 py-2 ml-2 h-10 w-10 bg-lime-green hover:bg-dark-green rounded-full font-montserrat hover:text-white"
            >
              {index + 1} {/* Muestra el número de la página */}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-2 py-2 border border-gray-300 hover:bg-gray-200 rounded-full"
          disabled={currentPage === totalPages}
        >
          <NavigateNextIcon />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-2 py-2 border border-gray-300 hover:bg-gray-200 rounded-full"
          disabled={currentPage === totalPages}
        >
          <LastPageIcon />
        </button>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1200}
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
