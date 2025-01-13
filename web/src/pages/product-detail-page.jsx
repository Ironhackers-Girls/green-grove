import { useState, useEffect } from 'react';
import StarIcon from "@mui/icons-material/Star";
import { Radio, RadioGroup } from '@headlessui/react';
import { Snackbar, Alert } from "@mui/material";
import { useParams } from 'react-router-dom';
import * as ProductsApi from '../services/products-services';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';


function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    ProductsApi.getProduct(id)
      .then((productData) => setProduct(productData))
      .catch((error) => console.log(error));
  }, [id]);

  if (!product) {
    return <div className="animate-pulse pt-5">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="h-screen bg-gray-200 rounded-lg"></div>
        <div className="h-screen bg-gray-200 rounded-lg"></div>
      </div>
    </div>;
  }

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

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  const reviews = product.reviews || [];

  return (
    <div className="bg-white">
      {/* Contenedor general de la Galería y la Información */}
      <div className="mt-3 lg:grid lg:grid-cols-4 lg:gap-x-8">

        {/* Galería de imágenes */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {/* Imagen principal */}
          <img
            alt={product.images[0].url}
            src={product.images[0].url}
            className="rounded-lg object-cover w-full h-full col-span-2 row-span-1"
          />

          {/* Otras imágenes */}
          <div className="col-span-2 grid grid-cols-2 gap-4 mt-4">
            {product.images.slice(1).map((image, index) => (
              <img
                key={index}
                alt={image.url}
                src={image.url}
                className="rounded-lg object-cover w-full h-full col-span-2 row-span-1"
              />
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="sticky col-span-2 top-24 max-h-screen overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
          <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>

          {/* Reseñas */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      product.rating > rating ? 'text-dark-green' : 'text-gray-200',
                      'size-5 shrink-0'
                    )}
                  />
                ))}
              </div>
              <p className="sr-only">{product.rating} out of 5 stars</p>
              <a href="#" className="ml-3 text-sm font-medium text-dark-green">
                {reviews.length} reviews
              </a>
            </div>
          </div>

          {/* Opciones */}
          <div className="mt-10">
            {/* Colores */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <fieldset aria-label="Choose  a color" className="mt-4">
                <RadioGroup className="grid grid-cols-8 gap-4 sm:grid-cols-8 lg:grid-cols-8">
                  {product.swatches.map((swatch) => (
                    <Radio key={swatch.colorCode}
                      value={swatch}
                      aria-label={swatch.colorName} className="cursor-pointer bg-gray-50 text-gray-900 shadow-sm group relative flex flex-col  items-center justify-center rounded-md border px-2 py-2 text-sm font-medium font-montserrat uppercase focus:outline-none data-[focus]:ring-2 data-[focus]:ring-dark-green sm:flex-1 sm:py-6">
                      <img
                        src={swatch.productImage}
                        className="relative w-16 h-24 mb-2 object-cover transition-all duration-700"
                        alt="product image"
                      />
                      <span
                        aria-hidden="true"
                        className="size-5 rounded-full border"
                        style={{ backgroundColor: `#${swatch.colorCode}` }}
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-dark-green"
                      />
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>

            {/* Tallas */}

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <fieldset aria-label="Choose a size" className="mt-4">
                <RadioGroup className="grid grid-cols-8 gap-4 sm:grid-cols-8 lg:grid-cols-8">
                  {product.available_sizes.map((size) => (
                    <Radio key={size} value={size} className="cursor-pointer bg-gray-50 text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border px-2 py-2 text-sm font-medium font-montserrat uppercase hover:bg-white focus:outline-none data-[focus]:ring-2 data-[focus]:ring-dark-green sm:flex-1 sm:py-6">
                      <span>{size}</span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-dark-green"
                      />
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>

            {/* Añadir al carrito */}
            <div className='flex flex-row items-center mt-10'>
              <button
                onClick={() => handleAddToWishlist(product)}
                className="flex py-3 px-3 items-center justify-center bg-dark-green rounded-full text-white hover:bg-gray-50 border hover:text-red-600 "
              >
                <FavoriteIcon />
              </button>
              <button
                type="button"
                onClick={() => handleProductAddCart(product)}
                className="ml-2 w-full h-12 flex items-center justify-center rounded-full hover:gap-2 bg-lime-green font-medium text-dark-green relative group"
              >
                <span>Add to bag</span>
                <ShoppingBagIcon
                  className="w-6 h-6 text-dark-green opacity-0 group-hover:opacity-100 transition-transform transform duration-600"
                />
              </button>



            </div>

          </div>
        </div>
      </div>
      {/* Sección de Materiales y Reseñas */}
      <div className="mt-5 bg-gray-50 p-6 rounded-lg">
        <div className="py-10">
          <h2 className="text-lg font-bold font-montserrat mb-3 text-gray-900">Description</h2>
          <p className="text-base font-montserrat text-gray-900">{product.description}</p>
          <div className="mt-10">
            <h2 className="text-lg font-bold font-montserrat mb-3 text-gray-900">Materials</h2>
            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
              {product.materials.map((material, index) => (
                <li key={index} className="text-gray-400">
                  <span className="text-gray-600 font-montserrat">{material}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reseñas */}
        <div>
          <h2 className="text-lg font-bold font-montserrat mb-3 text-gray-900">Reviews</h2>
          {reviews.length > 0 ? (
            <ul role="list" className="space-y-4 mt-4">
              {reviews.map((review, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-sm bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium font-montserrat text-gray-900">{review.user}</span>
                    <span className="text-xs font-montserrat text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2 flex">
                    {[...Array(5)].map((_, ratingIndex) => (
                      <StarIcon
                        key={ratingIndex}
                        className={classNames(
                          review.rating > ratingIndex ? 'text-dark-green' : 'text-gray-200',
                          'w-5 h-5'
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-montserrat text-gray-700">{review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 mt-4">No reviews available.</p>
          )}
        </div>
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

export default ProductDetailPage;
